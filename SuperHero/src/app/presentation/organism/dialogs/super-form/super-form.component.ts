import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-super-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './super-form.component.html',
  styleUrl: './super-form.component.scss',
})
export class SuperFormComponent {
  constructor(
    private dialogRef: MatDialogRef<SuperFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogData = data;
    dialogRef.disableClose = true;

    this.formSuper = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.max),
        Validators.minLength(this.min),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      nickName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.max),
        Validators.minLength(this.min),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      power: new FormControl(null, [
        Validators.maxLength(this.max),
        Validators.minLength(this.min),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
    });
  }
  max = 30;
  min = 3;
  formSuper!: FormGroup;
  dialogData!: any;

  ngOnInit() {
    if (this.dialogData.superHero.name !== '') {
      this.formSuper.controls['name'].setValue(this.dialogData.superHero.name);
      this.formSuper.controls['nickName'].setValue(
        this.dialogData.superHero.nickName
      );
      this.formSuper.controls['power'].setValue(
        this.dialogData.superHero.power
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogData.superHero.name = this.formSuper.controls['name'].value;
    this.dialogData.superHero.nickName =
      this.formSuper.controls['nickName'].value;
    this.dialogData.superHero.power = this.formSuper.controls['power'].value;
    this.dialogRef.close(this.dialogData);
  }
}
