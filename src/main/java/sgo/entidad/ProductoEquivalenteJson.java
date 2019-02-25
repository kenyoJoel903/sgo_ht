package sgo.entidad;

public class ProductoEquivalenteJson extends EntidadBase {
	
	private static final long serialVersionUID = 1L;
	private int productoPrincipal;
	private int productoSecundario;
	
	public int getProductoPrincipal() {
		return productoPrincipal;
	}
	public void setProductoPrincipal(int productoPrincipal) {
		this.productoPrincipal = productoPrincipal;
	}
	public int getProductoSecundario() {
		return productoSecundario;
	}
	public void setProductoSecundario(int productoSecundario) {
		this.productoSecundario = productoSecundario;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

	
	
}