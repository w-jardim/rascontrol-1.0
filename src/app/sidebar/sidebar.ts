import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() currentView: 'dashboard' | 'agentes' | 'servicos-ras' = 'dashboard';
  @Output() navigateTo = new EventEmitter<'dashboard' | 'agentes' | 'servicos-ras'>();

  menuItems = [
    {
      title: 'Dashboard',
      icon: 'lucideLayoutDashboard',
      route: '/dashboard',
      action: 'dashboard' as const,
      active: false
    },
    {
      title: 'Agentes',
      icon: 'lucideUsers',
      route: '/dashboard',
      action: 'agentes' as const,
      active: false
    },
    {
      title: 'Serviços RAS',
      icon: 'lucideFileText',
      route: '/dashboard',
      action: 'servicos-ras' as const,
      active: false
    },
    {
      title: 'Config. Valores',
      icon: 'lucideSettings',
      route: '/configuracao-valores',
      active: false
    },
    {
      title: 'Escalas',
      icon: 'lucideCalendar',
      route: '/escalas',
      active: false
    },
    {
      title: 'Relatórios',
      icon: 'lucideBarChart3',
      route: '/relatorios',
      active: false
    },
    {
      title: 'Configurações',
      icon: 'lucideSettings2',
      route: '/configuracoes',
      active: false
    }
  ];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  onMenuClick(action: 'dashboard' | 'agentes' | 'servicos-ras') {
    if (action) {
      this.navigateTo.emit(action);
    }
  }
}
