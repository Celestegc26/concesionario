import { IProveedor, NewProveedor } from './proveedor.model';

export const sampleWithRequiredData: IProveedor = {
  id: 27795,
};

export const sampleWithPartialData: IProveedor = {
  id: 88102,
  nombre: 'collaborative',
  direcion: 'Algodón Programa',
};

export const sampleWithFullData: IProveedor = {
  id: 60537,
  nombre: 'móbil XSS Factores',
  direcion: 'Metal',
  contacto: 'deposit program',
  cif: 'Cine',
};

export const sampleWithNewData: NewProveedor = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
