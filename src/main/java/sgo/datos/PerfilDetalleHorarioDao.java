package sgo.datos;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sgo.entidad.Contenido;
import sgo.entidad.PerfilDetalleHorario;
import sgo.entidad.RespuestaCompuesta;
import sgo.utilidades.Constante;

//Agregado por req 9000003068

@Repository
public class PerfilDetalleHorarioDao {
	
	private JdbcTemplate jdbcTemplate;
	private NamedParameterJdbcTemplate namedJdbcTemplate;
	
	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.namedJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	public DataSource getDataSource() {
		return this.jdbcTemplate.getDataSource();
	}
	
	public static final String NOMBRE_TABLA = Constante.ESQUEMA_APLICACION	+ "perfil_detalle_horario";
	public static final String NOMBRE_VISTA = Constante.ESQUEMA_APLICACION	+ "v_perfil_detalle_horario";
	
	public final static String NOMBRE_CAMPO_ORDENAMIENTO = "numero_orden";
	
	public final static String CAMPO_PERFIL_HORARIO	= "id_perfil_horario";
	public final static String NOMBRE_CAMPO_CLAVE = "id_perfil_detalle_horario";
	public final static String CAMPO_NUMERO_ORDEN = "numero_orden";
	
	public RespuestaCompuesta recuperarRegistros(Integer idPerfilHorario) {
		
		String sqlWhere = "";
		String sqlOrderBy = "";
		int totalRegistros = 0, totalEncontrados = 0;
		List<Object> parametros = new ArrayList<Object>();
		
		Contenido<PerfilDetalleHorario> contenido = new Contenido<PerfilDetalleHorario>();
		List<PerfilDetalleHorario> listaRegistros = new ArrayList<PerfilDetalleHorario>();
		
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		
		try{
			
			sqlWhere = "WHERE " + CAMPO_PERFIL_HORARIO + " = " + idPerfilHorario;
			sqlOrderBy= " ORDER BY " + NOMBRE_CAMPO_ORDENAMIENTO + " ASC";
			
			StringBuilder consultaSQL = new StringBuilder();
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT count(" + NOMBRE_CAMPO_CLAVE	+ ") as total FROM " + NOMBRE_TABLA);
			totalRegistros = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			totalEncontrados = totalRegistros;
		
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT ");
			consultaSQL.append("t1.id_perfil_detalle_horario, ");
			consultaSQL.append("t1.numero_orden, ");
			consultaSQL.append("t1.glosa_turno, ");
			consultaSQL.append("t1.hora_inicio_turno, ");
			consultaSQL.append("t1.hora_fin_turno, ");
			consultaSQL.append("t1.id_perfil_horario, ");
			consultaSQL.append("t1.creado_el, ");
			consultaSQL.append("t1.creado_por, ");
			consultaSQL.append("t1.actualizado_por, ");
			consultaSQL.append("t1.actualizado_el, ");
			consultaSQL.append("t1.ip_creacion, ");
			consultaSQL.append("t1.ip_actualizacion, ");
			consultaSQL.append(" t1.usuario_creacion, "); 
			consultaSQL.append(" t1.usuario_actualizacion ");
			consultaSQL.append("FROM ");
			consultaSQL.append(NOMBRE_VISTA);
			consultaSQL.append(" t1 ");	
			consultaSQL.append(sqlWhere);
			consultaSQL.append(sqlOrderBy);
			
			listaRegistros = jdbcTemplate.query(consultaSQL.toString(),	parametros.toArray(), new PerfilDetalleHorarioMapper());
			
			contenido.carga = listaRegistros;
			respuesta.estado = true;
			respuesta.contenido = contenido;
			respuesta.contenido.totalRegistros = totalRegistros;
			respuesta.contenido.totalEncontrados = totalEncontrados;
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
			respuesta.contenido = null;
		} catch (Exception excepcionGenerica) {
			excepcionGenerica.printStackTrace();
			respuesta.error = Constante.EXCEPCION_GENERICA;
			respuesta.contenido = null;
			respuesta.estado = false;
		}
		return respuesta;
	}
	
