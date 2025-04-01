import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  imports: [CommonModule],
  templateUrl: './job-app.component.html',
  styleUrls: ['./job-app.component.css']
})
export class JobApplicationComponent {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.array([this.createSkillField()]) // FormArray for skills
    });
  }

  get skills(): FormArray {
    return this.jobForm.get('skills') as FormArray;
  }

  createSkillField(): FormControl {
    return this.fb.control('', Validators.required);
  }

  addSkill(): void {
    this.skills.push(this.createSkillField());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  submitForm(): void {
    console.log(this.jobForm.value);
  }
}
