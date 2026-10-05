import { StyleSheet, Text, View } from "react-native";

import type { EstadoMaoDeOnze } from "@/state/regras";
import type { ValorMao } from "@/state/types";
import { colors } from "@/theme/colors";
import { sombraFichaSuave } from "@/theme/shadows";

const ETIQUETAS_VALOR: Partial<Record<ValorMao, string>> = {
  3: "TRUCO!",
  6: "SEIS!",
  9: "NOVE!",
  12: "DOZE!",
};

type MaoBadgeProps = {
  valorAtualDaMao: ValorMao;
  situacao: EstadoMaoDeOnze;
  nomeNos: string;
  nomeEles: string;
};

export function MaoBadge({
  valorAtualDaMao,
  situacao,
  nomeNos,
  nomeEles,
}: MaoBadgeProps) {
  if (situacao.tipo === "maoDeFerro") {
    return (
      <View
        style={[styles.placa, styles.placaFerro, sombraFichaSuave]}
        accessibilityLabel="Mão de Ferro: 11 a 11, às escuras, vale 1 ponto"
      >
        <View style={styles.bordaInterior} pointerEvents="none" />
        <Text style={styles.titulo}>MÃO DE FERRO</Text>
        <Text style={styles.subtitulo} numberOfLines={1}>
          11 × 11 · às escuras · vale 1 ponto
        </Text>
      </View>
    );
  }

  if (situacao.tipo === "maoDe11") {
    const nomeCom11 = situacao.equipeCom11 === "nos" ? nomeNos : nomeEles;
    return (
      <View
        style={[styles.placa, sombraFichaSuave]}
        accessibilityLabel={`Mão de 11: ${nomeCom11} tem 11 pontos`}
      >
        <View style={styles.bordaInterior} pointerEvents="none" />
        <Text style={styles.titulo}>MÃO DE 11</Text>
        <Text style={styles.subtitulo} numberOfLines={1}>
          {nomeCom11} tem 11 · sem Truco
        </Text>
      </View>
    );
  }

  const etiqueta = ETIQUETAS_VALOR[valorAtualDaMao];

  return (
    <View
      style={[styles.placa, sombraFichaSuave]}
      accessibilityLabel={`A mão vale ${valorAtualDaMao} ${
        valorAtualDaMao === 1 ? "ponto" : "pontos"
      }`}
    >
      <View style={styles.bordaInterior} pointerEvents="none" />
      {etiqueta !== undefined && (
        <View style={styles.selo}>
          <Text style={styles.seloTexto}>{etiqueta}</Text>
        </View>
      )}
      <Text style={styles.rotuloPequeno}>MÃO VALE</Text>
      <Text style={styles.numeroGrande}>{valorAtualDaMao}</Text>
      <Text style={styles.rotuloPequeno}>
        {valorAtualDaMao === 1 ? "PONTO" : "PONTOS"}
      </Text>
    </View>
  );
}

const ALTURA_PLACA = 108;

const styles = StyleSheet.create({
  placa: {
    alignSelf: "center",
    minWidth: "60%",
    maxWidth: 320,
    height: ALTURA_PLACA,
    backgroundColor: colors.pretoNaipe,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.dourado,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  placaFerro: {
    borderColor: colors.vermelhoNaipe,
  },
  bordaInterior: {
    position: "absolute",
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(229, 185, 75, 0.4)",
  },
  selo: {
    position: "absolute",
    top: -12,
    right: -15,
    backgroundColor: colors.vermelhoNaipe,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    transform: [{ rotate: "12deg" }],
    zIndex: 10,
  },
  seloTexto: {
    color: colors.cartaBege,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  rotuloPequeno: {
    color: colors.cartaBege,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 3,
  },
  numeroGrande: {
    color: colors.dourado,
    fontSize: 52,
    fontWeight: "900",
    includeFontPadding: false,
    lineHeight: 58,
  },
  titulo: {
    color: colors.dourado,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
  },
  subtitulo: {
    color: colors.cartaBege,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
    textAlign: "center",
  },
});
