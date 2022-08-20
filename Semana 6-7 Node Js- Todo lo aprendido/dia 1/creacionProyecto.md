# Pasos para el inicio de un proyecto Node

- npm init -y

Esto crea un package.json en la raiz de la carpeta. Aqui es donde se van a instalar las dependencias del proyecto.

Existen 2 tipos de dependencias:
- Dependencias de desarrollo: son dependencias útiles solo para el desarrollo de la app.
- Dependencias normales: son las obligatorias para el funcionamiento de la aplicación.

Instalación de dependencias: -de desarrollo:

- nopm i prettier eslint -D

La instalación de dependencias por primera vez creará una carpeta llamada node_modules

La carpeta node_modules es muy pesada y no debemos subirla a github.

Para evitar esto creamos un archivo llamado .gitignore

- Creamos a mano en la raiz del protecto (en dia1) un nuevo archivo .pretiererc que tendrá la configuración
{
    "tabWidth": 4,
    "useTabs": false,
    "semi": true,
    "singleQuote": true
}

- Configurar eslint: npx init eslint

Instalamos la dependencia para crear y manejar un servidor que atienda peticiones http en node.

npm i expres

para desistalar la dependencia usamos:



- Cuando clonamos un proyecto de git lo primero sería ejecutar el comnato npm i para instalar todas las dependencias del proyecto,
npm i lee el archivo package.json e instala todas las dependencias junto a la carpeta node_modules


Configurar eslint: npx eslint --init

    Pasos instalacion eslint:

    -   y
    -   To check syntax, and find problems
    -   CommonJS
    -   None of these
    -   No
    -   Node
    -   JSON