export interface IEmpleado {
  id: number;
  nif?: string | null;
  nombre?: string | null;
  apellidos?: string | null;
  puesto?: string | null;
  salario?: number | null;
  contacto?: string | null;
}

export type NewEmpleado = Omit<IEmpleado, 'id'> & { id: null };
