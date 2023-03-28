import { IModelo, NewModelo } from './modelo.model';

export const sampleWithRequiredData: IModelo = {
  id: 68764,
};

export const sampleWithPartialData: IModelo = {
  id: 89185,
  nombre: 'quantify',
};

export const sampleWithFullData: IModelo = {
  id: 85306,
  nombre: 'Analista state Web',
  marca: 'Reducido bypassing Buckinghamshire',
};

export const sampleWithNewData: NewModelo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
