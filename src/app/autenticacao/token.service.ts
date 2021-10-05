import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  //serviço responsável pela manipulação do token: retornar valor, salvar/excluir valor no localstorage e verificar se existe.

  retornaToken(){
    //tenta retornar o item KEY, caso não encontre valor retornará em branco
    return localStorage.getItem(KEY) ?? '';
  }

  salvaToken(token: string){
    //é setado o valor de KEY, recebendo o valor que entra no param. token
    localStorage.setItem(KEY, token)
  }

  excluiToken(){
    //limpamos o item KEY, para casos de loadout, etc.
    localStorage.removeItem(KEY)
  }

  possuiToken(){
    //retornamos um valor booleano que verifica se temos ou não um token. (por isso o uso das exclamações duplas)
    return !!this.retornaToken();
  }
}
