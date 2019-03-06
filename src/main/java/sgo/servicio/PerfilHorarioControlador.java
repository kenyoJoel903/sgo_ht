package sgo.servicio;
//Agregado por req 9000003068

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import sgo.datos.BitacoraDao;
import sgo.datos.EnlaceDao;
import sgo.datos.EstacionDao;
import sgo.datos.PerfilDetalleHorarioDao;
import sgo.datos.PerfilHorarioDao;
import sgo.datos.TurnoDao;
import sgo.entidad.Bitacora;
import sgo.entidad.Contenido;
import sgo.entidad.Enlace;
import sgo.entidad.Estacion;
import sgo.entidad.MenuGestor;
import sgo.entidad.ParametrosListar;
import sgo.entidad.PerfilDetalleHorario;
import sgo.entidad.PerfilHorario;
import sgo.entidad.RespuestaCompuesta;
import sgo.seguridad.AuthenticatedUserDetails;
import sgo.utilidades.Constante;

@Controller
public class PerfilHorarioControlador {
	
	 @Autowired
	 private MessageSource gestorDiccionario;
	
	 @Autowired
	 private MenuGestor menu;
	 
	 @Autowired
	 private BitacoraDao dBitacora; 
	 
	 @Autowired
	 private EnlaceDao dEnlace;
	 
	 @Autowired
	 private PerfilHorarioDao dPerfilHorario;
	 
	 @Autowired
	 private PerfilDetalleHorarioDao dPerfilDetalleHorario;
	 
	@Autowired
	private EstacionDao dEstacion;
	 
	 @Autowired
	 private TurnoDao dTurno;
	
	 private static final String URL_GESTION_COMPLETA = "/admin/perfilHorario";
	 private static final String URL_GESTION_RELATIVA = "/perfilHorario";
	 private static final String URL_LISTAR_COMPLETA = "/admin/perfilHorario/listar";
	 private static final String URL_LISTAR_RELATIVA = "/perfilHorario/listar";
	 private static final String URL_RECUPERAR_COMPLETA = "/admin/perfilHorario/recuperar";
	 private static final String URL_RECUPERAR_RELATIVA = "/perfilHorario/recuperar";
	 private static final String URL_ACTUALIZAR_ESTADO_COMPLETA = "/admin/perfilHorario/actualizarEstado";
	 private static final String URL_ACTUALIZAR_ESTADO_RELATIVA = "/perfilHorario/actualizarEstado";
	 private static final String URL_GUARDAR_COMPLETA = "/admin/perfilHorario/crear";
	 private static final String URL_GUARDAR_RELATIVA = "/perfilHorario/crear";
	 private static final String URL_ACTUALIZAR_COMPLETA = "/admin/perfilHorario/actualizar";
	 private static final String URL_ACTUALIZAR_RELATIVA = "/perfilHorario/actualizar";
	 private static final String URL_TURNOS_JORNADA_COMPLETA = "/admin/perfilHorario/turnosJornada";
	 private static final String URL_TURNOS_JORNADA_RELATIVA = "/perfilHorario/turnosJornada";
	 
	 private DataSourceTransactionManager transaccion;// Gestor de la transaccion
	 
	 private HashMap<String, String> recuperarMapaValores(Locale locale) {
		  HashMap<String, String> mapaValores = new HashMap<String, String>();
		  try{
			  mapaValores.put("TITULO_LISTADO_REGISTROS", gestorDiccionario.getMessage("sgo.tituloFormularioListado", null, locale)); 
			  mapaValores.put("MENSAJE_CARGANDO", gestorDiccionario.getMessage("sgo.mensajeCargando", null, locale));
			  mapaValores.put("ETIQUETA_BOTON_AGREGAR", gestorDiccionario.getMessage("sgo.etiquetaBotonAgregar", null, locale));
			  mapaValores.put("ETIQUETA_BOTON_MODIFICAR", gestorDiccionario.getMessage("sgo.etiquetaBotonModificar", null, locale));
			  mapaValores.put("ETIQUETA_BOTON_ACTIVAR", gestorDiccionario.getMessage("sgo.etiquetaBotonActivar", null, locale));
			  mapaValores.put("ETIQUETA_BOTON_VER", gestorDiccionario.getMessage("sgo.etiquetaBotonVer", null, locale));
			  mapaValores.put("TITULO_VENTANA_MODAL", gestorDiccionario.getMessage("sgo.tituloVentanaModal", null, locale));
			  mapaValores.put("MENSAJE_CAMBIAR_ESTADO", gestorDiccionario.getMessage("sgo.mensajeCambiarEstado", null, locale));
			  mapaValores.put("ETIQUETA_BOTON_CERRAR", gestorDiccionario.getMessage("sgo.etiquetaBotonCerrar", null, locale));
			  mapaValores.put("ETIQUETA_BOTON_CONFIRMAR", gestorDiccionario.getMessage("sgo.etiquetaBotonConfirmar", null, locale));
			  mapaValores.put("ETIQUETA_BOTON_GUARDAR", gestorDiccionario.getMessage("sgo.etiquetaBotonGuardar", null, locale));
			  mapaValores.put("ETIQUETA_BOTON_CANCELAR", gestorDiccionario.getMessage("sgo.etiquetaBotonCancelar", null, locale));
			  mapaValores.put("MENSAJE_DESEA_CONTINUAR", gestorDiccionario.getMessage("sgo.deseaContinuar",null,locale));			  
			  
		  }catch(Exception ex){
			  
		  }
		  return mapaValores;
	 }
	 
