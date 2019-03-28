import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.css']
})
export class LaporanComponent implements OnInit {
  laporanForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
      prmDate2: [new Date(), Validators.required]
    });
  }

  QueryByDate() {
    console.log('Query By Date');
  }
}
