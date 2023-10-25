# FullTecnologia 1.0

**Versão 1.0**

## Sumário

- [Branchs](#branchs)
- [Comandos](#comandos)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Informações](#informações)

## Branchs:

- **Main:** A branch principal do projeto.

  Quando for realizar uma nova atividade, siga o seguinte procedimento:

  1. Crie uma nova branch a partir da branch de origem.
  2. Após concluir as atividades e testar, mescle a nova branch na Main.
  3. Exclua a branch de desenvolvimento quando não for mais necessária.

## Comandos

### Branchs:

Para acessar uma branch:

     git checkout main

Para criar uma branch:

    git checkout -b minha-branch

Para mesclar a branch:

    git merge minha-branch

Para excluir a branch:

    git branch -d minha-branch
    git push origin --delete minha-branch

### Backend:

Para executar o servidor back-end, siga os comandos a seguir:

1. Instale as dependências:

   npm install

2. Inicie o servidor usando Nodemon:

   nodemon index.js

### Frontend:

Para executar o servidor front-end, siga os comandos a seguir:

1. Instale as dependência:

   npm install

2. Inicie o servidor usando o Npm:

   npm start

## Informações

Para que o front-end se conecte ao back-end, é necessário que o servidor back-end esteja em execução na máquina local.
