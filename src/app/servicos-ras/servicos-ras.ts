import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgenteDataService, ServicoRAS } from '../agente-data';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-servicos-ras',
  imports: [ReactiveFormsModule, CommonModule, NgIcon],
  templateUrl: './servicos-ras.html',
  styleUrl: './servicos-ras.css',
})
export class ServicosRas implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private agenteDataService = inject(AgenteDataService);

  servicoForm: FormGroup = this.fb.group({
    convenio: ['', [Validators.required]],
    evento: ['', [Validators.required]],
    data: ['', [Validators.required]],
    hora: ['', [Validators.required]],
    tipoVaga: ['', [Validators.required]],
    tipoHora: ['', [Validators.required]],
    valor: [0, [Validators.required, Validators.min(0)]],
    transporte: [false],
    alimentacao: [false]
  });

  // Getters para acessar os controles do formulário no template
  get convenio() { return this.servicoForm.get('convenio'); }
  get evento() { return this.servicoForm.get('evento'); }
  get data() { return this.servicoForm.get('data'); }
  get hora() { return this.servicoForm.get('hora'); }
  get tipoVaga() { return this.servicoForm.get('tipoVaga'); }
  get tipoHora() { return this.servicoForm.get('tipoHora'); }
  get valor() { return this.servicoForm.get('valor'); }
  get transporte() { return this.servicoForm.get('transporte'); }
  get alimentacao() { return this.servicoForm.get('alimentacao'); }

  successMessage = '';
  errorMessage = '';
  valorTotalCalculado = 0;

  ngOnInit(): void {
    // Verificar se existe um agente cadastrado
    const agente = this.agenteDataService.obterAgente();
    if (!agente) {
      this.errorMessage = 'É necessário cadastrar um agente antes de registrar serviços RAS.';
    }

    // Calcular valor automaticamente quando os campos mudarem
    this.servicoForm.valueChanges.subscribe(() => {
      this.calcularValorTotal();
    });
  }

  calcularValorTotal(): void {
    if (this.servicoForm.valid) {
      const formValue = this.servicoForm.value;
      this.valorTotalCalculado = this.agenteDataService.calcularValorTotal(
        formValue.convenio,
        formValue.tipoHora,
        formValue.transporte,
        formValue.alimentacao
      );
      // Atualizar o campo valor no formulário
      this.servicoForm.patchValue({ valor: this.valorTotalCalculado }, { emitEvent: false });
    }
  }

  onSubmit(): void {
    if (this.servicoForm.valid) {
      const servicoData: ServicoRAS = this.servicoForm.value;

      // Salvar o serviço
      this.agenteDataService.salvarServico(servicoData);

      this.successMessage = 'Serviço RAS registrado com sucesso!';
      this.errorMessage = '';

      // Limpar o formulário após sucesso
      setTimeout(() => {
        this.servicoForm.reset();
        this.successMessage = '';
      }, 3000);

    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.successMessage = '';
    }
  }

  voltarDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
