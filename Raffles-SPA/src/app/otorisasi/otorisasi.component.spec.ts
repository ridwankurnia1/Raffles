/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtorisasiComponent } from './otorisasi.component';

describe('OtorisasiComponent', () => {
  let component: OtorisasiComponent;
  let fixture: ComponentFixture<OtorisasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtorisasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtorisasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
