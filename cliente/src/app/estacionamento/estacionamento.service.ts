import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estacionamento } from '../shared/models/estacionamento';

@Injectable({
  providedIn: 'root'
})
export class EstacionamentoService {
  baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  // Obter endereços de estacionamentos
  obterEnderecos() {
    return this.http.get<Estacionamento[]>(this.baseUrl + '/estacionamentos/');
  }

  // Cadastrar endereco de estacionamento
  cadastrarEnderecos(valores: any) {
    return this.http.post(this.baseUrl + '/estacionamentos/', valores);
  }

  // Deletar endereço de estacionamento do banco de dados
  deletarEndereco(id: string) {
    return this.http.delete(this.baseUrl + '/estacionamentos/' + id);
  }


  // Atualizar endereço de estacionamento
  atualizarEndereco(estacionamento: Estacionamento) {
    return this.http.put(this.baseUrl + '/estacionamentos/' + estacionamento._id, estacionamento);
  }

  obterEndereco(id: string) {
    return this.http.get<Estacionamento>(this.baseUrl + '/estacionamentos/' + id);
  }
}
