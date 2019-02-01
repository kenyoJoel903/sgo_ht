package sgo.entidad;

public class DecimalContometro extends EntidadBase {
	
	private static final long serialVersionUID = 1L;
	private int value;

	public static final int MIN = 2;  
	public static final int MAX = 6;
  
	public int getValue() {
		return value;
	}
	
	public void setValue(int value) {
		this.value = value;
	}
  
}