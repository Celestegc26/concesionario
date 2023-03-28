import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VehiculoService } from '../service/vehiculo.service';

import { VehiculoComponent } from './vehiculo.component';

describe('Vehiculo Management Component', () => {
  let comp: VehiculoComponent;
  let fixture: ComponentFixture<VehiculoComponent>;
  let service: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'vehiculo', component: VehiculoComponent }]), HttpClientTestingModule],
      declarations: [VehiculoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(VehiculoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VehiculoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VehiculoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.vehiculos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to vehiculoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVehiculoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVehiculoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
