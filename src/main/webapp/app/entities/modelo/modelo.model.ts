import { IVehiculo } from 'app/entities/vehiculo/vehiculo.model';

export interface IModelo {
  id: number;
  nombre?: string | null;
  marca?: string | null;
  vehiculo?: Pick<IVehiculo, 'id'> | null;
}

export type NewModelo = Omit<IModelo, 'id'> & { id: null };
