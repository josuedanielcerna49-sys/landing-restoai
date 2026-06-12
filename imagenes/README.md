# Landing RestoAI

Este proyecto consiste en el desarrollo de una landing page para **RestoAI**, creada con HTML, CSS y JavaScript. La página fue trabajada como parte de la práctica profesional, usando como referencia el estilo visual de Simplexity y adaptándola para presentar una solución de inteligencia artificial para restaurantes.

## Trabajo realizado en el código

El proyecto se construyó desde una estructura web básica y luego se fue mejorando por etapas. Se trabajaron principalmente los archivos:

* `index.html`
* `style.css`
* `indscript.js`
* `base-conocimiento-restoai.txt`
* `package.json`
* Carpeta `imagenes/`

## Estructura del proyecto

```text
landing-restoai/
├── index.html
├── style.css
├── indscript.js
├── base-conocimiento-restoai.txt
├── package.json
└── imagenes/
```

## Desarrollo del HTML

En el archivo `index.html` se creó la estructura principal de la landing. Se organizaron las secciones necesarias para presentar el producto de forma clara.

Se trabajaron las siguientes partes:

1. Header con logo y menú de navegación.
2. Hero principal con título, descripción y botones de acción.
3. Sección de problemas que resuelve RestoAI.
4. Sección de beneficios del producto.
5. Sección de cómo funciona.
6. Barra tipo ticker con problemas comunes de restaurantes.
7. Sección de contacto con datos institucionales.
8. Estructura del chatbot flotante.
9. Conexión con el archivo JavaScript `indscript.js`.
10. Conexión con el archivo CSS `style.css`.

También se agregaron recursos externos como Google Fonts y Font Awesome para mejorar las tipografías e íconos utilizados en la página.

## Desarrollo del CSS

En `style.css` se trabajó todo el diseño visual de la landing.

Se aplicaron estilos inspirados en Simplexity, usando colores como azul oscuro, cyan, verde lima y blanco. También se usaron tipografías como Fraunces, Montserrat y JetBrains Mono para darle una apariencia más profesional.

Entre los cambios realizados en CSS están:

1. Creación de variables de color para mantener una paleta consistente.
2. Diseño del header fijo y navegación.
3. Diseño del hero con imagen de fondo y overlay azul.
4. Ajustes del título principal y del texto `·AI`.
5. Estilos para botones principales y secundarios.
6. Diseño de cards para problemas y beneficios.
7. Agregado de íconos con efectos hover.
8. Creación de la barra animada tipo ticker.
9. Diseño de la sección de contacto.
10. Diseño completo del chatbot flotante.
11. Ajustes responsive para celular.
12. Corrección del tamaño del chat en móvil para que no tapara toda la pantalla.
13. Scroll interno dentro del chat.
14. Ajuste del menú en vista móvil.
15. Ocultamiento del botón flotante cuando la ventana del chat está abierta.

## Trabajo con imágenes

Se trabajó la imagen principal del hero para que la landing tuviera una presentación visual más atractiva.

Durante el proceso se revisó si convenía usar una imagen de La Cacerola o un fondo más general de restaurante. La idea fue que RestoAI se presentara como una solución para cualquier restaurante, no solamente para un negocio específico.

También se revisaron nombres y rutas de imágenes dentro de la carpeta `imagenes/`, asegurando que el CSS apuntara correctamente a la imagen usada en el hero.

Ejemplo de ruta usada en CSS:

```css
url("./imagenes/hero-restaurante.png")
```

## Desarrollo del chatbot Q&A

En `indscript.js` se trabajó la lógica del chatbot flotante integrado en la landing.

El chatbot permite que el usuario haga preguntas sobre RestoAI / La Cacerola y reciba respuestas basadas en una base de conocimiento.

Se implementaron funciones para:

1. Abrir y cerrar la ventana del chat.
2. Mostrar mensajes del usuario.
3. Mostrar respuestas del bot.
4. Procesar preguntas escritas en el input.
5. Detectar palabras clave relacionadas con RestoAI.
6. Responder sobre pedidos, reservas, menú, sucursales, reclamos, clientes, analíticas y Lili.
7. Mantener el input y botón de enviar funcionando después de varias preguntas.
8. Hacer scroll automático dentro del área de mensajes.
9. Evitar que el chatbot responda temas fuera de RestoAI.
10. Evitar mostrar credenciales o información sensible.

## Base de conocimiento

Se creó el archivo `base-conocimiento-restoai.txt` para separar la información funcional del producto.

Antes de usar esa base, se eliminó cualquier dato sensible como:

* Credenciales.
* Contraseñas.
* Accesos internos.
* URLs privadas.
* Información no apta para una landing pública.

La base quedó enfocada en explicar:

1. Qué es RestoAI.
2. Qué hace Lili.
3. Cómo funciona el panel.
4. Cómo se gestionan pedidos.
5. Cómo funcionan reservas.
6. Qué módulos tiene el sistema.
7. Qué beneficios ofrece a restaurantes.
8. Cómo se manejan reclamos.
9. Qué hace el monitor de chat.
10. Qué información no debe revelar el chatbot.

## Responsive y pruebas en celular

Una parte importante del trabajo fue ajustar la landing para que funcionara bien en celular.

Se usó DevTools del navegador para probar anchos como:

* 400px
* 390px

Durante esas pruebas se corrigió:

1. Que el chat no se saliera de la pantalla.
2. Que el chat no tapara todo el hero.
3. Que la landing siguiera visible detrás del chat.
4. Que el input quedara accesible.
5. Que el botón de enviar siguiera visible.
6. Que los mensajes hicieran scroll interno.
7. Que el botón flotante no quedara duplicado detrás del chat.
8. Que el menú móvil se viera más limpio.

## Deployment en Railway

Para publicar la landing se agregó configuración para Railway usando `package.json`.

El proyecto fue desplegado en Railway para obtener una URL pública y probar la página fuera del entorno local.

URL pública del proyecto:

```text
https://simplexityrestoai-production.up.railway.app
```

## Repositorio de GitHub

El proyecto también fue subido a GitHub para mantener el control de versiones y evidenciar el avance del desarrollo.

Repositorio:

```text
https://github.com/josuedanielcerna49-sys/landing-restoai
```

## Commits realizados

Durante el proceso se hicieron commits para guardar avances importantes como:

1. Creación inicial de la estructura de la landing.
2. Mejoras visuales del hero y secciones.
3. Agregado del agente Q&A.
4. Ajustes responsive del chatbot.
5. Preparación para deployment.
6. Publicación en Railway.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Git
* GitHub
* Railway
* Google Fonts
* Font Awesome
* Codex como apoyo para edición y revisión de código

## Estado final

El proyecto quedó con:

* Landing page funcional.
* Diseño responsive.
* Hero, secciones, cards y contacto.
* Chatbot Q&A integrado.
* Base de conocimiento limpia y segura.
* Reglas para no revelar información sensible.
* Deployment público en Railway.
* Repositorio actualizado en GitHub.

El resultado final es una landing funcional para presentar RestoAI, explicar sus beneficios y permitir que un visitante interactúe con un chatbot informativo sobre el producto.