	 @RequestMapping(value = URL_RECUPERAR_RELATIVA, method = RequestMethod.GET)
	 public @ResponseBody RespuestaCompuesta recuperaRegistro(int ID, Locale locale) {
		  RespuestaCompuesta respuesta = null;
		  AuthenticatedUserDetails principal = null;
		  PerfilHorario ePerfilHorario = null;		  
		 
		  try{
			  
			  principal = this.getCurrentUser();
			  
			  respuesta = dEnlace.recuperarRegistro(URL_RECUPERAR_COMPLETA);
			  if (respuesta.estado == false) {
				  throw new Exception(gestorDiccionario.getMessage("sgo.accionNoHabilitada", null, locale));
			  }
			  
			  Enlace eEnlace = (Enlace) respuesta.getContenido().getCarga().get(0);
			  if (!principal.getRol().searchPermiso(eEnlace.getPermiso())) {
				  throw new Exception(gestorDiccionario.getMessage("sgo.faltaPermiso", null, locale));
			  }
			  
			  respuesta = dPerfilHorario.recuperarRegistro(ID);
			  if (respuesta.estado == false) {
				  throw new Exception(gestorDiccionario.getMessage("sgo.recuperarFallido", null, locale));
			  }
			  
			  ePerfilHorario = (PerfilHorario) respuesta.contenido.carga.get(0);
			  
			  respuesta = dPerfilDetalleHorario.recuperarRegistros(ePerfilHorario.getId());
			  if (respuesta.estado == false) {
				  throw new Exception(gestorDiccionario.getMessage("sgo.recuperarFallido", null, locale));
			  }
			  
			  ePerfilHorario.setLstDetalles(new ArrayList<PerfilDetalleHorario>());
			  for(Object elemento : respuesta.contenido.carga){
				  PerfilDetalleHorario detalle = (PerfilDetalleHorario) elemento;
				  ePerfilHorario.getLstDetalles().add(detalle);
				  
			  }
			  
			  
			  Contenido<PerfilHorario> contenido = new Contenido<PerfilHorario>();
			  contenido.carga = new ArrayList<PerfilHorario>();
			  contenido.carga.add(ePerfilHorario);
			  respuesta.contenido = contenido;  
			   
			   respuesta.mensaje = gestorDiccionario.getMessage("sgo.recuperarExitoso", null, locale);
		  } catch (Exception ex) {
			 ex.printStackTrace();
			 respuesta.estado = false;
			 respuesta.contenido = null;
			 respuesta.mensaje = ex.getMessage();
		  }
		  return respuesta;
	 }
	 
