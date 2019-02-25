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
import sgo.entidad.ProductoEquivalente;
import sgo.entidad.ProductoEquivalenteJson;
import sgo.entidad.Contenido;
import sgo.entidad.ParametrosListar;
import sgo.entidad.RespuestaCompuesta;
import sgo.utilidades.Constante;

@Repository
public class ProductoEquivalenteDao {
	
	private JdbcTemplate jdbcTemplate;
	private NamedParameterJdbcTemplate namedJdbcTemplate;
	public static final String NOMBRE_TABLA = Constante.ESQUEMA_APLICACION + "producto_equivalente";
	public static final String NOMBRE_VISTA = Constante.ESQUEMA_APLICACION + "v_producto_equivalente";
	public final static String NOMBRE_CAMPO_CLAVE = "id_operacion";
	
	public final static String NOMBRE_CAMPO_FILTRO = "id_operacion";
	public final static String NOMBRE_CAMPO_FILTRO_ESTADO = "estado";	
	public final static String NOMBRE_CAMPO_ORDENAMIENTO_DEFECTO = "id_operacion";
	
	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.namedJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public DataSource getDataSource() {
		return this.jdbcTemplate.getDataSource();
	}
	
	public String mapearCampoOrdenamiento(String propiedad) {
		
		String order = NOMBRE_CAMPO_ORDENAMIENTO_DEFECTO;
		
		try {
			
			if (propiedad.equals("nombre")){
				order = "nombre";
			}
			
			if (propiedad.equals("codigoOsinerg")){
				order = "codigo_osinerg";
			}
			
			if (propiedad.equals("abreviatura")){
				order = "abreviatura";
			}
			
			if (propiedad.equals("estado")){
				order = "estado";
			}
			
		} catch(Exception e) {
			
		}
		
		return order;
	}
	
	/**
	 * 
	 * @param idOperacion
	 * @return
	 */
	public RespuestaCompuesta recuperarRegistrosPorOperacion(int idOperacion) {
		
			StringBuilder sql = new StringBuilder();		
			List<ProductoEquivalente> listaRegistros = new ArrayList<ProductoEquivalente>();
			Contenido<ProductoEquivalente> contenido = new Contenido<ProductoEquivalente>();
			RespuestaCompuesta respuesta = new RespuestaCompuesta();
			
			try {
				
				sql.append("SELECT ");
				sql.append("t1.id_producto_equivalencia,");
				sql.append("t1.id_operacion,");
				sql.append("t1.id_producto_principal,");
				sql.append("t1.nombre_producto_principal,");
				sql.append("t1.id_producto_secundario,");
				sql.append("t1.nombre_producto_secundario,");
				sql.append("t1.centimetros,");
				sql.append("t1.estado,");
				
				//Campos de auditoria
				sql.append("t1.creado_el,");
				sql.append("t1.creado_por,");
				sql.append("t1.ip_creacion");
				sql.append(" FROM ");				
				sql.append(NOMBRE_VISTA);
				sql.append(" t1 ");
				sql.append(" WHERE ");
				sql.append(NOMBRE_CAMPO_CLAVE);
				sql.append("=?");
				sql.append(" ORDER BY t1.id_producto_equivalencia ASC ");
				
				listaRegistros = jdbcTemplate.query(sql.toString(), new Object[] {idOperacion}, new ProductoEquivalenteMapper());
				
				contenido.totalRegistros = listaRegistros.size();
				contenido.totalEncontrados = listaRegistros.size();
				contenido.carga = listaRegistros;
				respuesta.mensaje = "OK";
				respuesta.estado = true;
				respuesta.contenido = contenido;
				
			} catch (DataAccessException e) {
				e.printStackTrace();
				respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
				respuesta.estado = false;
				respuesta.contenido = null;
			}
			
			return respuesta;
	}
	
	public RespuestaCompuesta guardarRegistro(ProductoEquivalente entity, ProductoEquivalenteJson peEntity) {
		
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder sql = new StringBuilder();
		KeyHolder claveGenerada = null;
		int cantidadFilasAfectadas = 0;
		
		try {
			sql.append("INSERT INTO ");
			sql.append(NOMBRE_TABLA);
			sql.append(" (id_operacion, id_producto_principal, id_producto_secundario, centimetros, creado_el, creado_por, ip_creacion, estado) ");
			sql.append(" VALUES ");
			sql.append(" (:idOperacion, :idProductoPrincipal, :idProductoSecundario, :centimetros, :creadoEl, :creadoPor, :ipCreacion, :estado) ");
			
			MapSqlParameterSource parametro = new MapSqlParameterSource();
			parametro.addValue("idOperacion", entity.getIdOperacion());
			parametro.addValue("idProductoPrincipal", peEntity.getProductoPrincipal());
			parametro.addValue("idProductoSecundario", peEntity.getProductoSecundario());
			parametro.addValue("centimetros", entity.getCentimetros());
			parametro.addValue("creadoEl", entity.getCreadoEl());
			parametro.addValue("creadoPor", entity.getCreadoPor());
			parametro.addValue("ipCreacion", entity.getIpCreacion());
			parametro.addValue("estado", entity.getEstado());
			
			SqlParameterSource namedParameters = parametro;
			claveGenerada = new GeneratedKeyHolder();
			
			cantidadFilasAfectadas = namedJdbcTemplate.update(sql.toString(), namedParameters, claveGenerada, new String[] {NOMBRE_CAMPO_CLAVE});
			
			if (cantidadFilasAfectadas > 1) {
				respuesta.error = Constante.EXCEPCION_CANTIDAD_REGISTROS_INCORRECTA;
				respuesta.estado = false;
				return respuesta;
			}
			
			respuesta.estado = true;
			respuesta.valor = claveGenerada.getKey().toString();
			
		} catch (DataIntegrityViolationException e){
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado = false;
		} catch (DataAccessException e){
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
		}
		
		return respuesta;
	}
	
