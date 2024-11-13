export interface Recado {
  id: string;
  remetenteId: string;
  nomeEmailRemetente: string;
  dataEnvio: Date;
  assunto: string;
  mensagem: string;
  editedAt?: Date;
}
