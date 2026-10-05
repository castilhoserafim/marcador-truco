<div align="center">

# 🂡 Truco Score — O Marcador que Tem Cara de Mesa de Baralho

### _"Enquanto a mão não acabar, ninguém desgruda os olhos do placar."_

Um marcador de tentos para Truco construído com a seriedade de um app profissional e a alma de uma mesa de bar: feltro verde, fichas, placa de latão e aquela tensão de quem está numa Mão de 11.

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/platform-iOS_%7C_Android-6B46C1?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-E5B94B?style=for-the-badge)](#)

</div>

---

## 📋 Sumário

- [🎴 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Destaques & Regras da Casa](#-destaques--regras-da-casa)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Executar](#-como-executar)
- [👤 Autor](#-autor)

---

## 🎴 Sobre o Projeto

Todo jogo de Truco que se preze tem uma mesa de feltro, um baralho surrado e alguém gritando "TRUCO!" na cara do parceiro. O **Truco Score** nasceu para trazer essa atmosfera para o bolso: nada de marcador genérico com números soltos num fundo branco.

A interface simula uma **mesa profissional de cartas** — fundo verde com textura de feltro, tipografia encorpada, botões com sombra e feedback tátil que lembram fichas de pôquer sendo empurradas na mesa. O coração do placar, a área que mostra quanto vale a mão, tem visual de **placa de latão gravada**: fundo preto profundo, bordas douradas e números que brilham como ouro. E quando a parada sobe para o topo, uma etiqueta vermelha inclinada — como um adesivo colado às pressas na mesa — grita **"DOZE!"** para ninguém se esquecer do tamanho da aposta.

Por trás da estética, uma arquitetura pensada para **nunca errar uma conta**: todo o estado do jogo vive num único `useReducer` puro e previsível, os componentes de interface só sabem desenhar e disparar ações, e o TypeScript estrito garante que nenhuma pontuação fantasma escape para produção.

> 🃏 Feito para quem leva o jogo a sério — tanto na mesa quanto no código.

---

## ✨ Destaques & Regras da Casa

### 🎭 Personalização de Equipes

Chega de "Nós" e "Eles" genéricos. Cada equipe pode:

- Receber um **nome próprio** (a dupla, o apelido, o bar — o que for);
- Escolher seu **emblema oficial**, um dos quatro naipes do baralho: **♣ Paus · ♥ Copas · ♠ Espadas · ♦ Ouros**.

O naipe escolhido acompanha a equipe em todo o app — no placar principal e, claro, estampado bem grande na tela de **Vencedores** quando a partida termina.

### ⚖️ A Lógica Oficial da Mão de 11

Esta é a regra que separa um marcador de brincadeira de um marcador de verdade. O app **reconhece sozinho** quando uma equipe chega a 11 pontos e muda o jogo:

| Situação                | O que acontece                                                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 🚫 Botão de Truco       | Fica **bloqueado e cinza** — ninguém aumenta a parada numa Mão de 11                                                                            |
| 🎯 Equipe com 11 pontos | Só pode somar **+1** — se ganhar a mão, ganha o jogo                                                                                            |
| ⚔️ Equipe adversária    | Ganha **opções táticas avançadas**: um botão **"+3 (Ganhámos)"**, de peito estufado, e um botão **"+1 (Correram)"**, para quando o rival recuou |

Tudo isso sem o jogador precisar lembrar de regra nenhuma — o app pensa pela mesa.

### 🔥 Mão de Ferro (11 × 11)

Quando as duas equipes empatam em **11 a 11**, o clima muda. O app entra automaticamente em **modo Mão de Ferro**:

- A borda da placa central de latão vira **vermelha**, sinalizando o jogo às escuras;
- Nenhuma equipe pode arriscar mais que **1 ponto por rodada**;
- Todo o resto do jogo para — é tudo ou nada, carta na mesa.

### ↩️ Sistema de Histórico (Undo)

Dedo escorregou? Clique errado no auge da discussão? O botão **Desfazer** reverte a última pontuação a partir de um **snapshot** do estado anterior do jogo — sem bagunçar a lógica da mão em andamento, sem duplicar pontos, sem deixar rastro.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com foco em **performance, previsibilidade e tipagem estrita** — a mesma disciplina que se espera de quem não erra uma conta de Truco.

| Tecnologia                    | Papel no projeto                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| **React Native**              | Base da interface mobile, multiplataforma (iOS e Android)                                             |
| **Expo**                      | Tooling, build e execução rápida em dispositivo real                                                  |
| **TypeScript (modo estrito)** | Tipagem de ponta a ponta — sem `any`, sem pontuação fora da escada                                    |
| **`useReducer`**              | Toda a lógica do jogo vive num reducer **puro**, previsível e fácil de testar                         |
| **Arquitetura unidirecional** | Componentes "burros" que só recebem props e disparam `dispatch` — a regra de negócio nunca mora na UI |
| **`StyleSheet` nativo**       | Estilização sem dependências extras, com tokens de tema centralizados (cores, sombras, tipografia)    |

A ideia central: **o estado do jogo é a única fonte da verdade.** Nenhum componente guarda lógica própria — ele apenas reflete o que o reducer decidiu, o que torna o app previsível mesmo em sequências malucas de Truco, Seis, Nove e Doze.

---

## 🚀 Como Executar

Bora colocar a mesa pra rodar. Você vai precisar do [Node.js](https://nodejs.org/) e do app **Expo Go** instalado no celular (ou um emulador configurado).

```bash
# 1. Clone o repositório
git clone https://github.com/castilhoserafim/marcador-truco.git

# 2. Entre na pasta do projeto
cd marcador-truco

# 3. Instale as dependências
npm install

# 4. Suba o servidor de desenvolvimento
npx expo start
```

Depois é só escanear o QR Code com o app **Expo Go** (Android) ou pela câmera do iPhone (iOS) e a mesa está armada. 🃏

---

## 👤 Autor

Feito com café, teimosia e uma Mão de 11 ou outra por

### **Wesley Castilho**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/castilhoserafim)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/castilhoserafim)

<div align="center">

**🂡 Se o projeto valeu um "Truco!", deixa uma ⭐ no repositório. 🂡**

</div>
