import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVehiculo, NewVehiculo } from '../vehiculo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVehiculo for edit and NewVehiculoFormGroupInput for create.
 */
type VehiculoFormGroupInput = IVehiculo | PartialWithRequiredKeyOf<NewVehiculo>;

type VehiculoFormDefaults = Pick<NewVehiculo, 'id'>;

type VehiculoFormGroupContent = {
  id: FormControl<IVehiculo['id'] | NewVehiculo['id']>;
  tipo: FormControl<IVehiculo['tipo']>;
  matricula: FormControl<IVehiculo['matricula']>;
  marca: FormControl<IVehiculo['marca']>;
  modelo: FormControl<IVehiculo['modelo']>;
  color: FormControl<IVehiculo['color']>;
  ano: FormControl<IVehiculo['ano']>;
  precio: FormControl<IVehiculo['precio']>;
  motor: FormControl<IVehiculo['motor']>;
  proveedor: FormControl<IVehiculo['proveedor']>;
};

export type VehiculoFormGroup = FormGroup<VehiculoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VehiculoFormService {
  createVehiculoFormGroup(vehiculo: VehiculoFormGroupInput = { id: null }): VehiculoFormGroup {
    const vehiculoRawValue = {
      ...this.getFormDefaults(),
      ...vehiculo,
    };
    return new FormGroup<VehiculoFormGroupContent>({
      id: new FormControl(
        { value: vehiculoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      tipo: new FormControl(vehiculoRawValue.tipo),
      matricula: new FormControl(vehiculoRawValue.matricula),
      marca: new FormControl(vehiculoRawValue.marca),
      modelo: new FormControl(vehiculoRawValue.modelo),
      color: new FormControl(vehiculoRawValue.color),
      ano: new FormControl(vehiculoRawValue.ano),
      precio: new FormControl(vehiculoRawValue.precio),
      motor: new FormControl(vehiculoRawValue.motor),
      proveedor: new FormControl(vehiculoRawValue.proveedor),
    });
  }

  getVehiculo(form: VehiculoFormGroup): IVehiculo | NewVehiculo {
    return form.getRawValue() as IVehiculo | NewVehiculo;
  }

  resetForm(form: VehiculoFormGroup, vehiculo: VehiculoFormGroupInput): void {
    const vehiculoRawValue = { ...this.getFormDefaults(), ...vehiculo };
    form.reset(
      {
        ...vehiculoRawValue,
        id: { value: vehiculoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VehiculoFormDefaults {
    return {
      id: null,
    };
  }
}
