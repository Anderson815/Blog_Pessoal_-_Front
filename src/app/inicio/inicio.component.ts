import { AuthService } from './../service/auth.service';
import { TemaService } from './../service/tema.service';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { Tema } from '../model/Tema';
import { User } from '../model/User';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[];

  tema: Tema = new Tema();
  listaTema: Tema[];
  idTema: number;

  user: User = new User();
  idUser: number = environment.id;

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert("Sua sessão expirou, faça o login novamente");
      this.router.navigate(['/entrar']);
    }

    this.getAllTemas();
    this.getAllPostagem();
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  getAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp;
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp;
      
    })
  }

  publicar(){

    this.user.id = this.idUser
    this.postagem.usuario = this.user;

    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    //console.log(this.postagem)

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert('Postagem realizada com sucesso!');
      this.postagem = new Postagem();
      this.getAllPostagem();
    }, erro => {
      console.log(this.postagem)
    })
  }

}
