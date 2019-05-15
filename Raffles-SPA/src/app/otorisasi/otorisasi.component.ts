import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Menus } from '../_model/menu';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_model/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-otorisasi',
  templateUrl: './otorisasi.component.html',
  styleUrls: ['./otorisasi.component.css']
})
export class OtorisasiComponent implements OnInit {
  authProgramForm: FormGroup;
  authUserForm: FormGroup;
  listAuth: Menus[];
  sysMenu: Menus[];
  selMenu: Menus[];
  inputMode = false;
  editMode = false;
  isSubmit = 0;
  users: User[];

  constructor(
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService) {}

  ngOnInit() {
    this.createAuthProgramForm();
    this.createAuthUserForm();
    this.loadMenus();
    this.loadUsers();
  }

  createAuthProgramForm() {
    this.authProgramForm = this.fb.group({
      Program: ['', Validators.required]
    });
  }

  createAuthUserForm() {
    this.authUserForm = this.fb.group({
      UserId: ['', Validators.required]
    });
  }

  loadMenus() {
    this.authService.getAuth().subscribe((menus: Menus[]) => {
      this.listAuth = menus;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((user: User[]) => {
      this.users = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  inputToggle(load: boolean) {
    this.inputMode = !this.inputMode;
    this.editMode = false;
    this.isSubmit = 0;
    // this.authProgramForm.reset();
    // this.authUserForm.reset();

    if (load) {
      this.loadAuth();
    }
  }

  onUserSelect(userId) {
    this.sysMenu = this.authService.navMenu;
  }

  loadAuth() {}

  deleteAuth(data: Menus) {
    this.alertify.confirm(
      'Konfirmasi',
      'Delete otorisasi ' + data.MenuName + '?',
      () => {
        this.authService.delAuth(data).subscribe(
          () => {
            this.alertify.success('Delete otorisasi berhasil');
          },
          error => {
            this.alertify.error(error);
          },
          () => {
            this.loadAuth();
          }
        );
      },
      () => {}
    );
  }

  submitAuth() {

  }

  AuthByUser() {
    console.log(this.selMenu);
  }

  AuthByProgram() {

  }
}
