import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule, TabsModule, BsDatepickerModule, ModalModule, CarouselModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
import { TransService } from './_services/trans.service';
import { OtorisasiComponent } from './otorisasi/otorisasi.component';
import { KategoriComponent } from './kategori/kategori.component';
import { KegiatanComponent } from './kegiatan/kegiatan.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ActivityService } from './_services/activity.service';
import { UserService } from './_services/user.service';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      TransaksiComponent,
      LaporanComponent,
      RegistrasiComponent,
      HomeComponent,
      OtorisasiComponent,
      KategoriComponent,
      KegiatanComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      TableModule,
      ProgressSpinnerModule,
      CollapseModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ModalModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      CarouselModule.forRoot(),
      PaginatorModule,
   ],
   providers: [
      ErrorInterceptorProvider,
      AlertifyService,
      AuthService,
      AuthGuard,
      TransService,
      ActivityService,
      UserService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
