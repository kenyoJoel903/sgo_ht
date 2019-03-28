package sgo.entidad;
//Agregado por req 9000002857
public class NumeracionGec extends EntidadBase{
	
	public final static int ESTADO_ACTIVO=1;
	public final static int ESTADO_INACTIVO=2;
	
	private int id_configuracion_gec;
	private int id_operacion;	
	private String correlativo;
	private int estado;
	private int anio;
	private String alias_operacion;
	
	private String nombreOperacion;
	private String nombreCliente;
	
	public String getNombreOperacion() {
		return nombreOperacion;
	}
	public void setNombreOperacion(String nombreOperacion) {
		this.nombreOperacion = nombreOperacion;
	}
	public String getNombreCliente() {
		return nombreCliente;
	}
	public void setNombreCliente(String nombreCliente) {
		this.nombreCliente = nombreCliente;
	}
	public int getId() {
		return id_configuracion_gec;
	}
	public void setId(int id_configuracion_gec) {
		this.id_configuracion_gec = id_configuracion_gec;
	}
	public int getIdOperacion() {
		return id_operacion;
	}
	public void setIdOperacion(int id_operacion) {
		this.id_operacion = id_operacion;
	}
	public String getCorrelativo() {
		return correlativo;
	}
	public void setCorrelativo(String correlativo) {
		this.correlativo = correlativo;
	}
	public int getEstado() {
		return estado;
	}
	public void setEstado(int estado) {
		this.estado = estado;
	}
	public int getAnio() {
		return anio;
	}
	public void setAnio(int anio) {
		this.anio = anio;
	}
	public String getAliasOperacion() {
		return alias_operacion;
	}
	public void setAliasOperacion(String alias_operacion) {
		this.alias_operacion = alias_operacion;
	}
	
	

}
