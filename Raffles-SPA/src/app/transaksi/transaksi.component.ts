import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { Transactions } from '../_model/transactions';
import { TransService } from '../_services/trans.service';
import { Categories } from '../_model/categories';
import { AuthService } from '../_services/auth.service';
import { PaginatedResult, Pagination } from '../_model/pagination';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent implements OnInit {
  transaksiForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: any;
  transactions: Transactions[];
  values: Transactions;
  categories: Categories[];
  tempCategories: Categories[];
  inputMode = false;
  pagination: Pagination;
  transParams: any = {};
  loading: boolean;
  ButtonText: string;

  constructor(private alertify: AlertifyService, private fb: FormBuilder
    , private transService: TransService, private authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.pagination = {
      currentPage: 1,
      itemPerPage: 10,
      totalItems: 0,
      totalPages: 1
    };

    this.transParams = {
      dateFr: '',
      dateTo: '',
      trType: '',
      activityId: 1
    }

    this.loadTrans();
    this.loadCategories();

    this.bsConfig = {
      containerClass: 'theme-green',
      dateInputFormat: 'DD-MM-YYYY'
    };
    this.createTransaksiForm();
    this.loading = false;
  }

  pageChanged(event: any): void {
    this.loading = true;
    this.pagination.currentPage = (event.first / event.rows) + 1;
    this.loadTrans();
    this.loading = false;
  }

  inputToggle(load: boolean) {
    this.inputMode = !this.inputMode;
    this.ButtonText = 'Submit';
    if (load) {
      this.loadTrans();
    }
  }

  loadTrans() {
    this.transService.getTransactions(this.pagination.currentPage, this.pagination.itemPerPage, this.transParams)
      .subscribe((res: PaginatedResult<Transactions[]>) => {
        this.transactions = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadCategories() {
    this.transService.getCategories().subscribe((categories: Categories[]) => {
      this.tempCategories = categories;
    }, error => {
      this.alertify.error(error);
    });
  }

  onTransactionSelect(transType) {
    this.categories = this.tempCategories;
    if (transType) {
      this.categories = this.categories.filter((item) => item.TransactionType === transType && item.Active === 1);
    }
  }

  createTransaksiForm() {
    this.transaksiForm = this.fb.group({
      transactionDate: [new Date(), Validators.required],
      transactionType: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  deleteTransaction(data: Transactions) {
    this.alertify.confirm(
      'Konfirmasi',
      'Koreksi transaksi ' + data.Description + ' ?',
      () => {
        this.transService.delTransactions(data.Id).subscribe(
          () => {
            this.alertify.success('Koreksi transaksi berhasil');
          },
          error => {
            this.alertify.error(error);
          },
          () => {
            this.loadTrans();
          }
        );
      },
      () => {}
    );
  }

  submitTransaction() {
    if (this.transaksiForm.valid) {
      this.loading = true;
      this.values = Object.assign({}, this.transaksiForm.value);
      this.values.ActivityId = 1;
      this.values.CreatedId = this.authService.decodedToken.nameid;
      this.transService.saveTransaction(this.values).subscribe(() => {
        this.alertify.success('Transaksi berhasil di simpan');
      }, error => {
        this.alertify.error(error);
      }, () => {
          this.transaksiForm.reset({ transactionDate: [new Date().toJSON(), Validators.required] });
      });
      this.loading = false;
    }
  }
}
