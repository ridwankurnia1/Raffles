import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { TransService } from '../_services/trans.service';
import { AuthService } from '../_services/auth.service';
import { Pagination, PaginatedResult } from '../_model/pagination';
import { Transactions } from '../_model/transactions';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.css']
})
export class LaporanComponent implements OnInit {
  laporanForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: any;
  pagination: Pagination;
  transactions: Transactions[];
  transParams: any = {};

  constructor(private alertify: AlertifyService, private fb: FormBuilder
    , private transService: TransService, private authService: AuthService) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      itemPerPage: 10,
      totalItems: 0,
      totalPages: 1
    };

    this.bsConfig = {
      containerClass: 'theme-green',
      dateInputFormat: 'DD-MM-YYYY'
    };
    this.bsValue = new Date();
    this.createlaporanForm();
  }

  createlaporanForm() {
    this.laporanForm = this.fb.group({
      prmDate1: [new Date(), Validators.required],
      prmDate2: [new Date(), Validators.required],
      transactionType: []
    });
  }

  QueryByDate() {
    console.log('Query By Date');
  }

  headRows() {
    return [{id: 'ID', transactionDate: 'Tanggal', description: 'Keterangan', amount: 'Jumlah'}];
  }

  bodyRows(rowCount) {
    rowCount = rowCount || 10;

    this.transService
      .getTransactions(
        this.pagination.currentPage,
        rowCount,
        this.transParams
      )
      .subscribe(
        (res: PaginatedResult<Transactions[]>) => {
          this.transactions = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );

    return this.transactions;
  }

  downloadByDate() {
    let doc = new jsPDF();
    const title1 = 'LAPORAN KEUANGAN';
    const title2 = 'ISLAMIC CENTER AR RAHMAH RAFFLES HILLS';
    const xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(title1) * doc.internal.getFontSize() / 2);
    console.log(xOffset);
    
    doc.text(title1, 20, 20);
    doc.text(title2, 20, 30);

    doc.text(20, 40, 'This is client-side Javascript, pumping out a PDF.');
    //doc.addPage();
    //doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    doc.save('Test.pdf');
  }