# Acesse

[Main](http://klutch-emprestimos.vercel.app/)
[Firebase](https://klutch-emprestimos-g9rocfj9z-joaoscoelho.vercel.app/)

# Como iniciar

1. Certifique-se de ter o **Node.JS** instalado em sua máquina.
2. Verifique também se o **npm** está instalado *(geralmente é instalado automaticamente ao instalar o Node.JS)*
3. Execute no diretório do projeto o comando `npm install` ou caso tenha **yarn** pode executar também `yarn install`, para instalar todas as dependências do projeto.
4. Após instaladas, execute o comando `yarn dev` para rodar diretamente uma versão de desenvolvimento do site ou para rodar uma versão final use: 
   1º: `yarn build` para criar o diretório .next com os arquivos compilados do projeto.
   2º: `yarn start` para rodar os arquivos criados pelo build

Pronto, o site estará funcionando em `http://localhost` na porta indicada pelo terminal.

# Versões

O projeto tem duas versões, uma delas se encontra na branch `main` e a outra na branch `implement-firebase-rtdb`.

[**Main**](https://github.com/JoaoSCoelho/klutch-emprestimos): Versão que ao realizar uma nova solicitação, altera o objeto `api.json` em memória, sendo assim, ao recarregar a página, o que estava em memória é limpo.

[**Firebase**](https://github.com/JoaoSCoelho/klutch-emprestimos/tree/implement-firebase-rtdb): Versão que integra o banco de dados Realtime Database do Firebase para salvar em nuvem os dados de novas solicitações.

# Dependência

O projeto conta com o auxílios das seguintes dependências:

* `Axios`
* `Firebase`
* `Next`
* `React`
* `React-dom`