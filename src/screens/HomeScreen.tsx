import { StatusBar } from 'expo-status-bar';
import { useReducer, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RenameTeamModal } from '@/components/RenameTeamModal';
import { ScoreColumn } from '@/components/ScoreColumn';
import { TrucoButton } from '@/components/TrucoButton';
import { UndoButton } from '@/components/UndoButton';
import { VictoryModal } from '@/components/VictoryModal';
import { estadoInicial, gameReducer } from '@/state/gameReducer';
import type { Equipe } from '@/state/types';
import { NOME_OMISSAO_ELES, NOME_OMISSAO_NOS } from '@/state/types';
import { colors } from '@/theme/colors';
import { pressionadoFicha, sombraFichaSuave } from '@/theme/shadows';

function vencedorDe(pontosNos: number, pontosEles: number): Equipe | null {
  if (pontosNos >= 12) {
    return 'nos';
  }
  if (pontosEles >= 12) {
    return 'eles';
  }
  return null;
}

export function HomeScreen() {
  const [estado, dispatch] = useReducer(gameReducer, estadoInicial);
  const [equipaARenomear, setEquipaARenomear] = useState<Equipe | null>(null);

  const maoDeOnze = estado.pontosNos === 11 || estado.pontosEles === 11;
  const maoDeFerro = estado.pontosNos === 11 && estado.pontosEles === 11;
  const vencedor = vencedorDe(estado.pontosNos, estado.pontosEles);
  const nomeVencedor =
    vencedor === 'nos' ? estado.nomeNos : vencedor === 'eles' ? estado.nomeEles : '';

  function confirmarNovaPartida() {
    Alert.alert('Nova partida', 'Repor o marcador e começar de novo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Nova partida',
        style: 'destructive',
        onPress: () => dispatch({ type: 'NOVA_PARTIDA' }),
      },
    ]);
  }

  const destaqueMao = estado.valorAtualDaMao > 1;
  const nomeOmissao = equipaARenomear === 'eles' ? NOME_OMISSAO_ELES : NOME_OMISSAO_NOS;
  const nomeAtualModal = equipaARenomear === 'eles' ? estado.nomeEles : estado.nomeNos;

  return (
    <View style={styles.fundo}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.barraSuperior}>
          <UndoButton
            desativado={estado.historico.length === 0}
            onPress={() => dispatch({ type: 'DESFAZER' })}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Nova partida"
            hitSlop={8}
            onPress={confirmarNovaPartida}
            style={({ pressed }) => [styles.botaoNova, pressed && pressionadoFicha]}>
            <Text style={styles.textoNova}>Nova partida</Text>
          </Pressable>
        </View>

        <View style={styles.placar}>
          <ScoreColumn
            equipe="nos"
            titulo={estado.nomeNos}
            naipe="♠"
            pontos={estado.pontosNos}
            valorDaMao={estado.valorAtualDaMao}
            onPontuar={(equipe) => dispatch({ type: 'PONTUAR', equipe })}
            onDecrementar={(equipe) => dispatch({ type: 'DECREMENTAR', equipe })}
            onEditarNome={setEquipaARenomear}
          />
          <ScoreColumn
            equipe="eles"
            titulo={estado.nomeEles}
            naipe="♥"
            pontos={estado.pontosEles}
            valorDaMao={estado.valorAtualDaMao}
            onPontuar={(equipe) => dispatch({ type: 'PONTUAR', equipe })}
            onDecrementar={(equipe) => dispatch({ type: 'DECREMENTAR', equipe })}
            onEditarNome={setEquipaARenomear}
          />
        </View>

        <View style={styles.zonaCentral}>
          <View style={[styles.pilulaMao, sombraFichaSuave]}>
            <Text style={styles.maoValePrefixo}>Mão vale </Text>
            <Text style={[styles.maoValeNumero, destaqueMao && styles.maoValeNumeroAlto]}>
              {estado.valorAtualDaMao}
            </Text>
            <Text style={styles.maoValePrefixo}>
              {estado.valorAtualDaMao === 1 ? ' ponto' : ' pontos'}
            </Text>
          </View>
          {maoDeOnze ? (
            <View style={styles.pilulaAviso}>
              <Text style={styles.avisoOnze}>
                {maoDeFerro ? 'Mão de Ferro' : 'Mão de 11'} — vale apenas 1 ponto
              </Text>
            </View>
          ) : (
            <View style={styles.reservaAviso} />
          )}
        </View>

        <View style={styles.zonaInferior}>
          <TrucoButton
            valorAtualDaMao={estado.valorAtualDaMao}
            modoCorrer={estado.modoCorrer}
            maoDeOnze={maoDeOnze}
            nomeNos={estado.nomeNos}
            nomeEles={estado.nomeEles}
            onAumentar={() => dispatch({ type: 'AUMENTAR_VALOR' })}
            onCancelarAumento={() => dispatch({ type: 'CANCELAR_AUMENTO' })}
            onAbrirCorrer={() => dispatch({ type: 'ABRIR_CORRER' })}
            onCancelarCorrer={() => dispatch({ type: 'CANCELAR_CORRER' })}
            onConfirmarCorrer={(equipeQueCorreu) =>
              dispatch({ type: 'CONFIRMAR_CORRER', equipeQueCorreu })
            }
          />
        </View>
      </SafeAreaView>

      <VictoryModal
        visivel={vencedor !== null}
        nomeVencedor={nomeVencedor}
        naipe={vencedor === 'eles' ? '♥' : '♠'}
        onNovaPartida={() => dispatch({ type: 'NOVA_PARTIDA' })}
        onDesfazer={() => dispatch({ type: 'DESFAZER' })}
      />

      <RenameTeamModal
        visivel={equipaARenomear !== null}
        nomeAtual={nomeAtualModal}
        nomeOmissao={nomeOmissao}
        onGuardar={(nome) => {
          if (equipaARenomear !== null) {
            dispatch({ type: 'RENOMEAR_EQUIPE', equipe: equipaARenomear, nome });
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  botaoNova: {
    minHeight: 48,
    minWidth: 48,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 16,
  },
  textoNova: {
    color: colors.cartaBege,
    fontSize: 15,
    fontWeight: '700',
  },
  placar: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
  },
  zonaCentral: {
    paddingVertical: 12,
    alignItems: 'center',
    gap: 8,
  },
  pilulaMao: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: colors.cartaBege,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.bordaBege,
    paddingHorizontal: 18,
    paddingVertical: 8,
    minHeight: 48,
  },
  maoValePrefixo: {
    color: colors.pretoNaipe,
    fontSize: 18,
    fontWeight: '700',
  },
  maoValeNumero: {
    color: colors.pretoNaipe,
    fontSize: 26,
    fontWeight: '900',
  },
  maoValeNumeroAlto: {
    color: colors.vermelhoNaipe,
  },
  pilulaAviso: {
    backgroundColor: colors.pretoNaipe,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: 40,
    justifyContent: 'center',
  },
  reservaAviso: {
    minHeight: 40,
  },
  avisoOnze: {
    color: colors.cartaBege,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  zonaInferior: {
    paddingBottom: 8,
  },
});
