import dayjs from 'dayjs/esm';

import { IVenta, NewVenta } from './venta.model';

export const sampleWithRequiredData: IVenta = {
  id: 20448,
};

export const sampleWithPartialData: IVenta = {
  id: 79952,
};

export const sampleWithFullData: IVenta = {
  id: 32725,
  fecha: dayjs('2023-03-28'),
};

export const sampleWithNewData: NewVenta = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
