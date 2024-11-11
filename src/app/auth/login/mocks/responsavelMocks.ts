import { Responsavel } from '../../../shared/interfaces/responsavel';
import {
  anaJulia,
  joaoPedro,
  valentinaSantos,
} from '../../../shared/mocks/criancasMocks';

export const responsavelFatima: Responsavel = {
  id: '7c0eec45-c3c3-440f-81c4-5ceb3f00786c',
  nome: 'Fátima Abreu',
  email: 'fatima@gmail.com',
  criancas: [joaoPedro],
};

export const responsavelJoana: Responsavel = {
  id: '5830b07f-834b-48b1-8301-aacefbbbca8b',
  nome: 'Joana Fernandes',
  email: 'joana@gmail.com',
  criancas: [valentinaSantos, anaJulia],
};

export const responsavelMocks = {
  responsavelFatima,
  responsavelJoana,
};
