package sgo.datos;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import sgo.entidad.PerfilHorario;

//Agregado por req 9000003068

public class PerfilHorarioMapper implements RowMapper<PerfilHorario>{
	
	public PerfilHorario mapRow(ResultSet rs, int arg1) throws SQLException{
		
		PerfilHorario ePerfilHorario = null;
		
		try{
			
			ePerfilHorario = new PerfilHorario();
			
			ePerfilHorario.setId(rs.getInt("id_perfil_horario"));
			ePerfilHorario.setNombrePerfil(rs.getString("nombre_perfil"));
			ePerfilHorario.setNumeroTurnos(rs.getInt("numero_turnos"));
			ePerfilHorario.setEstado(rs.getInt("estado"));
			
			//Parametros de auditoria
			ePerfilHorario.setCreadoPor(rs.getInt("creado_por"));
			ePerfilHorario.setCreadoEl(rs.getLong("creado_el"));
			ePerfilHorario.setActualizadoPor(rs.getInt("actualizado_por"));
			ePerfilHorario.setActualizadoEl(rs.getLong("actualizado_el"));
			ePerfilHorario.setIpCreacion(rs.getString("ip_creacion"));
			ePerfilHorario.setIpActualizacion(rs.getString("ip_actualizacion"));
			ePerfilHorario.setUsuarioActualizacion(rs.getString("usuario_actualizacion"));
			ePerfilHorario.setUsuarioCreacion(rs.getString("usuario_creacion"));
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return ePerfilHorario;
		
	}

}
