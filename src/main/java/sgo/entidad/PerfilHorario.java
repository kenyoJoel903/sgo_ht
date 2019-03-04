package sgo.entidad;

import java.util.List;
//Agregado por req 9000003068
public class PerfilHorario extends EntidadBase{
	
	public final static int ESTADO_ACTIVO=1;
	public final static int ESTADO_INACTIVO=2;
	
	private int id_perfil_horario;
	private String nombre_perfil;
	
	private String estacionesAsociadas;
	
	private int numero_turnos;
	private int estado;
	
	private List<PerfilDetalleHorario> lstDetalles;
	
	public int getId() {
		return id_perfil_horario;
	}
	public void setId(int id_perfil_horario) {
		this.id_perfil_horario = id_perfil_horario;
	}
	public String getNombrePerfil() {
		return nombre_perfil;
	}
	public void setNombrePerfil(String nombre_perfil) {
		this.nombre_perfil = nombre_perfil;
	}
	public int getNumeroTurnos() {
		return numero_turnos;
	}
	public void setNumeroTurnos(int numero_turnos) {
		this.numero_turnos = numero_turnos;
	}
	public int getEstado() {
		return estado;
	}
	public void setEstado(int estado) {
		this.estado = estado;
	}
	public List<PerfilDetalleHorario> getLstDetalles() {
		return lstDetalles;
	}
	public void setLstDetalles(List<PerfilDetalleHorario> lstDetalles) {
		this.lstDetalles = lstDetalles;
	}
	public String getEstacionesAsociadas() {
		return estacionesAsociadas;
	}
	public void setEstacionesAsociadas(String estacionesAsociadas) {
		this.estacionesAsociadas = estacionesAsociadas;
	}
	
}
