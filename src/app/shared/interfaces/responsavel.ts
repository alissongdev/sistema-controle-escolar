import { Crianca } from "./crianca";

export interface Responsavel {
  id: string;
  nome: string;
  email: string;
  criancas: Crianca[];
}
