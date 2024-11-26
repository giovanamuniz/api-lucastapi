export interface Agendamento {
  id: number;
  data: string; 
  horario: string; 
  tipo: string;
  paciente_id: number;
  profissional_id: number;
}
