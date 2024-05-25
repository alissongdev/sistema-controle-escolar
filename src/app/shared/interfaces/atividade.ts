import { Crianca } from "./crianca";
import { Monitor } from "./monitor"; 

export interface Atividade {
  id: string;
  data: Date;
  monitor: Monitor;
  crianca: Crianca;
  tipoAtividade: TipoAtividade;
  status: AtividadeRealizada;
  periodo?: Periodo
}

export enum TipoAtividade {
  CAFE = "Café da Manhã",
  ALMOCO = "Almoço",
  LANCHE = "Lanche da Tarde",
  JANTA = "Janta",
  BRINCADEIRA = "Brincadeira",
  SONO = "Sono",
  BANHO = "Banho",
  FEZES = "Fezes",
  URINA = "Urina",
  MEDICACAO = "Medicação"
}

export enum AtividadeRealizada {
  SIM = "Sim",
  NAO = "Não",
  POUCO = "Pouco"
}

export enum Periodo {
  MANHA = "Manhã",
  TARDE = "Tarde"
}
