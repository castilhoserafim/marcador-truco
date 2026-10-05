import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '@/theme/colors';
import { pressionadoFicha, sombraFichaFunda, sombraFichaPremida } from '@/theme/shadows';

type Props = {
  visivel: boolean;
  nomeAtual: string;
  nomeOmissao: string;
  onGuardar: (nome: string) => void;
  onCancelar: () => void;
};

export function RenameTeamModal({ visivel, nomeAtual, nomeOmissao, onGuardar, onCancelar }: Props) {
  const [rascunho, setRascunho] = useState(nomeAtual);

  useEffect(() => {
    if (visivel) {
      setRascunho(nomeAtual);
    }
  }, [visivel, nomeAtual]);

  function guardar() {
    onGuardar(rascunho);
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visivel}
      onRequestClose={onCancelar}
      statusBarTranslucent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.evitarTeclado}>
        <View style={styles.overlay}>
          <View style={[styles.carta, sombraFichaFunda]}>
            <Text style={styles.naipeDecorativo} accessibilityElementsHidden importantForAccessibility="no">
              ♣
            </Text>
            <Text style={styles.titulo}>Nome da equipa</Text>
            <TextInput
              accessibilityLabel="Nome da equipa"
              autoFocus
              selectTextOnFocus
              maxLength={14}
              returnKeyType="done"
              value={rascunho}
              onChangeText={setRascunho}
              onSubmitEditing={guardar}
              placeholder={nomeOmissao}
              placeholderTextColor={colors.bloqueado}
              style={styles.campo}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Guardar nome"
              onPress={guardar}
              style={({ pressed }) => [
                styles.botaoGuardar,
                sombraFichaFunda,
                pressed && sombraFichaPremida,
                pressed && pressionadoFicha,
                pressed && styles.botaoGuardarPremido,
              ]}>
              <Text style={styles.textoGuardar}>Guardar</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cancelar"
              onPress={onCancelar}
              style={({ pressed }) => [styles.botaoCancelar, pressed && pressionadoFicha]}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  evitarTeclado: {
    flex: 1,
  },
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
    top: 8,
    right: 14,
    fontSize: 36,
    color: colors.pretoNaipe,
    opacity: 0.18,
  },
  titulo: {
    color: colors.pretoNaipe,
    fontSize: 20,
    fontWeight: '800',
  },
  campo: {
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.bordaBege,
    backgroundColor: colors.cartaBranco,
    color: colors.pretoNaipe,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 12,
  },
  botaoGuardar: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.vermelhoNaipe,
    borderWidth: 2,
    borderColor: colors.vermelhoEscuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoGuardarPremido: {
    backgroundColor: colors.vermelhoEscuro,
  },
  textoGuardar: {
    color: colors.cartaBege,
    fontSize: 18,
    fontWeight: '900',
  },
  botaoCancelar: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCancelar: {
    color: colors.vermelhoEscuro,
    fontSize: 16,
    fontWeight: '700',
  },
});
