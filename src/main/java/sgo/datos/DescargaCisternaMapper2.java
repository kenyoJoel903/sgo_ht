package sgo.datos;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import sgo.entidad.DescargaCisterna;

public class DescargaCisternaMapper2 implements RowMapper<DescargaCisterna> {
	
	public DescargaCisterna mapRow(ResultSet rs, int arg1) throws SQLException 
	{
		DescargaCisterna object = null;

		try {
			
		  object = new DescargaCisterna();
		  object.setIdTransporte(rs.getInt("id_transporte"));  
		  object.setIdProducto(rs.getInt("id_producto"));
		  object.setNumeroCompartimento(rs.getInt("numero_compartimento"));
		  
		} catch(Exception e){
			e.printStackTrace();
		}
		
		return object;
	}
}