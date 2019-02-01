package sgo.datos;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import sgo.entidad.Estacion;
import sgo.entidad.Operacion;
import sgo.utilidades.Utilidades;

public class EstacionMapper implements RowMapper<Estacion> {
	
	public Estacion mapRow(ResultSet rs, int arg1) throws SQLException 
	{
		Estacion eEstacion = null;
		Operacion eOperacion = null;
		
		try {
			
			eEstacion = new Estacion();
			eEstacion.setId(rs.getInt("id_estacion"));
			eEstacion.setNombre(Utilidades.cleanXSS(rs.getString("nombre")));
			eEstacion.setTipo(rs.getInt("tipo"));
			eEstacion.setEstado(rs.getInt("estado"));
			eEstacion.setCantidadTurnos(rs.getInt("cantidad_turnos"));
			eEstacion.setIdOperacion(rs.getInt("id_operacion"));
			eEstacion.setMetodoDescarga(rs.getInt("metodo_descarga"));
			eEstacion.setTipoAperturaTanque(rs.getInt("tipo_apertura_tanque"));
			eEstacion.setNumeroDecimalesContometro(rs.getInt("numero_decimales_contometro"));
			eEstacion.setNombrePerfil(Utilidades.cleanXSS(rs.getString("nombre_perfil")));

			eOperacion = new Operacion();
			eOperacion.setId(rs.getInt("id_operacion"));
			eOperacion.setNombre(Utilidades.cleanXSS(rs.getString("nombre_operacion")));
			eEstacion.setOperacion(eOperacion);		
			
			//Parametros de auditoria
			eEstacion.setCreadoPor(rs.getInt("creado_por"));
			eEstacion.setCreadoEl(rs.getLong("creado_el"));
			eEstacion.setActualizadoPor(rs.getInt("actualizado_por"));
			eEstacion.setActualizadoEl(rs.getLong("actualizado_el"));
			eEstacion.setUsuarioActualizacion(Utilidades.cleanXSS(rs.getString("usuario_actualizacion")));
			eEstacion.setUsuarioCreacion(Utilidades.cleanXSS(rs.getString("usuario_creacion")));
			eEstacion.setIpCreacion(Utilidades.cleanXSS(rs.getString("ip_creacion")));
			eEstacion.setIpActualizacion(Utilidades.cleanXSS(rs.getString("ip_actualizacion")));
			
		} catch(Exception ex){
			ex.printStackTrace();
		}
		
		return eEstacion;
	}
}