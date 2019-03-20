import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransaksiComponent } from './transaksi/transaksi.component';
import { LaporanComponent } from './laporan/laporan.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'transaksi', component: TransaksiComponent},
            { path: 'laporan', component: LaporanComponent },
            { path: 'registrasi', component: RegistrasiComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]