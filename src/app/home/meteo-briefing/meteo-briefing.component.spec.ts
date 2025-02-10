import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoBriefingComponent } from './meteo-briefing.component';

describe('MeteoBriefingComponent', () => {
  let component: MeteoBriefingComponent;
  let fixture: ComponentFixture<MeteoBriefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoBriefingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteoBriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
