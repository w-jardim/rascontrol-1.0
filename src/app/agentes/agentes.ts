import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgenteDataService, AgenteData } from '../agente-data';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-agentes',
  imports: [ReactiveFormsModule, CommonModule, NgIcon],
  templateUrl: './agentes.html',
  styleUrl: './agentes.css',
})
export class Agentes implements OnInit {
  @Output() voltarAoDashboard = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private agenteDataService = inject(AgenteDataService);

  agenteForm: FormGroup = this.fb.group({
    nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
    nomeEscala: ['', [Validators.required]],
    postoGraduacao: ['', [Validators.required]],
    unidadeLotacao: ['', [Validators.required]],
    rg: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
    idFuncional: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });

  // Getters para acessar os controles do formulário no template
  get nomeCompleto() { return this.agenteForm.get('nomeCompleto'); }
  get nomeEscala() { return this.agenteForm.get('nomeEscala'); }
  get postoGraduacao() { return this.agenteForm.get('postoGraduacao'); }
  get unidadeLotacao() { return this.agenteForm.get('unidadeLotacao'); }
  get rg() { return this.agenteForm.get('rg'); }
  get idFuncional() { return this.agenteForm.get('idFuncional'); }

  successMessage = '';
  errorMessage = '';
  modoEdicao = false;
  modoVisualizacao = false;

  // Método público para acessar o agente no template
  getAgente(): AgenteData | null {
    return this.agenteDataService.obterAgente();
  }

  ngOnInit(): void {
    // Verificar se já existe um agente cadastrado
    const agenteExistente = this.agenteDataService.obterAgente();

    if (agenteExistente && !this.agenteDataService.edicaoPermitida()) {
      // Se existe agente e não está em modo edição, mostrar visualização
      this.modoVisualizacao = true;
      this.modoEdicao = false;
    } else if (agenteExistente && this.agenteDataService.edicaoPermitida()) {
      // Se está em modo edição, carregar dados no formulário
      this.modoEdicao = true;
      this.modoVisualizacao = false;
      this.agenteForm.patchValue(agenteExistente);
    } else {
      // Primeiro acesso - modo formulário
      this.modoEdicao = false;
      this.modoVisualizacao = false;
    }
  }

  onSubmit() {
    if (this.agenteForm.valid) {
      const formData: AgenteData = this.agenteForm.value;

      // Salva os dados usando o serviço
      this.agenteDataService.salvarAgente(formData);

      // Finalizar modo edição se estava ativo
      this.agenteDataService.finalizarEdicao();

      // Alternar para modo visualização
      this.modoVisualizacao = true;
      this.modoEdicao = false;

      this.successMessage = 'Dados salvos com sucesso!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      this.successMessage = '';
    }
  }

  habilitarEdicao(): void {
    this.agenteDataService.permitirEdicao();
    this.modoEdicao = true;
    this.modoVisualizacao = false;
    const agenteExistente = this.agenteDataService.obterAgente();
    if (agenteExistente) {
      this.agenteForm.patchValue(agenteExistente);
    }
  }

  voltarDashboard(): void {
    this.voltarAoDashboard.emit();
  }
}
