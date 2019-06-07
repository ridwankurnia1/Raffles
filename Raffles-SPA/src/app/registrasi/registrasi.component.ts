import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_model/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrls: ['./registrasi.component.css']
})
export class RegistrasiComponent implements OnInit {
user: User;
registerForm: FormGroup;
listUser: User[];
inputMode = false;
editMode = false;
isReset = true;
ActiveFlag = false;
isSubmit = 0;

  constructor(private authService: AuthService, private alertify: AlertifyService
    , private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      Id: [''],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      houseNo: ['', Validators.required],
      blockNo: ['', Validators.required],
      Active: ['']
    }, {Validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  inputToggle(load: boolean) {
    this.inputMode = !this.inputMode;
    this.isSubmit = 0;
    this.editMode = false;
    this.ResetCheck();
    this.registerForm.reset();
    if (load) {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.listUser = users;
    }, error => {
      this.alertify.error(error);
    });
  }

  editUser(data: User) {
    this.inputToggle(false);
    this.editMode = true;
    this.ActiveFlag = Boolean(data.Active);
    this.registerForm.setValue({
      Id: data.Id,
      username: data.Username,
      password: '',
      confirmPassword: '',
      email: data.Email,
      phone: data.Phone,
      houseNo: data.HouseNo,
      blockNo: data.BlockNo,
      Active: data.Active
    });
    this.ResetCheck();
  }

  ResetCheck() {
    if (this.editMode) {
      this.registerForm.controls['username'].disable();
      this.isReset = !this.isReset;
    } else {
      this.registerForm.controls['username'].enable();
      this.isReset = true;
    }

    if (this.isReset) {
      this.registerForm.controls['password'].enable();
      this.registerForm.controls['confirmPassword'].enable();
    } else {
      this.registerForm.controls['password'].disable();
      this.registerForm.controls['confirmPassword'].disable();
    }
  }

  deleteUser(data: User) {
    this.alertify.confirm('Konfirmasi', 'Delete user ' + data.Username + '?', () => {
      this.userService.delUser(data.Id).subscribe(() => {
        this.alertify.success('Delete user berhasil');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.loadUsers();
      });
    }, () => {

    });
  }

  Submit() {
    if (this.registerForm.valid) {
      this.isSubmit = 1;
      this.user = Object.assign({}, this.registerForm.getRawValue());
      this.user.Active = Number(this.user.Active);
      console.log(this.user);
      if (!this.editMode) {
        this.user.Id = 0;
        this.userService.regUser(this.user).subscribe(() => {
          this.alertify.success('Registrasi user berhasil');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.inputToggle(true);
        });
      } else {
        this.userService.edtUser(this.user.Id, this.user).subscribe(() => {
          this.alertify.success('Edit user berhasil');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.inputToggle(true);
        });
      }
    }
  }
}
