import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  submitted: boolean = false
  constructor(private formBuilder: FormBuilder, private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.buildForm()
  }

  onSubmit(): void {
    console.log('entra')
    this.submitted = true
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const {email, password} = this.form.getRawValue()
    this.authSvc.login(email, password)
    this.router.navigate(['/home'])
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, Validators.required]
    })
  }
}
