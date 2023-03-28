export interface ICliente {
  id: number;
  nif?: string | null;
  nombre?: string | null;
  apellidos?: string | null;
  direcion?: string | null;
  contacto?: string | null;
  numeroCuenta?: string | null;
}

export type NewCliente = Omit<ICliente, 'id'> & { id: null };
