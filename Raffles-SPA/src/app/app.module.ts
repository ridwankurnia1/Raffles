import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { TransaksiComponent } from './transaksi/transaksi.component';
import { LaporanComponent } from './laporan/laporan.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      TransaksiComponent,
      LaporanComponent,
      RegistrasiComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      CollapseModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AlertifyService,
      AuthService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
