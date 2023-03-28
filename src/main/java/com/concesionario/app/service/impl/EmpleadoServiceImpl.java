package com.concesionario.app.service.impl;

import com.concesionario.app.domain.Empleado;
import com.concesionario.app.repository.EmpleadoRepository;
import com.concesionario.app.service.EmpleadoService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Empleado}.
 */
@Service
@Transactional
public class EmpleadoServiceImpl implements EmpleadoService {

    private final Logger log = LoggerFactory.getLogger(EmpleadoServiceImpl.class);

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoServiceImpl(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    @Override
    public Empleado save(Empleado empleado) {
        log.debug("Request to save Empleado : {}", empleado);
        return empleadoRepository.save(empleado);
    }

    @Override
    public Empleado update(Empleado empleado) {
        log.debug("Request to update Empleado : {}", empleado);
        return empleadoRepository.save(empleado);
    }

    @Override
    public Optional<Empleado> partialUpdate(Empleado empleado) {
        log.debug("Request to partially update Empleado : {}", empleado);

        return empleadoRepository
            .findById(empleado.getId())
            .map(existingEmpleado -> {
                if (empleado.getNif() != null) {
                    existingEmpleado.setNif(empleado.getNif());
                }
                if (empleado.getNombre() != null) {
                    existingEmpleado.setNombre(empleado.getNombre());
                }
                if (empleado.getApellidos() != null) {
                    existingEmpleado.setApellidos(empleado.getApellidos());
                }
                if (empleado.getPuesto() != null) {
                    existingEmpleado.setPuesto(empleado.getPuesto());
                }
                if (empleado.getSalario() != null) {
                    existingEmpleado.setSalario(empleado.getSalario());
                }
                if (empleado.getContacto() != null) {
                    existingEmpleado.setContacto(empleado.getContacto());
                }

                return existingEmpleado;
            })
            .map(empleadoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Empleado> findAll() {
        log.debug("Request to get all Empleados");
        return empleadoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Empleado> findOne(Long id) {
        log.debug("Request to get Empleado : {}", id);
        return empleadoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Empleado : {}", id);
        empleadoRepository.deleteById(id);
    }
}
