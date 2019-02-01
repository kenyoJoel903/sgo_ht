package sgo.datos;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import sgo.entidad.DescargaCompartimento;
import sgo.entidad.Producto;
import sgo.utilidades.Utilidades;

public class DescargaCompartimentoMapper2 implements RowMapper<DescargaCompartimento> {
	
  public DescargaCompartimento mapRow(ResultSet rs, int arg1) throws SQLException 
  {
    DescargaCompartimento object = null;
    
    try {
    	
      object = new DescargaCompartimento();
      object.setNumeroCompartimento(rs.getInt("numero_compartimento"));
      
    } catch(Exception e){
    	e.printStackTrace();
    }
    
    return object;
  }
}