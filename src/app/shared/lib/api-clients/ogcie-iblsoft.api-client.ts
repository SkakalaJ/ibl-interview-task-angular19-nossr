import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError, timeout } from 'rxjs';
import { OpmetQueryBody, OpmetQueryResponse } from '../../types/ogcie-iblsoft.api.types';
import config from '../../assets/config.json';
import UrlUtils from '../../utils/url';

@Injectable({
  providedIn: 'root',
})
export class OgcieIblsoftApiClient {
  private readonly OGCIE_IBLSOFT_HOST_URL = config.OGCIE_IBLSOFT_HOST_URL || 'https://ogcie.iblsoft.com/';
  private readonly OGCIE_IBLSOFT_THRESHOLD = config.OGCIE_IBLSOFT_THRESHOLD || 7000;

  constructor(private http: HttpClient) {}

  private getRiaPath(): string {
    return UrlUtils.buildUrlPath(['ria']);
  }

  private getOpmetQueryPath(): string {
    return UrlUtils.buildUrlPath([this.getRiaPath(), 'opmetquery']);
  }

  private getOpmetQueryUrl(): string {
    return UrlUtils.buildUrl(this.OGCIE_IBLSOFT_HOST_URL, [this.getOpmetQueryPath()]);
  }

  postOpmetQuery(body: OpmetQueryBody): Observable<OpmetQueryResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log(this.OGCIE_IBLSOFT_THRESHOLD);

    return this.http.post<OpmetQueryResponse>(this.getOpmetQueryUrl(), body, { headers }).pipe(
      timeout(this.OGCIE_IBLSOFT_THRESHOLD),
      retry(3),
      map((response) => {
        if (response.error) {
          console.log(response.error);
          throw new Error(`${response.error.message}`);
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          console.error('A network error occurred:', error.error.message);
          return throwError(() => new Error('Please check your internet connection.'));
        } else {
          // Backend returned an unsuccessful response code
          console.error('Backend returned an error:', error.status, error.message);
          return throwError(() => new Error(`${error.message}`));
        }
      })
    );
  }
}