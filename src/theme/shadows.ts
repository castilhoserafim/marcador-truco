import { Platform, type ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';

type OpcoesSombra = {
  opacidade?: number;
  raio?: number;
  deslocamentoY?: number;
  elevacao?: number;
};

export function sombraFicha({
  opacidade = 0.28,
  raio = 8,
  deslocamentoY = 4,
  elevacao = 6,
}: OpcoesSombra = {}): ViewStyle {
  if (Platform.OS === 'android') {
    return { elevation: elevacao };
  }
  return {
    shadowColor: colors.pretoNaipe,
    shadowOffset: { width: 0, height: deslocamentoY },
    shadowOpacity: opacidade,
    shadowRadius: raio,
  };
}

export const sombraFichaSuave = sombraFicha({
  opacidade: 0.22,
  raio: 6,
  deslocamentoY: 3,
  elevacao: 4,
});

export const sombraFichaFunda = sombraFicha({
  opacidade: 0.34,
  raio: 10,
  deslocamentoY: 5,
  elevacao: 8,
});

export const sombraFichaPremida = sombraFicha({
  opacidade: 0.14,
  raio: 3,
  deslocamentoY: 1,
  elevacao: 2,
});

export const pressionadoFicha = {
  transform: [{ translateY: 2 }],
} as const;
