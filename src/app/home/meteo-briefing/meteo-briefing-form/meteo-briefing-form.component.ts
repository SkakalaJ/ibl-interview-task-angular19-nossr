import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import StringUtils from '../../../shared/utils/string';
import ValidateUtils from '../../../shared/utils/validate';
import icaoAirportsData from '../../../shared/assets/datasets/icao-airports.json';
import whoCountriesData from '../../../shared/assets/datasets/who-countries.json';
import { IcaoAirportData } from '../../../shared/types/icao-airports.types';
import { WhoCountriesData } from '../../../shared/types/who-countries.types';
import { FormSubmitData } from './types/meteo-briefing-form.types';
import { CustomErrorStateMatcher } from './classes/custom-error-state-matcher.class';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'meteo-briefing-form',
  imports: [
    NgIf,
    NgFor,
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatHint,
    MatError,
    MatCheckbox,
    MatIcon,
    MatProgressSpinner,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './meteo-briefing-form.component.html',
  styleUrl: './meteo-briefing-form.component.css'
})
export class MeteoBriefingFormComponent {
  @Output()
  onSubmitValues = new EventEmitter<FormSubmitData>();

  @Input()
  loading: boolean = true;

  briefingForm: FormGroup;
  reportTypes: string[] = ['METAR', 'SIGMET', 'TAF'];

  showCountriesHint: string | null = null;
  showAirportsHint: string | null = null;

  icaoData: IcaoAirportData[] = icaoAirportsData;
  whoCountriesData: WhoCountriesData = whoCountriesData;

  constructor(private fb: FormBuilder) {
    this.briefingForm = this.fb.group({
      reportTypes: this.fb.array(this.reportTypes.map(reportType => this.fb.control(reportType === 'METAR'))),
      airports: [''],
      countries: ['']
    }, {updateOn: 'change'});
  }

  ngOnInit(): void {
    this.briefingForm.get('airports')?.valueChanges.pipe(
      // debounceTime(300),
      // distinctUntilChanged()
    ).subscribe(value => {
      const formattedValue = this.customInputValueFormatter(value);
      this.briefingForm.get('airports')?.setValue(formattedValue, { emitEvent: false });
      this.customValidationForAirports(value);
    });

    this.briefingForm.get('countries')?.valueChanges.pipe(
      // debounceTime(300),
      // distinctUntilChanged()
    ).subscribe(value => {
      const formattedValue = this.customInputValueFormatter(value);
      this.briefingForm.get('countries')?.setValue(formattedValue, { emitEvent: false });
      this.customValidationForCountries(value);
    });
  }

  customInputValueFormatter = (value: string) => {
    let formattedValue = value.toUpperCase();
    formattedValue = StringUtils.removeNonAlphabetic(formattedValue);

    if (formattedValue.endsWith(' ')) {
      formattedValue = StringUtils.removeDuplicateWords(formattedValue);
    }

    formattedValue = StringUtils.trimAllSpaces(formattedValue);

    return formattedValue;
  };

  validateIcaoAirportCodes = (value: string): string | null => {
    if(!value.trim()) return null;

    const errorCodes: string[] = [];

    const airports = value.split(' ');
    const uniqueAirports = airports.filter((airport, index) => airports.indexOf(airport) === index);

    for (const airport of uniqueAirports) {
      if(airport.length < 4) {
        continue;
      }

      if(!ValidateUtils.isValidIcaoCode(this.icaoData, airport)){
        errorCodes.push(airport);
      }
    }
    
    if(errorCodes.length > 0) {
      return `${errorCodes.join(', ')} - following ICAO Airport Codes seems to be invalid. If you are sure about they are correcr, feel free to submit form. Otherwise, please correct listed codes.`;
    }

    return null;
  };

  validateWmoCountryCodes = (value: string): string | null => {
    if(!value.trim()) return null;

    const errorCodes: string[] = [];

    const countries = value.split(' ');
    const uniqueCountries = countries.filter((country, index) => countries.indexOf(country) === index);

    for (const country of uniqueCountries) {
      if(country.length < 2) {
        continue;
      }

      if(!ValidateUtils.isValidWmoCode(this.whoCountriesData, country)){
        errorCodes.push(country);
      }
    }
    
    if(errorCodes.length > 0) {
      return `${errorCodes.join(', ')} - following WMO Country Codes seems to be invalid. If you are sure about they are correct, feel free to submit form. Otherwise, please correct listed codes.`;
    }

    return null;
  };

