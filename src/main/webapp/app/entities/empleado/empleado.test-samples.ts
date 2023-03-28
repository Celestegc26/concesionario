import { IEmpleado, NewEmpleado } from './empleado.model';

export const sampleWithRequiredData: IEmpleado = {
  id: 19124,
};

export const sampleWithPartialData: IEmpleado = {
  id: 15515,
  nombre: 'Nepal',
  apellidos: 'Joyería Plástico program',
  puesto: 'Total invoice Senior',
  salario: 39291,
};

export const sampleWithFullData: IEmpleado = {
  id: 96699,
  nif: 'circuit',
  nombre: 'mission-critical Checking',
  apellidos: 'multi-byte SCSI',
  puesto: 'dedicada invoice',
  salario: 34447,
  contacto: 'Pantalones',
};

export const sampleWithNewData: NewEmpleado = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
