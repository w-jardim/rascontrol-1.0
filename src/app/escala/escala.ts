import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgenteDataService, ServicoRAS } from '../agente-data';
import { NgIcon } from '@ng-icons/core';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-escala',
  imports: [CommonModule, ReactiveFormsModule, NgIcon, Sidebar],
  templateUrl: './escala.html',
  styleUrl: './escala.css',
})
export class Escala implements OnInit {
  private fb = inject(FormBuilder);
  private agenteDataService = inject(AgenteDataService);

  servicos: ServicoRAS[] = [];
  editingIndex: number | null = null;
  editForm: FormGroup = this.fb.group({
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

  ngOnInit(): void {
    this.loadServicos();
  }

  loadServicos(): void {
    // Usar o mesmo método que o dashboard para manter consistência
    this.servicos = this.agenteDataService.obterServicos();
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    const servico = this.servicos[index];
    this.editForm.patchValue(servico);
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingIndex !== null) {
      const updatedServico: ServicoRAS = this.editForm.value;
      this.agenteDataService.atualizarServico(this.editingIndex, updatedServico);
      this.loadServicos();
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editForm.reset();
  }

  deleteServico(index: number): void {
    if (confirm('Tem certeza que deseja remover este serviço?')) {
      this.agenteDataService.removerServico(index);
      this.loadServicos();
    }
  }
}
