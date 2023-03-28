import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ModeloFormService } from './modelo-form.service';
import { ModeloService } from '../service/modelo.service';
import { IModelo } from '../modelo.model';
import { IVehiculo } from 'app/entities/vehiculo/vehiculo.model';
import { VehiculoService } from 'app/entities/vehiculo/service/vehiculo.service';

import { ModeloUpdateComponent } from './modelo-update.component';

describe('Modelo Management Update Component', () => {
  let comp: ModeloUpdateComponent;
  let fixture: ComponentFixture<ModeloUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let modeloFormService: ModeloFormService;
  let modeloService: ModeloService;
  let vehiculoService: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ModeloUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ModeloUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ModeloUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    modeloFormService = TestBed.inject(ModeloFormService);
    modeloService = TestBed.inject(ModeloService);
    vehiculoService = TestBed.inject(VehiculoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Vehiculo query and add missing value', () => {
      const modelo: IModelo = { id: 456 };
      const vehiculo: IVehiculo = { id: 65749 };
      modelo.vehiculo = vehiculo;

      const vehiculoCollection: IVehiculo[] = [{ id: 76981 }];
      jest.spyOn(vehiculoService, 'query').mockReturnValue(of(new HttpResponse({ body: vehiculoCollection })));
      const additionalVehiculos = [vehiculo];
      const expectedCollection: IVehiculo[] = [...additionalVehiculos, ...vehiculoCollection];
      jest.spyOn(vehiculoService, 'addVehiculoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      expect(vehiculoService.query).toHaveBeenCalled();
      expect(vehiculoService.addVehiculoToCollectionIfMissing).toHaveBeenCalledWith(
        vehiculoCollection,
        ...additionalVehiculos.map(expect.objectContaining)
      );
      expect(comp.vehiculosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const modelo: IModelo = { id: 456 };
      const vehiculo: IVehiculo = { id: 14306 };
      modelo.vehiculo = vehiculo;

      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      expect(comp.vehiculosSharedCollection).toContain(vehiculo);
      expect(comp.modelo).toEqual(modelo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModelo>>();
      const modelo = { id: 123 };
      jest.spyOn(modeloFormService, 'getModelo').mockReturnValue(modelo);
      jest.spyOn(modeloService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: modelo }));
      saveSubject.complete();

      // THEN
      expect(modeloFormService.getModelo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(modeloService.update).toHaveBeenCalledWith(expect.objectContaining(modelo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModelo>>();
      const modelo = { id: 123 };
      jest.spyOn(modeloFormService, 'getModelo').mockReturnValue({ id: null });
      jest.spyOn(modeloService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modelo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: modelo }));
      saveSubject.complete();

      // THEN
      expect(modeloFormService.getModelo).toHaveBeenCalled();
      expect(modeloService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModelo>>();
      const modelo = { id: 123 };
      jest.spyOn(modeloService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(modeloService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareVehiculo', () => {
      it('Should forward to vehiculoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(vehiculoService, 'compareVehiculo');
        comp.compareVehiculo(entity, entity2);
        expect(vehiculoService.compareVehiculo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
