import { Usuario } from './usuario';
import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //esse serviço é responsável por decodificar o token e passar a informação dele para os componentes.

  //BehaviorSubject: toda vez que algum componente/serviço faz algum subscribe nesse Observable, ele envia o último dado que estava presente. (ele guarda o estado)
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()){
      this.decodificaJWT();
    }
   }

  private decodificaJWT(){
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    //metodo next: todos que se inscreveram nesse serviço recebem usuário
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario(){
    //retornamos com o asObservable para que elementos de fora da nossa classe não manipulem o behaviorSubject.
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string){
    //chama o metodo e salva no localstorage
    this.tokenService.salvaToken(token);
    //chama o metodo para espalhar a informação entre os componentes
    this.decodificaJWT();
  }

  logout(){
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado(){
    return this.tokenService.possuiToken();
  }
}
