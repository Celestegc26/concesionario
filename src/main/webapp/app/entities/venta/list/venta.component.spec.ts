import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VentaService } from '../service/venta.service';

import { VentaComponent } from './venta.component';

describe('Venta Management Component', () => {
  let comp: VentaComponent;
  let fixture: ComponentFixture<VentaComponent>;
  let service: VentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'venta', component: VentaComponent }]), HttpClientTestingModule],
      declarations: [VentaComponent],
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
      .overrideTemplate(VentaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VentaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VentaService);

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
    expect(comp.ventas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ventaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVentaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVentaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
