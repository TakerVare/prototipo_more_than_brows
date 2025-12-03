# Guía de Accesibilidad - More than brows

Este proyecto ha sido desarrollado siguiendo las pautas de accesibilidad WCAG (Web Content Accessibility Guidelines) para asegurar que la web sea utilizable por el mayor número de personas posible, incluyendo aquellas con discapacidades.

## Medidas Implementadas

### 1. Navegación por Teclado

*   **Skip Link**: Se ha implementado un enlace "Saltar al contenido principal" (`.skip-link`) visible solo al recibir el foco. Esto permite a los usuarios de teclado saltar la navegación repetitiva y llegar directamente al contenido.
*   **Foco Visible**: Se ha mejorado el estilo de foco (`outline`) para todos los elementos interactivos usando `:focus-visible`. Esto asegura que los usuarios sepan dónde están navegando sin molestar a los usuarios de ratón.
    ```scss
    *:focus-visible {
        outline: 3px solid $rosa-principal;
        outline-offset: 2px;
    }
    ```

### 2. Lectores de Pantalla (Screen Readers)

*   **HTML Semántico**: Se utilizan etiquetas HTML5 adecuadas (`<nav>`, `<main>`, `<header>`, `<section>`, `<button>`) para dar estructura y significado al contenido.
*   **Etiquetas ARIA**:
    *   `aria-label`: Se usa en botones e iconos que no tienen texto visible (ej. iconos de redes sociales o botones de menú) para describir su función.
    *   `aria-current="page"`: Indica en la navegación cuál es la página actual.
*   **Clase `.sr-only`**: Utilidad para ocultar texto visualmente pero mantenerlo disponible para lectores de pantalla. Se usa, por ejemplo, para dar contexto extra en enlaces o encabezados.

### 3. Color y Contraste

*   **Variables de Color**: Se usan colores definidos en variables para asegurar consistencia.
*   **Modo Alto Contraste**: Se incluye una media query `@media (prefers-contrast: high)` que ajusta los colores (fondo blanco, texto negro, enlaces subrayados) si el usuario tiene activada esta preferencia en su sistema operativo.

### 4. Movimiento Reducido

*   **Respeto a la Preferencia del Usuario**: Se incluye `@media (prefers-reduced-motion: reduce)` para desactivar o acelerar las animaciones y transiciones si el usuario ha indicado que prefiere menos movimiento (para evitar mareos o distracciones).

### 5. Tipografía y Escalado

*   **Unidades Relativas**: Se utilizan unidades relativas y variables para los tamaños de fuente, permitiendo que el texto escale si el usuario cambia el tamaño de fuente predeterminado de su navegador.
*   **Fuentes Legibles**: Se ha priorizado la legibilidad en la elección de tipografías y espaciados.

## Archivos Relevantes

*   **`_accessibility.scss`**: Contiene todas las reglas CSS específicas para accesibilidad (skip links, utilidades sr-only, media queries de preferencias).
*   **`_base.scss`**: Define los estilos base semánticos.

## Cómo mantener la accesibilidad

1.  **Usa botones para acciones y enlaces para navegación**: No uses `<div>` con eventos `onclick`.
2.  **Texto alternativo**: Siempre añade `alt="..."` a las imágenes importantes. Si es decorativa, usa `alt=""`.
3.  **Formularios**: Asegúrate de que cada `input` tenga su `label` asociado (ya sea visualmente o mediante `aria-label`).
4.  **Verificación**: Navega por la web usando solo la tecla `Tab` para asegurar que el orden es lógico y el foco es visible.
