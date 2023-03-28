package com.concesionario.app.service;

import com.concesionario.app.domain.Empleado;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Empleado}.
 */
public interface EmpleadoService {
    /**
     * Save a empleado.
     *
     * @param empleado the entity to save.
     * @return the persisted entity.
     */
    Empleado save(Empleado empleado);

    /**
     * Updates a empleado.
     *
     * @param empleado the entity to update.
     * @return the persisted entity.
     */
    Empleado update(Empleado empleado);

    /**
     * Partially updates a empleado.
     *
     * @param empleado the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Empleado> partialUpdate(Empleado empleado);

    /**
     * Get all the empleados.
     *
     * @return the list of entities.
     */
    List<Empleado> findAll();

    /**
     * Get the "id" empleado.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Empleado> findOne(Long id);

    /**
     * Delete the "id" empleado.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
