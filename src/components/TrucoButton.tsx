import { Pressable, StyleSheet, Text, View } from 'react-native';

import { valorAnterior } from '@/state/gameReducer';
import type { Equipe, ValorMao } from '@/state/types';
import { colors } from '@/theme/colors';
import { pressionadoFicha, sombraFichaFunda, sombraFichaPremida, sombraFichaSuave } from '@/theme/shadows';

type Props = {
  valorAtualDaMao: ValorMao;
  modoCorrer: boolean;
  maoDeOnze: boolean;
  nomeNos: string;
  nomeEles: string;
  onAumentar: () => void;
  onCancelarAumento: () => void;
  onAbrirCorrer: () => void;
  onCancelarCorrer: () => void;
  onConfirmarCorrer: (equipeQueCorreu: Equipe) => void;
};

const ALTURA_LINHA_PRINCIPAL = 72;
const ALTURA_LINHA_CANCELAR = 56;

function rotuloTruco(valor: ValorMao, maoDeOnze: boolean): string {
  if (maoDeOnze) {
    return 'TRUCO';
  }
  switch (valor) {
    case 1:
      return 'TRUCO';
    case 3:
      return 'PEDIR 6';
    case 6:
      return 'PEDIR 9';
    case 9:
      return 'PEDIR 12';
    case 12:
      return 'VALENDO 12';
  }
}

