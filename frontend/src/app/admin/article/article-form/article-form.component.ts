import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/_models';
import { AccountService, AlertService } from '@services/index';
import { ProductService } from '@services/product.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  form: FormGroup;
  pageTitle = 'Ajouter un article';
  pageBreadcrumb = ['Articles', 'Ajouter Article'];
  id;
  isAddMode: boolean;
  submitted = false;
  loading = false;
  buttonLabel: string;
  toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private productService: ProductService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.buttonLabel = this.isAddMode ? 'Ajouter' : 'Enregistrer';

    this.form = this.formBuilder.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      unity: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.getProductById();
    }
  }
    // convenience getter for easy access to form fields
    get f(): any { return this.form.controls; }

    onSubmit(): void {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.createProduct();
      } else {
          this.updateProduct();
      }
  }

  private getProductById(): void {
    this.productService.getById(this.id)
    .pipe(first())
    .subscribe((product: Product) => {
        this.pageTitle = 'Modifier l\'article ' + product.designation;
        this.pageBreadcrumb[this.pageBreadcrumb.length - 1] = this.pageTitle;
        this.f.reference.setValue(product.reference);
        this.f.designation.setValue(product.designation);
        this.f.price.setValue(product.price);
        this.f.quantity.setValue(product.quantity);
        this.f.unity.setValue(product.unity);
    });
  }

  private createProduct(): void {
    this.productService.create(this.form.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/admin/articles/list'], { queryParams: { success: 'create' } });
              },
              error => {
                  this.toast.fire({
                    icon: 'error',
                    title: error
                  });
                  this.loading = false;
            });
  }

  private updateProduct(): void {
    this.productService.update(this.id, this.form.value)
    .pipe(first())
    .subscribe(
        data => {
          this.router.navigate(['/admin/articles/list'], { queryParams: { success: 'update' } });
        },
        error => {
          this.toast.fire({
            icon: 'error',
            title: error
          });
          this.loading = false;
        });
  }
}
