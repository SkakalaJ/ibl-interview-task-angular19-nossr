import { Component } from '@angular/core';
import { MeteoBriefingComponent } from './meteo-briefing/meteo-briefing.component';

@Component({
  selector: 'home',
  imports: [MeteoBriefingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
