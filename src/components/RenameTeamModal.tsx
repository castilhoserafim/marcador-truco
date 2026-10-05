import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { Naipe } from "@/state/types";
import { NAIPES } from "@/state/types";
import { colors } from "@/theme/colors";
import {
  pressionadoFicha,
  sombraFichaFunda,
  sombraFichaPremida,
} from "@/theme/shadows";

type Props = {
  visivel: boolean;
  nomeAtual: string;
  nomeOmissao: string;
  naipeAtual: Naipe;
  onGuardar: (nome: string, naipe: Naipe) => void;
  onCancelar: () => void;
};

const ORDEM_NAIPES: Naipe[] = ["espadas", "copas", "paus", "ouros"];

export function RenameTeamModal({
  visivel,
  nomeAtual,
  nomeOmissao,
  naipeAtual,
  onGuardar,
  onCancelar,
}: Props) {
  const [rascunhoNome, setRascunhoNome] = useState(nomeAtual);
  const [rascunhoNaipe, setRascunhoNaipe] = useState<Naipe>(naipeAtual);

  useEffect(() => {
    if (visivel) {
      setRascunhoNome(nomeAtual);
      setRascunhoNaipe(naipeAtual);
    }
  }, [visivel, nomeAtual, naipeAtual]);

  function guardar() {
    onGuardar(rascunhoNome, rascunhoNaipe);
  }

  const infoNaipeDecorativo = NAIPES[rascunhoNaipe];

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visivel}
      onRequestClose={onCancelar}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.evitarTeclado}
      >
        <View style={styles.overlay}>
          <View style={[styles.carta, sombraFichaFunda]}>
            <Text
              style={[
                styles.naipeDecorativo,
                infoNaipeDecorativo.cor === "vermelho" &&
                  styles.naipeDecorativoVermelho,
              ]}
              accessibilityElementsHidden
              importantForAccessibility="no"
            >
              {infoNaipeDecorativo.simbolo}
            </Text>
            <Text style={styles.titulo}>Nome da equipa</Text>
            <TextInput
              accessibilityLabel="Nome da equipa"
              autoFocus
              selectTextOnFocus
              maxLength={14}
              returnKeyType="done"
              value={rascunhoNome}
              onChangeText={setRascunhoNome}
              onSubmitEditing={guardar}
              placeholder={nomeOmissao}
              placeholderTextColor={colors.bloqueado}
              style={styles.campo}
            />

            <Text style={styles.rotuloEmblema}>Emblema</Text>
            <View style={styles.linhaChips}>
              {ORDEM_NAIPES.map((naipe) => {
                const info = NAIPES[naipe];
                const selecionado = naipe === rascunhoNaipe;
                return (
                  <Pressable
                    key={naipe}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: selecionado }}
                    accessibilityLabel={info.rotulo}
                    onPress={() => setRascunhoNaipe(naipe)}
                    style={({ pressed }) => [
                      styles.chip,
                      selecionado && styles.chipSelecionado,
                      pressed && pressionadoFicha,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipSimbolo,
                        info.cor === "vermelho"
                          ? styles.chipSimboloVermelho
                          : styles.chipSimboloPreto,
                      ]}
                    >
                      {info.simbolo}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

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
              ]}
            >
              <Text style={styles.textoGuardar}>Guardar</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cancelar"
              onPress={onCancelar}
              style={({ pressed }) => [
                styles.botaoCancelar,
                pressed && pressionadoFicha,
              ]}
            >
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  carta: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.cartaBege,
    borderRadius: 20,
    padding: 24,
    gap: 12,
    borderWidth: 3,
    borderColor: colors.bordaBege,
    overflow: "hidden",
  },
  naipeDecorativo: {
    position: "absolute",
    top: 8,
    right: 14,
    fontSize: 36,
    color: colors.pretoNaipe,
    opacity: 0.18,
  },
  naipeDecorativoVermelho: {
    color: colors.vermelhoNaipe,
  },
  titulo: {
    color: colors.pretoNaipe,
    fontSize: 20,
    fontWeight: "800",
  },
  campo: {
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.bordaBege,
    backgroundColor: colors.cartaBranco,
    color: colors.pretoNaipe,
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 12,
  },
  rotuloEmblema: {
    color: colors.pretoNaipe,
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.7,
    marginTop: 2,
  },
  linhaChips: {
    flexDirection: "row",
    gap: 10,
  },
  chip: {
    flex: 1,
    minHeight: 48,
    minWidth: 48,
    borderRadius: 14,
    backgroundColor: colors.cartaBranco,
    borderWidth: 2,
    borderColor: colors.bordaBege,
    alignItems: "center",
    justifyContent: "center",
  },
  chipSelecionado: {
    borderWidth: 3,
    borderColor: colors.dourado,
    elevation: 3,
  },
  chipSimbolo: {
    fontSize: 24,
    fontWeight: "900",
  },
  chipSimboloVermelho: {
    color: colors.vermelhoNaipe,
  },
  chipSimboloPreto: {
    color: colors.pretoNaipe,
  },
  botaoGuardar: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.vermelhoNaipe,
    borderWidth: 2,
    borderColor: colors.vermelhoEscuro,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  botaoGuardarPremido: {
    backgroundColor: colors.vermelhoEscuro,
  },
  textoGuardar: {
    color: colors.cartaBege,
    fontSize: 18,
    fontWeight: "900",
  },
  botaoCancelar: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  textoCancelar: {
    color: colors.vermelhoEscuro,
    fontSize: 16,
    fontWeight: "700",
  },
});
