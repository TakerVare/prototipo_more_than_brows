# More than brows - Página de Inicio

Prototipo web para More than brows, especializado en diseño de cejas personalizado.

## Características implementadas

- **Etiquetas semánticas HTML5**: Uso de `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, etc.
- **Preprocesador SASS**: Arquitectura modular con variables, componentes y layout separados
- **Responsive con Mobile First**: Diseño optimizado primero para móviles, escalando a tablet y desktop
- **Nomenclatura BEM**: Convención de nombres Block Element Modifier en todos los componentes

## Estructura de archivos

```
www/
├── index.html          # Página principal
├── css/
│   ├── styles.css      # CSS compilado
│   └── styles.css.map  # Source map para debugging
├── scss/
│   ├── main.scss       # Archivo principal SASS
│   ├── _variables.scss # Variables de la guía de estilos
│   ├── _reset.scss     # Reset CSS
│   ├── _base.scss      # Estilos base
│   ├── _components.scss # Componentes reutilizables
│   ├── _layout.scss    # Layout Mobile First
│   └── _responsive.scss # Estilos responsive Desktop
└── resources/          # Recursos gráficos
    ├── Logo_Recto_More_Than_Brows_SIN_fondo.png
    └── Fondo_BackGround_pagina_inicial.png
```

## Guía de estilos aplicada

Se siguen las directrices de la guía oficial de More than brows:

### Colores
- Rosa Principal: `#FFB6C1`
- Rosa Secundario: `#FFE4E1`
- Rosa Acento: `#FFC0CB`
- Negro: `#1A1A1A`
- Blanco: `#FFFFFF`

### Tipografía
- Familia: Georgia (serif)
- Pesos: 300 (light), 400 (regular), 500 (medium), 600 (semibold)

### Espaciado
Sistema de espaciado consistente: XS (8px), SM (16px), MD (24px), LG (32px), XL (48px), XXL (64px)

## Compilar SASS

```bash
# Compilar una vez
npm run sass

# Modo watch (compilación automática)
npm run sass:watch
```

## Componentes BEM

### Ejemplo de nomenclatura:
```html
<!-- Bloque -->
<div class="service-card">
  <!-- Elemento -->
  <h3 class="service-card__title">Título</h3>
  <!-- Elemento -->
  <p class="service-card__description">Descripción</p>
</div>

<!-- Bloque con modificador -->
<button class="btn btn--primary">Botón</button>
```

## Responsive Breakpoints

- Mobile: < 768px (diseño base)
- Tablet: ≥ 768px
- Desktop: ≥ 1024px
- Desktop Large: ≥ 1200px

## Accesibilidad

- Contraste de colores según WCAG 2.1
- Labels en formularios
- Atributos ARIA donde corresponde
- Navegación por teclado
