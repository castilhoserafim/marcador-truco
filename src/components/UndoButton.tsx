import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/theme/colors';
import { pressionadoFicha } from '@/theme/shadows';

type Props = {
  desativado: boolean;
  onPress: () => void;
};

export function UndoButton({ desativado, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Desfazer"
      accessibilityState={{ disabled: desativado }}
      disabled={desativado}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.botao,
        desativado && styles.desativado,
        pressed && !desativado && pressionadoFicha,
      ]}>
      <Text style={styles.texto}>↶ Desfazer</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 48,
    minWidth: 48,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 16,
  },
  desativado: {
    opacity: 0.35,
  },
  texto: {
    color: colors.cartaBege,
    fontSize: 15,
    fontWeight: '700',
  },
});
