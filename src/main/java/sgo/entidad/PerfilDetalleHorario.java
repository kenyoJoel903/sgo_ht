package sgo.entidad;

//Agregado por req 9000003068

public class PerfilDetalleHorario extends EntidadBase{
	
	private int id_perfil_detalle_horario;
	private int numero_orden;
	private String glosa_turno;
	private String hora_inicio_turno;
	private String hora_fin_turno;
	private String horaInicioFinTurno;
	
	private int id_perfil_horario;
	
	private String rango;
	
	public int getId() {
		return id_perfil_detalle_horario;
	}
	public void setId(int id_perfil_detalle_horario) {
		this.id_perfil_detalle_horario = id_perfil_detalle_horario;
	}
	public int getNumeroOrden() {
		return numero_orden;
	}
	public void setNumeroOrden(int numero_orden) {
		this.numero_orden = numero_orden;
	}
	public String getGlosaTurno() {
		return glosa_turno;
	}
	public void setGlosaTurno(String glosa_turno) {
		this.glosa_turno = glosa_turno;
	}
	public String getHoraInicioTurno() {
		return hora_inicio_turno;
	}
	public void setHoraInicioTurno(String hora_inicio_turno) {
		this.hora_inicio_turno = hora_inicio_turno;
	}
	public String getHoraFinTurno() {
		return hora_fin_turno;
	}
	public void setHoraFinTurno(String hora_fin_turno) {
		this.hora_fin_turno = hora_fin_turno;
	}
	public int getIdPerfilHorario() {
		return id_perfil_horario;
	}
	public void setIdPerfilHorario(int id_perfil_horario) {
		this.id_perfil_horario = id_perfil_horario;
	}
	public String getRango() {

		rango = hora_inicio_turno + "-" + hora_fin_turno;
		
		return rango;
	}
	public void setRango(String rango) {
		this.rango = rango;
	}
	public String getHoraInicioFinTurno() {
		return horaInicioFinTurno;
	}
	public void setHoraInicioFinTurno(String horaInicioFinTurno) {
		this.horaInicioFinTurno = horaInicioFinTurno;
	}

}
