# Projeto - Sincronização de Dados: Usuário com o RH
Consumir uma API que fornece dados de usuários, selecionar apenas usuário com mais de 18 anos, persistir esses dados salvando no banco de dados.
Caso o usuário já exista na base, então atualizar os dados dele com os novos dados.
Criar um relatório detalhado sobre a execução da sincronização.

## 1 - Configurar o Projeto

### 1. Requisitos
- Node.js (v18 ou superior).
- NPM instalado.

### 2. Instalação e Setup
```bash
# Clone o repositório do projeto
git clone https://github.com/leticiawoelfer/integracao-rh-nodejs.git

# Entre na pasta do projeto
cd <pasta>

# Instale as dependências necessárias
npm i
```
### 3. Bibliotecas e Tecnologias
- **[SQLite3](https://nodejs.org/api/sqlite.html):** Engine de banco de dados leve para persistência local.
- **[dotenv](https://www.npmjs.com/package/dotenv):** Carrega variáveis de ambiente a partir do arquivo `.env`.
- **Fetch API:** Utilizada de forma nativa (Node 18+) para consumo da API de RH.
- **FS & Path:** Módulos nativos para manipulação de arquivos e caminhos do sistema.

### 4. Variáveis de Ambiente (.env)
É necessário uma chave para utilizar a API. Siga os passos:

- Renomeie o arquivo `.env.example` para `.env`.
- insira a chave da API no campo `API_KEY`.

## 2 - Estrutura do Projeto
O projeto foi estruturado utilizando o seguinte padrão de camadas:

- `src/config/`: configurações de conexão com o banco de dados.
- `src/repositories/`: camada de persistência com lógica de transações.
- `src/services/`: comunicação com serviços externos (API).
- `src/utils/`: utilitários para geração do relatório.
- `src/app.js`: app principal para rodar o projeto.

## 3 - Rodar o Projeto
Abra o terminal na raiz do projeto e execute o comando abaixo:

```bash
npm start
```
**O que acontece ao rodar:**
- O sistema se conecta à API e busca os registros.
- É feito o processamento dos dados.
- Os dados são salvos/atualizados no bando de dados, é criado o arquivo database.sqlite na pasta raiz.
- Um arquivo chamado relatorio_processamento_DATA.txt é gerado na raiz com as estatísticas finais.

#### **Desenvolvido por:** [Leticia Woelfer de Oliveira](https://www.linkedin.com/in/leticiawoelfer/)