	/**
	 * 
	 * @param idPerfilHorario
	 * @return
	 */
	public RespuestaCompuesta recuperarRegistro(Integer idPerfilDetalleHorario) {
		
		String sqlWhere = "";
		String sqlOrderBy = "";
		int totalRegistros = 0, totalEncontrados = 0;
		List<Object> parametros = new ArrayList<Object>();
		
		Contenido<PerfilDetalleHorario> contenido = new Contenido<PerfilDetalleHorario>();
		List<PerfilDetalleHorario> listaRegistros = new ArrayList<PerfilDetalleHorario>();
		
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		
		try{
			
			sqlWhere = "WHERE " + NOMBRE_CAMPO_CLAVE + " = " + idPerfilDetalleHorario;
			sqlOrderBy = " ORDER BY " + NOMBRE_CAMPO_ORDENAMIENTO + " ASC";
			
			StringBuilder consultaSQL = new StringBuilder();
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT count(" + NOMBRE_CAMPO_CLAVE	+ ") as total FROM " + NOMBRE_TABLA);
			totalRegistros = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			totalEncontrados = totalRegistros;
		
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT ");
			consultaSQL.append("t1.id_perfil_detalle_horario, ");
			consultaSQL.append("t1.numero_orden, ");
			consultaSQL.append("t1.glosa_turno, ");
			consultaSQL.append("t1.hora_inicio_turno, ");
			consultaSQL.append("t1.hora_fin_turno, ");
			consultaSQL.append("t1.id_perfil_horario, ");
			consultaSQL.append("t1.creado_el, ");
			consultaSQL.append("t1.creado_por, ");
			consultaSQL.append("t1.actualizado_por, ");
			consultaSQL.append("t1.actualizado_el, ");
			consultaSQL.append("t1.ip_creacion, ");
			consultaSQL.append("t1.ip_actualizacion, ");
			consultaSQL.append(" t1.usuario_creacion, "); 
			consultaSQL.append(" t1.usuario_actualizacion ");
			consultaSQL.append("FROM ");
			consultaSQL.append(NOMBRE_VISTA);
			consultaSQL.append(" t1 ");	
			consultaSQL.append(sqlWhere);
			consultaSQL.append(sqlOrderBy);
			
			listaRegistros = jdbcTemplate.query(consultaSQL.toString(),	parametros.toArray(), new PerfilDetalleHorarioMapper());
			
			contenido.carga = listaRegistros;
			respuesta.estado = true;
			respuesta.contenido = contenido;
			respuesta.contenido.totalRegistros = totalRegistros;
			respuesta.contenido.totalEncontrados = totalEncontrados;
		} catch (DataAccessException e) {
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
			respuesta.contenido = null;
		} catch (Exception e) {
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_GENERICA;
			respuesta.contenido = null;
			respuesta.estado = false;
		}
		
		return respuesta;
	}
	
