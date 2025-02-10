import { Component } from '@angular/core';
import { MeteoBriefingFormComponent } from './meteo-briefing-form/meteo-briefing-form.component';
import { MeteoBriefingTableComponent } from './meteo-briefing-table/meteo-briefing-table.component';
import { FormSubmitData } from './meteo-briefing-form/types/meteo-briefing-form.types';
import { OpmetQueryResponse } from '../../shared/types/ogcie-iblsoft.api.types';
import { MeteoBriefingService } from './meteo-briefing.service';
import { NgFor, NgIf } from '@angular/common';
import { MeteoBriefingTableData } from './meteo-briefing-table/types/meteo-briefing-table.types';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'meteo-briefing',
  imports: [
    NgIf,
    NgFor,
    MeteoBriefingFormComponent,
    MeteoBriefingTableComponent,
    MatCard,
    MatCardContent
  ],
  templateUrl: './meteo-briefing.component.html',
  styleUrl: './meteo-briefing.component.css'
})
export class MeteoBriefingComponent {
  responseData: OpmetQueryResponse | null = null;
  fetching: boolean = false;
  wasFetched: boolean = false;
  errorMessage = '';

  constructor(private meteoBriefingService: MeteoBriefingService) {}

  get getFormattedResponseData(): MeteoBriefingTableData[] {
    if(!this.responseData) return [];

    return this.meteoBriefingService.formatDataToTable(this.responseData);
  }

  newSubmittedValues(values: FormSubmitData): void {
    this.fetching = true;
    this.errorMessage = '';

    this.meteoBriefingService.fetchOpmetData(values).subscribe({
      next: (response) => {
        // console.log('API Response:', response, this.meteoBriefingService.formatDataToTable(response));
        this.responseData = response;
        this.fetching = false;
        this.wasFetched = true;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.errorMessage = error;
        this.fetching = false;
      },
    });
  }
}
