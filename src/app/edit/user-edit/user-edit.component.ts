import { environment } from './../../../environments/environment.prod';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == ''){
      alert("Sua sessão expirou, faça o login novamente");
      this.router.navigate(['/entrar']);
    }
  }

}
