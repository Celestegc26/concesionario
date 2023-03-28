import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ModeloFormService, ModeloFormGroup } from './modelo-form.service';
import { IModelo } from '../modelo.model';
import { ModeloService } from '../service/modelo.service';
import { IVehiculo } from 'app/entities/vehiculo/vehiculo.model';
import { VehiculoService } from 'app/entities/vehiculo/service/vehiculo.service';

@Component({
  selector: 'jhi-modelo-update',
  templateUrl: './modelo-update.component.html',
})
export class ModeloUpdateComponent implements OnInit {
  isSaving = false;
  modelo: IModelo | null = null;

  vehiculosSharedCollection: IVehiculo[] = [];

  editForm: ModeloFormGroup = this.modeloFormService.createModeloFormGroup();

  constructor(
    protected modeloService: ModeloService,
    protected modeloFormService: ModeloFormService,
    protected vehiculoService: VehiculoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareVehiculo = (o1: IVehiculo | null, o2: IVehiculo | null): boolean => this.vehiculoService.compareVehiculo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modelo }) => {
      this.modelo = modelo;
      if (modelo) {
        this.updateForm(modelo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const modelo = this.modeloFormService.getModelo(this.editForm);
    if (modelo.id !== null) {
      this.subscribeToSaveResponse(this.modeloService.update(modelo));
    } else {
      this.subscribeToSaveResponse(this.modeloService.create(modelo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModelo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(modelo: IModelo): void {
    this.modelo = modelo;
    this.modeloFormService.resetForm(this.editForm, modelo);

    this.vehiculosSharedCollection = this.vehiculoService.addVehiculoToCollectionIfMissing<IVehiculo>(
      this.vehiculosSharedCollection,
      modelo.vehiculo
    );
  }

  protected loadRelationshipsOptions(): void {
    this.vehiculoService
      .query()
      .pipe(map((res: HttpResponse<IVehiculo[]>) => res.body ?? []))
      .pipe(
        map((vehiculos: IVehiculo[]) => this.vehiculoService.addVehiculoToCollectionIfMissing<IVehiculo>(vehiculos, this.modelo?.vehiculo))
      )
      .subscribe((vehiculos: IVehiculo[]) => (this.vehiculosSharedCollection = vehiculos));
  }
}
