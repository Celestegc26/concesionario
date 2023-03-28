package com.concesionario.app.service.impl;

import com.concesionario.app.domain.Proveedor;
import com.concesionario.app.repository.ProveedorRepository;
import com.concesionario.app.service.ProveedorService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Proveedor}.
 */
@Service
@Transactional
public class ProveedorServiceImpl implements ProveedorService {

    private final Logger log = LoggerFactory.getLogger(ProveedorServiceImpl.class);

    private final ProveedorRepository proveedorRepository;

    public ProveedorServiceImpl(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    @Override
    public Proveedor save(Proveedor proveedor) {
        log.debug("Request to save Proveedor : {}", proveedor);
        return proveedorRepository.save(proveedor);
    }

    @Override
    public Proveedor update(Proveedor proveedor) {
        log.debug("Request to update Proveedor : {}", proveedor);
        return proveedorRepository.save(proveedor);
    }

    @Override
    public Optional<Proveedor> partialUpdate(Proveedor proveedor) {
        log.debug("Request to partially update Proveedor : {}", proveedor);

        return proveedorRepository
            .findById(proveedor.getId())
            .map(existingProveedor -> {
                if (proveedor.getNombre() != null) {
                    existingProveedor.setNombre(proveedor.getNombre());
                }
                if (proveedor.getDirecion() != null) {
                    existingProveedor.setDirecion(proveedor.getDirecion());
                }
                if (proveedor.getContacto() != null) {
                    existingProveedor.setContacto(proveedor.getContacto());
                }
                if (proveedor.getCif() != null) {
                    existingProveedor.setCif(proveedor.getCif());
                }

                return existingProveedor;
            })
            .map(proveedorRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Proveedor> findAll() {
        log.debug("Request to get all Proveedors");
        return proveedorRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Proveedor> findOne(Long id) {
        log.debug("Request to get Proveedor : {}", id);
        return proveedorRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Proveedor : {}", id);
        proveedorRepository.deleteById(id);
    }
}
