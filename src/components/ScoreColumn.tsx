import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import type { Equipe, Naipe, ValorMao } from "@/state/types";
import { NAIPES } from "@/state/types";
import { colors } from "@/theme/colors";
import {
  pressionadoFicha,
  sombraFichaFunda,
  sombraFichaPremida,
  sombraFichaSuave,
} from "@/theme/shadows";

type ModoPontuar = "normal" | "comOnze" | "abaixoDeOnze";

type Props = {
  equipe: Equipe;
  titulo: string;
  naipe: Naipe;
  pontos: number;
  valorDaMao: ValorMao;
  modoPontuar: ModoPontuar;
  nomeAdversario: string;
  onPontuar: (equipe: Equipe) => void;
  onPontuarMaoDeOnze: (equipe: Equipe, pontos: 1 | 3) => void;
  onDecrementar: (equipe: Equipe) => void;
  onEditarNome: (equipe: Equipe) => void;
};

const ALTURA_AREA_PONTUAR = 104; // 2 botões de 48 + gap de 8, igual em todos os modos

export function ScoreColumn({
  equipe,
  titulo,
  naipe,
  pontos,
  valorDaMao,
  modoPontuar,
  nomeAdversario,
  onPontuar,
  onPontuarMaoDeOnze,
  onDecrementar,
  onEditarNome,
}: Props) {
  const podeSomar = pontos < 12;
  const podeSubtrair = pontos > 0;
  const maoAlta = valorDaMao >= 3;
  const infoNaipe = NAIPES[naipe];
  const naipeVermelho = infoNaipe.cor === "vermelho";

  return (
    <View style={[styles.coluna, sombraFichaSuave]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Editar nome e naipe da equipa ${titulo}`}
        onPress={() => onEditarNome(equipe)}
        style={({ pressed }) => [
          styles.etiqueta,
          pressed && pressionadoFicha,
          pressed && styles.etiquetaPremida,
        ]}
      >
        <Text style={[styles.naipe, naipeVermelho && styles.naipeVermelho]}>
          {infoNaipe.simbolo}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.titulo, naipeVermelho && styles.tituloVermelho]}
        >
          {titulo}
        </Text>
      </Pressable>
      <Text
        accessibilityRole="text"
        accessibilityLabel={`${titulo}: ${pontos} pontos`}
        adjustsFontSizeToFit
        minimumFontScale={0.45}
        numberOfLines={1}
        style={styles.pontos}
      >
        {pontos}
      </Text>
      <View style={styles.acoes}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Subtrair 1 de ${titulo}`}
          accessibilityState={{ disabled: !podeSubtrair }}
          disabled={!podeSubtrair}
          onPress={() => onDecrementar(equipe)}
          style={({ pressed }) => [
            styles.botaoMenos,
            sombraFichaSuave,
            !podeSubtrair && styles.esmaecido,
            pressed && podeSubtrair && sombraFichaPremida,
            pressed && podeSubtrair && pressionadoFicha,
          ]}
        >
          <Text style={styles.textoMenos}>-1</Text>
        </Pressable>

        <View style={styles.areaPontuar}>
          {modoPontuar === "abaixoDeOnze" ? (
            <View style={styles.duplaBotoes}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Somar 3 pontos, ganhámos a mão de 11, em ${titulo}`}
                accessibilityState={{ disabled: !podeSomar }}
                disabled={!podeSomar}
                onPress={() => onPontuarMaoDeOnze(equipe, 3)}
                style={({ pressed }) => [
                  styles.botaoDuplo,
                  styles.botaoDuploGanhamos,
                  sombraFichaFunda,
                  !podeSomar && styles.esmaecido,
                  pressed && podeSomar && sombraFichaPremida,
                  pressed && podeSomar && pressionadoFicha,
                ]}
              >
                <Text style={styles.textoDuploNumero}>+3</Text>
                <Text style={styles.textoDuploLegenda} numberOfLines={1}>
                  Ganhámos
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Somar 1 ponto, ${nomeAdversario} correu, em ${titulo}`}
                accessibilityState={{ disabled: !podeSomar }}
                disabled={!podeSomar}
                onPress={() => onPontuarMaoDeOnze(equipe, 1)}
                style={({ pressed }) => [
                  styles.botaoDuplo,
                  sombraFichaSuave,
                  !podeSomar && styles.esmaecido,
                  pressed && podeSomar && sombraFichaPremida,
                  pressed && podeSomar && pressionadoFicha,
                ]}
              >
                <Text
                  style={[
                    styles.textoDuploNumero,
                    styles.textoDuploNumeroPreto,
                  ]}
                >
                  +1
                </Text>
                <Text
                  style={styles.textoDuploLegenda}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {nomeAdversario} correu
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Somar ${valorDaMao} em ${titulo}`}
              accessibilityState={{ disabled: !podeSomar }}
              disabled={!podeSomar}
              onPress={() => onPontuar(equipe)}
              style={({ pressed }) => [
                styles.botaoMais,
                sombraFichaFunda,
                !podeSomar && styles.esmaecido,
                pressed && podeSomar && sombraFichaPremida,
                pressed && podeSomar && pressionadoFicha,
              ]}
            >
              <Text style={[styles.textoMais, maoAlta && styles.textoMaisAlto]}>
                +{valorDaMao}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const fontePlacar = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "serif",
});

const styles = StyleSheet.create({
  coluna: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 14,
    gap: 10,
    backgroundColor: colors.feltroClaro,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.feltroEscuro,
  },
  etiqueta: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
    backgroundColor: colors.cartaBege,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.bordaBege,
  },
  etiquetaPremida: {
    backgroundColor: colors.bordaBege,
  },
  naipe: {
    color: colors.pretoNaipe,
    fontSize: 16,
    fontWeight: "700",
  },
  naipeVermelho: {
    color: colors.vermelhoNaipe,
  },
  titulo: {
    flexShrink: 1,
    color: colors.pretoNaipe,
    fontSize: 16,
    fontWeight: "800",
  },
  tituloVermelho: {
    color: colors.vermelhoNaipe,
  },
  pontos: {
    color: colors.cartaBege,
    fontSize: 112,
    fontWeight: "900",
    letterSpacing: 1,
    lineHeight: 118,
    width: "100%",
    textAlign: "center",
    fontFamily: fontePlacar,
    includeFontPadding: false,
    textShadowColor: colors.feltroEscuro,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  acoes: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    gap: 8,
  },
  botaoMenos: {
    minHeight: 48,
    minWidth: 48,
    flex: 1,
    maxWidth: 72,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.feltroEscuro,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.pretoNaipe,
  },
  areaPontuar: {
    flex: 2,
    height: ALTURA_AREA_PONTUAR,
  },
  botaoMais: {
    flex: 1,
    height: "100%",
    borderRadius: 28,
    backgroundColor: colors.cartaBranco,
    borderWidth: 3,
    borderColor: colors.bordaBege,
    alignItems: "center",
    justifyContent: "center",
  },
  duplaBotoes: {
    flex: 1,
    gap: 8,
  },
  botaoDuplo: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: colors.cartaBranco,
    borderWidth: 2,
    borderColor: colors.bordaBege,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  botaoDuploGanhamos: {
    borderColor: colors.vermelhoNaipe,
  },
  textoDuploNumero: {
    color: colors.vermelhoNaipe,
    fontSize: 18,
    fontWeight: "900",
  },
  textoDuploNumeroPreto: {
    color: colors.pretoNaipe,
  },
  textoDuploLegenda: {
    color: colors.pretoNaipe,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 1,
    maxWidth: "95%",
    textAlign: "center",
  },
  esmaecido: {
    opacity: 0.4,
  },
  textoMenos: {
    color: colors.cartaBege,
    fontSize: 18,
    fontWeight: "800",
  },
  textoMais: {
    color: colors.pretoNaipe,
    fontSize: 26,
    fontWeight: "900",
  },
  textoMaisAlto: {
    color: colors.vermelhoNaipe,
  },
});
