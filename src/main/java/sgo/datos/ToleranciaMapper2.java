package sgo.datos;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import sgo.entidad.Tolerancia;

public class ToleranciaMapper2 implements RowMapper<Tolerancia> {
	
  public Tolerancia mapRow(ResultSet rs, int arg1) throws SQLException 
  {
    Tolerancia object = null;
   
    try {
      object = new Tolerancia();
      object.setTipoVolumen(rs.getInt("tipo_volumen"));
    } catch(Exception ex){
      ex.printStackTrace();
    }
    
    return object;
  }
}