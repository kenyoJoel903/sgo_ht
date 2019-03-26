package sgo.datos;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
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

import sgo.entidad.ArchivoAdjuntoDescargaCisterna;
import sgo.entidad.Contenido;
import sgo.entidad.RespuestaCompuesta;
import sgo.utilidades.Constante;

/**
 * 
 * @author KenyoJoelPechoNaupar
 *
 */
@Repository
public class ArchivoAdjuntoDescargaCisternaDao {
	
	private static Logger LOGGER = Logger.getLogger(ArchivoAdjuntoDescargaCisternaDao.class);
	
	private JdbcTemplate jdbcTemplate;
	private NamedParameterJdbcTemplate namedJdbcTemplate;
	
	public static final String NOMBRE_TABLA =  Constante.ESQUEMA_APLICACION + "archivo_adj_descarga_cisterna";
	public static final String NOMBRE_VISTA = Constante.ESQUEMA_APLICACION + "v_adjunto_descarga_cisterna ";
	public static final String NOMBRE_CAMPO_CLAVE = "id_adj_descarga_cisterna";
	public static final String NOMBRE_CAMPO_DESCARGA_CISTERNA = "id_descarga_cisterna";
	
	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.namedJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public DataSource getDataSource(){
		return this.jdbcTemplate.getDataSource();
	}
	
	
	/**
	 * Registrar archivo adjunto
	 * @param registro
	 * @return
	 */
	public RespuestaCompuesta registrarArchivoAdjunto(ArchivoAdjuntoDescargaCisterna registro) {
		LOGGER.info("[INICIO] registrarArchivoAdjunto ");
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder queryRegistro = new StringBuilder("");
		KeyHolder claveGenerada = null;
		int cantidadFilasAfectadas=0;
		try {
			queryRegistro.append("INSERT INTO ")
						.append(NOMBRE_TABLA)
						.append(" (")
						.append("tipo_proceso, id_descarga_cisterna, nombre_archivo_original, nombre_archivo_adjunto, adjunto_referencia, creado_el, creado_por")
						.append(") ")
						.append(" VALUES (")
						.append(":tipo_proceso, :id_descarga_cisterna, :nombre_archivo_original, :nombre_archivo_adjunto, :adjunto_referencia, :creado_el, :creado_por")
						.append(")");
			MapSqlParameterSource listaParametros = new MapSqlParameterSource();
			listaParametros.addValue("tipo_proceso", registro.getTipo_proceso());
			listaParametros.addValue("id_descarga_cisterna", registro.getId_descarga_cisterna());
			listaParametros.addValue("nombre_archivo_original", registro.getNombre_archivo_original());
			listaParametros.addValue("nombre_archivo_adjunto", registro.getNombre_archivo_adjunto());
			listaParametros.addValue("adjunto_referencia", registro.getAdjunto_referencia());
			listaParametros.addValue("creado_el", registro.getCreadoEl());
			listaParametros.addValue("creado_por", registro.getCreadoPor());
			
			SqlParameterSource namedParameters= listaParametros;
			
			claveGenerada = new GeneratedKeyHolder();
			cantidadFilasAfectadas= namedJdbcTemplate.update(queryRegistro.toString(),namedParameters,claveGenerada,new String[] {NOMBRE_CAMPO_CLAVE});		
			if (cantidadFilasAfectadas>1){
				respuesta.error=Constante.EXCEPCION_CANTIDAD_REGISTROS_INCORRECTA;
				respuesta.estado=false;
				return respuesta;
			}
			respuesta.estado=true;
			respuesta.valor= claveGenerada.getKey().toString();
		} catch (DataIntegrityViolationException excepcionIntegridadDatos){
			excepcionIntegridadDatos.printStackTrace();
			respuesta.error= Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado=false;
			LOGGER.error("[ERROR] registrarArchivoAdjunto ", excepcionIntegridadDatos);
		} catch (DataAccessException excepcionAccesoDatos){
			excepcionAccesoDatos.printStackTrace();
			respuesta.error=Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado=false;
			LOGGER.error("[ERROR] registrarArchivoAdjunto ", excepcionAccesoDatos);
		}
		LOGGER.info("[FIN] registrarArchivoAdjunto ");
		return respuesta;
		
	}
	
