import { Responsavel } from "../../../shared/interfaces/responsavel";

export const responsavelFatima: Responsavel = {
  id: '7c0eec45-c3c3-440f-81c4-5ceb3f00786c',
  nome: 'Fátima Abreu',
  email: 'fatima@gmail.com',
  criancas: [
    { id: "333b3875-00be-4031-aada-f89bb9aeab2f", nome: 'João Pedro', genero: 'Masculino', turma: 'Turma A', idResponsavel: "7c0eec45-c3c3-440f-81c4-5ceb3f00786c" }
  ]
};

export const responsavelJoana: Responsavel = {
  id: '5830b07f-834b-48b1-8301-aacefbbbca8b',
  nome: 'Joana Fernandes',
  email: 'joana@gmail.com',
  criancas: [
    { id: "9e67993a-bc1f-490c-99ef-9a8f60949336", nome: 'Valentina Santos', genero: 'Feminino', turma: 'Turma B', idResponsavel: "5830b07f-834b-48b1-8301-aacefbbbca8b" },
    { id: "79cf7a23-3391-4a63-bd83-dc0a160aadd1", nome: 'Ana Julia', genero: 'Feminino', turma: 'Turma C', idResponsavel: "5830b07f-834b-48b1-8301-aacefbbbca8b" }
  ]
};

export const responsavelMocks = {
  responsavelFatima,
  responsavelJoana
};
