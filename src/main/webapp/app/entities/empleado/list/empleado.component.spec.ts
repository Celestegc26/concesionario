import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EmpleadoService } from '../service/empleado.service';

import { EmpleadoComponent } from './empleado.component';

describe('Empleado Management Component', () => {
  let comp: EmpleadoComponent;
  let fixture: ComponentFixture<EmpleadoComponent>;
  let service: EmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'empleado', component: EmpleadoComponent }]), HttpClientTestingModule],
      declarations: [EmpleadoComponent],
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
      .overrideTemplate(EmpleadoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmpleadoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EmpleadoService);

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
    expect(comp.empleados?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to empleadoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getEmpleadoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEmpleadoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
