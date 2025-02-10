import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/**
 * Source - https://stackoverflow.com/questions/47535779/how-to-trigger-material2-mat-error-to-be-displayed-on-input-change
 * 
 * State Matcher overrided due to input error was not displayed immediately after input change.
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}