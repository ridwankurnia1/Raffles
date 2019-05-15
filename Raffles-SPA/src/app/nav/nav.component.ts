import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Menus } from '../_model/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BuiltinType } from '@angular/compiler';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  isCollapsed = false;
  allMenus: Menus[];
  menus: Menus[] = [];
//  menu2: Menus[];
  nMenu: Menus[];
  dMenu: Menus[];
  LoginText: string;
  process: boolean;

  constructor(public authService: AuthService, private alertiy: AlertifyService
    , private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadMenus();

    this.nMenu = this.menus.filter((item) => item.MenuType === 'N');
    this.dMenu = this.menus.filter((item) => item.MenuType === 'H');
    this.authService.navMenu = this.allMenus;
  }

  loadMenus() {
    this.allMenus = [
      {
        UserId: 0,
        Program: 'transaksi',
        MenuGroup: '',
        MenuName: 'Transaksi',
        MenuType: 'N',
      },
      {
        UserId: 0,
        Program: 'laporan',
        MenuGroup: '',
        MenuName: 'Laporan',
        MenuType: 'N',
      },
      {
        UserId: 0,
        Program: '',
        MenuGroup: '',
        MenuName: 'Setting',
        MenuType: 'H',
      },
      {
        UserId: 0,
        Program: 'users',
        MenuGroup: 'Setting',
        MenuName: 'User',
        MenuType: 'D',
      },
      {
        UserId: 0,
        Program: 'otorisasi',
        MenuGroup: 'Setting',
        MenuName: 'Otorisasi',
        MenuType: 'D',
      },
      {
        UserId: 0,
        Program: 'kategori',
        MenuGroup: 'Setting',
        MenuName: 'Kategori',
        MenuType: 'D',
      },
      {
        UserId: 0,
        Program: 'kegiatan',
        MenuGroup: 'Setting',
        MenuName: 'Kegiatan',
        MenuType: 'D',
      }
    ];

    for (const i of this.allMenus) {
      if (i.MenuGroup === '') {
        this.menus.push(i);
      } else {
        const foundIndex = this.menus.findIndex(item => item.MenuName === i.MenuGroup);
        if (foundIndex > 0) {
          if (!this.menus[foundIndex].MenuChild) {
            this.menus[foundIndex].MenuChild = [];
          }
          this.menus[foundIndex].MenuChild.push(i);
        }
      }
    }
  }

  login() {
    this.LoginText = '';
    this.process = true;
    this.authService.login(this.model).subscribe(next => {
      this.alertiy.success('Login berhasil');
      if (!this.modalRef) {
        return;
      }
      this.modalRef.hide();
    }, error => {
      this.alertiy.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertiy.message('logged out');
  }

  openModal(template: TemplateRef<any>) {
    this.LoginText = 'Login';
    this.process = false;
    this.modalRef = this.modalService.show(template);
  }
}
