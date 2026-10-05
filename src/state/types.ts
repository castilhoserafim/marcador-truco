export type Equipe = 'nos' | 'eles';

export type ValorMao = 1 | 3 | 6 | 9 | 12;

export type Snapshot = {
  pontosNos: number;
  pontosEles: number;
  valorAtualDaMao: ValorMao;
};

export const NOME_OMISSAO_NOS = 'Nós';
export const NOME_OMISSAO_ELES = 'Eles';

export type EstadoJogo = {
  pontosNos: number;
  pontosEles: number;
  valorAtualDaMao: ValorMao;
  modoCorrer: boolean;
  historico: Snapshot[];
  nomeNos: string;
  nomeEles: string;
};

export type Acao =
  | { type: 'PONTUAR'; equipe: Equipe }
  | { type: 'DECREMENTAR'; equipe: Equipe }
  | { type: 'AUMENTAR_VALOR' }
  | { type: 'CANCELAR_AUMENTO' }
  | { type: 'ABRIR_CORRER' }
  | { type: 'CANCELAR_CORRER' }
  | { type: 'CONFIRMAR_CORRER'; equipeQueCorreu: Equipe }
  | { type: 'RENOMEAR_EQUIPE'; equipe: Equipe; nome: string }
  | { type: 'DESFAZER' }
  | { type: 'NOVA_PARTIDA' };
