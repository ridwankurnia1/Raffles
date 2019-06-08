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
        path: 'transaksi', component: TransaksiComponent, runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], data: { programId: 1 },
    },
    {
        path: 'laporan', component: LaporanComponent, runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], data: { programId: 2 },
    },
    {
        path: 'users', component: RegistrasiComponent, runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], data: { programId: 4 },
        // children: [
            // { path: 'transaksi', component: TransaksiComponent, data: { programId: 1 } },
            // { path: 'laporan', component: LaporanComponent, data: { programId: 2 } },
            // { path: 'users', component: RegistrasiComponent, data: { programId: 4 } },
            // { path: 'otorisasi', component: OtorisasiComponent, data: { programId: 5 } },
            // { path: 'kategori', component: KategoriComponent, data: { programId: 6 } },
            // { path: 'kegiatan', component: KegiatanComponent, data: { programId: 7 } },
        // ]
    },
    {
        path: 'otorisasi', component: OtorisasiComponent, runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], data: { programId: 5 },
    },
    {
        path: 'kategori', component: KategoriComponent, runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], data: { programId: 6 },
    },
    {
        path: 'kegiatan', component: KegiatanComponent, runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], data: { programId: 7 },
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
