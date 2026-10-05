import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { pressionadoFicha, sombraFichaFunda, sombraFichaPremida } from '@/theme/shadows';

type Props = {
  visivel: boolean;
  nomeVencedor: string;
  naipe: string;
  onNovaPartida: () => void;
  onDesfazer: () => void;
};

export function VictoryModal({ visivel, nomeVencedor, naipe, onNovaPartida, onDesfazer }: Props) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visivel}
      onRequestClose={onDesfazer}
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={[styles.carta, sombraFichaFunda]}>
          <Text style={styles.naipeDecorativo} accessibilityElementsHidden importantForAccessibility="no">
            {naipe}
          </Text>
          <Text style={styles.titulo}>Vencedores</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nome}>
            {nomeVencedor}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Nova partida"
            onPress={onNovaPartida}
            style={({ pressed }) => [
              styles.botaoPrincipal,
              sombraFichaFunda,
              pressed && sombraFichaPremida,
              pressed && pressionadoFicha,
              pressed && styles.botaoPrincipalPremido,
            ]}>
            <Text style={styles.textoPrincipal}>Nova partida</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Desfazer"
            onPress={onDesfazer}
            style={({ pressed }) => [
              styles.botaoSecundario,
              pressed && pressionadoFicha,
              pressed && styles.botaoSecundarioPremido,
            ]}>
            <Text style={styles.textoSecundario}>Desfazer</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  carta: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.cartaBege,
    borderRadius: 20,
    padding: 24,
    gap: 12,
    borderWidth: 3,
    borderColor: colors.bordaBege,
    overflow: 'hidden',
  },
  naipeDecorativo: {
    position: 'absolute',
    top: 6,
    right: 12,
    fontSize: 44,
    color: colors.vermelhoNaipe,
    opacity: 0.2,
  },
  titulo: {
    color: colors.pretoNaipe,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  nome: {
    color: colors.vermelhoNaipe,
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  botaoPrincipal: {
    minHeight: 52,
    backgroundColor: colors.vermelhoNaipe,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.vermelhoEscuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPrincipalPremido: {
    backgroundColor: colors.vermelhoEscuro,
  },
  botaoSecundario: {
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.pretoNaipe,
    backgroundColor: colors.cartaBranco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSecundarioPremido: {
    backgroundColor: colors.bordaBege,
  },
  textoPrincipal: {
    color: colors.cartaBege,
    fontSize: 18,
    fontWeight: '900',
  },
  textoSecundario: {
    color: colors.pretoNaipe,
    fontSize: 16,
    fontWeight: '800',
  },
});
