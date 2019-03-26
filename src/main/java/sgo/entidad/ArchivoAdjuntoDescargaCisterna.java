package sgo.entidad;

public class ArchivoAdjuntoDescargaCisterna extends EntidadBase {
	
	private int id_adj_descarga_cisterna;
	private int tipo_proceso;
	private int id_descarga_cisterna;
	private String nombre_archivo_original;
	private String nombre_archivo_adjunto;
	private String adjunto_referencia;
	
	
	private ArchivoAdjuntoDescargaCisterna() {}	
	
	public ArchivoAdjuntoDescargaCisterna(int id_adj_descarga_cisterna, int tipo_proceso, int id_descarga_cisterna,
			String nombre_archivo_original, String nombre_archivo_adjunto, String adjunto_referencia) {
		super();
		this.id_adj_descarga_cisterna = id_adj_descarga_cisterna;
		this.tipo_proceso = tipo_proceso;
		this.id_descarga_cisterna = id_descarga_cisterna;
		this.nombre_archivo_original = nombre_archivo_original;
		this.nombre_archivo_adjunto = nombre_archivo_adjunto;
		this.adjunto_referencia = adjunto_referencia;
	}


	public int getId_adj_descarga_cisterna() {
		return id_adj_descarga_cisterna;
	}
	public void setId_adj_descarga_cisterna(int id_adj_descarga_cisterna) {
		this.id_adj_descarga_cisterna = id_adj_descarga_cisterna;
	}
	public int getTipo_proceso() {
		return tipo_proceso;
	}
	public void setTipo_proceso(int tipo_proceso) {
		this.tipo_proceso = tipo_proceso;
	}
	public int getId_descarga_cisterna() {
		return id_descarga_cisterna;
	}
	public void setId_descarga_cisterna(int id_descarga_cisterna) {
		this.id_descarga_cisterna = id_descarga_cisterna;
	}
	public String getNombre_archivo_original() {
		return nombre_archivo_original;
	}
	public void setNombre_archivo_original(String nombre_archivo_original) {
		this.nombre_archivo_original = nombre_archivo_original;
	}
	public String getNombre_archivo_adjunto() {
		return nombre_archivo_adjunto;
	}
	public void setNombre_archivo_adjunto(String nombre_archivo_adjunto) {
		this.nombre_archivo_adjunto = nombre_archivo_adjunto;
	}
	public String getAdjunto_referencia() {
		return adjunto_referencia;
	}
	public void setAdjunto_referencia(String adjunto_referencia) {
		this.adjunto_referencia = adjunto_referencia;
	}

}
