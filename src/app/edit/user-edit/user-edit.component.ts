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
  idUser: number;
  confirmarSenha: string;
  tipoUsuario: string;

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

    this.idUser = this.route.snapshot.params['id'];
    this.findByIdUser(this.idUser);
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value;
  }

  atualizar(){
    this.user.tipo = this.tipoUsuario;

    if(this.user.senha != this.confirmarSenha){
      alert('As senhas estão incorretas.')
    }else{
      console.log(this.user)
      this.authService.atualizar(this.user).subscribe((resp: User) => {
        this.user = resp
        alert('Usuário atualizado com sucesso, faça o login novamente.')

        environment.token = '';
        environment.nome = '';
        environment.id = 0;
        environment.foto = '';

        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp;
    })
  }

}