	 @RequestMapping(value = URL_LISTAR_RELATIVA, method = RequestMethod.GET)
	 public @ResponseBody RespuestaCompuesta recuperarRegistros(HttpServletRequest httpRequest, Locale locale) {
		 
		 RespuestaCompuesta respuesta = null;
		 ParametrosListar parametros = null;
		 AuthenticatedUserDetails principal = null;
		 String mensajeRespuesta = "";
		 try {
			 
		   // Recuperar el usuario actual
		   principal = this.getCurrentUser();
		   // Recuperar el enlace de la accion
		   respuesta = dEnlace.recuperarRegistro(URL_LISTAR_COMPLETA);
		   if (respuesta.estado == false) {
		    mensajeRespuesta = gestorDiccionario.getMessage("sgo.accionNoHabilitada", null, locale);
		    throw new Exception(mensajeRespuesta);
		   }
		   Enlace eEnlace = (Enlace) respuesta.getContenido().getCarga().get(0);
		   // Verificar si cuenta con el permiso necesario
		   if (!principal.getRol().searchPermiso(eEnlace.getPermiso())) {
		    mensajeRespuesta = gestorDiccionario.getMessage("sgo.faltaPermiso", null, locale);
		    throw new Exception(mensajeRespuesta);
		   }
		   // Recuperar parametros
		   parametros = new ParametrosListar();
		   if (httpRequest.getParameter("registrosxPagina") != null) {
		    parametros.setRegistrosxPagina(Integer.parseInt(httpRequest.getParameter("registrosxPagina")));
		   }

		   if (httpRequest.getParameter("inicioPagina") != null) {
		    parametros.setInicioPaginacion(Integer.parseInt(httpRequest.getParameter("inicioPagina")));
		   }

		   if (httpRequest.getParameter("campoOrdenamiento") != null) {
		    parametros.setCampoOrdenamiento((httpRequest.getParameter("campoOrdenamiento")));
		   }

		   if (httpRequest.getParameter("sentidoOrdenamiento") != null) {
		    parametros.setSentidoOrdenamiento((httpRequest.getParameter("sentidoOrdenamiento")));
		   }
		   
		   parametros.setPaginacion(Constante.CON_PAGINACION);
		   parametros.setFiltroEstado(Constante.FILTRO_TODOS);
			   
			// Recuperar registros
			respuesta = dPerfilHorario.recuperarRegistros(parametros);
			respuesta.mensaje = gestorDiccionario.getMessage("sgo.listarExitoso", null, locale);
		 } catch (Exception ex) {
			ex.printStackTrace();
			respuesta.estado = false;
			respuesta.contenido = null;
			respuesta.mensaje = ex.getMessage();
		 }
		 
		 return respuesta;
	 }
	 
	 @RequestMapping(value = URL_GUARDAR_RELATIVA, method = RequestMethod.POST)
	 public @ResponseBody
	 RespuestaCompuesta guardarRegistro(@RequestBody PerfilHorario ePerfilHorario, HttpServletRequest peticionHttp, Locale locale) {
		 
		 RespuestaCompuesta respuesta = null;
		 AuthenticatedUserDetails principal = null;
		 Bitacora eBitacora = null;
		 
		 String ContenidoAuditoria = "";
		 String ClaveGenerada = "";
		 String direccionIp = "";
		 TransactionDefinition definicionTransaccion = null;
		 TransactionStatus estadoTransaccion = null;
		 
		 try{
			 
			   // Inicia la transaccion
			   this.transaccion = new DataSourceTransactionManager(dPerfilHorario.getDataSource());
			   definicionTransaccion = new DefaultTransactionDefinition();
			   estadoTransaccion = this.transaccion.getTransaction(definicionTransaccion);
			   
			   // Recuperar el usuario actual
			   principal = this.getCurrentUser();
			   
			   // Recuperar el enlace de la accion
			   respuesta = dEnlace.recuperarRegistro(URL_GUARDAR_COMPLETA);
			   
			   if (respuesta.estado == false) {
				   throw new Exception(gestorDiccionario.getMessage("sgo.accionNoHabilitada", null, locale));
			   }
			   
			   Enlace eEnlace = (Enlace) respuesta.getContenido().getCarga().get(0);
			   // Verificar si cuenta con el permiso necesario
			   if (!principal.getRol().searchPermiso(eEnlace.getPermiso())) {
				   throw new Exception(gestorDiccionario.getMessage("sgo.faltaPermiso", null, locale));
			   }
			   
			   // Actualiza los datos de auditoria local
			   direccionIp = peticionHttp.getHeader("X-FORWARDED-FOR");
			   if (direccionIp == null) {
				   direccionIp = peticionHttp.getRemoteAddr();
			   }
			   
			   ePerfilHorario.setEstado(Constante.ESTADO_ACTIVO);
			   ePerfilHorario.setActualizadoEl(Calendar.getInstance().getTime().getTime());
			   ePerfilHorario.setActualizadoPor(principal.getID());
			   ePerfilHorario.setCreadoEl(Calendar.getInstance().getTime().getTime());
			   ePerfilHorario.setCreadoPor(principal.getID());
			   ePerfilHorario.setIpActualizacion(direccionIp);
			   ePerfilHorario.setIpCreacion(direccionIp);
			   
			   //Valido primero si no hay otro registro igual en BD
			   respuesta = dPerfilHorario.validaRegistro(ePerfilHorario.getNombrePerfil());
			   
			   // Verifica si la accion se ejecuto de forma satisfactoria
			   if (respuesta.estado == false) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.guardarFallido", null, locale));
			   }
			   
			   //Si existe el registro valido que no se encuentre activo y que no se encuentre duplicado
			   if(respuesta.getContenido().getCarga().size() > 0){
				   throw new Exception(gestorDiccionario.getMessage("sgo.perfilHorarioActivo", null, locale));
			   }
			   
			   respuesta = dPerfilHorario.guardarRegistro(ePerfilHorario);
			   // Verifica si la accion se ejecuto de forma satisfactoria
			   if (respuesta.estado == false) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.guardarFallido", null, locale));
			   }
			   
