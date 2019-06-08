import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Menus } from '../_model/menu';

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
  nMenu: Menus[];
  dMenu: Menus[];
  LoginText: string;
  process: boolean;

  constructor(
    public authService: AuthService,
    private alertiy: AlertifyService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    if (this.authService.navMenu) {
      this.loadMenus(this.authService.navMenu);
    } else {
      if (this.authService.decodedToken) {
        this.authService.getUserMenu().subscribe((authMenu: Menus[]) => {
          this.allMenus = authMenu;
        }, error => { }, () => {
          this.loadMenus(this.allMenus);
        });
      }
    }
  }

  loadMenus(listMenu: Menus[]) {
    // this.allMenus = [
    //   {
    //     UserId: 0,
    //     ProgramId: 1,
    //     Program: 'transaksi',
    //     MenuGroup: '',
    //     MenuName: 'Transaksi',
    //     MenuType: 'N',
    //   },
    //   {
    //     UserId: 0,
    //     ProgramId: 2,
    //     Program: 'laporan',
    //     MenuGroup: '',
    //     MenuName: 'Laporan',
    //     MenuType: 'N',
    //   },
    //   {
    //     UserId: 0,
    //     ProgramId: 3,
    //     Program: '',
    //     MenuGroup: '',
    //     MenuName: 'Setting',
    //     MenuType: 'H',
    //   },
    //   {
    //     UserId: 0,
    //     ProgramId: 4,
    //     Program: 'users',
    //     MenuGroup: 'Setting',
    //     MenuName: 'User',
    //     MenuType: 'D',
    //   },
    //   {
    //     UserId: 0,
    //     ProgramId: 5,
    //     Program: 'otorisasi',
    //     MenuGroup: 'Setting',
    //     MenuName: 'Otorisasi',
    //     MenuType: 'D',
    //   },
    //   {
    //     UserId: 0,
    //     ProgramId: 6,
    //     Program: 'kategori',
    //     MenuGroup: 'Setting',
    //     MenuName: 'Kategori',
    //     MenuType: 'D',
    //   },
    //   {
    //     UserId: 0,
    //     ProgramId: 7,
    //     Program: 'kegiatan',
    //     MenuGroup: 'Setting',
    //     MenuName: 'Kegiatan',
    //     MenuType: 'D',
    //   }
    // ];

    if (listMenu) {
      this.menus = [];
      for (const i of listMenu) {
        if (i.MenuGroup === '') {
          this.menus.push(i);
        } else {
          const foundIndex = this.menus.findIndex(
            item => item.MenuName === i.MenuGroup
          );
          if (foundIndex > 0) {
            if (!this.menus[foundIndex].MenuChild) {
              this.menus[foundIndex].MenuChild = [];
            }
            this.menus[foundIndex].MenuChild.push(i);
          }
        }
      }

      this.nMenu = this.menus.filter(item => item.MenuType === 'N');
      this.dMenu = this.menus.filter(item => item.MenuType === 'H');
    }
  }

  login() {
    this.LoginText = '';
    this.process = true;
    this.authService.login(this.model).subscribe(
      next => {
        this.alertiy.success('Login berhasil');
        if (!this.modalRef) {
          return;
        }
        this.modalRef.hide();
      },
      error => {
        this.alertiy.error(error);
      },
      () => {
        this.loadMenus(this.authService.navMenu);
      }
    );
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
    this.model.username = '';
    this.model.password = '';
    this.modalRef = this.modalService.show(template);
  }
}
