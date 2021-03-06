package sgo.entidad;

import java.sql.Timestamp;
import java.util.List;
import java.util.Locale;
import org.springframework.context.MessageSource;
import sgo.utilidades.Constante;
import sgo.utilidades.Utilidades;

public class Turno extends EntidadBase {

  private static final long serialVersionUID = 1L;
  private int id_turno;
  private Timestamp fecha_hora_apertura;
  private int id_jornada;
  private int id_responsable;  
  private int id_ayudante;
  private int estado;
  private String comentario;
  private Timestamp fecha_hora_cierre;
  private String observacion;
  private int idPerfilDetalleHorario;
  private int idPerfilHorario;
  private int cantidadTurnos;
  private int numeroOrden;
  private int horaInicioTurno;
  private int horaFinTurno;
  private int validacionExcelRows;

  private Jornada jornada;
  private PerfilHorario perfilHorario;
  private PerfilDetalleHorario perfilDetalleHorario;
  private Operario responsable;
  private Operario ayudante;
  private List<DetalleTurno> turnoDetalles;
  
public static final int ESTADO_ABIERTO=1;
public static final int ESTADO_CERRADO=2;

static final int MAXIMA_LONGITUD_OBSERVACION = 700;

  
public int getId() {
	return id_turno;
}
public void setId(int id_turno) {
	this.id_turno = id_turno;
}
public Timestamp getFechaHoraApertura() {
	return fecha_hora_apertura;
}
public void setFechaHoraApertura(Timestamp fecha_hora_apertura) {
	this.fecha_hora_apertura = fecha_hora_apertura;
}
public int getIdJornada() {
	return id_jornada;
}
public void setIdJornada(int id_jornada) {
	this.id_jornada = id_jornada;
}
public int getIdResponsable() {
	return id_responsable;
}
public void setIdResponsable(int id_responsable) {
	this.id_responsable = id_responsable;
}
public int getIdAyudante() {
	return id_ayudante;
}
public void setIdAyudante(int id_ayudante) {
	this.id_ayudante = id_ayudante;
}
public int getEstado() {
	return estado;
}
public void setEstado(int estado) {
	this.estado = estado;
}
public String getComentario() {
	return comentario;
}
public void setComentario(String comentario) {
	this.comentario = comentario;
}
public Timestamp getFechaHoraCierre() {
	return fecha_hora_cierre;
}
public void setFechaHoraCierre(Timestamp fecha_hora_cierre) {
	this.fecha_hora_cierre = fecha_hora_cierre;
}
public Jornada getJornada() {
	return jornada;
}
public void setJornada(Jornada jornada) {
	this.jornada = jornada;
}
public Operario getResponsable() {
	return responsable;
}
public void setResponsable(Operario responsable) {
	this.responsable = responsable;
}
public Operario getAyudante() {
	return ayudante;
}
public void setAyudante(Operario ayudante) {
	this.ayudante = ayudante;
}
public List<DetalleTurno> getTurnoDetalles() {
	return turnoDetalles;
}
public void setTurnoDetalles(List<DetalleTurno> turnoDetalles) {
	this.turnoDetalles = turnoDetalles;
}

public Respuesta validar(MessageSource gestorDiccionario, Locale locale){
  Respuesta respuesta = new Respuesta();
	try {
	  if (this.observacion.length() > MAXIMA_LONGITUD_OBSERVACION){			
		  respuesta.estado = false;
		  respuesta.valor = gestorDiccionario.getMessage("sgo.errorValoresEntidad", new Object[] { "Observación de Apertura", MAXIMA_LONGITUD_OBSERVACION }, locale);
		  return respuesta;
	  }

	  respuesta.estado = true;
	  respuesta.valor = null;
  } catch (Exception excepcionGenerica) {
   excepcionGenerica.printStackTrace();
   respuesta.error = Constante.EXCEPCION_GENERICA;
   respuesta.valor = gestorDiccionario.getMessage("sgo.errorGenericoServidor", null, locale);
   respuesta.estado = false;
  }
  return respuesta;
}

//CADENAS SEGUN LOS CAMPOS QUE VIENEN DEL FORMULARIO
public String getCadena() {
	String cadena="";
	if(!Utilidades.esValido(this.getObservacion())){ this.setObservacion(""); };
	
	cadena = this.getObservacion();

	return cadena;
}
public String getObservacion() {
	return observacion;
}
public void setObservacion(String observacion) {
	this.observacion = observacion;
}
public int getNumeroOrden() {
	return numeroOrden;
}
public void setNumeroOrden(int numeroOrden) {
	this.numeroOrden = numeroOrden;
}
public int getIdPerfilDetalleHorario() {
	return idPerfilDetalleHorario;
}
public void setIdPerfilDetalleHorario(int idPerfilDetalleHorario) {
	this.idPerfilDetalleHorario = idPerfilDetalleHorario;
}
public int getHoraInicioTurno() {
	return horaInicioTurno;
}
public void setHoraInicioTurno(int horaInicioTurno) {
	this.horaInicioTurno = horaInicioTurno;
}
public int getHoraFinTurno() {
	return horaFinTurno;
}
public void setHoraFinTurno(int horaFinTurno) {
	this.horaFinTurno = horaFinTurno;
}
public PerfilHorario getPerfilHorario() {
	return perfilHorario;
}
public void setPerfilHorario(PerfilHorario perfilHorario) {
	this.perfilHorario = perfilHorario;
}
public int getIdPerfilHorario() {
	return idPerfilHorario;
}
public void setIdPerfilHorario(int idPerfilHorario) {
	this.idPerfilHorario = idPerfilHorario;
}
public int getCantidadTurnos() {
	return cantidadTurnos;
}
public int getCantidadTurnosIncrement() {
	return cantidadTurnos + 1;
}
public void setCantidadTurnos(int cantidadTurnos) {
	this.cantidadTurnos = cantidadTurnos;
}
public static long getSerialversionuid() {
	return serialVersionUID;
}
public PerfilDetalleHorario getPerfilDetalleHorario() {
	return perfilDetalleHorario;
}
public void setPerfilDetalleHorario(PerfilDetalleHorario perfilDetalleHorario) {
	this.perfilDetalleHorario = perfilDetalleHorario;
}
public int getValidacionExcelRows() {
	return validacionExcelRows;
}
public void setValidacionExcelRows(int validacionExcelRows) {
	this.validacionExcelRows = validacionExcelRows;
}

}