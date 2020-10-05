import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs/operators';
import { FormService } from '../form/form.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formTask: FormGroup;
  user$: Observable<any>;
  hasContent =  false;
  avatar: string;
  name: string;
  followers: string;
  following: string;
  url: string;
  messageError: string;
  error = false;

  constructor(private fb: FormBuilder, private http: FormService) { }

  ngOnInit(): void {

    this.formTask = this.fb.group({
      name_user: ['', [Validators.minLength(3)]],

    });
    this.user$ = this.formTask.get('name_user').valueChanges
    .pipe(
      debounceTime(500),
      filter(value => value.length > 2),

      map(value => {
        this.http.getUser(value).subscribe(result => {
          this.hasContent = true;
          this.error = false;
          this.avatar =  result.avatar_url;
          this.name = result.name;
          this.followers =  result.followers;
          this.following =  result.following;
          this.url = result.html_url;
        },
        error => {
          this.hasContent = false;
          this.error = true;
          this.messageError = 'Usuário não encontrado!';
        });
      }),
    );
  }
}
