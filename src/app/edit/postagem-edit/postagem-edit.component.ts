import { TemaService } from './../../service/tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/model/Postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem();

  tema: Tema = new Tema();
  listaTema: Tema[];
  idTema: number;

  constructor(
    private postagemService: PostagemService,
    private TemaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

    window.scroll(0, 0);

    if(environment.token == ""){
      this.alertas.showAlertDanger("Sua sessão expirou, faça o login novamente");
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id'];
    this.findByIdPostagem(id);

    this.findAllTema();
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.TemaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp;
    })
  }

  findAllTema(){
    this.TemaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    })
  }

  atualizar(){
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) =>{
      this.alertas.showAlertSuccess("Postagem atualizada com sucesso!");
      this.router.navigate(['/inicio']);
    })
  }

}
