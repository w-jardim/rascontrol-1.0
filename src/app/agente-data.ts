import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AgenteData {
  nomeCompleto: string;
  nomeEscala: string;
  postoGraduacao: string;
  unidadeLotacao: string;
  rg: string;
  idFuncional: string;
}

export interface ServicoRAS {
  convenio: 'ras' | 'proeis';
  evento: 'voluntario' | 'compulsorio';
  data: string;
  hora: string;
  tipoVaga: 'reserva' | 'titular';
  tipoHora: '6h' | '8h' | '12h' | '24h';
  valor: number;
  transporte: boolean;
  alimentacao: boolean;
}

export interface ConfiguracaoValoresRAS {
  // Valores base por convênio e tipo de hora
  valoresBase: {
    ras: {
      '6h': number;
      '8h': number;
      '12h': number;
      '24h': number;
    };
    proeis: {
      '6h': number;
      '8h': number;
      '12h': number;
      '24h': number;
    };
  };
  // Valores específicos para benefícios
  beneficios: {
    transporte: number;
    alimentacao: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AgenteDataService {

  private agenteDataSubject = new BehaviorSubject<AgenteData | null>(null);
  public agenteData$ = this.agenteDataSubject.asObservable();

  private servicosSubject = new BehaviorSubject<ServicoRAS[]>([]);
  public servicos$ = this.servicosSubject.asObservable();

  constructor() { }

  salvarAgente(data: AgenteData): void {
    this.agenteDataSubject.next(data);
    // Também salva no localStorage para persistência
    localStorage.setItem('agenteData', JSON.stringify(data));
  }

  obterAgente(): AgenteData | null {
    // Primeiro tenta obter do BehaviorSubject
    let data = this.agenteDataSubject.value;

    // Se não tiver, tenta do localStorage
    if (!data) {
      const stored = localStorage.getItem('agenteData');
      if (stored) {
        data = JSON.parse(stored);
        this.agenteDataSubject.next(data);
      }
    }

    return data;
  }

  limparDados(): void {
    this.agenteDataSubject.next(null);
    localStorage.removeItem('agenteData');
  }

  permitirEdicao(): void {
    localStorage.setItem('permitirEdicao', 'true');
  }

  edicaoPermitida(): boolean {
    return localStorage.getItem('permitirEdicao') === 'true';
  }

  finalizarEdicao(): void {
    localStorage.removeItem('permitirEdicao');
  }

  // Métodos para configurações de valores RAS
  salvarConfiguracaoValores(config: ConfiguracaoValoresRAS): void {
    localStorage.setItem('configuracaoValoresRAS', JSON.stringify(config));
  }

  obterConfiguracaoValores(): ConfiguracaoValoresRAS {
    const stored = localStorage.getItem('configuracaoValoresRAS');
    if (stored) {
      return JSON.parse(stored);
    }
    // Retorna configuração padrão se não existir
    return this.getConfiguracaoPadrao();
  }

  private getConfiguracaoPadrao(): ConfiguracaoValoresRAS {
    return {
      valoresBase: {
        ras: {
          '6h': 150.00,
          '8h': 200.00,
          '12h': 300.00,
          '24h': 600.00
        },
        proeis: {
          '6h': 180.00,
          '8h': 240.00,
          '12h': 360.00,
          '24h': 720.00
        }
      },
      beneficios: {
        transporte: 50.00,
        alimentacao: 30.00
      }
    };
  }

  salvarServico(servico: ServicoRAS): void {
    const servicos = this.obterServicos();
    servicos.push(servico);
    this.servicosSubject.next(servicos);
    localStorage.setItem('servicosRAS', JSON.stringify(servicos));
  }

  obterServicos(): ServicoRAS[] {
    let servicos = this.servicosSubject.value;

    if (servicos.length === 0) {
      const stored = localStorage.getItem('servicosRAS');
      if (stored) {
        servicos = JSON.parse(stored);
        this.servicosSubject.next(servicos);
      }
    }

    return servicos;
  }

  atualizarServico(index: number, servico: ServicoRAS): void {
    const servicos = this.obterServicos();
    servicos[index] = servico;
    this.servicosSubject.next(servicos);
    localStorage.setItem('servicosRAS', JSON.stringify(servicos));
  }

  removerServico(index: number): void {
    const servicos = this.obterServicos();
    servicos.splice(index, 1);
    this.servicosSubject.next(servicos);
    localStorage.setItem('servicosRAS', JSON.stringify(servicos));
  }

  calcularValorTotal(convenio: 'ras' | 'proeis', tipoHora: '6h' | '8h' | '12h' | '24h', transporte: boolean, alimentacao: boolean): number {
    const config = this.obterConfiguracaoValores();
    let total = config.valoresBase[convenio][tipoHora];

    if (transporte) {
      total += config.beneficios.transporte;
    }

    if (alimentacao) {
      total += config.beneficios.alimentacao;
    }

    return total;
  }

  // Método para obter serviços urgentes (próximos 2 dias) - usado pelo dashboard
  obterServicosUrgentes(): ServicoRAS[] {
    const servicos = this.obterServicos();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const doisDias = new Date(hoje);
    doisDias.setDate(hoje.getDate() + 2);
    doisDias.setHours(23, 59, 59, 999);

    return servicos
      .filter(servico => {
        const dataServico = new Date(servico.data);
        dataServico.setHours(0, 0, 0, 0);
        return dataServico >= hoje && dataServico <= doisDias;
      })
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }

  // Método para obter próximos serviços (próximos 7 dias) - usado pelo dashboard
  obterProximosServicos(): ServicoRAS[] {
    const servicos = this.obterServicos();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const semanaQueVem = new Date(hoje);
    semanaQueVem.setDate(hoje.getDate() + 7);
    semanaQueVem.setHours(23, 59, 59, 999);

    return servicos
      .filter(servico => {
        const dataServico = new Date(servico.data);
        dataServico.setHours(0, 0, 0, 0);
        return dataServico >= hoje && dataServico <= semanaQueVem;
      })
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
      .slice(0, 5); // Máximo 5 próximos serviços
  }
}
