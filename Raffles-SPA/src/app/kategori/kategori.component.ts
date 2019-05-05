import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categories } from '../_model/categories';
import { AlertifyService } from '../_services/alertify.service';
import { TransService } from '../_services/trans.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})

export class KategoriComponent implements OnInit {
  category: Categories;
  kategoriForm: FormGroup;
  listkategori: Categories[];
  inputMode = false;
  editMode = false;
  ActiveFlag = false;
  isSubmit = 0;

  constructor(
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private transService: TransService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.createKategoriForm();
  }

  inputToggle(load: boolean) {
    this.inputMode = !this.inputMode;
    this.isSubmit = 0;
    this.editMode = false;
    this.kategoriForm.reset();
    if (load) {
      this.loadCategories();
    }
  }

  createKategoriForm() {
    this.kategoriForm = this.fb.group({
      CategoryId: [''],
      TransactionType: ['', Validators.required],
      CategoryName: ['', Validators.required],
      Active: ['']
    });
  }

  loadCategories() {
    this.transService.getCategories().subscribe(
      (categories: Categories[]) => {
        this.listkategori = categories;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  editKategori(data: Categories) {
    this.inputToggle(false);
    this.ActiveFlag = Boolean(data.Active);
    if (this.ActiveFlag) {
      this.kategoriForm.controls['TransactionType'].enable();
      this.kategoriForm.controls['CategoryName'].enable();
    } else {
      this.kategoriForm.controls['TransactionType'].disable();
      this.kategoriForm.controls['CategoryName'].disable();
    }

    this.editMode = true;
    this.kategoriForm.setValue({
      CategoryId: data.CategoryId,
      TransactionType: data.TransactionType,
      CategoryName: data.CategoryName,
      Active: data.Active
    });
  }

  submitKategori() {
    if (this.kategoriForm.valid) {
      this.isSubmit = 1;
      this.category = Object.assign({}, this.kategoriForm.getRawValue());
      this.category.Active = Number(this.category.Active);
      this.category.CreatedId = this.authService.decodedToken.nameid;
      this.category.UpdatedId = this.authService.decodedToken.nameid;

      if (!this.editMode) {
        this.category.CategoryId = 0;
        this.category.Active = 1;
        this.transService.saveCategories(this.category).subscribe(
          () => {
            this.alertify.success('Registrasi kategori berhasil');
          },
          error => {
            this.alertify.error(error);
          },
          () => {
            this.inputToggle(true);
          }
        );
      } else {
        this.transService
          .edtCategories(this.category.CategoryId, this.category)
          .subscribe(
            () => {
              this.alertify.success('Edit kategori berhasil');
            },
            error => {
              this.alertify.error(error);
            },
            () => {
              this.inputToggle(true);
            }
          );
      }
    }
  }

  deleteKategori(data: Categories) {
    this.alertify.confirm(
      'Konfirmasi',
      'Delete kategori ' + data.CategoryName + '?',
      () => {
        data.UpdatedId = this.authService.decodedToken.nameid;
        this.transService.delCategories(data).subscribe(
          () => {
            this.alertify.success('Delete kategori berhasil');
          },
          error => {
            this.alertify.error(error);
          },
          () => {
            this.loadCategories();
          }
        );
      },
      () => {}
    );
  }
}
