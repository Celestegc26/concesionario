import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../vehiculo.test-samples';

import { VehiculoFormService } from './vehiculo-form.service';

describe('Vehiculo Form Service', () => {
  let service: VehiculoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoFormService);
  });

  describe('Service methods', () => {
    describe('createVehiculoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVehiculoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tipo: expect.any(Object),
            mtricula: expect.any(Object),
            marca: expect.any(Object),
            modelo: expect.any(Object),
            color: expect.any(Object),
            ano: expect.any(Object),
            precio: expect.any(Object),
            motor: expect.any(Object),
            proveedor: expect.any(Object),
          })
        );
      });

      it('passing IVehiculo should create a new form with FormGroup', () => {
        const formGroup = service.createVehiculoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tipo: expect.any(Object),
            mtricula: expect.any(Object),
            marca: expect.any(Object),
            modelo: expect.any(Object),
            color: expect.any(Object),
            ano: expect.any(Object),
            precio: expect.any(Object),
            motor: expect.any(Object),
            proveedor: expect.any(Object),
          })
        );
      });
    });

    describe('getVehiculo', () => {
      it('should return NewVehiculo for default Vehiculo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createVehiculoFormGroup(sampleWithNewData);

        const vehiculo = service.getVehiculo(formGroup) as any;

        expect(vehiculo).toMatchObject(sampleWithNewData);
      });

      it('should return NewVehiculo for empty Vehiculo initial value', () => {
        const formGroup = service.createVehiculoFormGroup();

        const vehiculo = service.getVehiculo(formGroup) as any;

        expect(vehiculo).toMatchObject({});
      });

      it('should return IVehiculo', () => {
        const formGroup = service.createVehiculoFormGroup(sampleWithRequiredData);

        const vehiculo = service.getVehiculo(formGroup) as any;

        expect(vehiculo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVehiculo should not enable id FormControl', () => {
        const formGroup = service.createVehiculoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVehiculo should disable id FormControl', () => {
        const formGroup = service.createVehiculoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
