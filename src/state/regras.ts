import type { Equipe } from "@/state/types";

export type EstadoMaoDeOnze =
  | { tipo: "normal" }
  | { tipo: "maoDe11"; equipeCom11: Equipe }
  | { tipo: "maoDeFerro" };

/**
 * Deriva o estado da Mão de 11 / Mão de Ferro a partir da pontuação atual.
 * Toda a UI relacionada (placa, botão de Truco, placar) deve derivar daqui,
 * em vez de guardar este estado à parte.
 */
export function estadoMaoDe11(
  pontosNos: number,
  pontosEles: number,
): EstadoMaoDeOnze {
  const nosTem11 = pontosNos === 11;
  const elesTem11 = pontosEles === 11;

  if (nosTem11 && elesTem11) {
    return { tipo: "maoDeFerro" };
  }
  if (nosTem11) {
    return { tipo: "maoDe11", equipeCom11: "nos" };
  }
  if (elesTem11) {
    return { tipo: "maoDe11", equipeCom11: "eles" };
  }
  return { tipo: "normal" };
}
