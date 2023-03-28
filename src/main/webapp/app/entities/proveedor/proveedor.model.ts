export interface IProveedor {
  id: number;
  nombre?: string | null;
  direcion?: string | null;
  contacto?: string | null;
  cif?: string | null;
}

export type NewProveedor = Omit<IProveedor, 'id'> & { id: null };
