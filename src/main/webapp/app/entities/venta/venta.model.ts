import dayjs from 'dayjs/esm';
import { IVehiculo } from 'app/entities/vehiculo/vehiculo.model';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { ICliente } from 'app/entities/cliente/cliente.model';

export interface IVenta {
  id: number;
  fecha?: dayjs.Dayjs | null;
  vehiculo?: Pick<IVehiculo, 'id'> | null;
  empleado?: Pick<IEmpleado, 'id'> | null;
  cliente?: Pick<ICliente, 'id'> | null;
}

export type NewVenta = Omit<IVenta, 'id'> & { id: null };