	public RespuestaCompuesta eliminarRegistro(int idRegistro) {	
		
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		int cantidadFilasAfectadas = 0;	
		String sql = "";
		Object[] parametros = {idRegistro};
		
		try {
			
			sql="DELETE FROM " + NOMBRE_TABLA + " WHERE " + NOMBRE_CAMPO_CLAVE + "=?";
        	cantidadFilasAfectadas = jdbcTemplate.update(sql, parametros);
        	
			if (cantidadFilasAfectadas > 1) {
				respuesta.error = Constante.EXCEPCION_CANTIDAD_REGISTROS_INCORRECTA;
				respuesta.estado = false;
				return respuesta;
			}
			
			respuesta.estado = true;
			
		} catch (DataIntegrityViolationException e){	
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado = false;
		} catch (DataAccessException e){
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
		}
		
		return respuesta;
	}
	
	public RespuestaCompuesta updateRegistro(ProductoEquivalente entity) {
		
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		StringBuilder sql = new StringBuilder();
		int cantidadFilasAfectadas = 0;
		
		try {
			
			sql.append("UPDATE ");
			sql.append(NOMBRE_TABLA);
			sql.append(" SET ");
			sql.append("estado = :estado");
			sql.append(" WHERE ");
			sql.append(" id_producto_equivalencia = :idProductoEquivalencia");
			
			MapSqlParameterSource parametro = new MapSqlParameterSource();
			parametro.addValue("estado", entity.getEstado());
			parametro.addValue("idProductoEquivalencia", entity.getIdProductoEquivalencia());
			
			SqlParameterSource namedParameters = parametro;
			cantidadFilasAfectadas= namedJdbcTemplate.update(sql.toString(), namedParameters);
			
			if (cantidadFilasAfectadas > 1) {
				respuesta.error = Constante.EXCEPCION_CANTIDAD_REGISTROS_INCORRECTA;
				respuesta.estado = false;
				return respuesta;
			}
			
			respuesta.estado = true;
			
		} catch (DataIntegrityViolationException e){
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado = false;
		} catch (DataAccessException e){
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
		}
		
		return respuesta;
	}

	// int idOperacion, int idProductoSecundario
	public RespuestaCompuesta recuperarRegistro(ParametrosListar parametros) {
		
		String sqlWhere = "";
		StringBuilder sql = new StringBuilder();	
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		List<ProductoEquivalente> listaRegistros = new ArrayList<ProductoEquivalente>();
		Contenido<ProductoEquivalente> contenido = new Contenido<ProductoEquivalente>();
		List<String> where = new ArrayList<String>();
		List<Object> parametrosList = new ArrayList<Object>();
		
		try {
			
			if (parametros.getFiltroOperacion() > 0) {
				where.add(" t1.id_operacion = " + parametros.getFiltroOperacion());
			}
			
			if (parametros.getIdProductoSecundario() > 0) {
				where.add(" t1.id_producto_secundario = " + parametros.getIdProductoSecundario());
			}
			
			if (parametros.getIdProductoEquivalencia() > 0) {
				where.add(" t1.id_producto_equivalencia = " + parametros.getIdProductoEquivalencia());
			}
			
			if(parametros.getFiltroEstado() > 0) {
				where.add(" t1.estado = " + parametros.getFiltroEstado());
			}
			
			if (!where.isEmpty()) {
				sqlWhere = " WHERE " + StringUtils.join(where, Constante.SQL_Y);
			}
			
			sql.append("SELECT ");
			sql.append("t1.id_producto_equivalencia,");
			sql.append("t1.id_operacion,");
			sql.append("t1.id_producto_principal,");
			sql.append("t1.nombre_producto_principal,");
			sql.append("t1.id_producto_secundario,");
			sql.append("t1.nombre_producto_secundario,");
			sql.append("t1.centimetros,");
			sql.append("t1.estado,");
			
			//Campos de auditoria
			sql.append("t1.creado_el,");
			sql.append("t1.creado_por,");
			sql.append("t1.ip_creacion");
			sql.append(" FROM ");				
			sql.append(NOMBRE_VISTA);
			sql.append(" t1 ");
			sql.append(sqlWhere);
			
			listaRegistros = jdbcTemplate.query(sql.toString(), parametrosList.toArray(), new ProductoEquivalenteMapper());
			respuesta.estado = true;
			contenido.carga = listaRegistros;
			respuesta.contenido = contenido;
			respuesta.contenido.totalRegistros = listaRegistros.size();
			respuesta.contenido.totalEncontrados = listaRegistros.size();
			
		} catch (DataAccessException e) {
			e.printStackTrace();
			respuesta.error = Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado = false;
			respuesta.contenido = null;
		}
		
		return respuesta;
	}
	
}