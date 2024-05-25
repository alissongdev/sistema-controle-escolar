import { Responsavel } from "../../../shared/interfaces/responsavel";

export interface LoginResponse {
  success: boolean;
  userType: string;
  responsavel?: Responsavel;
}
