package sgo.entidad;

import java.util.ArrayList;
import java.util.List;

public class ProductoEquivalente extends EntidadBase {
	
	private static final long serialVersionUID = 1L;
	private int idOperacion;
	private int idProductoEquivalencia;
	private int idProductoPrincipal;
	private String nombreProductoPrincipal;
	private int idProductoSecundario;
	private String nombreProductoSecundario;
	private int centimetros;
	private int estado;
	private ArrayList<ProductoEquivalenteJson> productos;
	
	public int getIdOperacion() {
		return idOperacion;
	}
	public void setIdOperacion(int idOperacion) {
		this.idOperacion = idOperacion;
	}
	public int getIdProductoEquivalencia() {
		return idProductoEquivalencia;
	}
	public void setIdProductoEquivalencia(int idProductoEquivalencia) {
		this.idProductoEquivalencia = idProductoEquivalencia;
	}
	public int getIdProductoPrincipal() {
		return idProductoPrincipal;
	}
	public void setIdProductoPrincipal(int idProductoPrincipal) {
		this.idProductoPrincipal = idProductoPrincipal;
	}
	public int getIdProductoSecundario() {
		return idProductoSecundario;
	}
	public void setIdProductoSecundario(int idProductoSecundario) {
		this.idProductoSecundario = idProductoSecundario;
	}
	public int getCentimetros() {
		return centimetros;
	}
	public void setCentimetros(int centimetros) {
		this.centimetros = centimetros;
	}
	public int getEstado() {
		return estado;
	}
	public void setEstado(int estado) {
		this.estado = estado;
	}
	public ArrayList<ProductoEquivalenteJson> getProductos() {
		return productos;
	}
	public void setProductos(ArrayList<ProductoEquivalenteJson> productos) {
		this.productos = productos;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getNombreProductoPrincipal() {
		return nombreProductoPrincipal;
	}
	public void setNombreProductoPrincipal(String nombreProductoPrincipal) {
		this.nombreProductoPrincipal = nombreProductoPrincipal;
	}
	public String getNombreProductoSecundario() {
		return nombreProductoSecundario;
	}
	public void setNombreProductoSecundario(String nombreProductoSecundario) {
		this.nombreProductoSecundario = nombreProductoSecundario;
	}
	
}