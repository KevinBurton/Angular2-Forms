import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = [];
  model = new Employee('', '', false, '', 'default');
  hasPrimaryLanguageError = false;
  constructor(private formPoster: FormPoster) {
    this.formPoster.getLanguages()
                   .subscribe(
                     data => this.languages = data.languages,
                     err => console.log('error: ', err)
                   )
  }
  validatePrimaryLanguage(value) {
    if(value === 'default')
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }
  submitForm(form: NgForm) {
      // Validate form
      this.validatePrimaryLanguage(this.model.primaryLanguage);
      if(this.hasPrimaryLanguageError) {
        return;
      }
      this.formPoster.postEmployeeForm(this.model)
                     .subscribe(
                       data => console.log('success: ', data),
                       err => console.log('error: ', err)
                     )
  }
}
