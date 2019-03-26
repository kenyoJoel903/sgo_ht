package sgo.utilidades;

import org.springframework.web.multipart.MultipartFile;

public class FormularioAdjuntoDescarga {
	
	private int idDescargaCisterna;
	private int idOperacion;
	private String operacionEstacion;
	private String fPlanificacion;
	private String tractoCisterna;
	private String tanque;
	private String referencia;
	private MultipartFile archivo;
	
	public int getIdDescargaCisterna() {
		return idDescargaCisterna;
	}
	public void setIdDescargaCisterna(int idDescargaCisterna) {
		this.idDescargaCisterna = idDescargaCisterna;
	}
	public int getIdOperacion() {
		return idOperacion;
	}
	public void setIdOperacion(int idOperacion) {
		this.idOperacion = idOperacion;
	}
	public String getOperacionEstacion() {
		return operacionEstacion;
	}
	public void setOperacionEstacion(String operacionEstacion) {
		this.operacionEstacion = operacionEstacion;
	}
	public String getfPlanificacion() {
		return fPlanificacion;
	}
	public void setfPlanificacion(String fPlanificacion) {
		this.fPlanificacion = fPlanificacion;
	}
	public String getTractoCisterna() {
		return tractoCisterna;
	}
	public void setTractoCisterna(String tractoCisterna) {
		this.tractoCisterna = tractoCisterna;
	}
	public String getTanque() {
		return tanque;
	}
	public void setTanque(String tanque) {
		this.tanque = tanque;
	}
	public String getReferencia() {
		return referencia;
	}
	public void setReferencia(String referencia) {
		this.referencia = referencia;
	}
	public MultipartFile getArchivo() {
		return archivo;
	}
	public void setArchivo(MultipartFile archivo) {
		this.archivo = archivo;
	}
	
	
	

}
