package sgo.datos;

import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;
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

import sgo.entidad.Producto;
import sgo.entidad.Contenido;
import sgo.entidad.ParametrosListar;
import sgo.entidad.RespuestaCompuesta;
import sgo.utilidades.Constante;

@Repository
public class ProductoDao {
	private JdbcTemplate jdbcTemplate;
	private NamedParameterJdbcTemplate namedJdbcTemplate;
	public static final String NOMBRE_TABLA = Constante.ESQUEMA_APLICACION + "producto";
	public static final String NOMBRE_VISTA = Constante.ESQUEMA_APLICACION + "v_producto";
	public final static String NOMBRE_CAMPO_CLAVE = "id_producto";
	
	public final static String NOMBRE_CAMPO_FILTRO = "nombre";
	public final static String NOMBRE_CAMPO_FILTRO_ESTADO = "estado";	
	public final static String NOMBRE_CAMPO_ORDENAMIENTO_DEFECTO = "nombre";
	
	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.namedJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public DataSource getDataSource(){
		return this.jdbcTemplate.getDataSource();
	}
	
	public String mapearCampoOrdenamiento(String propiedad){
		String campoOrdenamiento = NOMBRE_CAMPO_ORDENAMIENTO_DEFECTO;
		try {
			if (propiedad.equals("nombre")){
				campoOrdenamiento="nombre";
			}
			if (propiedad.equals("codigoOsinerg")){
				campoOrdenamiento="codigo_osinerg";
			}
			if (propiedad.equals("abreviatura")){
				campoOrdenamiento="abreviatura";
			}
			if (propiedad.equals("estado")){
				campoOrdenamiento="estado";
			}
		}catch(Exception excepcion){
			
		}
		return campoOrdenamiento;
	}

