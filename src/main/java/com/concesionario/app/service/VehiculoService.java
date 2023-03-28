package com.concesionario.app.service;

import com.concesionario.app.domain.Vehiculo;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Vehiculo}.
 */
public interface VehiculoService {
    /**
     * Save a vehiculo.
     *
     * @param vehiculo the entity to save.
     * @return the persisted entity.
     */
    Vehiculo save(Vehiculo vehiculo);

    /**
     * Updates a vehiculo.
     *
     * @param vehiculo the entity to update.
     * @return the persisted entity.
     */
    Vehiculo update(Vehiculo vehiculo);

    /**
     * Partially updates a vehiculo.
     *
     * @param vehiculo the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Vehiculo> partialUpdate(Vehiculo vehiculo);

    /**
     * Get all the vehiculos.
     *
     * @return the list of entities.
     */
    List<Vehiculo> findAll();
    /**
     * Get all the Vehiculo where Venta is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<Vehiculo> findAllWhereVentaIsNull();

    /**
     * Get the "id" vehiculo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Vehiculo> findOne(Long id);

    /**
     * Delete the "id" vehiculo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
