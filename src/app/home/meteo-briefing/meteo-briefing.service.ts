import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OgcieIblsoftApiClient } from '../../shared/lib/api-clients/ogcie-iblsoft.api-client';
import { OpmetQueryBody, OpmetQueryParams, OpmetQueryResponse } from '../../shared/types/ogcie-iblsoft.api.types';
import { FormSubmitData } from './meteo-briefing-form/types/meteo-briefing-form.types';
import { MeteoBriefingTableData } from './meteo-briefing-table/types/meteo-briefing-table.types';
import { groupBy } from 'lodash-es';
import DateUtils from '../../shared/utils/date';

@Injectable({
  providedIn: 'root',
})
export class MeteoBriefingService {
  constructor(private apiClient: OgcieIblsoftApiClient) {}

  fetchOpmetData(formData: FormSubmitData): Observable<OpmetQueryResponse> {
    const requestBody: OpmetQueryBody = this.transformFormDataToOpmetQuery(formData);
    return this.apiClient.postOpmetQuery(requestBody);
  }

  private transformFormDataToOpmetQuery(formData: FormSubmitData): OpmetQueryBody {
    const params: OpmetQueryParams[] = [
      {
        id: "briefing01",
        reportTypes: formData.reportTypes,
        stations: (formData.airports?.length === 0) ? undefined : formData.airports.split(' '),
        countries: (formData.countries?.length === 0) ? undefined : formData.countries.split(' '),
      },
    ];

    return {
      id: 'query01',
      method: 'query',
      params: params
    };
  }

  // private formatTextHTML = (text: string, station: string) => {
  //   return text
  //     .replace(/(BKN|FEW|SCT)([0-9]{3})/g, (match, p1, p2) => {
  //       if(Number(p2) > 30) {
  //         return `<span style="color: red;"><b>${match}</b></span>`;
  //       } else {
  //         return `<span style="color: blue;"><b>${match}</b></span>`;
  //       }
  //     })
  //     .replace(new RegExp(`^${station}`, 'i'), `<b>${station}</b>`);
  // };

  private formatTextHTML = (text: string, station: string) => {
    return text
      .replace(/(BKN|FEW|SCT)([0-9]{3})/g, (match, p1, p2) => {
        if(Number(p2) > 30) {
          return `<span class="color-red"><b>${match}</b></span>`;
        } else {
          return `<span class="color-blue"><b>${match}</b></span>`;
        }
      })
      .replace(new RegExp(`^${station}`, 'i'), `<b>${station}</b>`);
  };

  public formatDataToTable = (data: OpmetQueryResponse): MeteoBriefingTableData[] => {
    const tableData: MeteoBriefingTableData[] = [];

    const stations = groupBy(data.result, 'stationId');
    
    Object.keys(stations).forEach((station) => {
      const stationData = stations[station];
      const stationFormattedData: MeteoBriefingTableData = {
        station: station,
        rows: stationData.map((data) => ({
          reportType: data.queryType,
          reportTime: DateUtils.format(data.reportTime, "d.M.yyyy HH:mm:ss", 'Europe/Bratislava'),
          reportBody: this.formatTextHTML(data.text, station),
        })),
      };

      tableData.push(stationFormattedData);
    });

    return tableData;
  };
}