	public RespuestaCompuesta recuperarRegistros(ParametrosListar argumentosListar) {
		String sqlLimit = "";
		String sqlOrderBy="";
		List<String> filtrosWhere= new ArrayList<String>();
		String sqlWhere="";
		int totalRegistros = 0, 
		totalEncontrados = 0;
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		Contenido<Producto> contenido = new Contenido<Producto>();
		List<Producto> listaRegistros = new ArrayList<Producto>();
		List<Object> parametros = new ArrayList<Object>();
		try {
			if (argumentosListar.getPaginacion() == Constante.CON_PAGINACION) {
				sqlLimit = Constante.SQL_LIMIT_CONFIGURADO;
				parametros.add(argumentosListar.getInicioPaginacion());
				parametros.add(argumentosListar.getRegistrosxPagina());
			}

			sqlOrderBy= " ORDER BY " + this.mapearCampoOrdenamiento(argumentosListar.getCampoOrdenamiento()) + " "  + argumentosListar.getSentidoOrdenamiento();

			StringBuilder consultaSQL = new StringBuilder();
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT count(" + NOMBRE_CAMPO_CLAVE+ ") as total FROM " + NOMBRE_VISTA);
			totalRegistros = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			totalEncontrados=totalRegistros;

			if (!argumentosListar.getValorBuscado().isEmpty()){
				filtrosWhere.add("lower(t1."+NOMBRE_CAMPO_FILTRO+") like lower('%"+ argumentosListar.getValorBuscado() +"%') ");
			}
			
			if(argumentosListar.getFiltroEstado() != Constante.FILTRO_TODOS){
				filtrosWhere.add(" t1."+NOMBRE_CAMPO_FILTRO_ESTADO + "=" + argumentosListar.getFiltroEstado());
			}
			if (!argumentosListar.getTxtFiltro().isEmpty()){
				filtrosWhere.add("lower(t1."+NOMBRE_CAMPO_FILTRO+") like lower('%"+ argumentosListar.getTxtFiltro() +"%') ");
			}
			if (!argumentosListar.getAbreviaturaProducto().isEmpty()){
				filtrosWhere.add("lower(t1.abreviatura) like lower('%"+ argumentosListar.getAbreviaturaProducto() +"%') ");
			}
			if (argumentosListar.getFiltroCodigoReferencia().length()==5){
			 filtrosWhere.add("codigo_referencia =  '"+argumentosListar.getFiltroCodigoReferencia()+"'");
			}
			
			//para recuperar el registro "SIN PRODUCTO"
			if (argumentosListar.getIndicadorProducto() != Constante.FILTRO_TODOS){
				 filtrosWhere.add("indicador_producto =  '"+argumentosListar.getIndicadorProducto()+"'");
				}
			
			if(!filtrosWhere.isEmpty()){
				consultaSQL.setLength(0);
				sqlWhere = "WHERE " + StringUtils.join(filtrosWhere, Constante.SQL_Y);
				
				consultaSQL.append("SELECT count(t1." + NOMBRE_CAMPO_CLAVE+ ") as total FROM " + NOMBRE_VISTA + " t1 " + sqlWhere);
				totalEncontrados = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			}

			consultaSQL.setLength(0);
			consultaSQL.append("SELECT ");
			consultaSQL.append("t1.id_producto,");
			consultaSQL.append("t1.nombre,");
			consultaSQL.append("t1.codigo_osinerg,");
			consultaSQL.append("t1.abreviatura,");
			consultaSQL.append("t1.indicador_producto,");
			consultaSQL.append("t1.estado,");
			//Campos de auditoria
			consultaSQL.append("t1.creado_el,");
			consultaSQL.append("t1.creado_por,");
			consultaSQL.append("t1.actualizado_por,");
			consultaSQL.append("t1.actualizado_el,");
			consultaSQL.append("t1.usuario_creacion,");
			consultaSQL.append("t1.usuario_actualizacion,");
			consultaSQL.append("t1.ip_creacion,");
			consultaSQL.append("t1.ip_actualizacion");
			consultaSQL.append(", t1.codigo_referencia");//7000001924
			consultaSQL.append(" FROM ");
			consultaSQL.append(NOMBRE_VISTA);
			consultaSQL.append(" t1 ");
			consultaSQL.append(sqlWhere);
			consultaSQL.append(sqlOrderBy);
			consultaSQL.append(sqlLimit);
			listaRegistros = jdbcTemplate.query(consultaSQL.toString(),parametros.toArray(), new ProductoMapper());
			totalEncontrados =totalRegistros;
			contenido.carga = listaRegistros;
			respuesta.estado = true;
			respuesta.contenido = contenido;
			respuesta.contenido.totalRegistros = totalRegistros;
			respuesta.contenido.totalEncontrados = totalEncontrados;
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error=  Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
			respuesta.contenido=null;
		} catch (Exception excepcionGenerica) {
			excepcionGenerica.printStackTrace();
			respuesta.error= Constante.EXCEPCION_GENERICA;
			respuesta.contenido=null;
			respuesta.estado = false;
		}
		return respuesta;
	}
	
	
	public RespuestaCompuesta recuperarRegistro(int ID){
			StringBuilder consultaSQL= new StringBuilder();		
			List<Producto> listaRegistros=new ArrayList<Producto>();
			Contenido<Producto> contenido = new Contenido<Producto>();
			RespuestaCompuesta respuesta= new RespuestaCompuesta();
			try {
				consultaSQL.append("SELECT ");
				consultaSQL.append("t1.id_producto,");
				consultaSQL.append("t1.nombre,");
				consultaSQL.append("t1.codigo_osinerg,");
				consultaSQL.append("t1.abreviatura,");
				consultaSQL.append("t1.indicador_producto,");
				consultaSQL.append("t1.estado,");
				//Campos de auditoria
				consultaSQL.append("t1.creado_el,");
				consultaSQL.append("t1.creado_por,");
				consultaSQL.append("t1.actualizado_por,");
				consultaSQL.append("t1.actualizado_el,");	
				consultaSQL.append("t1.usuario_creacion,");
				consultaSQL.append("t1.usuario_actualizacion,");
				consultaSQL.append("t1.ip_creacion,");
				consultaSQL.append("t1.ip_actualizacion");
				consultaSQL.append(", t1.codigo_referencia");//7000001924
				consultaSQL.append(" FROM ");				
				consultaSQL.append(NOMBRE_VISTA);
				consultaSQL.append(" t1 ");
				consultaSQL.append(" WHERE ");
				consultaSQL.append(NOMBRE_CAMPO_CLAVE);
				consultaSQL.append("=?");
				listaRegistros= jdbcTemplate.query(consultaSQL.toString(),new Object[] {ID},new ProductoMapper());
				contenido.totalRegistros=listaRegistros.size();
				contenido.totalEncontrados=listaRegistros.size();
				contenido.carga= listaRegistros;
				respuesta.mensaje="OK";
				respuesta.estado=true;
				respuesta.contenido = contenido;			
			} catch (DataAccessException excepcionAccesoDatos) {
				excepcionAccesoDatos.printStackTrace();
				respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
				respuesta.estado=false;
				respuesta.contenido=null;
			}
			return respuesta;
		}
	
