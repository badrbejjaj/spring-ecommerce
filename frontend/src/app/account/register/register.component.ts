import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from 'src/app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  private phoneRgExpression = '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('(06)[0-9 ]{8}')]],
      password: ['', [Validators.required, Validators.min(6)]]
    });

  }

  // convenience getter for easy access to form fields
  public get f(): { [key: string]: AbstractControl; } { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe(
            (data: any) => {
                this.alertService.success(data.message, { keepAfterRouteChange: true });
                this.router.navigate(['/login'], { relativeTo: this.route });
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

}
