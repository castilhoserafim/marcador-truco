import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaoBadge } from "@/components/MaoBadge";
import { RenameTeamModal } from "@/components/RenameTeamModal";
import { ScoreColumn } from "@/components/ScoreColumn";
import { TrucoButton } from "@/components/TrucoButton";
import { UndoButton } from "@/components/UndoButton";
import { VictoryModal } from "@/components/VictoryModal";
import { estadoInicial, gameReducer } from "@/state/gameReducer";
import { estadoMaoDe11 } from "@/state/regras";
import type { Equipe } from "@/state/types";
import { NOME_OMISSAO_ELES, NOME_OMISSAO_NOS } from "@/state/types";
import { colors } from "@/theme/colors";
import { pressionadoFicha } from "@/theme/shadows";

function vencedorDe(pontosNos: number, pontosEles: number): Equipe | null {
  if (pontosNos >= 12) {
    return "nos";
  }
  if (pontosEles >= 12) {
    return "eles";
  }
  return null;
}

function modoPontuarDe(
  situacao: ReturnType<typeof estadoMaoDe11>,
  equipe: Equipe,
): "normal" | "comOnze" | "abaixoDeOnze" {
  if (situacao.tipo !== "maoDe11") {
    return "normal";
  }
  return situacao.equipeCom11 === equipe ? "comOnze" : "abaixoDeOnze";
}

export function HomeScreen() {
  const [estado, dispatch] = useReducer(gameReducer, estadoInicial);
  const [equipaARenomear, setEquipaARenomear] = useState<Equipe | null>(null);

  const situacaoOnze = estadoMaoDe11(estado.pontosNos, estado.pontosEles);
  const maoDeOnze = situacaoOnze.tipo !== "normal";
  const vencedor = vencedorDe(estado.pontosNos, estado.pontosEles);
  const nomeVencedor =
    vencedor === "nos"
      ? estado.nomeNos
      : vencedor === "eles"
        ? estado.nomeEles
        : "";
  const naipeVencedor = vencedor === "nos" ? estado.naipeNos : estado.naipeEles;

  function confirmarNovaPartida() {
    Alert.alert("Nova partida", "Repor o marcador e começar de novo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Nova partida",
        style: "destructive",
        onPress: () => dispatch({ type: "NOVA_PARTIDA" }),
      },
    ]);
  }

  const nomeOmissao =
    equipaARenomear === "eles" ? NOME_OMISSAO_ELES : NOME_OMISSAO_NOS;
  const nomeAtualModal =
    equipaARenomear === "eles" ? estado.nomeEles : estado.nomeNos;
  const naipeAtualModal =
    equipaARenomear === "eles" ? estado.naipeEles : estado.naipeNos;

  return (
    <View style={styles.fundo}>
      <StatusBar style="light" />
      <SafeAreaView
        style={styles.safe}
        edges={["top", "left", "right", "bottom"]}
      >
        <View style={styles.barraSuperior}>
          <UndoButton
            desativado={estado.historico.length === 0}
            onPress={() => dispatch({ type: "DESFAZER" })}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Nova partida"
            hitSlop={8}
            onPress={confirmarNovaPartida}
            style={({ pressed }) => [
              styles.botaoNova,
              pressed && pressionadoFicha,
            ]}
          >
            <Text style={styles.textoNova}>Nova partida</Text>
          </Pressable>
        </View>

        <View style={styles.placar}>
          <ScoreColumn
            equipe="nos"
            titulo={estado.nomeNos}
            naipe={estado.naipeNos}
            pontos={estado.pontosNos}
            valorDaMao={estado.valorAtualDaMao}
            modoPontuar={modoPontuarDe(situacaoOnze, "nos")}
            nomeAdversario={estado.nomeEles}
            onPontuar={(equipe) => dispatch({ type: "PONTUAR", equipe })}
            onPontuarMaoDeOnze={(equipe, pontos) =>
              dispatch({ type: "PONTUAR_MAO_DE_11", equipe, pontos })
            }
            onDecrementar={(equipe) =>
              dispatch({ type: "DECREMENTAR", equipe })
            }
            onEditarNome={setEquipaARenomear}
          />
          <ScoreColumn
            equipe="eles"
            titulo={estado.nomeEles}
            naipe={estado.naipeEles}
            pontos={estado.pontosEles}
            valorDaMao={estado.valorAtualDaMao}
            modoPontuar={modoPontuarDe(situacaoOnze, "eles")}
            nomeAdversario={estado.nomeNos}
            onPontuar={(equipe) => dispatch({ type: "PONTUAR", equipe })}
            onPontuarMaoDeOnze={(equipe, pontos) =>
              dispatch({ type: "PONTUAR_MAO_DE_11", equipe, pontos })
            }
            onDecrementar={(equipe) =>
              dispatch({ type: "DECREMENTAR", equipe })
            }
            onEditarNome={setEquipaARenomear}
          />
        </View>

        <View style={styles.zonaCentral}>
          <MaoBadge
            valorAtualDaMao={estado.valorAtualDaMao}
            situacao={situacaoOnze}
            nomeNos={estado.nomeNos}
            nomeEles={estado.nomeEles}
          />
        </View>

        <View style={styles.zonaInferior}>
          <TrucoButton
            valorAtualDaMao={estado.valorAtualDaMao}
            modoCorrer={estado.modoCorrer}
            maoDeOnze={maoDeOnze}
            nomeNos={estado.nomeNos}
            nomeEles={estado.nomeEles}
            onAumentar={() => dispatch({ type: "AUMENTAR_VALOR" })}
            onCancelarAumento={() => dispatch({ type: "CANCELAR_AUMENTO" })}
            onAbrirCorrer={() => dispatch({ type: "ABRIR_CORRER" })}
            onCancelarCorrer={() => dispatch({ type: "CANCELAR_CORRER" })}
            onConfirmarCorrer={(equipeQueCorreu) =>
              dispatch({ type: "CONFIRMAR_CORRER", equipeQueCorreu })
            }
          />
        </View>
      </SafeAreaView>

      <VictoryModal
        visivel={vencedor !== null}
        nomeVencedor={nomeVencedor}
        naipe={naipeVencedor}
        onNovaPartida={() => dispatch({ type: "NOVA_PARTIDA" })}
        onDesfazer={() => dispatch({ type: "DESFAZER" })}
      />

      <RenameTeamModal
        visivel={equipaARenomear !== null}
        nomeAtual={nomeAtualModal}
        nomeOmissao={nomeOmissao}
        naipeAtual={naipeAtualModal}
        onGuardar={(nome, naipe) => {
          if (equipaARenomear !== null) {
            dispatch({
              type: "EDITAR_EQUIPE",
              equipe: equipaARenomear,
              nome,
              naipe,
            });
          }
          setEquipaARenomear(null);
        }}
        onCancelar={() => setEquipaARenomear(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: colors.feltro,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 12,
  },
  barraSuperior: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
  },
  botaoNova: {
    minHeight: 48,
    minWidth: 48,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 16,
  },
  textoNova: {
    color: colors.cartaBege,
    fontSize: 15,
    fontWeight: "700",
  },
  placar: {
    flex: 1,
    flexDirection: "row",
    marginTop: 8,
    gap: 10,
  },
  zonaCentral: {
    paddingVertical: 12,
    alignItems: "center",
  },
  zonaInferior: {
    paddingBottom: 8,
  },
});
