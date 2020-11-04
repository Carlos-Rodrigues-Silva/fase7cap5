import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { Estacionamento } from '../shared/models/estacionamento';
import { EstacionamentoService } from './estacionamento.service';

@Component({
  selector: 'app-estacionamento',
  templateUrl: './estacionamento.component.html',
  styleUrls: ['./estacionamento.component.css']
})
export class EstacionamentoComponent implements OnInit {

  estacionamentos: Estacionamento[];
  // estacionamentoSelecionado: Estacionamento;


  cadastrarEnderecoForm: FormGroup;
  atualizarEnderecoForm: FormGroup;

  constructor(private estacionamentoService: EstacionamentoService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEnderecos();
    this.criarCadastroForm();
    this.criarAtualizarForm();
  }

  // Obter lista de endereços cadastrados no banco de dados
  getEnderecos() {
    this.estacionamentoService.obterEnderecos().subscribe(response => {
      this.estacionamentos = response;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // Formulário de cadastro de endereço
  criarCadastroForm() {
    this.cadastrarEnderecoForm = new FormGroup({
      nomeLogradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    });
  }

  criarAtualizarForm() {
    this.atualizarEnderecoForm = new FormGroup({
      _id: new FormControl('', Validators.required),
      nomeLogradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    });
  }

  // Deletar endereço de estacionamento
  deletarEndereco(_id: string) {
    this.estacionamentoService.deletarEndereco(_id).subscribe(respose => {
      this.cadastrarEnderecoForm.reset();
      window.location.reload();
    });
  }


  // Enviar dados para cadastrar ou atualizar endereço de estacionamento
  onPostSubmit() {
    // verificar se o id já está cadastrado no banco de dados

    this.estacionamentoService.cadastrarEnderecos(this.cadastrarEnderecoForm.value).subscribe(res => {
      window.location.reload();
      // this.cadastrarEnderecoForm.reset();
      // console.log(this.cadastrarEnderecoForm.value);
    });
  }

    // Enviar dados para cadastrar ou atualizar endereço de estacionamento
    onPutSubmit() {
      // this.estacionamentoService.atualizarEndereco('5f937e1606480c422cf85c5a', this.atualizarEnderecoForm.value).subscribe(res => {
      this.estacionamentoService.atualizarEndereco(this.atualizarEnderecoForm.value).subscribe(res => {
        window.location.reload();
        // this.cadastrarEnderecoForm.reset();
        console.log(this.atualizarEnderecoForm.value);
      });
    }

  // obterEndereco para ser editado
  obterEnderecoParaEditar(id: string) {
    this.estacionamentoService.obterEndereco(id).subscribe(endereco => {
      if (endereco) {
         this.atualizarEnderecoForm.patchValue(endereco);
         console.log(endereco);
      }
    }, error => {
      console.log(error);
    });
  }
}
