# Guía de SASS - More than brows

Este documento explica la arquitectura SASS del proyecto, cómo instalar las dependencias, compilar el código y la estructura de archivos.

## 1. Instalación

El proyecto utiliza `npm` para gestionar las dependencias y `sass` para la compilación.

Para instalar las dependencias necesarias, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```

Esto instalará `sass` como una dependencia de desarrollo.

## 2. Compilación

Existen dos comandos principales para trabajar con los estilos:

### Compilación única
Para compilar los archivos SASS a CSS una sola vez (ideal para despliegues o verificaciones):

```bash
npm run sass
```
Este comando toma `www/scss/styles.scss` y genera `www/css/styles.css`.

### Modo Observador (Watch)
Para trabajar en el desarrollo, puedes usar el modo observador, que recompilará automáticamente el CSS cada vez que guardes un cambio en los archivos SASS:

```bash
npm run sass:watch
```

## 3. Arquitectura de Archivos

El proyecto sigue una arquitectura modular basada en componentes y patrones BEM (Block Element Modifier).

### Archivo Principal
*   **`styles.scss`**: Es el punto de entrada. No contiene estilos directos, solo importa (usando `@use`) todos los demás parciales en el orden correcto.

### Configuración y Utilidades
*   **`_variables.scss`**: Define todas las variables globales del proyecto (colores, tipografía, espaciado, breakpoints, etc.). Es la "fuente de la verdad" para los valores de diseño.
*   **`_mixins.scss`**: Contiene funciones reutilizables (mixins) para tareas comunes como Media Queries (`respond-to`), centrado con Flexbox, etc.
*   **`_base.scss`**: Estilos base, reset de CSS y estilos globales para etiquetas HTML (`body`, `a`, `img`).

### Componentes
Cada componente de la interfaz tiene su propio archivo parcial. Esto facilita el mantenimiento y la localización de estilos.

*   **`_nav-bar.scss`**: Barra de navegación fija inferior (móvil) / superior (escritorio).
*   **`_buttons.scss`**: Estilos para botones primarios, secundarios y deshabilitados.
*   **`_forms.scss`**: Estilos generales para formularios, inputs y validaciones.
*   **`_form-field.scss`**: Componente específico para campos de formulario con etiquetas y estilos de foco.
*   **`_user-avatar.scss`**: Componente para mostrar la imagen de perfil del usuario en diferentes tamaños.
*   **`_avatar-action.scss`**: Botones de acción relacionados con el avatar (ej. editar foto).
*   **`_calendar.scss`**: Widget de calendario para selección de fechas.
*   **`_booking-slots.scss`**: Grid de horarios disponibles para citas.
*   **`_map.scss`**: Contenedor para el mapa de Google Maps.
*   **`_header.scss`**: Cabecera de la página (logo, títulos).
*   **`_user-list.scss`**: Lista de usuarios (para el gestor).
*   **`_appointment-empty.scss`**: Estado vacío o de confirmación de citas.
*   **`_accessibility.scss`**: Estilos específicos para accesibilidad (ej. `sr-only`, `skip-link`).

*(Hay otros archivos parciales para componentes específicos como `_hero.scss`, `_login.scss`, etc., siguiendo la misma lógica)*

## 4. Cómo trabajar con los archivos

1.  **Variables**: Siempre usa las variables definidas en `_variables.scss` en lugar de valores "hardcoded" (ej. usa `$rosa-principal` en lugar de `#FFB6C1`).
2.  **Mixins**: Para media queries, usa siempre el mixin `respond-to`. Ejemplo:
    ```scss
    @include respond-to(tablet) { ... }
    ```
3.  **Importaciones**: Cada archivo parcial debe importar las dependencias que necesita al principio usando `@use`.
    ```scss
    @use 'variables' as *;
    @use 'mixins' as *;
    ```
    Esto asegura que las variables y mixins estén disponibles en ese archivo.

## 5. Flujo de Trabajo Recomendado

1.  Ejecuta `npm run sass:watch` en una terminal.
2.  Edita los archivos `.scss` en `www/scss/`.
3.  Los cambios se reflejarán automáticamente en `www/css/styles.css`.
4.  Si creas un nuevo archivo parcial (ej. `_nuevo-componente.scss`), recuerda importarlo en `styles.scss`.
