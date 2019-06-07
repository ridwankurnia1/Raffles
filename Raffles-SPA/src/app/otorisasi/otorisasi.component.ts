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
  autMenu: Menus[];
  lstMenu: Menus[];
  sysMenu: Menus[];
  selMenu: Menus[];
  inputMode = false;
  editMode = false;
  isSubmit = 0;
  lstUsers: User[];
  grdUsers: User[];
  selUsers: User[];

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
    this.lstMenu = this.authService.navMenu;
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
      this.autMenu = menus;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((user: User[]) => {
      this.lstUsers = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  inputToggle(load: boolean) {
    this.inputMode = !this.inputMode;
    this.editMode = false;
    this.isSubmit = 0;

    this.authUserForm.reset();
    this.authUserForm.controls['UserId'].setValue('');
    this.sysMenu = null;

    this.authProgramForm.reset();
    this.authProgramForm.controls['Program'].setValue('');
    this.grdUsers = null;

    if (load) {
      this.loadMenus();
    }
  }

  onUserSelect(userId) {
    this.sysMenu = this.authService.navMenu;
  }

  onProgramSelect(programId) {
    this.grdUsers = this.lstUsers;
  }

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
            this.loadMenus();
          }
        );
      },
      () => {}
    );
  }

  AuthByUser() {
    if (this.selMenu) {
      const userId = this.authUserForm.controls['UserId'].value;
      this.authService.saveAuth(userId, this.selMenu).subscribe(
        () => {
          this.alertify.success('Otorisasi berhasil ditambahkan');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.inputToggle(true);
        }
      );
    } else {
      this.alertify.error('Harap pilih menu');
    }
  }

  AuthByProgram() {
    if (this.selUsers) {
      const programId = Number(this.authProgramForm.controls['Program'].value);
      let obj: Menus[];
      obj = this.lstMenu.filter(m => m.ProgramId === programId);

      this.selUsers.forEach(usr => {
        this.authService.saveAuth(usr.Id, obj).subscribe(
          () => {
            // this.alertify.success('Otorisasi berhasil ditambahkan');
          },
          error => {
            this.alertify.error(error);
            return;
          },
          () => { this.alertify.success('Ototrisasi berhasil ditambahkan'); }
        );
      });

      this.inputToggle(true);
    } else {
      this.alertify.error('Harap pilih users');
    }
  }
}