  customValidationForAirports(value: string) {
    const errors = [];
    const warnings = [];

    if (value.trim() && !StringUtils.testOnlyAlphabetic(value)) {
      errors.push('Only alphabetic characters are allowed!');
    };

    if(value.split(' ').some((code) => code.length > 4)) {
      errors.push('Airport codes must be 4 characters long!');
    };

    const warnMessage = this.validateIcaoAirportCodes(value.toUpperCase());
    if(warnMessage) {
      warnings.push(warnMessage);
    };

    if (errors && errors.length > 0) {
      this.briefingForm.get('airports')?.setErrors({ customError: errors[0] });
    } else {
      this.briefingForm.get('airports')?.setErrors(null);
    }

    if(warnings && warnings.length > 0) {
      this.showAirportsHint = warnings[0];
    } else {
      this.showAirportsHint = null;
    }
  }

  customValidationForCountries(value: string) {
    const errors = [];
    const warnings = [];

    if (value.trim() && !StringUtils.testOnlyAlphabetic(value)) {
      errors.push('Only alphabetic characters are allowed!');
    };

    if(value.split(' ').some((code) => code.length > 2)) {
      errors.push('Country codes must be 2 characters long!');
    };

    const warnMessage = this.validateWmoCountryCodes(value.toUpperCase());
    if(warnMessage) {
      warnings.push(warnMessage);
    };

    if (errors && errors.length > 0) {
      this.briefingForm.get('countries')?.setErrors({ customError: errors[0] });
    } else {
      this.briefingForm.get('countries')?.setErrors(null);
    }

    if(warnings && warnings.length > 0) {
      this.showCountriesHint = warnings[0];
    } else {
      this.showCountriesHint = null;
    }
  }

  onCheckboxChange(event: any) {
    const reportTypesFormArray = this.briefingForm.get('reportTypes') as FormArray;
    // const selectedTypes = this.briefingForm.get('reportTypes')?.value || [];

    const index = this.reportTypes.indexOf(event.source.value);

    if (index !== -1) {
      reportTypesFormArray.at(index).setValue(event.checked);
      // this.briefingForm.get('reportTypes')?.patchValue(selectedTypes);
    }

    if(reportTypesFormArray.value.every((value: boolean) => value === false)) {
      reportTypesFormArray?.setErrors({ customError: 'At least one report type must be selected!' });
    }
    else {
      reportTypesFormArray?.setErrors(null);
    }
  }

  getReportTypesFromForm(reportTypes: boolean[]): string[] {
    const values: string[] = [];

    for (let index = 0; index < reportTypes.length; index++) {
      switch(index){
        case 0:
          if(reportTypes[index]) values.push('METAR');
          break;
        case 1:
          if(reportTypes[index]) values.push('SIGMET');
          break;
        case 2:
          if(reportTypes[index]) values.push('TAF');
          break;
      }
    };

    return values;
  };

  onSubmit() {
    if (this.loading) return;

    const airportsErrors = [];
    const countriesErrors = [];
    
    const reportTypes = this.getReportTypesFromForm(this.briefingForm.get('reportTypes')?.value);
    const airports = this.briefingForm.get('airports')?.value;
    const countries = this.briefingForm.get('countries')?.value;

    if(airports && airports.split(' ').some((code: string) => code.length !== 4)) {
      airportsErrors.push('Airport codes must be 4 characters long!');
    };

    if(countries && countries.split(' ').some((code: string) => code.length !== 2)) {
      countriesErrors.push('Country codes must be 2 characters long!');
    };

    if (airportsErrors && airportsErrors.length > 0) {
      this.briefingForm.get('airports')?.setErrors({ customError: airportsErrors[0] });
    } else {
      this.briefingForm.get('airports')?.setErrors(null);
    }

    if (countriesErrors && countriesErrors.length > 0) {
      this.briefingForm.get('countries')?.setErrors({ customError: countriesErrors[0] });
    } else {
      this.briefingForm.get('countries')?.setErrors(null);
    }

    if(airportsErrors.length > 0 || countriesErrors.length > 0) {
      return;
    }

    const values = {
      reportTypes,
      airports,
      countries
    };

    this.onSubmitValues.emit(values);
  }

  get isSubmitDisabled(): boolean {
    if(this.loading) return true;

    const airportsControl = this.briefingForm.get('airports');
    const countriesControl = this.briefingForm.get('countries');
    const reportTypesControl = this.briefingForm.get('reportTypes') as FormArray;

    const isAirportsValid = airportsControl?.valid && airportsControl?.value.trim().length >= 4;
    const isCountriesValid = countriesControl?.valid && countriesControl?.value.trim().length >= 2;
    const isReportTypesValid = reportTypesControl?.value.some((checked: boolean) => checked);

    // Check also if errors are present
    if(airportsControl?.errors || countriesControl?.errors || reportTypesControl?.errors) {
      return true;
    }

    return !((isAirportsValid || isCountriesValid) && isReportTypesValid);
  }

  matcher = new CustomErrorStateMatcher();
}
