import { estadoMaoDe11 } from "@/state/regras";
import type {
  Acao,
  Equipe,
  EstadoJogo,
  Snapshot,
  ValorMao,
} from "@/state/types";
import { NOME_OMISSAO_ELES, NOME_OMISSAO_NOS } from "@/state/types";

export const ESCADA_VALORES: readonly ValorMao[] = [1, 3, 6, 9, 12];

const LIMITE_HISTORICO = 50;
const TETO_PONTOS = 12;

export const estadoInicial: EstadoJogo = {
  pontosNos: 0,
  pontosEles: 0,
  valorAtualDaMao: 1,
  modoCorrer: false,
  historico: [],
  nomeNos: NOME_OMISSAO_NOS,
  nomeEles: NOME_OMISSAO_ELES,
  naipeNos: "espadas",
  naipeEles: "copas",
};

export function proximoValor(valor: ValorMao): ValorMao | null {
  const indice = ESCADA_VALORES.indexOf(valor);
  if (indice < 0 || indice >= ESCADA_VALORES.length - 1) {
    return null;
  }
  return ESCADA_VALORES[indice + 1];
}

export function valorAnterior(valor: ValorMao): ValorMao | null {
  const indice = ESCADA_VALORES.indexOf(valor);
  if (indice <= 0) {
    return null;
  }
  return ESCADA_VALORES[indice - 1];
}

export function normalizarNomeEquipa(nome: string, omissao: string): string {
  const limpo = nome.trim().replace(/\s+/g, " ");
  return limpo.length === 0 ? omissao : limpo;
}

function snapshotDe(estado: EstadoJogo): Snapshot {
  return {
    pontosNos: estado.pontosNos,
    pontosEles: estado.pontosEles,
    valorAtualDaMao: estado.valorAtualDaMao,
  };
}

function comHistorico(estado: EstadoJogo): Snapshot[] {
  const historico = [...estado.historico, snapshotDe(estado)];
  if (historico.length <= LIMITE_HISTORICO) {
    return historico;
  }
  return historico.slice(historico.length - LIMITE_HISTORICO);
}

function pontosDe(estado: EstadoJogo, equipe: Equipe): number {
  return equipe === "nos" ? estado.pontosNos : estado.pontosEles;
}

function comPontos(
  estado: EstadoJogo,
  equipe: Equipe,
  pontos: number,
): EstadoJogo {
  if (equipe === "nos") {
    return { ...estado, pontosNos: pontos };
  }
  return { ...estado, pontosEles: pontos };
}

function temMaoDeOnze(estado: EstadoJogo): boolean {
  return estadoMaoDe11(estado.pontosNos, estado.pontosEles).tipo !== "normal";
}

function topoEDoUltimoAumento(
  estado: EstadoJogo,
  valorAposCancelar: ValorMao,
): boolean {
  const topo = estado.historico[estado.historico.length - 1];
  if (topo === undefined) {
    return false;
  }
  return (
    topo.pontosNos === estado.pontosNos &&
    topo.pontosEles === estado.pontosEles &&
    topo.valorAtualDaMao === valorAposCancelar
  );
}

export function gameReducer(estado: EstadoJogo, acao: Acao): EstadoJogo {
  const novoEstado = aplicarAcao(estado, acao);
  // Garante que, em Mão de 11 ou Mão de Ferro, a mão nunca fica a valer mais do que 1.
  if (temMaoDeOnze(novoEstado) && novoEstado.valorAtualDaMao !== 1) {
    return { ...novoEstado, valorAtualDaMao: 1, modoCorrer: false };
  }
  return novoEstado;
}

