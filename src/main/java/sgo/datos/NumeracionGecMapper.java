package sgo.datos;
//Agregado por req 9000002857
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import sgo.entidad.NumeracionGec;

public class NumeracionGecMapper implements RowMapper<NumeracionGec>{
	
	public NumeracionGec mapRow(ResultSet rs, int arg1) throws SQLException{
		
		NumeracionGec eNumeracionGec = null;
		
		try{
			
			eNumeracionGec = new NumeracionGec();
			
			eNumeracionGec.setId(rs.getInt("id_configuracion_gec"));
			eNumeracionGec.setIdOperacion(rs.getInt("id_operacion"));
			eNumeracionGec.setCorrelativo(rs.getString("correlativo"));
			eNumeracionGec.setEstado(rs.getInt("estado"));
			eNumeracionGec.setAnio(rs.getInt("anio"));
			eNumeracionGec.setAliasOperacion(rs.getString("alias_operacion"));
			eNumeracionGec.setNombreOperacion(rs.getString("nombre_operacion"));
			eNumeracionGec.setNombreCliente(rs.getString("nombre_cliente"));
			
			//Parametros de auditoria
			eNumeracionGec.setCreadoPor(rs.getInt("creado_por"));
			eNumeracionGec.setCreadoEl(rs.getLong("creado_el"));
			eNumeracionGec.setActualizadoPor(rs.getInt("actualizado_por"));
			eNumeracionGec.setActualizadoEl(rs.getLong("actualizado_el"));
			eNumeracionGec.setIpCreacion(rs.getString("ip_creacion"));
			eNumeracionGec.setIpActualizacion(rs.getString("ip_actualizacion"));
			eNumeracionGec.setUsuarioActualizacion(rs.getString("usuario_actualizacion"));
			eNumeracionGec.setUsuarioCreacion(rs.getString("usuario_creacion"));
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return eNumeracionGec;
		
	}

}
