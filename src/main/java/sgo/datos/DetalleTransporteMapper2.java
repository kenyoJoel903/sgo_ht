package sgo.datos;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import sgo.entidad.DetalleTransporte;
import sgo.utilidades.Utilidades;

public class DetalleTransporteMapper2 implements RowMapper<DetalleTransporte> {
	
	public DetalleTransporte mapRow(ResultSet rs, int arg1) throws SQLException 
	{
		DetalleTransporte object = null;
		
		try {
			
			object = new DetalleTransporte();
			object.setNumeroCompartimento(rs.getInt("numero_compartimento"));

		} catch(Exception e){
			e.printStackTrace();
		}
		
		return object;
	}
}