function aplicarAcao(estado: EstadoJogo, acao: Acao): EstadoJogo {
  switch (acao.type) {
    case "PONTUAR": {
      const atual = pontosDe(estado, acao.equipe);
      if (atual >= TETO_PONTOS) {
        return estado;
      }
      const somado = Math.min(TETO_PONTOS, atual + estado.valorAtualDaMao);
      return {
        ...comPontos(estado, acao.equipe, somado),
        valorAtualDaMao: 1,
        modoCorrer: false,
        historico: comHistorico(estado),
      };
    }
    case "PONTUAR_MAO_DE_11": {
      const situacao = estadoMaoDe11(estado.pontosNos, estado.pontosEles);
      if (situacao.tipo !== "maoDe11") {
        return estado;
      }
      const equipeComMenos: Equipe =
        situacao.equipeCom11 === "nos" ? "eles" : "nos";
      if (acao.equipe !== equipeComMenos) {
        return estado;
      }
      const atual = pontosDe(estado, acao.equipe);
      if (atual >= TETO_PONTOS) {
        return estado;
      }
      const somado = Math.min(TETO_PONTOS, atual + acao.pontos);
      return {
        ...comPontos(estado, acao.equipe, somado),
        valorAtualDaMao: 1,
        modoCorrer: false,
        historico: comHistorico(estado),
      };
    }
    case "DECREMENTAR": {
      const atual = pontosDe(estado, acao.equipe);
      if (atual <= 0) {
        return estado;
      }
      return {
        ...comPontos(estado, acao.equipe, atual - 1),
        historico: comHistorico(estado),
      };
    }
    case "AUMENTAR_VALOR": {
      if (temMaoDeOnze(estado)) {
        return estado;
      }
      const seguinte = proximoValor(estado.valorAtualDaMao);
      if (seguinte === null) {
        return estado;
      }
      return {
        ...estado,
        valorAtualDaMao: seguinte,
        historico: comHistorico(estado),
      };
    }
    case "CANCELAR_AUMENTO": {
      if (estado.valorAtualDaMao <= 1) {
        return estado;
      }
      const anterior = valorAnterior(estado.valorAtualDaMao);
      if (anterior === null) {
        return estado;
      }
      const historico = topoEDoUltimoAumento(estado, anterior)
        ? estado.historico.slice(0, -1)
        : estado.historico;
      return {
        ...estado,
        valorAtualDaMao: anterior,
        modoCorrer: false,
        historico,
      };
    }
    case "ABRIR_CORRER": {
      if (estado.valorAtualDaMao < 3) {
        return estado;
      }
      return { ...estado, modoCorrer: true };
    }
    case "CANCELAR_CORRER": {
      return { ...estado, modoCorrer: false };
    }
    case "CONFIRMAR_CORRER": {
      if (estado.valorAtualDaMao === 1) {
        return estado;
      }
      const pontosDesistencia = valorAnterior(estado.valorAtualDaMao);
      if (pontosDesistencia === null) {
        return estado;
      }
      const equipeQueRecebe: Equipe =
        acao.equipeQueCorreu === "nos" ? "eles" : "nos";
      const atual = pontosDe(estado, equipeQueRecebe);
      const somado = Math.min(TETO_PONTOS, atual + pontosDesistencia);
      return {
        ...comPontos(estado, equipeQueRecebe, somado),
        valorAtualDaMao: 1,
        modoCorrer: false,
        historico: comHistorico(estado),
      };
    }
    case "EDITAR_EQUIPE": {
      const omissao =
        acao.equipe === "nos" ? NOME_OMISSAO_NOS : NOME_OMISSAO_ELES;
      const nome = normalizarNomeEquipa(acao.nome, omissao);
      if (acao.equipe === "nos") {
        return { ...estado, nomeNos: nome, naipeNos: acao.naipe };
      }
      return { ...estado, nomeEles: nome, naipeEles: acao.naipe };
    }
    case "DESFAZER": {
      if (estado.historico.length === 0) {
        return estado;
      }
      const ultimo = estado.historico[estado.historico.length - 1];
      return {
        ...estado,
        pontosNos: ultimo.pontosNos,
        pontosEles: ultimo.pontosEles,
        valorAtualDaMao: ultimo.valorAtualDaMao,
        modoCorrer: false,
        historico: estado.historico.slice(0, -1),
      };
    }
    case "NOVA_PARTIDA": {
      return {
        ...estadoInicial,
        nomeNos: estado.nomeNos,
        nomeEles: estado.nomeEles,
        naipeNos: estado.naipeNos,
        naipeEles: estado.naipeEles,
      };
    }
    default: {
      const _exaustivo: never = acao;
      void _exaustivo;
      return estado;
    }
  }
}
