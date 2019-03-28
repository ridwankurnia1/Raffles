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
  kategoriForm: FormGroup;
  listkategori: Categories[];
  inputMode: false;

  constructor(private alertify: AlertifyService, private fb: FormBuilder
    , private transService: TransService, private authService: AuthService) { }

  ngOnInit() {
    this.loadCategories();
    this.createKategoriForm();
  }

  inputToggle(load: boolean) {
    this.inputMode = !this.inputMode;
    this.kategoriForm.reset();
    if (load) {
      this.loadCategories();
    }
  }

  createKategoriForm() {
    this.kategoriForm = this.fb.group({
      TransactionType: ['', Validators.required],
      CategoryName: ['', Validators.required],
    });
  }

  loadCategories() {
    this.transService.getCategories().subscribe((categories: Categories[]) => {
      this.listkategori = categories;
    }, error => {
      this.alertify.error(error);
    });
  }

  editKategori(data: Categories) {
    this.inputToggle(false);
    this.kategoriForm.setValue({
      TransactionType: data.TransactionType,
      CategoryName: data.CategoryName
    })
  }

  submitKategori() {

  }

  selectKategori(data: Categories) {
    this.alertify.confirm('Konfirmasi', 'Delete Kategori ' + data.CategoryName + ' ?', () => {
      console.log(data);
    }, () => {

    });
  }
}