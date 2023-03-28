import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'vehiculo',
        data: { pageTitle: 'concesionarioApp.vehiculo.home.title' },
        loadChildren: () => import('./vehiculo/vehiculo.module').then(m => m.VehiculoModule),
      },
      {
        path: 'empleado',
        data: { pageTitle: 'concesionarioApp.empleado.home.title' },
        loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule),
      },
      {
        path: 'cliente',
        data: { pageTitle: 'concesionarioApp.cliente.home.title' },
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'proveedor',
        data: { pageTitle: 'concesionarioApp.proveedor.home.title' },
        loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule),
      },
      {
        path: 'venta',
        data: { pageTitle: 'concesionarioApp.venta.home.title' },
        loadChildren: () => import('./venta/venta.module').then(m => m.VentaModule),
      },
      {
        path: 'modelo',
        data: { pageTitle: 'concesionarioApp.modelo.home.title' },
        loadChildren: () => import('./modelo/modelo.module').then(m => m.ModeloModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