			   ClaveGenerada = respuesta.valor;
			   // Guardar en la bitacora
			   ObjectMapper mapper = new ObjectMapper(); 
			   ContenidoAuditoria = mapper.writeValueAsString(ePerfilHorario);
			   
			   eBitacora = new Bitacora();
			   eBitacora.setUsuario(principal.getNombre());
			   eBitacora.setAccion(URL_GUARDAR_COMPLETA);
			   eBitacora.setTabla(PerfilHorarioDao.NOMBRE_TABLA);
			   eBitacora.setIdentificador(ClaveGenerada);
			   eBitacora.setContenido(ContenidoAuditoria);
			   eBitacora.setRealizadoEl(ePerfilHorario.getCreadoEl());
			   eBitacora.setRealizadoPor(ePerfilHorario.getCreadoPor());
			   
			   respuesta = dBitacora.guardarRegistro(eBitacora);
			   if (respuesta.estado == false) {
				   throw new Exception(gestorDiccionario.getMessage("sgo.guardarBitacoraFallido", null, locale));
			   }
			   
			   for(PerfilDetalleHorario detalle : ePerfilHorario.getLstDetalles()){
				   detalle.setIdPerfilHorario(Integer.parseInt(ClaveGenerada));
				   
				   detalle.setActualizadoEl(Calendar.getInstance().getTime().getTime());
				   detalle.setActualizadoPor(principal.getID());
				   detalle.setCreadoEl(Calendar.getInstance().getTime().getTime());
				   detalle.setCreadoPor(principal.getID());
				   detalle.setIpActualizacion(direccionIp);
				   detalle.setIpCreacion(direccionIp);
				    
				   respuesta = dPerfilDetalleHorario.guardarRegistro(detalle);
				   if (respuesta.estado == false) {
					   throw new Exception(gestorDiccionario.getMessage("sgo.guardarFallido", null, locale));
				   }
				}
				   
