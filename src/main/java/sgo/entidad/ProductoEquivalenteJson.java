package sgo.entidad;

public class ProductoEquivalenteJson extends EntidadBase {
	
	private static final long serialVersionUID = 1L;
	private String productoPrincipal;
	private String productoSecundario;
	
	public String getProductoPrincipal() {
		return productoPrincipal;
	}
	public void setProductoPrincipal(String productoPrincipal) {
		this.productoPrincipal = productoPrincipal;
	}
	public String getProductoSecundario() {
		return productoSecundario;
	}
	public void setProductoSecundario(String productoSecundario) {
		this.productoSecundario = productoSecundario;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}