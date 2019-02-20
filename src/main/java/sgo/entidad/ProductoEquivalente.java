package sgo.entidad;

import java.util.List;

public class ProductoEquivalente extends EntidadBase {
	
	private static final long serialVersionUID = 1L;
	private int idOperacion;
	private int id_producto_equivalencia;
	private int id_operacion;
	private int id_producto_principal;
	private int id_producto_secundario;
	private int centimetros;
	private int creado_el;
	private int creado_por;
	private String ip_creacion;
	private List<ProductoEquivalenteJson> productos;
	
	public int getId() {
		return id_producto_equivalencia;
	}
	
	public int getId_producto_equivalencia() {
		return id_producto_equivalencia;
	}
	public void setId_producto_equivalencia(int id_producto_equivalencia) {
		this.id_producto_equivalencia = id_producto_equivalencia;
	}
	public int getId_operacion() {
		return id_operacion;
	}
	public void setId_operacion(int id_operacion) {
		this.id_operacion = id_operacion;
	}
	public int getId_producto_principal() {
		return id_producto_principal;
	}
	public void setId_producto_principal(int id_producto_principal) {
		this.id_producto_principal = id_producto_principal;
	}
	public int getId_producto_secundario() {
		return id_producto_secundario;
	}
	public void setId_producto_secundario(int id_producto_secundario) {
		this.id_producto_secundario = id_producto_secundario;
	}
	public int getCentimetros() {
		return centimetros;
	}
	public void setCentimetros(int centimetros) {
		this.centimetros = centimetros;
	}
	public int getCreado_el() {
		return creado_el;
	}
	public void setCreado_el(int creado_el) {
		this.creado_el = creado_el;
	}
	public int getCreado_por() {
		return creado_por;
	}
	public void setCreado_por(int creado_por) {
		this.creado_por = creado_por;
	}
	public String getIp_creacion() {
		return ip_creacion;
	}
	public void setIp_creacion(String ip_creacion) {
		this.ip_creacion = ip_creacion;
	}

	public List<ProductoEquivalenteJson> getProductos() {
		return productos;
	}

	public void setProductos(List<ProductoEquivalenteJson> productos) {
		this.productos = productos;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getIdOperacion() {
		return idOperacion;
	}

	public void setIdOperacion(int idOperacion) {
		this.idOperacion = idOperacion;
	}
  
}