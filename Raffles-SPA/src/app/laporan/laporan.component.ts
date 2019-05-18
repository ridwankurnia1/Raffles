import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { TransService } from '../_services/trans.service';
import { AuthService } from '../_services/auth.service';
import { Pagination, PaginatedResult } from '../_model/pagination';
import { Transactions } from '../_model/transactions';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatNumber, formatDate } from '@angular/common';
import { Activities } from '../_model/activities';
import { ActivityService } from '../_services/activity.service';
import { Categories } from '../_model/categories';

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
  activities: Activities[];
  categories: Categories[];
  transactions: Transactions[];
  transParams: any = {};
  isSubmit: number;

  constructor(private alertify: AlertifyService, private fb: FormBuilder,
    private activityService: ActivityService,
    private transService: TransService) { }

  ngOnInit() {
    this.isSubmit = 0;
    this.bsConfig = {
      containerClass: 'theme-green',
      dateInputFormat: 'DD-MM-YYYY'
    };
    this.bsValue = new Date();
    this.createlaporanForm();
    this.loadActivities();
    this.loadCategories();
  }

  createlaporanForm() {
    this.laporanForm = this.fb.group({
      dateFr: [new Date(), Validators.required],
      dateTo: [new Date(), Validators.required],
//      trType: ['A'],
      activityId: [''],
    });
  }

  loadActivities() {
    this.activityService.getActivities().subscribe((act: Activities[]) => {
      this.activities = act.filter((item) => item.Active === 1);
    }, error => {
      this.alertify.error(error);
    });
  }

  loadCategories() {
    this.transService.getCategories().subscribe(
      (cat: Categories[]) => {
        this.categories = cat.filter((item) => item.Active === 1);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  downloadByDate() {
    this.isSubmit = 1;
    this.transParams.dateFr = formatDate(this.laporanForm.controls['dateFr'].value, 'yyyyMMdd', 'en');
    this.transParams.dateTo = formatDate(this.laporanForm.controls['dateTo'].value, 'yyyyMMdd', 'en');
    this.transParams.trType = '';
    this.transParams.activity = this.laporanForm.controls['activityId'].value;

    if (this.transParams.activity === '') {
      this.transParams.activity = '1';
    }

    this.transService.getTransRpt(this.transParams)
      .subscribe((res: Transactions[]) => {
        this.transactions = res;
    }, error => {
      this.alertify.error(error);
    }, () => {
      if (this.transactions.length > 0) {
        this.createPdf();
      } else {
        this.alertify.error('Data tidak ditemukan');
        this.isSubmit = 0;
      }
    });
  }

  createPdf() {
    const doc = new jsPDF();
    const totalPagesExp = '{total_pages_count_string}';
    const title1 = 'LAPORAN KEUANGAN';
    const title2 = 'ISLAMIC CENTER AR RAHMAH RAFFLES HILLS';
    const tgl1 = formatDate(this.laporanForm.controls['dateFr'].value, 'dd MMM yyyy', 'en');
    const tgl2 = formatDate(this.laporanForm.controls['dateTo'].value, 'dd MMM yyyy', 'en');
    let tCategory;

    doc.setFontSize(12);
    doc.setFontStyle('bold');
    doc.text(title1, doc.internal.pageSize.width / 2, 20, 'center');
    doc.text(title2, doc.internal.pageSize.width / 2, 25, 'center');
    doc.text(tgl1 + ' s/d ' + tgl2, doc.internal.pageSize.width / 2, 30, 'center');

    let finalY = 35;
    tCategory = this.categories.filter((item) => item.TransactionType === 'D');
    if (tCategory) {
      tCategory.forEach(item => {
        if (doc.previousAutoTable.finalY) {
          finalY = doc.previousAutoTable.finalY + 10;
        } else {
          finalY = finalY + 5;
        }

        doc.text('PEMASUKAN - ' + item.CategoryName, 14, finalY);
        finalY = finalY + 3;
        doc.autoTable({
          startY: finalY,
          styles: {overflow: 'hidden'},
          margin: {
            bottom: 15,
            right: 107
          },
          head: this.headRows(),
          body: this.bodyRows(item.CategoryId),
          useCss: true,
          didDrawPage: (data) => {
            let str = 'Hal ' + doc.internal.getNumberOfPages()
              if (typeof doc.putTotalPages === 'function') {
                  str = str + ' dari ' + totalPagesExp;
            }
            doc.setFontSize(10);
            const pageSize = doc.internal.pageSize;
            const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(str, data.settings.margin.left, pageHeight - 10);
          },
          columnStyles: {
            amount: {
              halign : 'right'
            }
          }
        });
      });
    }

    let isReset = true;
    finalY = 35;
    tCategory = this.categories.filter((item) => item.TransactionType === 'K');
    if (tCategory) {
      doc.setPage(1);
      tCategory.forEach(item => {
        if (doc.previousAutoTable.finalY && !isReset) {
          finalY = doc.previousAutoTable.finalY + 10;
        } else {
          finalY = finalY + 5;
          isReset = false;
        }

        doc.text('PENGELUARAN - ' + item.CategoryName, 107, finalY);
        finalY = finalY + 3;
        doc.autoTable({
          startY: finalY,
          styles: {overflow: 'hidden'},
          margin: {
            bottom: 15,
            left: 107
          },
          head: this.headRows(),
          body: this.bodyRows(item.CategoryId),
          useCss: true,
          columnStyles: {
            amount: {
              halign : 'right'
            }
          }
        });
      });
    }

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    // Save the PDF
    doc.save('Test.pdf');
    this.isSubmit = 0;
  }

  headRows() {
    return [{transactionDate: 'Tanggal', description: 'Keterangan', amount: 'Jumlah'}];
  }

  bodyRows(category: number) {
    const tbody = this.transactions.filter((item) => item.CategoryId === category);

    const body = [];
    let subTotal = 0;
    for (let j = 0; j < tbody.length; j++) {
      body.push({
          transactionDate: formatDate(tbody[j].TransactionDate, 'dd-MM-yyyy', 'en'),
          description: tbody[j].Description,
          amount: formatNumber(tbody[j].Amount, 'en'),
      });
      subTotal = subTotal + tbody[j].Amount;
    }

    body.push({
      transactionDate: '',
      description: 'TOTAL',
      amount: formatNumber(subTotal, 'en'),
    });

    return body;
  }
}
