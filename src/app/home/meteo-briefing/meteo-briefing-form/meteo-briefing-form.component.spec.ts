import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoBriefingFormComponent } from './meteo-briefing-form.component';

describe('MeteoBriefingFormComponent', () => {
  let component: MeteoBriefingFormComponent;
  let fixture: ComponentFixture<MeteoBriefingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoBriefingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteoBriefingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