	public RespuestaCompuesta guardarRegistro(PerfilDetalleHorario perfilDetalleHorario) {
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder consultaSQL = new StringBuilder();
		KeyHolder claveGenerada = null;
		int cantidadFilasAfectadas = 0;
		
		try {
			consultaSQL.append("INSERT INTO ");
			consultaSQL.append(NOMBRE_TABLA);
			consultaSQL.append(" (numero_orden,glosa_turno,hora_inicio_turno,hora_fin_turno,id_perfil_horario,creado_el,creado_por,actualizado_por,actualizado_el,ip_creacion,ip_actualizacion) ");
			consultaSQL.append(" VALUES (:NumeroOrden,:GlosaTurno,:HoraInicioTurno,:HoraFinTurno,:IdPerfilHorario,:CreadoEl,:CreadoPor,:ActualizadoPor,:ActualizadoEl,:IpCreacion,:IpActualizacion) ");
			MapSqlParameterSource listaParametros = new MapSqlParameterSource();
			listaParametros.addValue("NumeroOrden", perfilDetalleHorario.getNumeroOrden());
			listaParametros.addValue("GlosaTurno", perfilDetalleHorario.getGlosaTurno());
			listaParametros.addValue("HoraInicioTurno",	perfilDetalleHorario.getHoraInicioTurno());
			listaParametros.addValue("HoraFinTurno",	perfilDetalleHorario.getHoraFinTurno());
			listaParametros.addValue("IdPerfilHorario",	perfilDetalleHorario.getIdPerfilHorario());
			listaParametros.addValue("CreadoEl", perfilDetalleHorario.getCreadoEl());
			listaParametros.addValue("CreadoPor", perfilDetalleHorario.getCreadoPor());
			listaParametros.addValue("ActualizadoPor", perfilDetalleHorario.getActualizadoPor());
			listaParametros.addValue("ActualizadoEl", perfilDetalleHorario.getActualizadoEl());
			listaParametros.addValue("IpCreacion", perfilDetalleHorario.getIpCreacion());
			listaParametros.addValue("IpActualizacion", perfilDetalleHorario.getIpActualizacion());

			SqlParameterSource namedParameters = listaParametros;
			/* Ejecuta la consulta y retorna las filas afectadas */
			claveGenerada = new GeneratedKeyHolder();

			cantidadFilasAfectadas = namedJdbcTemplate.update(consultaSQL.toString(), namedParameters, claveGenerada, new String[] { NOMBRE_CAMPO_CLAVE });
			if (cantidadFilasAfectadas > 1) {
				respuesta.error = Constante.EXCEPCION_CANTIDAD_REGISTROS_INCORRECTA;
				respuesta.estado = false;
				return respuesta;
			}
			respuesta.estado = true;
			respuesta.valor = claveGenerada.getKey().toString();
		} catch (DataIntegrityViolationException excepcionIntegridadDatos) {
			excepcionIntegridadDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado = false;
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
		}
		return respuesta;
	}
	
	public RespuestaCompuesta actualizarRegistro(PerfilDetalleHorario perfilDetalleHorario) {
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder consultaSQL = new StringBuilder();
		int cantidadFilasAfectadas = 0;
		try {
			consultaSQL.append("UPDATE ");
			consultaSQL.append(NOMBRE_TABLA);
			consultaSQL.append(" SET ");
			consultaSQL.append("numero_orden=:NumeroOrden,");
			consultaSQL.append("glosa_turno=:GlosaTurno,");
			consultaSQL.append("hora_inicio_turno=:HoraInicioTurno,");
			consultaSQL.append("hora_fin_turno=:HoraFinTurno,");
			consultaSQL.append("actualizado_por=:ActualizadoPor,");
			consultaSQL.append("actualizado_el=:ActualizadoEl,");
			consultaSQL.append("ip_actualizacion=:IpActualizacion");
			consultaSQL.append(" WHERE ");
			consultaSQL.append(NOMBRE_CAMPO_CLAVE);
			consultaSQL.append("=:Id");
			MapSqlParameterSource listaParametros = new MapSqlParameterSource();
			listaParametros.addValue("NumeroOrden", perfilDetalleHorario.getNumeroOrden());
			listaParametros.addValue("GlosaTurno", perfilDetalleHorario.getGlosaTurno());
			listaParametros.addValue("HoraInicioTurno", perfilDetalleHorario.getHoraInicioTurno());
			listaParametros.addValue("HoraFinTurno", perfilDetalleHorario.getHoraFinTurno());

			// Valores Auditoria
			listaParametros.addValue("ActualizadoEl", perfilDetalleHorario.getActualizadoEl());
			listaParametros.addValue("ActualizadoPor", perfilDetalleHorario.getActualizadoPor());
			listaParametros.addValue("IpActualizacion", perfilDetalleHorario.getIpActualizacion());
			listaParametros.addValue("Id", perfilDetalleHorario.getId());
			SqlParameterSource namedParameters = listaParametros;
			/* Ejecuta la consulta y retorna las filas afectadas */
			cantidadFilasAfectadas = namedJdbcTemplate.update(
					consultaSQL.toString(), namedParameters);
			if (cantidadFilasAfectadas > 1) {
				respuesta.error = Constante.EXCEPCION_CANTIDAD_REGISTROS_INCORRECTA;
				respuesta.estado = false;
				return respuesta;
			}
			respuesta.estado = true;
		} catch (DataIntegrityViolationException excepcionIntegridadDatos) {
			excepcionIntegridadDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado = false;
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
		}
		return respuesta;
	}

