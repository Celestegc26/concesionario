import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProveedor, NewProveedor } from '../proveedor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProveedor for edit and NewProveedorFormGroupInput for create.
 */
type ProveedorFormGroupInput = IProveedor | PartialWithRequiredKeyOf<NewProveedor>;

type ProveedorFormDefaults = Pick<NewProveedor, 'id'>;

type ProveedorFormGroupContent = {
  id: FormControl<IProveedor['id'] | NewProveedor['id']>;
  nombre: FormControl<IProveedor['nombre']>;
  direcion: FormControl<IProveedor['direcion']>;
  contacto: FormControl<IProveedor['contacto']>;
  cif: FormControl<IProveedor['cif']>;
};

export type ProveedorFormGroup = FormGroup<ProveedorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProveedorFormService {
  createProveedorFormGroup(proveedor: ProveedorFormGroupInput = { id: null }): ProveedorFormGroup {
    const proveedorRawValue = {
      ...this.getFormDefaults(),
      ...proveedor,
    };
    return new FormGroup<ProveedorFormGroupContent>({
      id: new FormControl(
        { value: proveedorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombre: new FormControl(proveedorRawValue.nombre),
      direcion: new FormControl(proveedorRawValue.direcion),
      contacto: new FormControl(proveedorRawValue.contacto),
      cif: new FormControl(proveedorRawValue.cif),
    });
  }

  getProveedor(form: ProveedorFormGroup): IProveedor | NewProveedor {
    return form.getRawValue() as IProveedor | NewProveedor;
  }

  resetForm(form: ProveedorFormGroup, proveedor: ProveedorFormGroupInput): void {
    const proveedorRawValue = { ...this.getFormDefaults(), ...proveedor };
    form.reset(
      {
        ...proveedorRawValue,
        id: { value: proveedorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProveedorFormDefaults {
    return {
      id: null,
    };
  }
}
