export type Equipe = "nos" | "eles";

export type ValorMao = 1 | 3 | 6 | 9 | 12;

export type Naipe = "espadas" | "copas" | "paus" | "ouros";

export type InfoNaipe = {
  simbolo: string;
  cor: "vermelho" | "preto";
  rotulo: string;
};

export const NAIPES: Record<Naipe, InfoNaipe> = {
  paus: { simbolo: "♣", cor: "preto", rotulo: "Paus" },
  copas: { simbolo: "♥", cor: "vermelho", rotulo: "Copas" },
  espadas: { simbolo: "♠", cor: "preto", rotulo: "Espadas" },
  ouros: { simbolo: "♦", cor: "vermelho", rotulo: "Ouros" },
};

export type Snapshot = {
  pontosNos: number;
  pontosEles: number;
  valorAtualDaMao: ValorMao;
};

export const NOME_OMISSAO_NOS = "Nós";
export const NOME_OMISSAO_ELES = "Eles";

export type EstadoJogo = {
  pontosNos: number;
  pontosEles: number;
  valorAtualDaMao: ValorMao;
  modoCorrer: boolean;
  historico: Snapshot[];
  nomeNos: string;
  nomeEles: string;
  naipeNos: Naipe;
  naipeEles: Naipe;
};

export type Acao =
  | { type: "PONTUAR"; equipe: Equipe }
  | { type: "PONTUAR_MAO_DE_11"; equipe: Equipe; pontos: 1 | 3 }
  | { type: "DECREMENTAR"; equipe: Equipe }
  | { type: "AUMENTAR_VALOR" }
  | { type: "CANCELAR_AUMENTO" }
  | { type: "ABRIR_CORRER" }
  | { type: "CANCELAR_CORRER" }
  | { type: "CONFIRMAR_CORRER"; equipeQueCorreu: Equipe }
  | { type: "EDITAR_EQUIPE"; equipe: Equipe; nome: string; naipe: Naipe }
  | { type: "DESFAZER" }
  | { type: "NOVA_PARTIDA" };
