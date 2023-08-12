import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent {
  userForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      email: [this.data.email, Validators.required],
      contactNumber: [this.data.contactNumber, Validators.required],
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
