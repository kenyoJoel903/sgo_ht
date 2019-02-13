package sgo.datos;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;
import sgo.entidad.Estacion;
import sgo.entidad.Jornada;
import sgo.entidad.PerfilDetalleHorario;
import sgo.entidad.PerfilHorario;
import sgo.utilidades.Utilidades;

public class JornadaMapper implements RowMapper<Jornada> {
	
	public Jornada mapRow(ResultSet rs, int arg1) throws SQLException 
	{
		Jornada eJornada = null;
		Estacion eEstacion = null;
		
		try {
			
			eJornada = new Jornada();
			eJornada.setId(rs.getInt("id_jornada"));
			eJornada.setIdEstacion(rs.getInt("id_estacion"));
			eJornada.setEstado(rs.getInt("estado"));
			eJornada.setIdOperario1(rs.getInt("operario1"));
			eJornada.setIdOperario2(rs.getInt("operario2"));
			eJornada.setComentario(Utilidades.cleanXSS(rs.getString("comentario")));
			eJornada.setObservacion(Utilidades.cleanXSS(rs.getString("observacion")));
			eJornada.setFechaOperativa(rs.getDate("fecha_operativa"));
			eJornada.setTotalDespachos(rs.getInt("total_despachos"));
			//eJornada.setHoraInicioFinTurno(Utilidades.cleanXSS(rs.getString("horaInicioFinTurno")));
	
			PerfilDetalleHorario perfilDetalleHorario = new PerfilDetalleHorario();
			//perfilDetalleHorario.setId(rs.getInt("id_perfil_detalle_horario"));
			//perfilDetalleHorario.setNumeroOrden(rs.getInt("numero_orden"));
			//perfilDetalleHorario.setHoraInicioFinTurno(Utilidades.cleanXSS(rs.getString("horaInicioFinTurno")));
			List<PerfilDetalleHorario> lstDetalles = new ArrayList<PerfilDetalleHorario>();
			lstDetalles.add(perfilDetalleHorario);
			
			PerfilHorario perfilHorario = new PerfilHorario();
			perfilHorario.setId(rs.getInt("id_perfil_horario"));
			perfilHorario.setNombrePerfil(Utilidades.cleanXSS(rs.getString("nombre_perfil")));
			perfilHorario.setLstDetalles(lstDetalles);
			eJornada.setPerfilHorario(perfilHorario);
			
			eEstacion = new Estacion();
			eEstacion.setId(rs.getInt("id_estacion"));
			eEstacion.setIdOperacion(rs.getInt("id_operacion"));
			eEstacion.setNombre(Utilidades.cleanXSS(rs.getString("nombre")));
			eEstacion.setTipo(rs.getInt("tipo"));
			eEstacion.setEstado(rs.getInt("estado_estacion"));
			
//			Inicio Agregado por req 9000003068===============		
			eEstacion.setTipoAperturaTanque(rs.getInt("tipo_apertura_tanque"));
//			Fin Agregado por req 9000003068=================
			
			eJornada.setEstacion(eEstacion);
			
			//Parametros de auditoria
			eJornada.setCreadoPor(rs.getInt("creado_por"));
			eJornada.setCreadoEl(rs.getLong("creado_el"));
			eJornada.setActualizadoPor(rs.getInt("actualizado_por"));
			eJornada.setActualizadoEl(rs.getLong("actualizado_el"));
			eJornada.setUsuarioActualizacion(Utilidades.cleanXSS(rs.getString("usuario_actualizacion")));
			eJornada.setUsuarioCreacion(Utilidades.cleanXSS(rs.getString("usuario_creacion")));
			eJornada.setIpCreacion(Utilidades.cleanXSS(rs.getString("ip_creacion")));
			eJornada.setIpActualizacion(Utilidades.cleanXSS(rs.getString("ip_actualizacion")));
			
		} catch(Exception ex){
			ex.printStackTrace();
		}
		return eJornada;
	}
}