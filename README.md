# Projeto do desafio - Portal Usuário

Este repositório contém a solução completa para o projeto do Teste Prático — Desenvolvedor Fullstack UDS . A solução consiste em uma Aplicação Web desenvolvida em Angular 19.

## Pré-requisitos
Certifique-se de que você possui as seguintes ferramentas instaladas em seu ambiente:

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

## Instruções para a Aplicação Web

### Configuração do Ambiente

1. **Clone o Repositório**
    ```bash
    git clone https://github.com/DavidUdala/Portal.Usuario.Web
    cd seu-repositorio/Portal.Usuario.Web
    ```

2. **Executando com dockerfile**
    - Na pasta do projeto execute `docker build -t portal-usuario-web .`.
    - Após finalização execute `docker run -d -p 4000:4000 --name portal-usuario-web portal-usuario-web`.


### Execução da API Web
1. **Acessar a Aplicação**
    - Abra o navegador e acesse `http://localhost:4000`.

## Crie seu usuário
1. **Clique em "ainda não possui acesso? Crie sua conta agora"**
<img width="1264" height="1269" alt="image" src="https://github.com/user-attachments/assets/ec361b0d-476e-4edc-b5ea-2baeb7f7125f" />

2. **Preencha o formulário e em seguida clique em "Cadastra-se" **
<img width="1239" height="1129" alt="image" src="https://github.com/user-attachments/assets/0a328c37-0778-4cf2-a976-28a7acb85578" />

3. **Ao voltar para tela de login use o seu e-mail cadastrado e a senha**

4. **Em seguida você verá que está logado visualizando a lista de usuários cadastrados**
<img width="1257" height="916" alt="image" src="https://github.com/user-attachments/assets/e665557b-49b5-4af5-9eea-7632a9498e53" />