				String dia = ePerfilHorario.getFechaActualizacion().substring(0, 11);
				String hora = ePerfilHorario.getFechaActualizacion().substring(10);		
				respuesta.mensaje = gestorDiccionario.getMessage("sgo.guardarExitoso", new Object[] { dia, hora, principal.getIdentidad() }, locale);
				this.transaccion.commit(estadoTransaccion);

			 
		 } catch (Exception ex) {
			this.transaccion.rollback(estadoTransaccion);
			ex.printStackTrace();
			respuesta.estado = false;
			respuesta.contenido = null;
			respuesta.mensaje = ex.getMessage();
		 }
		 
		 return respuesta;
	 }
	 
	 @RequestMapping(URL_GESTION_RELATIVA)
	 public ModelAndView mostrarFormulario(Locale locale) {
		  ModelAndView vista = null;
		  AuthenticatedUserDetails principal = null;
		  ArrayList<?> listaEnlaces = null;
		  RespuestaCompuesta respuesta = null;
		  HashMap<String, String> mapaValores = null;
		  try {
		   principal = this.getCurrentUser();
		   respuesta = menu.Generar(principal.getRol().getId(), URL_GESTION_COMPLETA);
		   if (respuesta.estado == false) {
		    throw new Exception(gestorDiccionario.getMessage("sgo.menuNoGenerado", null, locale));
		   }
		   listaEnlaces = (ArrayList<?>) respuesta.contenido.carga;
		   mapaValores = recuperarMapaValores(locale);
		   vista = new ModelAndView("plantilla");
		   vista.addObject("vistaJSP", "mantenimiento/perfilHorario.jsp");
		   vista.addObject("vistaJS", "mantenimiento/perfilHorario.js");
		   vista.addObject("identidadUsuario", principal.getIdentidad());
		   vista.addObject("menu", listaEnlaces);
		   vista.addObject("mapaValores", mapaValores);
		  } catch (Exception ex) {

		  }
		  return vista;
	 }
	 
	 private AuthenticatedUserDetails getCurrentUser() {
		 return (AuthenticatedUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	 }
	 
	 @RequestMapping(value = URL_ACTUALIZAR_ESTADO_RELATIVA, method = RequestMethod.POST)
	 public @ResponseBody RespuestaCompuesta actualizarEstadoRegistro(@RequestBody PerfilHorario ePerfilHorario, HttpServletRequest peticionHttp, Locale locale) {
		  RespuestaCompuesta respuesta = null;
		  AuthenticatedUserDetails principal = null;
		  TransactionDefinition definicionTransaccion = null;
		  TransactionStatus estadoTransaccion = null;
		  Bitacora eBitacora = null;
		  String direccionIp = "";
		  
		  try{
			  
			   // Inicia la transaccion
			   this.transaccion = new DataSourceTransactionManager(dPerfilHorario.getDataSource());
			   definicionTransaccion = new DefaultTransactionDefinition();
			   estadoTransaccion = this.transaccion.getTransaction(definicionTransaccion);
			   
			   // Recuperar el usuario actual
			   principal = this.getCurrentUser();
			   // Recuperar el enlace de la accion
			   respuesta = dEnlace.recuperarRegistro(URL_ACTUALIZAR_ESTADO_COMPLETA);
			   if (respuesta.estado == false) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.accionNoHabilitada", null, locale));
			   }
			   Enlace eEnlace = (Enlace) respuesta.getContenido().getCarga().get(0);
			   // Verificar si cuenta con el permiso necesario
			   if (!principal.getRol().searchPermiso(eEnlace.getPermiso())) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.faltaPermiso", null, locale));
			   }
			   // Auditoria local (En el mismo registro)
			   direccionIp = peticionHttp.getHeader("X-FORWARDED-FOR");
			   if (direccionIp == null) {
			    direccionIp = peticionHttp.getRemoteAddr();
			   }
			   
			   if(ePerfilHorario.getEstado() == PerfilHorario.ESTADO_ACTIVO){
				   //Valido primero si no hay otro registro igual en BD
				   respuesta = dPerfilHorario.validaRegistro(ePerfilHorario.getNombrePerfil());
				   
				   // Verifica si la accion se ejecuto de forma satisfactoria
				   if (respuesta.estado == false) {
				    throw new Exception(gestorDiccionario.getMessage("sgo.guardarFallido", null, locale));
				   }
				   
				   //Si existe el registro valido que no se encuentre activo y que no se encuentre duplicado
				   if(respuesta.getContenido().getCarga().size() > 0){
					   PerfilHorario ePer = (PerfilHorario) respuesta.getContenido().getCarga().get(0);
					   if(ePer.getId() != ePerfilHorario.getId()){
						   throw new Exception(gestorDiccionario.getMessage("sgo.perfilHorarioActivo", null, locale));
					   }
				   }
			   }

			   
			   ePerfilHorario.setActualizadoEl(Calendar.getInstance().getTime().getTime());
			   ePerfilHorario.setActualizadoPor(principal.getID());
			   ePerfilHorario.setIpActualizacion(direccionIp);
			   respuesta = dPerfilHorario.actualizarEstadoRegistro(ePerfilHorario);
			   
			   eBitacora = new Bitacora();
			   
			   // Guardar en la bitacora
			   ObjectMapper mapper = new ObjectMapper();
			   eBitacora.setUsuario(principal.getNombre());
			   eBitacora.setAccion(URL_ACTUALIZAR_ESTADO_COMPLETA);
			   eBitacora.setTabla(PerfilHorarioDao.NOMBRE_TABLA);
			   eBitacora.setIdentificador(String.valueOf(ePerfilHorario.getId()));
			   eBitacora.setContenido(mapper.writeValueAsString(ePerfilHorario));
			   eBitacora.setRealizadoEl(ePerfilHorario.getActualizadoEl());
			   eBitacora.setRealizadoPor(ePerfilHorario.getActualizadoPor());
			   
			   respuesta = dBitacora.guardarRegistro(eBitacora);
			   if (respuesta.estado == false) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.guardarBitacoraFallido", null, locale));
			   }
			   
				String dia = ePerfilHorario.getFechaActualizacion().substring(0, 11);
				String hora = ePerfilHorario.getFechaActualizacion().substring(10);			   
			   respuesta.mensaje = gestorDiccionario.getMessage("sgo.actualizarExitoso", new Object[] { dia, hora,principal.getIdentidad() }, locale);
			   
			   this.transaccion.commit(estadoTransaccion);
			   
			   if (respuesta.estado == false) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.actualizarFallido", null, locale));
			   }
		  } catch (Exception ex) {
			   ex.printStackTrace();
			   this.transaccion.rollback(estadoTransaccion);
			   respuesta.estado = false;
			   respuesta.contenido = null;
			   respuesta.mensaje = ex.getMessage();
		  }
		  return respuesta;
	 }
	 
	 @RequestMapping(value = URL_ACTUALIZAR_RELATIVA, method = RequestMethod.POST)
	 public @ResponseBody RespuestaCompuesta actualizarRegistro(@RequestBody PerfilHorario ePerfilHorario, HttpServletRequest peticionHttp, Locale locale) {
		 
		  RespuestaCompuesta respuesta = null;
		  AuthenticatedUserDetails principal = null;
		  TransactionDefinition definicionTransaccion = null;
		  TransactionStatus estadoTransaccion = null;
		  Bitacora eBitacora = null;
		  String direccionIp = "";
		 
		 try{
			 
			   // Inicia la transaccion
			   this.transaccion = new DataSourceTransactionManager(dPerfilHorario.getDataSource());
			   definicionTransaccion = new DefaultTransactionDefinition();
			   estadoTransaccion = this.transaccion.getTransaction(definicionTransaccion);
			   eBitacora = new Bitacora();
			   // Recuperar el usuario actual
			   principal = this.getCurrentUser();
			   // Recuperar el enlace de la accion
			   respuesta = dEnlace.recuperarRegistro(URL_ACTUALIZAR_COMPLETA);
			   if (respuesta.estado == false) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.accionNoHabilitada", null, locale));
			   }
			   Enlace eEnlace = (Enlace) respuesta.getContenido().getCarga().get(0);
			   // Verificar si cuenta con el permiso necesario
			   if (!principal.getRol().searchPermiso(eEnlace.getPermiso())) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.faltaPermiso", null, locale));
			   }
			   // Auditoria local (En el mismo registro)
			   direccionIp = peticionHttp.getHeader("X-FORWARDED-FOR");
			   if (direccionIp == null) {
			    direccionIp = peticionHttp.getRemoteAddr();
			   }
			   
			   ePerfilHorario.setActualizadoEl(Calendar.getInstance().getTime().getTime());
			   ePerfilHorario.setActualizadoPor(principal.getID());
			   ePerfilHorario.setIpActualizacion(direccionIp);
			   
			   //recuperamos el perfilhorario original con sus respectivos detalles
			   respuesta = dPerfilHorario.recuperarRegistro(ePerfilHorario.getId());
			   if (respuesta.estado == false) {
				   throw new Exception(gestorDiccionario.getMessage("sgo.actualizarFallido", null, locale));
			   }
			   
			   PerfilHorario ePerfilHorarioOriginal = (PerfilHorario) respuesta.contenido.carga.get(0);
			   
			   respuesta = dPerfilDetalleHorario.recuperarRegistros(ePerfilHorario.getId());
			   if (respuesta.estado == false) {
				   throw new Exception(gestorDiccionario.getMessage("sgo.actualizarFallido", null, locale));
			   }
			   
			   ePerfilHorarioOriginal.setLstDetalles(new ArrayList<PerfilDetalleHorario>());
			  for(Object elemento : respuesta.contenido.carga){
				  PerfilDetalleHorario detalle = (PerfilDetalleHorario) elemento;
				  ePerfilHorarioOriginal.getLstDetalles().add(detalle);
				  
			  }
			  
			   //si las validaciones son correctas permito hacer la actualización del perfilhorario
			   respuesta = dPerfilHorario.actualizarRegistro(ePerfilHorario);
			   if (respuesta.estado == false) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.actualizarFallido", null, locale));
			   }
			   // Guardar en la bitacora
			   ObjectMapper mapper = new ObjectMapper();
			   eBitacora.setUsuario(principal.getNombre());
			   eBitacora.setAccion(URL_ACTUALIZAR_COMPLETA);
			   eBitacora.setTabla(PerfilHorarioDao.NOMBRE_TABLA);
			   eBitacora.setIdentificador(String.valueOf(ePerfilHorario.getId()));
			   eBitacora.setContenido(mapper.writeValueAsString(ePerfilHorario));
			   eBitacora.setRealizadoEl(ePerfilHorario.getActualizadoEl());
			   eBitacora.setRealizadoPor(ePerfilHorario.getActualizadoPor());
			   
			   respuesta = dBitacora.guardarRegistro(eBitacora);
			   if (respuesta.estado == false) {
			    throw new Exception(gestorDiccionario.getMessage("sgo.guardarBitacoraFallido", null, locale));
			   }
			   
			 //esto para eliminar los detalles
			    for(PerfilDetalleHorario perfilDetalleHorarioOriginal: ePerfilHorarioOriginal.getLstDetalles()){
			     boolean comparaDetalles = false;
			     for(PerfilDetalleHorario perfilDetalleHorarioFormulario : ePerfilHorario.getLstDetalles()){
			       if(perfilDetalleHorarioFormulario.getId() == perfilDetalleHorarioOriginal.getId()){
			    	   comparaDetalles = true;
			       break;
			       }
			     }
			     if(comparaDetalles == false){
			       //luego elimino el detalles
			    	 
				  respuesta = dTurno.recuperarRegistroPorIdPerfilDetalle(perfilDetalleHorarioOriginal.getId());
				  if (respuesta.estado == false) {
					  throw new Exception(gestorDiccionario.getMessage("sgo.recuperarFallido", null, locale));
				  }
				  
				  if(respuesta.contenido.totalRegistros > 0){
					  throw new Exception("En el turno No. " + perfilDetalleHorarioOriginal.getNumeroOrden() + ", ya existen turnos creados. No se puede eliminar.");
				  }
			    	 
			       respuesta = dPerfilDetalleHorario.eliminarRegistro(perfilDetalleHorarioOriginal.getId());
			       if (respuesta.estado == false) {
			         throw new Exception(gestorDiccionario.getMessage("sgo.actualizarFallido", null, locale));
			       }
			     }
			   }
			    
			    //esto para agregar detalles
			    for(PerfilDetalleHorario perfilDetalleHorarioFormulario : ePerfilHorario.getLstDetalles()){
			      
			      //si el id es 0 entonces creamos un nuevo registro
			      if(perfilDetalleHorarioFormulario.getId() == 0){
			     	//valida los datos que vienen del formulario para el detalles

			    	  perfilDetalleHorarioFormulario.setIdPerfilHorario(ePerfilHorario.getId());
			    	  
			    	  perfilDetalleHorarioFormulario.setActualizadoEl(Calendar.getInstance().getTime().getTime());
			    	  perfilDetalleHorarioFormulario.setActualizadoPor(principal.getID());
			    	  perfilDetalleHorarioFormulario.setCreadoEl(Calendar.getInstance().getTime().getTime());
			    	  perfilDetalleHorarioFormulario.setCreadoPor(principal.getID());
			    	  perfilDetalleHorarioFormulario.setIpActualizacion(direccionIp);
			    	  perfilDetalleHorarioFormulario.setIpCreacion(direccionIp);
			  	    respuesta = dPerfilDetalleHorario.guardarRegistro(perfilDetalleHorarioFormulario);
			  	    if (respuesta.estado == false) {
			  	      throw new Exception(gestorDiccionario.getMessage("sgo.actualizarFallido", null, locale));
			  	    }
			      }
			    }
			    
			    //Esto para actualizar detalles
			    for(PerfilDetalleHorario perfilDetalleHorarioOriginal: ePerfilHorarioOriginal.getLstDetalles()){
			      for(PerfilDetalleHorario perfilDetalleHorarioFormulario : ePerfilHorario.getLstDetalles()){
			    	  perfilDetalleHorarioFormulario.setIdPerfilHorario(ePerfilHorario.getId());
			        
			        if(perfilDetalleHorarioFormulario.getId() == perfilDetalleHorarioOriginal.getId()){
			        	
				    	  perfilDetalleHorarioFormulario.setActualizadoEl(Calendar.getInstance().getTime().getTime());
				    	  perfilDetalleHorarioFormulario.setActualizadoPor(principal.getID());
				    	  perfilDetalleHorarioFormulario.setIpActualizacion(direccionIp);
				    	  
			 		  respuesta = dPerfilDetalleHorario.actualizarRegistro(perfilDetalleHorarioFormulario);
			 		  if (respuesta.estado == false) {
			 	        throw new Exception(gestorDiccionario.getMessage("sgo.actualizarFallido", null, locale));
			 	      }
			        }
			      }
			    }
			   
			   
			    ParametrosListar parametros = new ParametrosListar();
				parametros.setIdPerfilHorario(ePerfilHorario.getId());
				respuesta = dEstacion.recuperarRegistros(parametros);
				if (respuesta.estado == false) {
					throw new Exception(gestorDiccionario.getMessage("sgo.noPermisosDisponibles", null, locale));
				}
				List<Estacion> listaEstaciones = (List<Estacion>) respuesta.contenido.carga;
				
				for(Estacion est : listaEstaciones){
					est.setCantidadTurnos(ePerfilHorario.getNumeroTurnos());
					est.setIdPerfilHorario(est.getPerfilHorario().getId());
					est.setActualizadoEl(Calendar.getInstance().getTime().getTime());
					est.setActualizadoPor(principal.getID());
					est.setIpActualizacion(direccionIp);
					dEstacion.actualizarRegistro(est);
				}
				
				String dia = ePerfilHorario.getFechaActualizacion().substring(0, 11);
				String hora = ePerfilHorario.getFechaActualizacion().substring(10);
			   respuesta.mensaje = gestorDiccionario.getMessage("sgo.actualizarExitoso", new Object[] { dia, hora,principal.getIdentidad() }, locale);

		   this.transaccion.commit(estadoTransaccion);
		  } catch (Exception ex) {
		    ex.printStackTrace();
		    this.transaccion.rollback(estadoTransaccion);
		    respuesta.estado = false;
		    respuesta.contenido = null;
		    respuesta.mensaje = ex.getMessage();
		  }
		  return respuesta;
			 
	 }

	 @RequestMapping(value = URL_TURNOS_JORNADA_RELATIVA, method = RequestMethod.POST)
	 public @ResponseBody RespuestaCompuesta numeroTurnosPorJornada(
			@RequestBody PerfilHorario ePerfilHorario,
			HttpServletRequest httpRequest,
			Locale locale
	 ) {
		 
		  RespuestaCompuesta respuesta = null;
		  AuthenticatedUserDetails principal = null;
		  TransactionDefinition definicionTransaccion = null;
		  TransactionStatus estadoTransaccion = null;
		  Bitacora eBitacora = null;
		  String direccionIp = "";
		 
		 try{
			 
			   // Inicia la transaccion
			   this.transaccion = new DataSourceTransactionManager(dPerfilHorario.getDataSource());
			   definicionTransaccion = new DefaultTransactionDefinition();
			   estadoTransaccion = this.transaccion.getTransaction(definicionTransaccion);
			   
			   eBitacora = new Bitacora();
			   // Recuperar el usuario actual
			   principal = this.getCurrentUser();
			   // Recuperar el enlace de la accion
			   respuesta = dEnlace.recuperarRegistro(URL_TURNOS_JORNADA_COMPLETA);
			   if (respuesta.estado == false) {
				   throw new Exception(gestorDiccionario.getMessage("sgo.accionNoHabilitada", null, locale));
			   }
			   Enlace eEnlace = (Enlace) respuesta.getContenido().getCarga().get(0);
			   // Verificar si cuenta con el permiso necesario
			   if (!principal.getRol().searchPermiso(eEnlace.getPermiso())) {
				   throw new Exception(gestorDiccionario.getMessage("sgo.faltaPermiso", null, locale));
			   }

			   respuesta = dPerfilHorario.recuperarRegistro(ePerfilHorario.getId());
			   if (respuesta.estado == false) {
				   throw new Exception(gestorDiccionario.getMessage("sgo.actualizarFallido", null, locale));
			   }

			   this.transaccion.commit(estadoTransaccion);
		  } catch (Exception e) {
			  e.printStackTrace();
			  this.transaccion.rollback(estadoTransaccion);
			  respuesta.estado = false;
			  respuesta.contenido = null;
			  respuesta.mensaje = e.getMessage();
		  }
		 
		  return respuesta;	 
	 } 
	 
}
