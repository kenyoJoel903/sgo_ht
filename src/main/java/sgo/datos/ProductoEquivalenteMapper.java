package sgo.datos;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import sgo.entidad.ProductoEquivalente;
import sgo.utilidades.Utilidades;

public class ProductoEquivalenteMapper implements RowMapper<ProductoEquivalente> {
	
	public ProductoEquivalente mapRow(ResultSet rs, int arg1) throws SQLException 
	{
		ProductoEquivalente object = null;
		
		try {
			
			object = new ProductoEquivalente();
			object.setIdOperacion(rs.getInt("id_operacion"));
			object.setIdProductoEquivalencia(rs.getInt("id_producto_equivalencia"));
			object.setIdProductoPrincipal(rs.getInt("id_producto_principal"));
			object.setNombreProductoPrincipal(Utilidades.cleanXSS(rs.getString("nombre_producto_principal")));
			object.setIdProductoSecundario(rs.getInt("id_producto_secundario"));
			object.setNombreProductoSecundario(Utilidades.cleanXSS(rs.getString("nombre_producto_secundario")));
			object.setCentimetros(rs.getInt("centimetros"));
			object.setEstado(rs.getInt("estado"));
			
			//Parametros de auditoria
			object.setCreadoPor(rs.getInt("creado_por"));
			object.setCreadoEl(rs.getLong("creado_el"));
			object.setIpCreacion(Utilidades.cleanXSS(rs.getString("ip_creacion")));
			
		} catch(Exception e){
			e.printStackTrace();
		}
		
		return object;
	}
}