	/**
	 * Obtener lista de documentos x idDecargaCisterna
	 * @param tipoProceso
	 * @param idDescargaCisterna
	 * @return
	 */
	public RespuestaCompuesta recuperarRegistros(int tipoProceso, int idDescargaCisterna) {
		LOGGER.info("[INICIO] recuperarRegistros ");
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder consultaSQL = new StringBuilder("");
		Contenido<ArchivoAdjuntoDescargaCisterna> contenido = new Contenido<>();
		List<ArchivoAdjuntoDescargaCisterna> listaRegistros = new ArrayList<>();
		try {
			consultaSQL.append("SELECT ")
						.append(" t1.id_adj_descarga_cisterna")
						.append(", t1.tipo_proceso")
						.append(", t1.id_descarga_cisterna")
						.append(", t1.nombre_archivo_original")
						.append(", t1.nombre_archivo_adjunto")
						.append(", t1.adjunto_referencia")
						.append(", t1.creado_por")
						.append(", t1.usuario_creacion")
						.append(", t1.creado_el")
						.append(" FROM ")
						.append(NOMBRE_VISTA)
						.append(" t1 ")
						.append(" WHERE ")
						.append(NOMBRE_CAMPO_DESCARGA_CISTERNA)
						.append(" = ? ")
						.append(" AND ")
						.append(" t1.tipo_proceso = ?");
			LOGGER.info(consultaSQL.toString());
			listaRegistros = jdbcTemplate.query(consultaSQL.toString(), new Object[] {idDescargaCisterna, tipoProceso}, new ArchivoAdjuntoDescargaCisternaMapper());
			listaRegistros = listaRegistros != null && !listaRegistros.isEmpty() ? listaRegistros : new ArrayList<>();
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado=false;
			respuesta.contenido=null;
			LOGGER.error("[ERROR] recuperarRegistros ", excepcionAccesoDatos);
		}
		contenido.totalRegistros = listaRegistros.size();
		contenido.totalEncontrados = listaRegistros.size();
		contenido.carga = listaRegistros;
		respuesta.mensaje = "OK";
		respuesta.estado = true;
		respuesta.contenido = contenido;
		LOGGER.info("[FIN] recuperarRegistros ");
		return respuesta;
	}
	
	/**
	 * Eliminar registro 
	 * @param id
	 * @return
	 */
	public  RespuestaCompuesta eliminarRegistro(int id) {
		LOGGER.info("[INICIO] eliminarRegistro ");
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		int cantidadFilasAfectadas=0;	
		StringBuilder deleteQuery = new StringBuilder("");
		try {
			deleteQuery.append("DELETE FROM ")
						.append(NOMBRE_TABLA)
						.append(" WHERE ")
						.append(NOMBRE_CAMPO_CLAVE)
						.append(" = ? ");
			cantidadFilasAfectadas = jdbcTemplate.update(deleteQuery.toString(), new Object[] {id} );
			if (cantidadFilasAfectadas > 1){
				respuesta.error= Constante.EXCEPCION_CANTIDAD_REGISTROS_INCORRECTA;
				respuesta.estado=false;
				return respuesta;
			}
			respuesta.estado=true;
		} catch (DataIntegrityViolationException excepcionIntegridadDatos){	
			excepcionIntegridadDatos.printStackTrace();
			respuesta.error= Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado=false;
		} catch (DataAccessException excepcionAccesoDatos){
			excepcionAccesoDatos.printStackTrace();
			respuesta.error= Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado=false;
		}
		LOGGER.info("[FIN] eliminarRegistro ");
		return respuesta;
	}
	
	public RespuestaCompuesta recuperarRegistros(int idArchivoAdjunto) {
		LOGGER.info("[INICIO] recuperarRegistros ");
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder consultaSQL = new StringBuilder("");
		Contenido<ArchivoAdjuntoDescargaCisterna> contenido = new Contenido<>();
		List<ArchivoAdjuntoDescargaCisterna> listaRegistros = new ArrayList<>();
		try {
			consultaSQL.append("SELECT ")
						.append(" t1.id_adj_descarga_cisterna")
						.append(", t1.tipo_proceso")
						.append(", t1.id_descarga_cisterna")
						.append(", t1.nombre_archivo_original")
						.append(", t1.nombre_archivo_adjunto")
						.append(", t1.adjunto_referencia")
						.append(", t1.creado_por")
						.append(", t1.usuario_creacion")
						.append(", t1.creado_el")
						.append(" FROM ")
						.append(NOMBRE_VISTA)
						.append(" t1 ")
						.append(" WHERE ")
						.append(NOMBRE_CAMPO_CLAVE)
						.append(" = ? ");
			LOGGER.info(consultaSQL.toString());
			listaRegistros = jdbcTemplate.query(consultaSQL.toString(), new Object[] {idArchivoAdjunto}, new ArchivoAdjuntoDescargaCisternaMapper());
			listaRegistros = listaRegistros != null && !listaRegistros.isEmpty() ? listaRegistros : new ArrayList<>();
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado=false;
			respuesta.contenido=null;
			LOGGER.error("[ERROR] recuperarRegistros ", excepcionAccesoDatos);
		}
		contenido.totalRegistros = listaRegistros.size();
		contenido.totalEncontrados = listaRegistros.size();
		contenido.carga = listaRegistros;
		respuesta.mensaje = "OK";
		respuesta.estado = true;
		respuesta.contenido = contenido;
		LOGGER.info("[FIN] recuperarRegistros ");
		return respuesta;
	}
	
	

}
