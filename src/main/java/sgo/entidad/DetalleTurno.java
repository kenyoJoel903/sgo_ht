package sgo.entidad;

import java.math.BigDecimal;

import sgo.utilidades.Utilidades;

public class DetalleTurno {
	
  private int id_dturno;	
  private int id_turno;
  private int id_producto;
  private int id_contometro;
  
  private float lectura_inicial;
  private float lectura_final;  
  private String lecturaInicialStr;
  private String lecturaFinalStr;  

  private Turno turno;
  private Producto producto;
  private Contometro contometro;

  
	public int getId() {
		return id_dturno;
	}
	public void setId(int id_dturno) {
		this.id_dturno = id_dturno;
	}
	public int getIdTurno() {
		return id_turno;
	}
	public void setIdTurno(int id_turno) {
		this.id_turno = id_turno;
	}
	public float getLecturaInicial() {
		return lectura_inicial;
	}
	public void setLecturaInicial(float lectura_inicial) {
		this.lectura_inicial = lectura_inicial;
	}
	public float getLecturaFinal() {
		return lectura_final;
	}
	public void setLecturaFinal(float lectura_final) {
		this.lectura_final = lectura_final;
	}
	public int getIdProducto() {
		return id_producto;
	}
	public void setIdProducto(int id_producto) {
		this.id_producto = id_producto;
	}
	public int getIdContometro() {
		return id_contometro;
	}
	public void setIdContometro(int id_contometro) {
		this.id_contometro = id_contometro;
	}
	public Producto getProducto() {
		return producto;
	}
	public void setProducto(Producto producto) {
		this.producto = producto;
	}
	public Contometro getContometro() {
		return contometro;
	}
	public void setContometro(Contometro contometro) {
		this.contometro = contometro;
	}
	public Turno getTurno() {
		return turno;
	}
	public void setTurno(Turno turno) {
		this.turno = turno;
	}
	public String getLecturaInicialStr() {
		return lecturaInicialStr;
	}
	
	public BigDecimal getLecturaInicialBigDecimal() {
		return Utilidades.strToBigDecimal(lecturaInicialStr);
	}
	
	public void setLecturaInicialStr(String lecturaInicialStr) {
		this.lecturaInicialStr = lecturaInicialStr;
	}
	public String getLecturaFinalStr() {
		return lecturaFinalStr;
	}
	
	public BigDecimal getLecturaFinalBigDecimal() {
		return Utilidades.strToBigDecimal(lecturaFinalStr);
	}
	
	public void setLecturaFinalStr(String lecturaFinalStr) {
		this.lecturaFinalStr = lecturaFinalStr;
	}
	
}