import { Component, Input } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
// import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';
import { MeteoBriefingTableData } from './types/meteo-briefing-table.types';

@Component({
  selector: 'meteo-briefing-table',
  imports: [
    MatTable,
    MatTableModule
  ],
  templateUrl: './meteo-briefing-table.component.html',
  styleUrl: './meteo-briefing-table.component.css'
})
export class MeteoBriefingTableComponent {
  @Input()
  data: MeteoBriefingTableData = {
    station: '',
    rows: []
  };

  // constructor(private sanitizer: DomSanitizer) {}

  displayedColumns: string[] = ['reportType', 'reportTime', 'reportBody'];

  // sanitizeHTML(content: string): SafeHtml {
  //   return this.sanitizer.bypassSecurityTrustHtml(content);
  // }
}
