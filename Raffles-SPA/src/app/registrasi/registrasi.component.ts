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
model: any = {};
registerForm: FormGroup;
listUser: User[];
inputMode: false;

  constructor(private authService: AuthService, private alertify: AlertifyService
    , private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      houseNo: ['', Validators.required],
      block: ['', Validators.required]
    }, {Validator: this.passwordMatchValidator});
  }

  inputToggle(load: boolean) {
    this.inputMode = !this.inputMode;
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

  }

  selectUser(data: User) {

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    console.log('');
  }
}