import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { Sidebar } from '../sidebar/sidebar';
import { Agentes } from '../agentes/agentes';
import { ServicosRas } from '../servicos-ras/servicos-ras';
import { AgenteDataService, AgenteData, ServicoRAS } from '../agente-data';
import { NgIcon } from '@ng-icons/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Sidebar, Agentes, ServicosRas, NgIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private agenteDataService = inject(AgenteDataService);

  // Estado da view atual
  currentView: 'dashboard' | 'agentes' | 'servicos-ras' = 'dashboard';

  // Dados reativos
  agenteData: AgenteData | null = null;
  servicos: ServicoRAS[] = [];
  valorTotal: number = 0;
  proximosServicos: ServicoRAS[] = [];
  servicosUrgentes: ServicoRAS[] = [];

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // Carregar dados iniciais
    this.loadDashboardData();

    // Inscrever-se nas mudanças dos dados
    this.subscriptions.push(
      this.agenteDataService.agenteData$.subscribe(data => {
        this.agenteData = data;
      }),
      this.agenteDataService.servicos$.subscribe(servicos => {
        this.servicos = servicos;
        this.calcularMetricas();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadDashboardData(): void {
    this.agenteData = this.agenteDataService.obterAgente();
    this.servicos = this.agenteDataService.obterServicos();
    this.calcularMetricas();
  }

  private calcularMetricas(): void {
    // Calcular valor total
    this.valorTotal = this.servicos.reduce((total, servico) => {
      return total + this.calcularValorServico(servico);
    }, 0);

    // Usar métodos centralizados do agenteDataService para alertas
    this.servicosUrgentes = this.agenteDataService.obterServicosUrgentes();
    this.proximosServicos = this.agenteDataService.obterProximosServicos();
  }

  calcularValorServico(servico: ServicoRAS): number {
    return this.agenteDataService.calcularValorTotal(
      servico.convenio,
      servico.tipoHora,
      servico.transporte,
      servico.alimentacao
    );
  }

  getServicosPorConvenio(convenio: 'ras' | 'proeis'): number {
    return this.servicos.filter(s => s.convenio === convenio).length;
  }

  getServicosPorEvento(evento: 'voluntario' | 'compulsorio'): number {
    return this.servicos.filter(s => s.evento === evento).length;
  }

  getDiaServico(data: string): string {
    return new Date(data).getDate().toString();
  }

  getMesServico(data: string): string {
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
                   'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    return meses[new Date(data).getMonth()];
  }

  logout() {
    this.authService.logout();
  }

  // Método para navegar entre views internas
  navigateTo(view: 'dashboard' | 'agentes' | 'servicos-ras') {
    this.currentView = view;
  }

  // Métodos para títulos dinâmicos do header
  getHeaderTitle(): string {
    switch (this.currentView) {
      case 'agentes':
        return 'Controle de Agentes';
      case 'servicos-ras':
        return 'Serviços RAS';
      default:
        return 'Sistema de Controle RAS';
    }
  }

  getHeaderSubtitle(): string {
    switch (this.currentView) {
      case 'agentes':
        return 'Gerenciamento de agentes de segurança pública';
      case 'servicos-ras':
        return 'Controle de regime adicional de serviço';
      default:
        return 'Regime Adicional de Serviço - Agentes de Segurança Pública RJ';
    }
  }
}
