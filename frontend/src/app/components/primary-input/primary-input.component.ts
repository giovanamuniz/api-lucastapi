// primary-input.component.ts
import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | 'radio' | 'checkbox' | 'time';

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ],
  templateUrl: './primary-input.component.html',
})
export class PrimaryInputComponent implements ControlValueAccessor {

  @Input() type: InputTypes = "text"; 
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Input() options?: string[];

  value: string = '';
  showCustomInput: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  onOptionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.showCustomInput = selectedValue === 'Outro';
    if (!this.showCustomInput) {
      this.onChange(selectedValue);
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
