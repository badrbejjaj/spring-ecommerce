import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@app/_services/product.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  columns = [];
  rows = [];
  pageTitle = 'Liste des articles';
  pageBreadcrumb = ['Articles', 'Liste des articles'];
  loading = false;
  isEmpty = false;
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

  constructor(private route: ActivatedRoute, private productService: ProductService ) { }



  ngOnInit(): void {
    if (this.route.snapshot.queryParams.success) {
      const message = this.route.snapshot.queryParams.success === 'update' ? 'mise à jour' : 'ajouter';
      this.toast.fire({
        icon: 'success',
        title: `L\'article a bien été ${message} .`
      });
    }
    this.columns = [
      { label: '#' },
      { label: 'Referance' },
      { label: 'Designation' },
      { label: 'Quantité' },
      { label: 'Prix' },
      { label: 'actions' }
    ];
    this.getItems(false);
  }
  getItems(releod): void {
    this.loading = true;
    this.productService.getAll().subscribe((products) => {
      this.loading = false;
      if (!products.length) {
        this.isEmpty = true;
        return;
      }
      this.rows = products;
      if (releod) {
        this.toast.fire({
          icon: 'success',
          title: 'L\'article a été supprimé.'
        });
      }
    });
  }
  async deleteProduct(product): Promise<void> {
    const result = await Swal.fire({
      title: 'Voulez-vous vraiment supprimer l\'article "' + product.designation + '" ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non'
    });

    if (result.value) {
      this.productService.delete(product.id)
      .pipe(first())
      .subscribe(() => {
          this.getItems(true);
      });
    }

  }
}
