import {Component, Input, Self, Optional} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor  {
  @Input() placeholder: string = ''
  @Input() type: string = 'text'
  @Input() submitted: boolean = true
  @Input() label?: string

  disabled: boolean = false
  currentValue: any

  private onChange!: Function

  constructor(@Self() @Optional() private control: NgControl) {
    this.control.valueAccessor = this;
  }

  changeText($event: any): void {
    this.onChange($event.target.value)
    this.currentValue = $event.target.value
  }

  writeValue(value: any): void {
    this.currentValue = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void { }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled
  }

  get invalid(): boolean {
    return this.control ? !!this.control.invalid : false
  }
}