	public RespuestaCompuesta guardarRegistro(Producto producto){
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder consultaSQL= new StringBuilder();
		KeyHolder claveGenerada = null;
		int cantidadFilasAfectadas=0;
		try {
			consultaSQL.append("INSERT INTO ");
			consultaSQL.append(NOMBRE_TABLA);
			consultaSQL.append(" (nombre,codigo_osinerg,abreviatura,indicador_producto,estado,creado_el,creado_por,actualizado_por,actualizado_el,ip_creacion,ip_actualizacion,codigo_referencia) ");//7000001924
			consultaSQL.append(" VALUES (:Nombre,:CodigoOsinerg,:Abreviatura,:IndicadorProducto,:Estado,:CreadoEl,:CreadoPor,:ActualizadoPor,:ActualizadoEl,:IpCreacion,:IpActualizacion,:CodigoReferencia) ");//7000001924
			MapSqlParameterSource listaParametros= new MapSqlParameterSource();   
			listaParametros.addValue("Nombre", producto.getNombre());
			listaParametros.addValue("CodigoOsinerg", producto.getCodigoOsinerg());
			listaParametros.addValue("Abreviatura", producto.getAbreviatura());
			listaParametros.addValue("IndicadorProducto", producto.getIndicadorProducto());
			listaParametros.addValue("Estado", producto.getEstado());
			listaParametros.addValue("CreadoEl", producto.getCreadoEl());
			listaParametros.addValue("CreadoPor", producto.getCreadoPor());
			listaParametros.addValue("ActualizadoPor", producto.getActualizadoPor());
			listaParametros.addValue("ActualizadoEl", producto.getActualizadoEl());
			listaParametros.addValue("IpCreacion", producto.getIpCreacion());
			listaParametros.addValue("IpActualizacion", producto.getIpActualizacion());
			listaParametros.addValue("CodigoReferencia", producto.getCodigoReferencia());//7000001924
			
			SqlParameterSource namedParameters= listaParametros;
			/*Ejecuta la consulta y retorna las filas afectadas*/
			claveGenerada = new GeneratedKeyHolder();
			cantidadFilasAfectadas= namedJdbcTemplate.update(consultaSQL.toString(),namedParameters,claveGenerada,new String[] {NOMBRE_CAMPO_CLAVE});		
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
		} catch (DataAccessException excepcionAccesoDatos){
			excepcionAccesoDatos.printStackTrace();
			respuesta.error=Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado=false;
		}
		return respuesta;
	}
	