export function TrucoButton({
  valorAtualDaMao,
  modoCorrer,
  maoDeOnze,
  nomeNos,
  nomeEles,
  onAumentar,
  onCancelarAumento,
  onAbrirCorrer,
  onCancelarCorrer,
  onConfirmarCorrer,
}: Props) {
  const valendoDoze = valorAtualDaMao === 12 && !maoDeOnze;
  const trucoDesativado = maoDeOnze || valendoDoze;
  const correrActivo = valorAtualDaMao >= 3;
  const pontosDesistencia = valorAnterior(valorAtualDaMao);
  const valorAposCancelar = valorAnterior(valorAtualDaMao);
  const mostrarCancelarTruco = valorAtualDaMao >= 3;

  if (modoCorrer && pontosDesistencia !== null) {
    return (
      <View style={styles.zona}>
        <View style={styles.linhaCorrer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${nomeNos} correu, ${nomeEles} soma ${pontosDesistencia}`}
            onPress={() => onConfirmarCorrer('nos')}
            style={({ pressed }) => [
              styles.botaoCorrerEquipe,
              sombraFichaSuave,
              pressed && sombraFichaPremida,
              pressed && pressionadoFicha,
            ]}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textoCorrerEquipe}>
              {nomeNos} correu
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textoCorrerDetalhe}>
              {nomeEles} +{pontosDesistencia}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${nomeEles} correu, ${nomeNos} soma ${pontosDesistencia}`}
            onPress={() => onConfirmarCorrer('eles')}
            style={({ pressed }) => [
              styles.botaoCorrerEquipe,
              sombraFichaSuave,
              pressed && sombraFichaPremida,
              pressed && pressionadoFicha,
            ]}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textoCorrerEquipe}>
              {nomeEles} correu
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textoCorrerDetalhe}>
              {nomeNos} +{pontosDesistencia}
            </Text>
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancelar"
          onPress={onCancelarCorrer}
          style={({ pressed }) => [
            styles.botaoCancelarCorrer,
            pressed && pressionadoFicha,
            pressed && styles.botaoCancelarCorrerPremido,
          ]}>
          <Text style={styles.textoCancelarCorrer}>Cancelar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.zona}>
      <View style={styles.linhaPrincipal}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Correr"
          accessibilityState={{ disabled: !correrActivo }}
          disabled={!correrActivo}
          onPress={onAbrirCorrer}
          style={({ pressed }) => [
            styles.botaoCorrer,
            sombraFichaFunda,
            !correrActivo && styles.esmaecido,
            pressed && correrActivo && sombraFichaPremida,
            pressed && correrActivo && pressionadoFicha,
          ]}>
          <Text style={styles.textoCorrer}>CORRER</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={rotuloTruco(valorAtualDaMao, maoDeOnze)}
          accessibilityState={{ disabled: trucoDesativado }}
          disabled={trucoDesativado}
          onPress={onAumentar}
          style={({ pressed }) => [
            styles.botaoTruco,
            sombraFichaFunda,
            maoDeOnze && styles.botaoTrucoBloqueado,
            valendoDoze && styles.botaoValendoDoze,
            pressed && !trucoDesativado && sombraFichaPremida,
            pressed && !trucoDesativado && pressionadoFicha,
            pressed && !trucoDesativado && styles.botaoTrucoPremido,
          ]}>
          <Text
            style={[
              styles.textoTruco,
              maoDeOnze && styles.textoTrucoBloqueado,
              valendoDoze && styles.textoValendoDoze,
            ]}>
            {rotuloTruco(valorAtualDaMao, maoDeOnze)}
          </Text>
        </Pressable>
      </View>
      {mostrarCancelarTruco && valorAposCancelar !== null ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Cancelar truco, volta a valer ${valorAposCancelar}`}
          onPress={onCancelarAumento}
          style={({ pressed }) => [
            styles.botaoCancelarTruco,
            sombraFichaSuave,
            pressed && sombraFichaPremida,
            pressed && pressionadoFicha,
            pressed && styles.botaoCancelarTrucoPremido,
          ]}>
          <Text style={styles.textoCancelarTruco}>✕ CANCELAR TRUCO</Text>
          <Text style={styles.textoVoltaAValer}>volta a valer {valorAposCancelar}</Text>
        </Pressable>
      ) : (
        <View style={styles.reservaCancelar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  zona: {
    width: '100%',
    gap: 10,
    minHeight: ALTURA_LINHA_PRINCIPAL + 10 + ALTURA_LINHA_CANCELAR,
  },
  linhaPrincipal: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    minHeight: ALTURA_LINHA_PRINCIPAL,
  },
  linhaCorrer: {
    flexDirection: 'row',
    gap: 10,
    minHeight: ALTURA_LINHA_PRINCIPAL,
  },
  botaoTruco: {
    flex: 2,
    minHeight: ALTURA_LINHA_PRINCIPAL,
    backgroundColor: colors.vermelhoNaipe,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.vermelhoEscuro,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  botaoTrucoPremido: {
    backgroundColor: colors.vermelhoEscuro,
  },
  botaoTrucoBloqueado: {
    backgroundColor: colors.bloqueado,
    borderColor: colors.bloqueado,
    opacity: 0.55,
    elevation: 0,
    shadowOpacity: 0,
  },
  botaoValendoDoze: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: colors.bordaBege,
    elevation: 0,
    shadowOpacity: 0,
  },
  textoTruco: {
    color: colors.cartaBege,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  textoTrucoBloqueado: {
    color: colors.bloqueadoTexto,
  },
  textoValendoDoze: {
    color: colors.cartaBege,
  },
  botaoCorrer: {
    flex: 1,
    minHeight: ALTURA_LINHA_PRINCIPAL,
    minWidth: 48,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.feltroEscuro,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pretoNaipe,
  },
  textoCorrer: {
    color: colors.cartaBege,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  botaoCancelarTruco: {
    minHeight: ALTURA_LINHA_CANCELAR,
    borderRadius: 18,
    backgroundColor: colors.cartaBege,
    borderWidth: 2,
    borderColor: colors.vermelhoEscuro,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  botaoCancelarTrucoPremido: {
    backgroundColor: colors.bordaBege,
  },
  textoCancelarTruco: {
    color: colors.vermelhoEscuro,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  textoVoltaAValer: {
    color: colors.vermelhoEscuro,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  reservaCancelar: {
    minHeight: ALTURA_LINHA_CANCELAR,
  },
  botaoCorrerEquipe: {
    flex: 1,
    minHeight: ALTURA_LINHA_PRINCIPAL,
    backgroundColor: colors.cartaBege,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.bordaBege,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  textoCorrerEquipe: {
    color: colors.pretoNaipe,
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    maxWidth: '100%',
  },
  textoCorrerDetalhe: {
    color: colors.vermelhoNaipe,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
    maxWidth: '100%',
  },
  botaoCancelarCorrer: {
    minHeight: ALTURA_LINHA_CANCELAR,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.bordaBege,
    backgroundColor: colors.cartaBege,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCancelarCorrerPremido: {
    backgroundColor: colors.bordaBege,
  },
  textoCancelarCorrer: {
    color: colors.vermelhoEscuro,
    fontSize: 16,
    fontWeight: '800',
  },
  esmaecido: {
    opacity: 0.35,
  },
});
