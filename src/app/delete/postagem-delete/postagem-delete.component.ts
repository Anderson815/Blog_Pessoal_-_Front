import { environment } from './../../../environments/environment.prod';
import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/model/Postagem';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  idPostagem: number
  postagem: Postagem

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

    window.scroll(0, 0);

    if(environment.token == ""){
      this.alertas.showAlertDanger("Sua sessão expirou, faça o login novamente");
      this.router.navigate(['/entrar']);
    }

    this.idPostagem = this.route.snapshot.params['id'];
    this.findByIdPostagem(this.idPostagem)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      this.alertas.showAlertSuccess("Postagem apagada com sucesso!");
      this.router.navigate(['/inicio']);
    })
  }
}
