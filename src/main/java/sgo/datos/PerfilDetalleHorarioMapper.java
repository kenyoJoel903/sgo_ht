package sgo.datos;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import sgo.entidad.PerfilDetalleHorario;
import sgo.utilidades.Utilidades;

//Agregado por req 9000003068

public class PerfilDetalleHorarioMapper implements RowMapper<PerfilDetalleHorario>{
	
	public PerfilDetalleHorario mapRow(ResultSet rs, int arg1) throws SQLException{
		PerfilDetalleHorario ePerfilDetalleHorario = null;
		
		try{
			
			ePerfilDetalleHorario = new PerfilDetalleHorario();
			
			ePerfilDetalleHorario.setId(rs.getInt("id_perfil_detalle_horario"));
			ePerfilDetalleHorario.setNumeroOrden(rs.getInt("numero_orden"));
			ePerfilDetalleHorario.setGlosaTurno(rs.getString("glosa_turno"));
			ePerfilDetalleHorario.setHoraInicioTurno(rs.getString("hora_inicio_turno"));
			ePerfilDetalleHorario.setHoraFinTurno(rs.getString("hora_fin_turno"));
			ePerfilDetalleHorario.setIdPerfilHorario(rs.getInt("id_perfil_horario"));
			ePerfilDetalleHorario.setHoraInicioFinTurno(Utilidades.cleanXSS(rs.getString("horaInicioFinTurno")));

			//Parametros de auditoria
			ePerfilDetalleHorario.setCreadoPor(rs.getInt("creado_por"));
			ePerfilDetalleHorario.setCreadoEl(rs.getLong("creado_el"));
			ePerfilDetalleHorario.setActualizadoPor(rs.getInt("actualizado_por"));
			ePerfilDetalleHorario.setActualizadoEl(rs.getLong("actualizado_el"));
			ePerfilDetalleHorario.setIpCreacion(rs.getString("ip_creacion"));
			ePerfilDetalleHorario.setIpActualizacion(rs.getString("ip_actualizacion"));
			ePerfilDetalleHorario.setUsuarioActualizacion(rs.getString("usuario_actualizacion"));
			ePerfilDetalleHorario.setUsuarioCreacion(rs.getString("usuario_creacion"));
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return ePerfilDetalleHorario;
	}

}
