import { IVehiculo, NewVehiculo } from './vehiculo.model';

export const sampleWithRequiredData: IVehiculo = {
  id: 59193,
};

export const sampleWithPartialData: IVehiculo = {
  id: 25965,
  mtricula: 'back wireless Grupo',
  color: 'Morado',
  motor: 'Verde program Hogar',
};

export const sampleWithFullData: IVehiculo = {
  id: 23232,
  tipo: 'cliente Cuentas back-end',
  mtricula: 'Humano',
  marca: 'navigate deposit',
  modelo: 'Contabilidad Liechtenstein',
  color: 'Violeta',
  ano: 'Galicia integrated',
  precio: 37448,
  motor: 'Extremadura Borders',
};

export const sampleWithNewData: NewVehiculo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
