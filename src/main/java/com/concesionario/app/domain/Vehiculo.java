package com.concesionario.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Vehiculo.
 */
@Entity
@Table(name = "vehiculo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Vehiculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "mtricula")
    private String mtricula;

    @Column(name = "marca")
    private String marca;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "color")
    private String color;

    @Column(name = "ano")
    private String ano;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "motor")
    private String motor;

    @ManyToOne
    @JsonIgnoreProperties(value = { "vehiculos" }, allowSetters = true)
    private Proveedor proveedor;

    @JsonIgnoreProperties(value = { "vehiculo", "empleado", "cliente" }, allowSetters = true)
    @OneToOne(mappedBy = "vehiculo")
    private Venta venta;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Vehiculo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return this.tipo;
    }

    public Vehiculo tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getMtricula() {
        return this.mtricula;
    }

    public Vehiculo mtricula(String mtricula) {
        this.setMtricula(mtricula);
        return this;
    }

    public void setMtricula(String mtricula) {
        this.mtricula = mtricula;
    }

    public String getMarca() {
        return this.marca;
    }

    public Vehiculo marca(String marca) {
        this.setMarca(marca);
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return this.modelo;
    }

    public Vehiculo modelo(String modelo) {
        this.setModelo(modelo);
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getColor() {
        return this.color;
    }

    public Vehiculo color(String color) {
        this.setColor(color);
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getAno() {
        return this.ano;
    }

    public Vehiculo ano(String ano) {
        this.setAno(ano);
        return this;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public Float getPrecio() {
        return this.precio;
    }

    public Vehiculo precio(Float precio) {
        this.setPrecio(precio);
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public String getMotor() {
        return this.motor;
    }

    public Vehiculo motor(String motor) {
        this.setMotor(motor);
        return this;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }

    public Proveedor getProveedor() {
        return this.proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }

    public Vehiculo proveedor(Proveedor proveedor) {
        this.setProveedor(proveedor);
        return this;
    }

    public Venta getVenta() {
        return this.venta;
    }

    public void setVenta(Venta venta) {
        if (this.venta != null) {
            this.venta.setVehiculo(null);
        }
        if (venta != null) {
            venta.setVehiculo(this);
        }
        this.venta = venta;
    }

    public Vehiculo venta(Venta venta) {
        this.setVenta(venta);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vehiculo)) {
            return false;
        }
        return id != null && id.equals(((Vehiculo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vehiculo{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", mtricula='" + getMtricula() + "'" +
            ", marca='" + getMarca() + "'" +
            ", modelo='" + getModelo() + "'" +
            ", color='" + getColor() + "'" +
            ", ano='" + getAno() + "'" +
            ", precio=" + getPrecio() +
            ", motor='" + getMotor() + "'" +
            "}";
    }
}
