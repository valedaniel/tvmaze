# TVMaze App

Este é um aplicativo de TV desenvolvido com React Native. Ele permite que os usuários visualizem informações sobre programas de TV, incluindo detalhes do elenco, episódios e temporadas.

## Índice

- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Aviso](#aviso)

## Instalação

Para começar, clone o repositório e instale as dependências:

```sh
git clone https://github.com/valedaniel/tvmaze.git
cd tvmaze
npm install
```

## Configuração do Ambiente

Certifique-se de que você tenha o ambiente configurado corretamente para desenvolvimento com React Native. Siga o guia de configuração do ambiente oficial do React Native: [Set Up Your Environment](https://reactnative.dev/docs/environment-setup).

## Executando o Projeto

### Passo 1: Iniciar o Metro

Primeiro, você precisará executar o Metro, a ferramenta de build JavaScript para React Native.

```sh
npm start
```

### Passo 2: Build e execução do app

Com o Metro em execução, abra uma nova janela/aba do terminal a partir da raiz do seu projeto React Native e use um dos seguintes comandos para buildar e executar seu app Android ou iOS:

#### Android

```sh
npm run android
```

#### iOS

Para iOS, lembre-se de instalar as dependências do CocoaPods (isso só precisa ser executado na primeira vez ou após atualizar as dependências nativas).

```sh
cd ios
pod install
npm run ios
```

Se tudo estiver configurado corretamente, você deverá ver seu novo app em execução no Emulador Android, Simulador iOS ou no seu dispositivo conectado.

### Passo 3: Modificar seu app

Agora que você executou o app com sucesso, vamos fazer algumas mudanças!

Abra `App.tsx` no seu editor de texto preferido e faça algumas mudanças. Quando você salvar, seu app será atualizado automaticamente e refletirá essas mudanças — isso é alimentado pelo Fast Refresh.

Quando você quiser recarregar forçadamente, por exemplo, para redefinir o estado do seu app, você pode realizar um recarregamento completo:

- **Android**: Pressione a tecla <kbd>R</kbd> duas vezes ou selecione "Reload" no Dev Menu, acessado via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) ou <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Pressione <kbd>R</kbd> no iOS Simulator.

## Estrutura do Projeto

```plaintext
tvmaze-app/
├── src/
│   ├── assets/          # Imagens e outros recursos estáticos
│   ├── api/             # Conexão com a API
│   ├── components/      # Componentes reutilizáveis
│   ├── models/          # Modelos de interface
│   ├── routes/          # Configuração das rotas
│   ├── screens/         # Telas do aplicativo
│   ├── stores/          # Stores do Zustand
│   ├── tests/           # Configurações globais de testes
│   ├── services/        # Serviços de API e outras integrações
│   └── utils/           # Funções utilitárias
├── .gitignore
├── package.json
├── README.md
└── package-lock.lock
```

## Funcionalidades

- Visualização de programas de TV
- Detalhes do elenco, episódios e temporadas
- Pesquisa de programas de TV
- Perfil do usuário com foto, nome e email

## Tecnologias Utilizadas

- react-native
- react-navigation
- react-native-paper
- react-native-image-picker
- @gorhom/bottom-sheet
- react-hook-form
- react-native-keychain
- yup
- @tanstack/react-query
- zustand
- styled-components

## Scripts Disponíveis

- `npm start`: Inicia o servidor Metro.
- `npm run android`: Builda e executa o aplicativo no emulador/dispositivo Android.
- `npm run ios`: Builda e executa o aplicativo no simulador/dispositivo iOS.
- `npm run test`: Executa os testes.
- `npm run lint`: Executa o linter para verificar problemas no código.

## Aviso

Os testes foram realizados apenas no Android devido a uma limitação no meu hardware.

## Solução de Problemas

Se você estiver tendo problemas para fazer os passos acima funcionarem, veja a página de [Solução de Problemas](https://reactnative.dev/docs/troubleshooting).

## Saiba Mais

Para saber mais sobre React Native, dê uma olhada nos seguintes recursos:

- [Site do React Native](https://reactnative.dev/) - saiba mais sobre React Native.
- [Começando](https://reactnative.dev/docs/getting-started) - uma visão geral do React Native e como configurar seu ambiente.
- [Aprenda o Básico](https://reactnative.dev/docs/tutorial) - um tour guiado pelos fundamentos do React Native.
- [Blog](https://reactnative.dev/blog) - leia os últimos posts oficiais do Blog do React Native.
- [@facebook/react-native](https://github.com/facebook/react-native) - o repositório Open Source no GitHub para React Native.
