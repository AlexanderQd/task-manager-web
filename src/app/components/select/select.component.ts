import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements ControlValueAccessor {
  @Input() labelTxt!: string
  @Input() placeholder: string = ''
  @Input() bindValue!: string
  @Input() bindLabel!: string
  @Input() multiple: boolean = false
  @Input() items: any[] = []
  @Input() submitted: boolean = true

  disabled: boolean = false
  currentValue: any
  private onChange!: Function

  constructor(@Self() @Optional() private control: NgControl) {
    this.control.valueAccessor = this;
  }

  change(event: any): void {
    event ? this.onChange(event[this.bindValue]) : this.onChange(event)
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
