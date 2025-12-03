# Guía de Nomenclatura BEM - More than brows

Este proyecto utiliza la metodología **BEM** (Block, Element, Modifier) para nombrar las clases de CSS. Esto nos ayuda a crear componentes reutilizables, modulares y fáciles de mantener.

## ¿Qué es BEM?

BEM divide la interfaz en tres conceptos:

1.  **Bloque (Block)**: Un componente independiente y reutilizable.
2.  **Elemento (Element)**: Una parte de un bloque que no tiene sentido por sí sola.
3.  **Modificador (Modifier)**: Una variación en el estilo o comportamiento de un bloque o elemento.

### Sintaxis

```css
.bloque {}
.bloque__elemento {}
.bloque--modificador {}
```

*   `__` (doble guion bajo) separa el Bloque del Elemento.
*   `--` (doble guion medio) separa el Bloque o Elemento del Modificador.

## Ejemplos en el Proyecto

### 1. Barra de Navegación (`_nav-bar.scss`)

*   **Bloque**: `.nav-bar` (El contenedor principal)
*   **Elemento**: `.nav-bar__item` (Cada ítem de la lista)
*   **Elemento**: `.nav-bar__link` (El enlace dentro del ítem)
*   **Elemento**: `.nav-bar__icon` (El icono SVG)
*   **Modificador**: `.nav-bar__item--active` (Estado activo del ítem)

```html
<nav class="nav-bar">
    <ul class="nav-bar__list">
        <li class="nav-bar__item nav-bar__item--active">
            <a class="nav-bar__link">...</a>
        </li>
    </ul>
</nav>
```

### 2. Botones (`_buttons.scss`)

*   **Bloque**: `.button`
*   **Modificador**: `.button--primary` (Estilo principal rosa)
*   **Modificador**: `.button--secondary` (Estilo secundario bordeado)
*   **Modificador**: `.button--disabled` (Estado deshabilitado)

```html
<button class="button button--primary">Reservar</button>
<button class="button button--secondary">Cancelar</button>
```

### 3. Avatar de Usuario (`_user-avatar.scss`)

*   **Bloque**: `.user-avatar`
*   **Modificador**: `.user-avatar--large` (Variación de tamaño grande)

## Reglas de Oro

1.  **Solo clases**: No uses IDs para estilos (`#header`), solo clases.
2.  **Independencia**: Los bloques no deben depender de otros bloques en la medida de lo posible.
3.  **Estructura plana**: Evita anidar selectores excesivamente en SASS. BEM permite mantener una especificidad baja (0,0,1,0).

   **Mal:**
   ```scss
   .nav-bar {
       ul {
           li {
               a { color: red; }
           }
       }
   }
   ```

   **Bien (BEM):**
   ```scss
   .nav-bar {
       &__link { color: red; }
   }
   ```

## Beneficios

*   **Modularidad**: Puedes mover un bloque a otro lugar y seguirá funcionando.
*   **Legibilidad**: Al leer el HTML, sabes exactamente qué hace cada clase y cómo se relaciona con las demás.
*   **Mantenimiento**: Es fácil encontrar dónde están definidos los estilos de un elemento específico.
