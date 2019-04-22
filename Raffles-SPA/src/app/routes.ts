import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransaksiComponent } from './transaksi/transaksi.component';
import { LaporanComponent } from './laporan/laporan.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { AuthGuard } from './_guards/auth.guard';
import { KategoriComponent } from './kategori/kategori.component';
import { OtorisasiComponent } from './otorisasi/otorisasi.component';
import { KegiatanComponent } from './kegiatan/kegiatan.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'transaksi', component: TransaksiComponent},
            { path: 'laporan', component: LaporanComponent },
            { path: 'users', component: RegistrasiComponent },
            { path: 'otorisasi', component: OtorisasiComponent },
            { path: 'kategori', component: KategoriComponent },
            { path: 'kegiatan', component: KegiatanComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]