	public RespuestaCompuesta actualizarRegistro(Producto producto){
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder consultaSQL= new StringBuilder();
		int cantidadFilasAfectadas=0;
		try {
			consultaSQL.append("UPDATE ");
			consultaSQL.append(NOMBRE_TABLA);
			consultaSQL.append(" SET ");
			consultaSQL.append("nombre=:Nombre,");
			consultaSQL.append("codigo_osinerg=:CodigoOsinerg,");
			consultaSQL.append("abreviatura=:Abreviatura,");
			consultaSQL.append("estado=:Estado,");

			consultaSQL.append("actualizado_por=:ActualizadoPor,");
			consultaSQL.append("actualizado_el=:ActualizadoEl,");
			consultaSQL.append("ip_actualizacion=:IpActualizacion");
			consultaSQL.append(" ,codigo_referencia=:CodigoReferencia");//7000001924
			consultaSQL.append(" WHERE ");
			consultaSQL.append(NOMBRE_CAMPO_CLAVE);
			consultaSQL.append("=:Id");
			MapSqlParameterSource listaParametros= new MapSqlParameterSource();
			listaParametros.addValue("Nombre", producto.getNombre());
			listaParametros.addValue("CodigoOsinerg", producto.getCodigoOsinerg());
			listaParametros.addValue("Abreviatura", producto.getAbreviatura());
			listaParametros.addValue("Estado", producto.getEstado());
			listaParametros.addValue("SincronizadoEl", producto.getSincronizadoEl());
			listaParametros.addValue("FechaReferencia", producto.getFechaReferencia());
			listaParametros.addValue("CodigoReferencia", producto.getCodigoReferencia());
			//Valores Auditoria
			listaParametros.addValue("ActualizadoEl", producto.getActualizadoEl());
			listaParametros.addValue("ActualizadoPor", producto.getActualizadoPor());
			listaParametros.addValue("IpActualizacion", producto.getIpActualizacion());
			listaParametros.addValue("Id", producto.getId());
			SqlParameterSource namedParameters= listaParametros;
			/*Ejecuta la consulta y retorna las filas afectadas*/
			cantidadFilasAfectadas= namedJdbcTemplate.update(consultaSQL.toString(),namedParameters);		
			if (cantidadFilasAfectadas>1){
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
		return respuesta;
	}
	
	public RespuestaCompuesta eliminarRegistro(int idRegistro){		
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		int cantidadFilasAfectadas=0;	
		String consultaSQL="";
		Object[] parametros = {idRegistro};
		try {
			consultaSQL="DELETE FROM " + NOMBRE_TABLA + " WHERE " + NOMBRE_CAMPO_CLAVE + "=?";
        	cantidadFilasAfectadas = jdbcTemplate.update(consultaSQL, parametros);
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
		return respuesta;
	}
	
	public RespuestaCompuesta ActualizarEstadoRegistro(Producto entidad){
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder consultaSQL= new StringBuilder();
		int cantidadFilasAfectadas=0;
		try {
			
			consultaSQL.append("UPDATE ");
			consultaSQL.append(NOMBRE_TABLA);
			consultaSQL.append(" SET ");
			consultaSQL.append("estado=:Estado,");

			consultaSQL.append("actualizado_por=:ActualizadoPor,");
			consultaSQL.append("actualizado_el=:ActualizadoEl,");
			consultaSQL.append("ip_actualizacion=:IpActualizacion");
			consultaSQL.append(" WHERE ");
			consultaSQL.append(NOMBRE_CAMPO_CLAVE);
			consultaSQL.append("=:Id");
			MapSqlParameterSource listaParametros= new MapSqlParameterSource();
			listaParametros.addValue("Estado", entidad.getEstado());
			listaParametros.addValue("SincronizadoEl", entidad.getSincronizadoEl());
			listaParametros.addValue("FechaReferencia", entidad.getFechaReferencia());
			listaParametros.addValue("CodigoReferencia", entidad.getCodigoReferencia());
			//Valores Auditoria
			listaParametros.addValue("ActualizadoEl", entidad.getActualizadoEl());
			listaParametros.addValue("ActualizadoPor", entidad.getActualizadoPor());
			listaParametros.addValue("IpActualizacion", entidad.getIpActualizacion());
			listaParametros.addValue("Id", entidad.getId());
			SqlParameterSource namedParameters= listaParametros;
			/*Ejecuta la consulta y retorna las filas afectadas*/
			cantidadFilasAfectadas= namedJdbcTemplate.update(consultaSQL.toString(),namedParameters);		
			if (cantidadFilasAfectadas>1){
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
		return respuesta;
	}
	
	/** Inicio Atención ticket 9000002608 */
	public RespuestaCompuesta recuperarRegistrosProgramacion(ParametrosListar argumentosListar) {
		String sqlLimit = "";
		String sqlOrderBy="";
		List<String> filtrosWhere= new ArrayList<String>();
		String sqlWhere="";
		int totalRegistros = 0, 
		totalEncontrados = 0;
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		Contenido<Producto> contenido = new Contenido<Producto>();
		List<Producto> listaRegistros = new ArrayList<Producto>();
		List<Object> parametros = new ArrayList<Object>();
		try {
			if (argumentosListar.getPaginacion() == Constante.CON_PAGINACION) {
				sqlLimit = Constante.SQL_LIMIT_CONFIGURADO;
				parametros.add(argumentosListar.getInicioPaginacion());
				parametros.add(argumentosListar.getRegistrosxPagina());
			}

			sqlOrderBy= " ORDER BY t1.nombre asc";
			
			StringBuilder consultaSQL = new StringBuilder();
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT count(" + NOMBRE_CAMPO_CLAVE+ ") as total FROM " + NOMBRE_VISTA);
			totalRegistros = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			totalEncontrados=totalRegistros;
			
			if(argumentosListar.getFiltroEstado() != Constante.FILTRO_TODOS){
				filtrosWhere.add(" t1."+NOMBRE_CAMPO_FILTRO_ESTADO + "=" + argumentosListar.getFiltroEstado());
			}
			if(argumentosListar.getIdCliente() > 0 ){
				filtrosWhere.add("t1.id_cliente = "+ argumentosListar.getIdCliente());
			}
			if(argumentosListar.getFiltroOperacion() > 0 ){
				filtrosWhere.add("t1.id_operacion = "+ argumentosListar.getFiltroOperacion());
			}
			if(argumentosListar.getFiltroEstacion() > 0 ){
				filtrosWhere.add("t1.id_estacion = "+ argumentosListar.getFiltroEstacion());
			}
			if(!filtrosWhere.isEmpty()){
				consultaSQL.setLength(0);
				sqlWhere = "WHERE " + StringUtils.join(filtrosWhere, Constante.SQL_Y);

				consultaSQL.append("SELECT count(t1." + NOMBRE_CAMPO_CLAVE+ ") as total FROM sgo.v_productos_operacion t1 " + sqlWhere);
				totalEncontrados = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			}

			consultaSQL.setLength(0);
			consultaSQL.append("SELECT ");
			consultaSQL.append("distinct(t1.id_producto), ");
			consultaSQL.append("t1.nombre, ");
			consultaSQL.append("t1.abreviatura, ");
			consultaSQL.append("t1.estado, ");
			consultaSQL.append("t1.codigo_osinerg, ");
			consultaSQL.append("t1.indicador_producto, ");
			//Campos de auditoria
			consultaSQL.append("t1.creado_el, ");
			consultaSQL.append("t1.creado_por, ");
			consultaSQL.append("t1.actualizado_por, ");
			consultaSQL.append("t1.actualizado_el, ");
			consultaSQL.append("t1.usuario_creacion, ");
			consultaSQL.append("t1.usuario_actualizacion, ");
			consultaSQL.append("t1.ip_creacion, ");
			consultaSQL.append("t1.ip_actualizacion");
			consultaSQL.append(" FROM ");
			consultaSQL.append(" sgo.v_productos_programacion ");
			consultaSQL.append(" t1 ");
			consultaSQL.append(sqlWhere);
			consultaSQL.append(sqlOrderBy);
			consultaSQL.append(sqlLimit);
			listaRegistros = jdbcTemplate.query(consultaSQL.toString(),parametros.toArray(), new ProductoMapper());
			totalEncontrados =totalRegistros;
			contenido.carga = listaRegistros;
			respuesta.estado = true;
			respuesta.contenido = contenido;
			respuesta.contenido.totalRegistros = totalRegistros;
			respuesta.contenido.totalEncontrados = totalEncontrados;
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error=  Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
			respuesta.contenido=null;
		} catch (Exception excepcionGenerica) {
			excepcionGenerica.printStackTrace();
			respuesta.error= Constante.EXCEPCION_GENERICA;
			respuesta.contenido=null;
			respuesta.estado = false;
		}
		return respuesta; 
	}
	
	/** Fin Atención Ticket 9000002608*/
	
	public RespuestaCompuesta recuperarRegistrosPorOperacion(ParametrosListar argumentosListar) {
		String sqlLimit = "";
		String sqlOrderBy="";
		List<String> filtrosWhere= new ArrayList<String>();
		String sqlWhere="";
		int totalRegistros = 0, 
		totalEncontrados = 0;
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		Contenido<Producto> contenido = new Contenido<Producto>();
		List<Producto> listaRegistros = new ArrayList<Producto>();
		List<Object> parametros = new ArrayList<Object>();
		try {
			if (argumentosListar.getPaginacion() == Constante.CON_PAGINACION) {
				sqlLimit = Constante.SQL_LIMIT_CONFIGURADO;
				parametros.add(argumentosListar.getInicioPaginacion());
				parametros.add(argumentosListar.getRegistrosxPagina());
			}

			sqlOrderBy= " ORDER BY t1.nombre asc";
			
			StringBuilder consultaSQL = new StringBuilder();
			consultaSQL.setLength(0);
			consultaSQL.append("SELECT count(" + NOMBRE_CAMPO_CLAVE+ ") as total FROM " + NOMBRE_VISTA);
			totalRegistros = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			totalEncontrados=totalRegistros;
			
			if(argumentosListar.getFiltroEstado() != Constante.FILTRO_TODOS){
				filtrosWhere.add(" t1."+NOMBRE_CAMPO_FILTRO_ESTADO + "=" + argumentosListar.getFiltroEstado());
			}
			if(argumentosListar.getIdCliente() > 0 ){
				filtrosWhere.add("t1.id_cliente = "+ argumentosListar.getIdCliente());
			}
			if(argumentosListar.getFiltroOperacion() > 0 ){
				filtrosWhere.add("t1.id_operacion = "+ argumentosListar.getFiltroOperacion());
			}
			if(argumentosListar.getFiltroEstacion() > 0 ){
				filtrosWhere.add("t1.id_estacion = "+ argumentosListar.getFiltroEstacion());
			}
			if(!filtrosWhere.isEmpty()){
				consultaSQL.setLength(0);
				sqlWhere = "WHERE " + StringUtils.join(filtrosWhere, Constante.SQL_Y);

				consultaSQL.append("SELECT count(t1." + NOMBRE_CAMPO_CLAVE+ ") as total FROM sgo.v_productos_operacion t1 " + sqlWhere);
				totalEncontrados = jdbcTemplate.queryForObject(consultaSQL.toString(), null, Integer.class);
			}

			consultaSQL.setLength(0);
			consultaSQL.append("SELECT ");
			consultaSQL.append("distinct(t1.id_producto), ");
			consultaSQL.append("t1.nombre, ");
			consultaSQL.append("t1.abreviatura, ");
			consultaSQL.append("t1.estado, ");
			consultaSQL.append("t1.codigo_osinerg, ");
			consultaSQL.append("t1.indicador_producto, ");
			
			//Campos de auditoria
			consultaSQL.append("t1.creado_el, ");
			consultaSQL.append("t1.creado_por, ");
			consultaSQL.append("t1.actualizado_por, ");
			consultaSQL.append("t1.actualizado_el, ");
			consultaSQL.append("t1.usuario_creacion, ");
			consultaSQL.append("t1.usuario_actualizacion, ");
			consultaSQL.append("t1.ip_creacion, ");
			consultaSQL.append("t1.ip_actualizacion");
			
			//se encontro el error que no tenia mapeado este campo al realizar el req 9000002608
			consultaSQL.append(", t1.codigo_referencia");
			
			consultaSQL.append(" FROM ");
			consultaSQL.append(" sgo.v_productos_operacion ");
			consultaSQL.append(" t1 ");
			consultaSQL.append(sqlWhere);
			consultaSQL.append(sqlOrderBy);
			consultaSQL.append(sqlLimit);
			
			listaRegistros = jdbcTemplate.query(consultaSQL.toString(),parametros.toArray(), new ProductoMapper());
			totalEncontrados = totalRegistros;
			contenido.carga = listaRegistros;
			respuesta.estado = true;
			respuesta.contenido = contenido;
			respuesta.contenido.totalRegistros = totalRegistros;
			respuesta.contenido.totalEncontrados = totalEncontrados;
		} catch (DataAccessException excepcionAccesoDatos) {
			excepcionAccesoDatos.printStackTrace();
			respuesta.error=  Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
			respuesta.contenido=null;
		} catch (Exception excepcionGenerica) {
			excepcionGenerica.printStackTrace();
			respuesta.error= Constante.EXCEPCION_GENERICA;
			respuesta.contenido=null;
			respuesta.estado = false;
		}
		return respuesta;
	}
}