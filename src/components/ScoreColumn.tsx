import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Equipe, ValorMao } from '@/state/types';
import { colors } from '@/theme/colors';
import { pressionadoFicha, sombraFichaFunda, sombraFichaPremida, sombraFichaSuave } from '@/theme/shadows';

type Props = {
  equipe: Equipe;
  titulo: string;
  naipe: string;
  pontos: number;
  valorDaMao: ValorMao;
  onPontuar: (equipe: Equipe) => void;
  onDecrementar: (equipe: Equipe) => void;
  onEditarNome: (equipe: Equipe) => void;
};

export function ScoreColumn({
  equipe,
  titulo,
  naipe,
  pontos,
  valorDaMao,
  onPontuar,
  onDecrementar,
  onEditarNome,
}: Props) {
  const podeSomar = pontos < 12;
  const podeSubtrair = pontos > 0;
  const maoAlta = valorDaMao >= 3;
  const naipeVermelho = equipe === 'eles';

  return (
    <View style={[styles.coluna, sombraFichaSuave]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Editar nome da equipa ${titulo}`}
        onPress={() => onEditarNome(equipe)}
        style={({ pressed }) => [styles.etiqueta, pressed && pressionadoFicha, pressed && styles.etiquetaPremida]}>
        <Text style={[styles.naipe, naipeVermelho && styles.naipeVermelho]}>{naipe}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.titulo, naipeVermelho && styles.tituloVermelho]}>
          {titulo}
        </Text>
        <Text style={styles.lapis}>✎</Text>
      </Pressable>
      <Text
        accessibilityRole="text"
        accessibilityLabel={`${titulo}: ${pontos} pontos`}
        adjustsFontSizeToFit
        minimumFontScale={0.45}
        numberOfLines={1}
        style={styles.pontos}>
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
          ]}>
          <Text style={styles.textoMenos}>-1</Text>
        </Pressable>
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
          ]}>
          <Text style={[styles.textoMais, maoAlta && styles.textoMaisAlto]}>+{valorDaMao}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const fontePlacar = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

const styles = StyleSheet.create({
  coluna: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    gap: 10,
    backgroundColor: colors.feltroClaro,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.feltroEscuro,
  },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
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
    fontWeight: '700',
  },
  naipeVermelho: {
    color: colors.vermelhoNaipe,
  },
  titulo: {
    flexShrink: 1,
    color: colors.pretoNaipe,
    fontSize: 16,
    fontWeight: '800',
  },
  tituloVermelho: {
    color: colors.vermelhoNaipe,
  },
  lapis: {
    color: colors.pretoNaipe,
    fontSize: 13,
    opacity: 0.55,
  },
  pontos: {
    color: colors.cartaBege,
    fontSize: 112,
    fontWeight: '900',
    letterSpacing: 1,
    lineHeight: 118,
    width: '100%',
    textAlign: 'center',
    fontFamily: fontePlacar,
    includeFontPadding: false,
    textShadowColor: colors.feltroEscuro,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  acoes: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pretoNaipe,
  },
  botaoMais: {
    minHeight: 56,
    flex: 2,
    borderRadius: 28,
    backgroundColor: colors.cartaBranco,
    borderWidth: 3,
    borderColor: colors.bordaBege,
    alignItems: 'center',
    justifyContent: 'center',
  },
  esmaecido: {
    opacity: 0.4,
  },
  textoMenos: {
    color: colors.cartaBege,
    fontSize: 18,
    fontWeight: '800',
  },
  textoMais: {
    color: colors.pretoNaipe,
    fontSize: 26,
    fontWeight: '900',
  },
  textoMaisAlto: {
    color: colors.vermelhoNaipe,
  },
});
