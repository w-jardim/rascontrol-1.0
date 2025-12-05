import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgenteDataService, ConfiguracaoValoresRAS } from '../agente-data';
import { Sidebar } from '../sidebar/sidebar';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-configuracao-valores',
  imports: [ReactiveFormsModule, CommonModule, Sidebar, NgIcon],
  templateUrl: './configuracao-valores.html',
  styleUrl: './configuracao-valores.css',
})
export class ConfiguracaoValores implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private agenteDataService = inject(AgenteDataService);

  configForm: FormGroup = this.fb.group({
    // Valores RAS
    ras_6h: [0, [Validators.required, Validators.min(0)]],
    ras_8h: [0, [Validators.required, Validators.min(0)]],
    ras_12h: [0, [Validators.required, Validators.min(0)]],
    ras_24h: [0, [Validators.required, Validators.min(0)]],
    // Valores PROEIS
    proeis_6h: [0, [Validators.required, Validators.min(0)]],
    proeis_8h: [0, [Validators.required, Validators.min(0)]],
    proeis_12h: [0, [Validators.required, Validators.min(0)]],
    proeis_24h: [0, [Validators.required, Validators.min(0)]],
    // Benefícios
    transporte: [0, [Validators.required, Validators.min(0)]],
    alimentacao: [0, [Validators.required, Validators.min(0)]]
  });

  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.carregarValoresAtuais();
  }

  carregarValoresAtuais(): void {
    const config = this.agenteDataService.obterConfiguracaoValores();

    this.configForm.patchValue({
      ras_6h: config.valoresBase.ras['6h'],
      ras_8h: config.valoresBase.ras['8h'],
      ras_12h: config.valoresBase.ras['12h'],
      ras_24h: config.valoresBase.ras['24h'],
      proeis_6h: config.valoresBase.proeis['6h'],
      proeis_8h: config.valoresBase.proeis['8h'],
      proeis_12h: config.valoresBase.proeis['12h'],
      proeis_24h: config.valoresBase.proeis['24h'],
      transporte: config.beneficios.transporte,
      alimentacao: config.beneficios.alimentacao
    });
  }

  onSubmit(): void {
    if (this.configForm.valid) {
      const formValue = this.configForm.value;

      const config: ConfiguracaoValoresRAS = {
        valoresBase: {
          ras: {
            '6h': formValue.ras_6h,
            '8h': formValue.ras_8h,
            '12h': formValue.ras_12h,
            '24h': formValue.ras_24h
          },
          proeis: {
            '6h': formValue.proeis_6h,
            '8h': formValue.proeis_8h,
            '12h': formValue.proeis_12h,
            '24h': formValue.proeis_24h
          }
        },
        beneficios: {
          transporte: formValue.transporte,
          alimentacao: formValue.alimentacao
        }
      };

      this.agenteDataService.salvarConfiguracaoValores(config);
      this.successMessage = 'Configurações salvas com sucesso!';
      this.errorMessage = '';

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);

    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios com valores válidos.';
      this.successMessage = '';
    }
  }

  restaurarPadroes(): void {
    const configPadrao = this.agenteDataService.obterConfiguracaoValores(); // Isso retorna o padrão se não existir
    this.agenteDataService.salvarConfiguracaoValores(configPadrao);
    this.carregarValoresAtuais();
    this.successMessage = 'Valores padrão restaurados!';
    this.errorMessage = '';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  voltarDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}