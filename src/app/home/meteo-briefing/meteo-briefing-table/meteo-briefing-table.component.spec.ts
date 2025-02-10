import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoBriefingTableComponent } from './meteo-briefing-table.component';

describe('MeteoBriefingTableComponent', () => {
  let component: MeteoBriefingTableComponent;
  let fixture: ComponentFixture<MeteoBriefingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoBriefingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteoBriefingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
