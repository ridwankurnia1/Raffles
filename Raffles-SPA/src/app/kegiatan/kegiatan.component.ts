import { Component, OnInit } from '@angular/core';
import { Activities } from '../_model/activities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { ActivityService } from '../_services/activity.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-kegiatan',
  templateUrl: './kegiatan.component.html',
  styleUrls: ['./kegiatan.component.css']
})
export class KegiatanComponent implements OnInit {
  activity: Activities;
  activityForm: FormGroup;
  listActivity: Activities[];
  bsConfig: Partial<BsDatepickerConfig>;
  inputMode = false;
  editMode = false;
  ActiveFlag = false;
  isSubmit = 0;

  constructor(
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private activityService: ActivityService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadActivities();
    this.createActivityForm();
    this.bsConfig = {
      containerClass: 'theme-green',
      dateInputFormat: 'DD-MM-YYYY'
    };
  }

  inputToggle(load: boolean) {
    this.inputMode = !this.inputMode;
    this.editMode = false;
    this.isSubmit = 0;
    this.activityForm.reset();

    if (load) {
      this.loadActivities();
    }
  }

  createActivityForm() {
    this.activityForm = this.fb.group({
      ActivityId: [''],
      ActivityName: ['', Validators.required],
      ActivityStart: ['', Validators.required],
      ActivityEnd: ['', Validators.required],
      Active: ['']
    });
  }

  loadActivities() {
    this.activityService.getActivities().subscribe(
      (activities: Activities[]) => {
        this.listActivity = activities;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  editActivities(data: Activities) {
    this.inputToggle(false);
    this.ActiveFlag = Boolean(data.Active);
    if (this.ActiveFlag) {
      this.activityForm.controls['ActivityName'].enable();
      this.activityForm.controls['ActivityStart'].enable();
      this.activityForm.controls['ActivityEnd'].enable();
    } else {
      this.activityForm.controls['ActivityName'].disable();
      this.activityForm.controls['ActivityStart'].disable();
      this.activityForm.controls['ActivityEnd'].disable();
    }

    this.editMode = true;
    this.activityForm.setValue({
      ActivityId: data.ActivityId,
      ActivityName: data.ActivityName,
      ActivityStart: new Date(data.ActivityStart),
      ActivityEnd: new Date(data.ActivityEnd),
      Active: data.Active
    });
  }

  submitActivities() {
    if (this.activityForm.valid) {
      this.isSubmit = 1;
      this.activity = Object.assign({}, this.activityForm.getRawValue());
      this.activity.Active = Number(this.activity.Active);
      this.activity.CreatedId = this.authService.decodedToken.nameid;
      this.activity.UpdatedId = this.authService.decodedToken.nameid;

      if (!this.editMode) {
        this.activity.ActivityId = 0;
        this.activity.Active = 1;
        this.activityService.saveActivities(this.activity).subscribe(
          () => {
            this.alertify.success('Registrasi kegiatan berhasil');
          },
          error => {
            this.alertify.error(error);
          },
          () => {
            this.inputToggle(true);
          }
        );
      } else {
        this.activityService
          .edtActivities(this.activity.ActivityId, this.activity)
          .subscribe(
            () => {
              this.alertify.success('Edit kegiatan berhasil');
            },
            error => {
              this.alertify.error(error);
            },
            () => {
              this.inputToggle(true);
            }
          );
      }
    }
  }

  deleteActivity(data: Activities) {
    this.alertify.confirm(
      'Konfirmasi',
      'Delete kegiatan ' + data.ActivityName + '?',
      () => {
        data.UpdatedId = this.authService.decodedToken.nameid;
        this.activityService.delActivities(data).subscribe(
          () => {
            this.alertify.success('Delete kegiatan berhasil');
          },
          error => {
            this.alertify.error(error);
          },
          () => {
            this.loadActivities();
          }
        );
      },
      () => {}
    );
  }
}
