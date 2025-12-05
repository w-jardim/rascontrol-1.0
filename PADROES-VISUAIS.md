# Padrões Visuais - Sistema RAS Control

## 🎨 Sistema de Design Profissional

Este documento define os padrões visuais e de desenvolvimento para o Sistema RAS Control, garantindo consistência e profissionalismo em todas as interfaces.

## 📋 Índice
1. [Paleta de Cores](#paleta-de-cores)
2. [Tipografia](#tipografia)
3. [Espaçamentos](#espaçamentos)
4. [Componentes Base](#componentes-base)
5. [Padrões de Layout](#padrões-de-layout)
6. [Responsividade](#responsividade)
7. [Convenções de Desenvolvimento](#convenções-de-desenvolvimento)

## 🎨 Paleta de Cores

### Cores Primárias
```css
--primary-50: #eff6ff;   /* Azul muito claro */
--primary-500: #3b82f6;  /* Azul principal */
--primary-600: #2563eb;  /* Azul hover */
--primary-700: #1d4ed8;  /* Azul ativo */
```

### Cores de Estado
```css
--success-500: #22c55e;  /* Verde sucesso */
--error-500: #ef4444;    /* Vermelho erro */
--warning-500: #f59e0b;  /* Amarelo aviso */
```

### Cores Neutras
```css
--gray-50: #f9fafb;      /* Fundo muito claro */
--gray-100: #f3f4f6;     /* Fundo claro */
--gray-700: #374151;     /* Texto principal */
--gray-900: #111827;     /* Texto títulos */
```

## 📝 Tipografia

### Família de Fonte
- **Principal**: Inter (fallback: system fonts)
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Tamanhos de Fonte
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

### Line Heights
```css
--line-height-tight: 1.25;    /* Títulos */
--line-height-normal: 1.5;    /* Texto normal */
--line-height-relaxed: 1.625; /* Parágrafos longos */
```

## 📏 Espaçamentos

### Sistema de Spacing
```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
```

### Bordas e Sombras
```css
--border-radius: 0.375rem;     /* 6px - inputs */
--border-radius-md: 0.5rem;    /* 8px - cards */
--border-radius-lg: 0.75rem;   /* 12px - modais */
--border-radius-xl: 1rem;      /* 16px - containers */

--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

## 🧩 Componentes Base

### Cards
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Título do Card</h3>
  </div>
  <div class="card-content">
    Conteúdo do card
  </div>
</div>
```

### Botões
```html
<!-- Botão Primário -->
<button class="btn btn-primary">Ação Principal</button>

<!-- Botão de Sucesso -->
<button class="btn btn-success">Salvar</button>

<!-- Botão Secundário -->
<button class="btn btn-secondary">Cancelar</button>

<!-- Botão Outline -->
<button class="btn btn-outline">Editar</button>
```

### Formulários
```html
<div class="form-group">
  <label class="form-label">Campo de Texto</label>
  <input type="text" class="form-control" placeholder="Digite aqui...">
  <div class="error-message">Mensagem de erro</div>
</div>
```

### Mensagens
```html
<div class="message message-success">Operação realizada com sucesso!</div>
<div class="message message-error">Erro ao processar dados.</div>
<div class="message message-warning">Atenção: dados incompletos.</div>
```

## 📐 Padrões de Layout

### Estrutura de Página
```html
<div class="page-container">
  <header class="page-header">
    <h1>Título da Página</h1>
    <p>Descrição da página</p>
  </header>

  <main class="page-content">
    <!-- Conteúdo principal -->
  </main>
</div>
```

### Grid Responsivo
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

### Layout com Sidebar
```html
<div class="dashboard-container">
  <app-sidebar></app-sidebar>
  <main class="main-content">
    <!-- Conteúdo principal -->
  </main>
</div>
```

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Utilitários Responsivos
```css
/* Mobile First */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .md:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

## 💻 Convenções de Desenvolvimento

### Estrutura de Arquivos
```
src/app/
├── component-name/
│   ├── component-name.ts       # Lógica do componente
│   ├── component-name.html     # Template
│   ├── component-name.css      # Estilos específicos
│   └── component-name.spec.ts  # Testes
```

### Nomenclatura CSS
- **BEM**: Block__Element--Modifier
- **Utilitários**: Classes funcionais (`.text-center`, `.mb-4`)
- **Componentes**: Prefixo do componente (`.btn-`, `.form-`)

### Variáveis CSS
- Sempre usar variáveis CSS para cores, espaçamentos, etc.
- Nunca usar valores hardcoded
- Seguir convenção: `--categoria-propriedade`

### Acessibilidade
- Contraste mínimo de 4.5:1 para texto normal
- Foco visível em todos os elementos interativos
- Labels apropriadas em formulários
- Semântica HTML correta

## 🚀 Implementação

### Como Usar os Padrões

1. **Importe o sistema global** (já incluído em `styles.css`)
2. **Use classes utilitárias** para layouts rápidos
3. **Crie componentes específicos** apenas quando necessário
4. **Siga a paleta de cores** definida
5. **Mantenha consistência** em espaçamentos e tipografia

### Exemplo Completo
```html
<div class="page-container">
  <div class="page-header">
    <h1 class="text-3xl font-bold text-gray-900">Cadastro de Agente</h1>
    <p class="text-lg text-gray-600">Preencha os dados pessoais</p>
  </div>

  <div class="card max-w-2xl mx-auto">
    <form class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label">Nome Completo</label>
          <input type="text" class="form-control" placeholder="Digite o nome completo">
        </div>
        <div class="form-group">
          <label class="form-label">RG</label>
          <input type="text" class="form-control" placeholder="00000-0">
        </div>
      </div>

      <div class="flex gap-4 justify-center">
        <button type="submit" class="btn btn-primary">Salvar Dados</button>
        <button type="button" class="btn btn-secondary">Cancelar</button>
      </div>
    </form>
  </div>
</div>
```

---

**Última atualização**: Dezembro 2025
**Versão**: 1.0
**Mantenedor**: Equipe de Desenvolvimento RAS Control</content>
<parameter name="filePath">PADROES-VISUAIS.md