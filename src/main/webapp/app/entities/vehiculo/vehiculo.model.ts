import { IProveedor } from 'app/entities/proveedor/proveedor.model';

export interface IVehiculo {
  id: number;
  tipo?: string | null;
  matricula?: string | null;
  marca?: string | null;
  modelo?: string | null;
  color?: string | null;
  ano?: string | null;
  precio?: number | null;
  motor?: string | null;
  proveedor?: Pick<IProveedor, 'id'> | null;
}

export type NewVehiculo = Omit<IVehiculo, 'id'> & { id: null };