	public RespuestaCompuesta eliminarRegistro(int idRegistro) {
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		int cantidadFilasAfectadas = 0;
		String consultaSQL = "";
		Object[] parametros = { idRegistro };
		try {
			consultaSQL = "DELETE FROM " + NOMBRE_TABLA + " WHERE " + NOMBRE_CAMPO_CLAVE + "=?";
			cantidadFilasAfectadas = jdbcTemplate.update(consultaSQL, parametros);
			if (cantidadFilasAfectadas > 1) {
				respuesta.error = Constante.EXCEPCION_CANTIDAD_REGISTROS_INCORRECTA;
				respuesta.estado = false;
				return respuesta;
			}
			respuesta.estado = true;
		} catch (DataIntegrityViolationException excepcionIntegridadDatos) {
			excepcionIntegridadDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado = false;
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
		}
		return respuesta;
	}
	
	/**
	 * 
	 * @param idPerfilHorario
	 * @param cantidadTurnos
	 * @return
	 */
	public RespuestaCompuesta recuperarRegistroPorTurno(Integer idPerfilHorario, Integer cantidadTurnos) {
		
		String sqlWhere = "";
		String sqlOrderBy = "";
		int totalRegistros = 0, totalEncontrados = 0;
		List<Object> parametros = new ArrayList<Object>();
		
		Contenido<PerfilDetalleHorario> contenido = new Contenido<PerfilDetalleHorario>();
		List<PerfilDetalleHorario> listaRegistros = new ArrayList<PerfilDetalleHorario>();
		
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		
		try{
			
			sqlWhere = "WHERE t1." + CAMPO_PERFIL_HORARIO + " = " + idPerfilHorario + " AND t1." + CAMPO_NUMERO_ORDEN + " = " + cantidadTurnos;
			sqlOrderBy= " ORDER BY t1." + NOMBRE_CAMPO_ORDENAMIENTO + " ASC";
			
			StringBuilder consultaSQL = new StringBuilder();
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT count(" + NOMBRE_CAMPO_CLAVE	+ ") as total FROM " + NOMBRE_TABLA);
			totalRegistros = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			totalEncontrados = totalRegistros;
		
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT ");
			consultaSQL.append("t1.id_perfil_detalle_horario,");
			consultaSQL.append("t1.numero_orden,");
			consultaSQL.append("t1.glosa_turno,");
			consultaSQL.append("t1.hora_inicio_turno,");
			consultaSQL.append("t1.hora_fin_turno,");
			consultaSQL.append("t1.id_perfil_horario,");
			consultaSQL.append("t1.creado_el,");
			consultaSQL.append("t1.creado_por,");
			consultaSQL.append("t1.actualizado_por,");
			consultaSQL.append("t1.actualizado_el,");
			consultaSQL.append("t1.ip_creacion,");
			consultaSQL.append("t1.ip_actualizacion,");
			consultaSQL.append("t1.usuario_creacion,"); 
			consultaSQL.append("t1.usuario_actualizacion, ");
			consultaSQL.append("CONCAT(t1.hora_inicio_turno, ' - ', t1.hora_fin_turno) AS horaInicioFinTurno ");
			consultaSQL.append(" FROM ");
			consultaSQL.append(NOMBRE_VISTA);
			consultaSQL.append(" t1 ");	
			consultaSQL.append(sqlWhere);
			consultaSQL.append(sqlOrderBy);
			
			listaRegistros = jdbcTemplate.query(consultaSQL.toString(),	parametros.toArray(), new PerfilDetalleHorarioMapper());
			
			contenido.carga = listaRegistros;
			respuesta.estado = true;
			respuesta.contenido = contenido;
			respuesta.contenido.totalRegistros = totalRegistros;
			respuesta.contenido.totalEncontrados = totalEncontrados;
		} catch (DataAccessException e) {
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
			respuesta.contenido = null;
		} catch (Exception e) {
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_GENERICA;
			respuesta.contenido = null;
			respuesta.estado = false;
		}
		return respuesta;
	}

}
