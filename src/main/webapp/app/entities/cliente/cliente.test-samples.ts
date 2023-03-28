import { ICliente, NewCliente } from './cliente.model';

export const sampleWithRequiredData: ICliente = {
  id: 45820,
};

export const sampleWithPartialData: ICliente = {
  id: 45839,
  nombre: 'Berkshire Genérico recontextualize',
  apellidos: 'HDD',
  direcion: 'synthesize Bicicleta enterprise',
};

export const sampleWithFullData: ICliente = {
  id: 51931,
  nif: 'Plástico JBOD',
  nombre: 'wireless Qatari',
  apellidos: 'back-end',
  direcion: 'Savings expedite',
  contacto: 'Libyan',
  numeroCuenta: 'haptic',
};

export const sampleWithNewData: NewCliente = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
