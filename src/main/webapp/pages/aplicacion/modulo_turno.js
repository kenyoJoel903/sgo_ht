function moduloTurno() {

	this.obj = {};
	this.NUMERO_REGISTROS_PAGINA = constantes.NUMERO_REGISTROS_PAGINA_DOBLE_LISTADO;
	this.TOPES_PAGINACION = constantes.TOPES_PAGINACION_BOBLE_LISTADO;
	this.URL_LENGUAJE_GRILLA = "tema/datatable/language/es-ES.json";
	this.LENGUAJE_GRILLA =  {
		"sProcessing":    cadenas.GRILLA_PROCESANDO,
		"sLengthMenu":    cadenas.GRILLA_LONGITUD_MENU,
		"sZeroRecords":   cadenas.GRILLA_SIN_REGISTROS,
		"sEmptyTable":    cadenas.GRILLA_TABLA_VACIA,
		"sInfo":          cadenas.GRILLA_INFO,
		"sInfoEmpty":     cadenas.GRILLA_INFO_VACIA,
		"sInfoFiltered":  cadenas.GRILLA_INFO_FILTRADA,
		"sInfoPostFix":   cadenas.GRILLA_INFO_POST_FIX,
		"sSearch":        cadenas.GRILLA_BUSCAR,
		"sUrl":           cadenas.GRILLA_URL,
		"sInfoThousands": cadenas.GRILLA_MILES,
		"sLoadingRecords":cadenas.GRILLA_CARGANDO_REGISTROS,
		"oPaginate": {
			"sFirst":       cadenas.GRILLA_PAGINACION_PRIMERO,
			"sLast":        cadenas.GRILLA_PAGINACION_ULTIMO,
			"sNext":        cadenas.GRILLA_PAGINACION_SIGUIENTE,
			"sPrevious":    cadenas.GRILLA_PAGINACION_ANTERIOR,
		},
		"oAria": {
			"sSortAscending":  cadenas.GRILLA_ORDEN_ASCENDENTE,
			"sSortDescending": cadenas.GRILLA_ORDEN_DESCENDENTE,
		}
	};

	this.TIPO_CONTENIDO=constantes.TIPO_CONTENIDO_JSON;
	this.NOMBRE_EVENTO_CLICK=constantes.NOMBRE_EVENTO_CLICK;
	this.modoEdicion=constantes.MODO_LISTAR;
	this.depuracionActivada=true;
	this.estaCargadaInterface=false;

	//Inicializar propiedades
	this.urlBase='';  
	this.mensajeEsMostrado=false;
	this.idRegistro = 0;
	this.reglasValidacionFormulario = {};
	this.mensajesValidacionFormulario = {};
	this.idJornada = 0;

	//para la grilla de la jornada
	this.ordenGrillaJornada = [[ 1, 'asc' ]];
	this.columnasGrillaJornada = [{ "data": null} ];//Target 0
	this.definicionColumnasJornada = [{ 
		"targets": 0, 
		"searchable": false, 
		"orderable": false, 
		"visible":false, 
		"render": function ( datos, tipo, fila, meta ) {
			var configuracion = meta.settings;
			return configuracion._iDisplayStart + meta.row + 1;
		}
	}];  

	//para la grilla de la turno
	this.ordenGrillaTurno=[[ 1, 'asc' ]];
	this.columnasGrillaTurno=[{ "data": null} ];//Target 0
	this.definicionColumnasTurno=[{ 
		"targets": 0, 
		"searchable": false, 
		"orderable": false, 
		"visible":false, 
		"render": function ( datos, tipo, fila, meta ) {
			var configuracion = meta.settings;
			return configuracion._iDisplayStart + meta.row + 1;
		}
	}];
	
	this.obj.modalCargarArchivoContometros = $("#modalCargarArchivoContometros");
};

moduloTurno.prototype.mostrarDepuracion = function(mensaje) {
	var referenciaModulo = this;
	if (referenciaModulo.depuracionActivada = true) {

	}
};

moduloTurno.prototype.mostrarErrorServidor=function(xhr,estado,error) {
  var referenciaModulo = this;
  
  if (xhr.status === constantes.ERROR_SIN_CONEXION) {
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,constantes.ERROR_NO_CONECTADO);
  } else if (xhr.status == constantes.ERROR_RECURSO_NO_DISPONIBLE) {
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,constantes.ERROR_RECURSO_NO_DISPONIBLE);
  } else if (xhr.status == constantes.ERROR_INTERNO_SERVIDOR) {
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,constantes.ERROR_INTERNO_SERVIDOR);
  } else if (estado === constantes.ERROR_INTERPRETACION_DATOS) {
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,constantes.ERROR_GENERICO_SERVIDOR);
  } else if (estado === constantes.ERROR_TIEMPO_AGOTADO) {
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,constantes.ERROR_TIEMPO_AGOTADO);
  } else if (estado === constantes.ERROR_CONEXION_ABORTADA) {
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,constantes.ERROR_GENERICO_SERVIDOR);
  } else {
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,constantes.ERROR_GENERICO_SERVIDOR);
  }
};

moduloTurno.prototype.inicializar=function(){
  this.configurarAjax();
  this.inicializarControlesGenericos();
  this.inicializarGrillaJornada();
  this.inicializarGrillaTurno();
  this.inicializarCampos();
  this.inicializarFormularioPrincipal();
};

moduloTurno.prototype.configurarAjax=function(){
	var csrfConfiguracion = $("#csrf-token");
	var nombreParametro = csrfConfiguracion.attr("name");
	var valorParametro = csrfConfiguracion.val();
	var parametros = {};
	parametros[nombreParametro] = valorParametro;
	$.ajaxSetup({
        data: parametros,
        headers : {'X-CSRF-TOKEN' : valorParametro}
    });
};

moduloTurno.prototype.validaFormularioXSS = function(formulario){
	var retorno = true;

	$(formulario).find(':input').each(function() {
		var elemento = this;
		if(!utilitario.validaCaracteresFormulario(elemento.value)){
			retorno = false;
		}
	});

	return retorno;
};
	
moduloTurno.prototype.resetearFormulario= function(){
  var referenciaModulo= this;
  referenciaModulo.obj.frmPrincipal[0].reset();
  jQuery.each( this.obj, function( i, val ) {
    if (typeof referenciaModulo.obj[i].tipoControl != constantes.CONTROL_NO_DEFINIDO ){
      if (referenciaModulo.obj[i].tipoControl == constantes.TIPO_CONTROL_SELECT2){
        referenciaModulo.obj[i].select2("val", null);
      }
    }
  });
};

moduloTurno.prototype.inicializarControlesGenericos=function(){
  this.mostrarDepuracion("inicializarControlesGenericos");
  var referenciaModulo=this; 
  //valida permisos de botones
  this.descripcionPermiso=$("#descripcionPermiso");
  //general
  this.obj.tituloSeccion=$("#tituloSeccion");
  this.obj.frmConfirmarAnularRegistro=$("#frmConfirmarAnularRegistro");
  this.obj.bandaInformacion=$("#bandaInformacion");
  this.obj.cmpTituloFormulario=$("#cmpTituloFormulario");
  //formularios
  this.obj.frmCierre = $("#frmCierre");
  this.obj.frmApertura = $("#frmApertura");
  this.obj.frmConfirmarAnularEstado = $("#frmConfirmarAnularEstado");
  //filtros de busqueda
  this.obj.filtroOperacion=$("#filtroOperacion");
  this.obj.filtroEstacion=$("#filtroEstacion");
  //tablas
  this.obj.tablaJornada=$('#tablaJornada');
  this.obj.tablaTurno=$('#tablaTurno');
  this.obj.tablaDespachoCarga=$('#tablaDespachoCarga');
  this.obj.tablaDespacho=$('#tablaDespacho');
  //contenedores
  this.obj.cntTabla=$("#cntTabla");
  this.obj.cntApertura=$("#cntApertura");
  this.obj.cntCierre=$("#cntCierre");
  this.obj.cntVistaDetalleTurno=$("#cntVistaDetalleTurno");
   
  //oculta contenedores
  this.obj.ocultaContenedorTabla=$("#ocultaContenedorTabla");
  this.obj.ocultaContenedorDetalleDespacho=$("#ocultaContenedorDetalleDespacho");
  this.obj.ocultaContenedorApertura=$("#ocultaContenedorApertura");
  this.obj.ocultaContenedorCierre=$("#ocultaContenedorCierre");
  this.obj.ocultaContenedorFormulario=$("#ocultaContenedorFormulario");
  this.obj.ocultaContenedorVistaTurno=$("#ocultaContenedorVistaTurno");
  
  //Botones	
  this.obj.btnFiltrar=$("#btnFiltrar");
  this.obj.btnApertura=$("#btnApertura");
  this.obj.btnCierre=$("#btnCierre");  
  this.obj.btnVer=$("#btnVer");
  this.obj.btnGuardarApertura=$("#btnGuardarApertura");
  this.obj.btnCancelarApertura=$("#btnCancelarApertura");
  this.obj.btnGuardarCierre=$("#btnGuardarCierre");
  this.obj.btnCancelarCierre=$("#btnCancelarCierre");
  this.obj.btnCerrarVistaTurno=$("#btnCerrarVistaTurno");
  this.obj.btnPlantillaContometros = $("#btnPlantillaContometros");
  this.obj.btnCargarArchivoContometros = $("#btnCargarArchivoContometros");
  this.obj.btnProcesarArchivoContometros = $("#btnProcesarArchivoContometros");

  //para guardar los datos de la jornada seleccionada
  this.obj.idJornadaSeleccionada=$("#idJornadaSeleccionada");
  this.obj.jornadaSeleccionado=$("#jornadaSeleccionado");
  this.obj.idClienteSeleccionado=$("#idClienteSeleccionado");
  this.obj.idOperacionSeleccionado =$("#idOperacionSeleccionado");
  this.obj.operacionSeleccionado=$("#operacionSeleccionado");
  this.obj.idEstacionSeleccionado =$("#idEstacionSeleccionado");
  this.obj.estacionSeleccionado =$("#estacionSeleccionado");
  this.obj.idJornadaSeleccionado =$("#idJornadaSeleccionado");
  this.obj.responsableSeleccionado=$("#responsableSeleccionado");  
  this.obj.ayudanteSeleccionado=$("#ayudanteSeleccionado");
  this.obj.fechaHoraInicioSeleccionado=$("#fechaHoraInicioSeleccionado");
  this.obj.fechaHoraFinSeleccionado=$("#fechaHoraFinSeleccionado");  
  this.obj.idTurnoSeleccionado=$("#idTurnoSeleccionado");
  this.obj.estadoSeleccionado=$("#estadoSeleccionado");
  this.obj.fechaOperativaSeleccionado=$("#fechaOperativaSeleccionado");

  //estos valores para hacer los filtros de los listados	
  this.obj.txtFiltro=$("#txtFiltro");
  this.obj.cmpFiltroEstado=$("#cmpFiltroEstado");
  this.obj.cmpFechaInicial=$("#cmpFechaInicial");
  this.obj.cmpFechaFinal=$("#cmpFechaFinal");
  this.obj.filtroFechaJornada=$("#filtroFechaJornada");
  this.obj.cmpFiltroUsuario=$("#cmpFiltroUsuario");
  this.obj.cmpFiltroTabla=$("#cmpFiltroTabla");
  this.obj.cmpFiltroTipoFecha=$("#cmpFiltroTipoFecha");
  this.obj.modalConfirmacionAccion = $("#modalConfirmacionAccion");
  this.obj.btnConfirmacionAccion = this.obj.modalConfirmacionAccion.find("button.confirmar");

  this.obj.btnFiltrar.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.validaFormularioXSS("#frmBuscar");
	  referenciaModulo.modoEdicion=constantes.MODO_LISTAR;
	  referenciaModulo.listarRegistrosJornada();
  });
  
  this.obj.btnApertura.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.descripcionPermiso = 'CREAR_TURNO';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.obtieneUltimaJornada();
  });
  
  this.obj.btnCierre.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'ACTUALIZAR_TURNO';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.botonCierre();	
  });

  this.obj.btnVer.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'RECUPERAR_TURNO';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.botonVer();		
  });
  
  this.obj.btnGuardarApertura.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.botonGuardarApertura();	
  });
 
  this.obj.btnCancelarApertura.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.botonCancelarApertura();		
  });

  this.obj.btnCerrarVistaTurno.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.botonCerrarVistaTurno();		
  });

  this.obj.btnGuardarCierre.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function(){
	  referenciaModulo.botonGuardarCierre();		
  });
  
  this.obj.btnCancelarCierre.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.botonCancelarGuardarCierre();		
  });
  
  this.obj.btnPlantillaContometros.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.botonGenerarPlantillaContometros();		
  });
  
  this.obj.btnCargarArchivoContometros.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.modalCargarArchivoContometros();		
  });
  
  this.obj.btnProcesarArchivoContometros.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.procesarArchivoContometros();		
  });
  
  this.obj.btnConfirmacionAccion.on(referenciaModulo.NOMBRE_EVENTO_CLICK, function() {
	  referenciaModulo.procesarConfirmacionAccion();		
  });

};

moduloTurno.prototype.inicializaApertura = function(registro, valor) {
	
	var _this = this;
  
	try { 
		_this.modoEdicion = constantes.MODO_APERTURA_TURNO;
		_this.obj.tituloSeccion.text(cadenas.TITULO_TURNO_APERTURA);
		_this.obj.ocultaContenedorApertura.show();
		_this.obj.cntTabla.hide();
		_this.obj.cntCierre.hide();
		_this.obj.cntVistaDetalleTurno.hide();
		_this.obj.cntApertura.show();    
		_this.datosCabecera(registro);
		_this.recuperarTanquesDespachando();
		
		console.log('inicializaApertura - valor :: ' + valor);
		
		if (valor == 2) {
			_this.llenarAperturaContometroJornada(registro);
		}else{
			_this.llenarApertura(registro);
		}
		
		_this.desactivarBotones();
		_this.obj.ocultaContenedorApertura.hide();
	} catch(error){
		console.log(error.message);
	}
};

moduloTurno.prototype.recuperarApertura = function() {
	
	  var referenciaModulo = this;
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO, "Procesando petici\u00f3n...");
	  
	  $.ajax({
	      type: constantes.PETICION_TIPO_GET,
	      url: referenciaModulo.URL_RECUPERAR_APERTURA, 
	      contentType: referenciaModulo.TIPO_CONTENIDO, 
	      data: {
	    	  idJornada: referenciaModulo.obj.idJornadaSeleccionada, 
	    	  cantidadTurnos: referenciaModulo.cantidadTurnos,
	    	  idPerfilHorario: referenciaModulo.obj.idPerfilHorarioSeleccionado
    	  }, 
	      success: function(respuesta) {
			if (!respuesta.estado) {
				referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
			} else {
				if (respuesta.valor == 0) { //Existe turno abierto
					referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);	
				} else {
					referenciaModulo.inicializaApertura(respuesta.contenido.carga, respuesta.valor);	        	         	          	  
					referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO, respuesta.mensaje);	           
				} 
			}
	      },                  
	      error: function() {
	    	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
	      }
	  });
};
	
moduloTurno.prototype.recuperarTanquesDespachando= function() {
	
  var referenciaModulo = this;
  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici\u00f3n...");
  
  $.ajax({
      type: constantes.PETICION_TIPO_GET,
      url: './turno/recuperarTanquesDespachando', 
      contentType: referenciaModulo.TIPO_CONTENIDO, 
      data: {
    	  idJornada: referenciaModulo.obj.idJornadaSeleccionada
      }, 
      success: function(respuesta) {
        if (!respuesta.estado) {
        	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
        }   else {	  
        	referenciaModulo.llenarTanquesApertura(respuesta.contenido.carga[0]);
        	referenciaModulo.llenarTanquesCierre(respuesta.contenido.carga[0]);
        }
      },                  
      error: function() {
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
      }
  });
};

moduloTurno.prototype.recuperarRegistro = function() {
	
	  var _this = this;
	  _this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO, "Procesando petici\u00f3n...");
	  
	  $.ajax({
	      type: constantes.PETICION_TIPO_GET,
	      url: _this.URL_RECUPERAR, 
	      contentType: _this.TIPO_CONTENIDO, 
	      data: {
	    	  ID: parseInt(_this.obj.idTurnoSeleccionado)
	      },
	      beforeSend: function() {
	    	  _this.obj.grupoCierre.removeAllForms();
	      },
	      success: function(respuesta) {
				if (!respuesta.estado) {
					_this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, respuesta.mensaje);
				} else {

					if (_this.modoEdicion == constantes.MODO_CIERRE_TURNO) {
						_this.recuperarTanquesDespachando();
						_this.llenarFormularioCierre(respuesta.contenido.carga);
					} else if(_this.modoEdicion == constantes.MODO_VER_TURNO) {
						_this.llenarDetalles(respuesta.contenido.carga);
						_this.obj.ocultaContenedorVistaTurno.hide();
					}
					
					_this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO, respuesta.mensaje);
				}
	      },                  
	      error: function() {
	        _this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
	        //_this.obj.ocultaContenedorApertura.show();
	      }
	  });
};
	
moduloTurno.prototype.botonCierre = function() {
	
	var _this = this;
	
	try {
		
		$.ajax({
			type: constantes.PETICION_TIPO_GET,
			url: _this.URL_RECUPERAR_CIERRE, 
			contentType: _this.TIPO_CONTENIDO, 
			data: {
				idTurno: _this.obj.idTurnoSeleccionado
			}, 
			success: function(response) {
				if (!response.estado) {
					_this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, response.mensaje);
				} else {
					_this.obj.validacionExcelRows = response.contenido.carga[0].validacionExcelRows;
					_this.datosCabecera(response.contenido.carga);
				}
			},                  
			error: function() {
				_this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, "Hubo un error en la petici\u00f3n");
			}
		});
		
		_this.modoEdicion = constantes.MODO_CIERRE_TURNO;
		_this.obj.tituloSeccion.text(cadenas.TITULO_TURNO_CERRAR);
		_this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO, cadenas.CERRAR_DETALLE_PROGRAMACION);
		_this.obj.ocultaContenedorCierre.show();
		_this.obj.cntTabla.hide();		
		_this.obj.cntApertura.hide();
		_this.obj.cntVistaDetalleTurno.hide();
		_this.obj.cntCierre.show();		
	    //_this.datosCabecera();
	    _this.recuperarRegistro();
	    _this.obj.ocultaContenedorCierre.hide();
	} catch(error){
		console.log(error.message);
	}
};

moduloTurno.prototype.botonCerrarVistaTurno = function(){
	var referenciaModulo = this;
	try {
		referenciaModulo.modoEdicion = constantes.MODO_LISTAR_TURNO;
	    referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_LISTADO_REGISTROS);
	    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO, cadenas.INICIAR_LISTADO_TURNO);	    
	    referenciaModulo.obj.cntApertura.hide();
	    referenciaModulo.obj.cntCierre.hide();	    
	    referenciaModulo.obj.cntVistaDetalleTurno.hide();
	    referenciaModulo.obj.cntTabla.show();
	    this.obj.datTurnoAPI.ajax.reload(referenciaModulo.despuesListarRegistros,true);	
	  	referenciaModulo.desactivarBotones();
	    referenciaModulo.obj.btnVer.addClass(constantes.CSS_CLASE_DESHABILITADA);
	} catch(error){
	  console.log(error.message);
	}
};

moduloTurno.prototype.botonVer = function(){
	var referenciaModulo = this;
	referenciaModulo.modoEdicion = constantes.MODO_VER_TURNO;
    referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_DETALLE_REGISTRO);
    referenciaModulo.obj.ocultaContenedorCierre.show();
    referenciaModulo.obj.cntTabla.hide();
    referenciaModulo.obj.cntApertura.hide();
    referenciaModulo.obj.cntCierre.hide();
    referenciaModulo.obj.cntVistaDetalleTurno.show();
    referenciaModulo.obj.ocultaContenedorCierre.hide();
    referenciaModulo.datosCabecera();
    referenciaModulo.recuperarRegistro();
};

moduloTurno.prototype.botonCancelarApertura = function(){
	var referenciaModulo = this;
	try {
		referenciaModulo.modoEdicion = constantes.MODO_LISTAR_TURNO;
	    referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_LISTADO_REGISTROS);
	    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO, cadenas.INICIAR_LISTADO_TURNO);
	    referenciaModulo.obj.cntApertura.hide();
	    referenciaModulo.obj.cntCierre.hide();	    
	    referenciaModulo.obj.cntVistaDetalleTurno.hide();
	    referenciaModulo.obj.cntTabla.show();
	    this.obj.datTurnoAPI.ajax.reload(referenciaModulo.despuesListarRegistros,true);	
	  	referenciaModulo.desactivarBotones();
	    referenciaModulo.obj.btnVer.addClass(constantes.CSS_CLASE_DESHABILITADA);
	} catch(error){
	  console.log(error.message);
	}
};

moduloTurno.prototype.botonCancelarGuardarCierre = function(){
	var referenciaModulo = this;
	try {
		referenciaModulo.modoEdicion = constantes.MODO_LISTAR_TURNO;
	    referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_LISTADO_REGISTROS);
	    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO, cadenas.INICIAR_DETALLE_DESPACHO);		
		referenciaModulo.obj.cntApertura.hide();
		referenciaModulo.obj.cntCierre.hide();		
		referenciaModulo.obj.cntVistaDetalleTurno.hide();
		referenciaModulo.obj.cntTabla.show();
	} catch(error){
	  console.log(error.message);
	}
};

//para el listado de Jornadas
moduloTurno.prototype.llamadaAjaxGrillaJornada = function(e, configuracion, json) {
	
  var referenciaModulo = this;
  referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_AJAX);
  referenciaModulo.desactivarBotones();
  
  if (json.estado == true){
    json.recordsTotal=json.contenido.totalRegistros;
    json.recordsFiltered=json.contenido.totalEncontrados;
    json.data= json.contenido.carga;
    
    if (referenciaModulo.modoEdicion==constantes.MODO_LISTAR) {
    	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
    }
  } else {
    json.recordsTotal=0;
    json.recordsFiltered=0;
    json.data= {};
    
    if (referenciaModulo.modoEdicion==constantes.MODO_LISTAR) {
    	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
    }
  }
  
  if (referenciaModulo.estaCargadaInterface == false) {        
    referenciaModulo.estaCargadaInterface=true;
  }
  
  referenciaModulo.obj.ocultaContenedorTabla.hide();  
};

moduloTurno.prototype.inicializarGrillaJornada=function() {
  //Nota no retornar el objeto solo manipular directamente
  //Establecer grilla y su configuracion
  var referenciaModulo = this;
  
  this.obj.tablaJornada.on(constantes.DT_EVENTO_AJAX, function (e,configuracion,json) {
	   referenciaModulo.llamadaAjaxGrillaJornada(e,configuracion,json);
  });
  
  this.obj.tablaJornada.on(constantes.DT_EVENTO_PREAJAX, function (e,configuracion,datos) {
    //Se ejecuta antes de cualquier llamada ajax
    referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_PREAJAX);
    if (referenciaModulo.estaCargadaInterface==true){
    	referenciaModulo.obj.ocultaContenedorTabla.show();
    }
  });

  this.obj.tablaJornada.on(constantes.DT_EVENTO_PAGINACION, function () {
	  //Se ejecuta cuando se hace clic en boton de paginacion
	  referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_PAGINACION);
  });

  this.obj.tablaJornada.on(constantes.DT_EVENTO_ORDENACION, function () {
	  //Se ejecuta cuando se hace clic en alguna cabecera de columna para ordenarla
	  referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_ORDENACION);
  });

  this.obj.datJornadaAPI = this.obj.tablaJornada.DataTable({
    processing: true,
    responsive: true,
    dom: constantes.DT_ESTRUCTURA,
    iDisplayLength: referenciaModulo.NUMERO_REGISTROS_PAGINA,
    lengthMenu: referenciaModulo.TOPES_PAGINACION,
    language: {
    	url: referenciaModulo.URL_LENGUAJE_GRILLA
    },
    "serverSide": true,
    "ajax": {
    	"url": './jornada/listar',
    	"type":constantes.PETICION_TIPO_GET,
    	"data": function (d) {
	        var indiceOrdenamiento = d.order[0].column;
	        d.registrosxPagina = d.length; 
	        d.inicioPagina = d.start; 
	        d.campoOrdenamiento = d.columns[indiceOrdenamiento].data;
	        d.sentidoOrdenamiento = d.order[0].dir;
	        d.filtroOperacion= referenciaModulo.obj.filtroOperacion.val();
	        d.filtroEstacion = referenciaModulo.obj.filtroEstacion.val();
	        var rangoFecha = referenciaModulo.obj.filtroFechaJornada.val().split("-");
	        var fechaInicio = utilitario.formatearFecha2Iso(rangoFecha[0]) ;
	        var fechaFinal = utilitario.formatearFecha2Iso(rangoFecha[1]);
	        d.filtroFechaInicio= fechaInicio;	
	        d.filtroFechaFinal = fechaFinal;	
    	}
    },
    "columns": referenciaModulo.columnasGrillaJornada,
    "columnDefs": referenciaModulo.definicionColumnasJornada
    //"order": referenciaModulo.ordenGrilla
	});	
	
	$('#tablaJornada tbody').on(referenciaModulo.NOMBRE_EVENTO_CLICK, 'tr', function () {

		if (referenciaModulo.obj.datJornadaAPI.data().length <= 0) {
			return false;
		}
			
	    if ( $(this).hasClass('selected') ) {
	    	$(this).removeClass('selected');
	    } else {
	    	referenciaModulo.obj.datJornadaAPI.$('tr.selected').removeClass('selected');
	    	$(this).addClass('selected');
	    }
	    
	    var indiceFilaJornada = referenciaModulo.obj.datJornadaAPI.row( this ).index();
	    referenciaModulo.obj.idJornada = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada,1).data();
	    referenciaModulo.obj.idJornadaSeleccionada = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada,1).data();
	    referenciaModulo.obj.estadoJornada = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada,8).data();
	    
	    if(referenciaModulo.obj.estadoJornada == 3 || referenciaModulo.obj.estadoJornada == 4){
	    	referenciaModulo.obj.btnApertura.addClass(constantes.CSS_CLASE_DESHABILITADA);
	    } else {
	    	referenciaModulo.obj.btnApertura.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	    }
	    
	    referenciaModulo.idJornada = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada, 1).data();
	    referenciaModulo.obj.idEstacion= referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada, 2).data();
	    referenciaModulo.obj.nombreEstacion = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada, 3).data();
	    referenciaModulo.obj.fechaOperativaSeleccionado = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada, 4).data();
	    referenciaModulo.obj.idPerfilHorarioSeleccionado = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada, 10).data();
	    //referenciaModulo.obj.horaInicioFinTurnoSeleccionado = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada, 10).data();
	    //referenciaModulo.obj.numeroOrdenSeleccionado = referenciaModulo.obj.datJornadaAPI.cell(indiceFilaJornada, 11).data();
	    
	    //desactivamos todos los botones
    	referenciaModulo.desactivarBotones();
    	referenciaModulo.listarRegistrosTurnos();
	});
};

//para el listado de Jornadas
moduloTurno.prototype.llamadaAjaxGrillaTurno = function(e, configuracion, json) {
	
	var referenciaModulo = this;
	referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_AJAX);
	referenciaModulo.desactivarBotones();
  
	if (json.estado==true){
		
		json.recordsTotal=json.contenido.totalRegistros;
		json.recordsFiltered=json.contenido.totalEncontrados;
		json.data= json.contenido.carga;
		referenciaModulo.cantidadTurnos = json.contenido.totalEncontrados;
    
	    if (referenciaModulo.modoEdicion==constantes.MODO_LISTAR){
	    	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
	    }
	} else {
		json.recordsTotal=0;
		json.recordsFiltered=0;
		json.data= {};
		
		if (referenciaModulo.modoEdicion==constantes.MODO_LISTAR){
			referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
		}
	}
	
	if (referenciaModulo.estaCargadaInterface==false){        
		referenciaModulo.estaCargadaInterface=true;
	}
	
	referenciaModulo.obj.ocultaContenedorTabla.hide();  
};

moduloTurno.prototype.inicializarGrillaTurno = function() {
	//Nota no retornar el objeto solo manipular directamente
	//Establecer grilla y su configuracion
	
  var referenciaModulo = this;
  
  try {
	  this.obj.tablaTurno.on(constantes.DT_EVENTO_AJAX, function (e,configuracion,json) {
		  referenciaModulo.llamadaAjaxGrillaTurno(e,configuracion,json);
	  });
  
  this.obj.tablaTurno.on(constantes.DT_EVENTO_PREAJAX, function (e,configuracion,datos) {
    //Se ejecuta antes de cualquier llamada ajax
    referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_PREAJAX);
    if (referenciaModulo.estaCargadaInterface==true){
    //referenciaModulo.obj.ocultaContenedorTabla.show();
    }
  });

  this.obj.tablaTurno.on(constantes.DT_EVENTO_PAGINACION, function () {
  //Se ejecuta cuando se hace clic en boton de paginacion
    referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_PAGINACION);
  });

  this.obj.tablaTurno.on(constantes.DT_EVENTO_ORDENACION, function () {
  //Se ejecuta cuando se hace clic en alguna cabecera de columna para ordenarla
    referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_ORDENACION);
  });

  this.obj.datTurnoAPI= this.obj.tablaTurno.DataTable({
    processing: true,
    deferLoading: 0,
    responsive: true,
    dom: constantes.DT_ESTRUCTURA,
    iDisplayLength: referenciaModulo.NUMERO_REGISTROS_PAGINA,
    lengthMenu: referenciaModulo.TOPES_PAGINACION,
    language: {
      url: referenciaModulo.URL_LENGUAJE_GRILLA
    },
    serverSide: true,
    ajax: {
      url: referenciaModulo.URL_LISTAR,
      type:constantes.PETICION_TIPO_GET,
      "data": function (d) {
	        d.registrosxPagina =  d.length; 
	        d.inicioPagina = d.start; 
	        d.campoOrdenamiento= d.columns[2].data;        
	        d.sentidoOrdenamiento=d.order[0].dir;
	        d.idJornada = referenciaModulo.obj.idJornadaSeleccionada;
      }
    },
    columns: referenciaModulo.columnasGrillaTurno,
    columnDefs: referenciaModulo.definicionColumnasTurno
    //"order": referenciaModulo.ordenGrilla
	});	
	
	$('#tablaTurno tbody').on(referenciaModulo.NOMBRE_EVENTO_CLICK, 'tr', function () {
		
		if (referenciaModulo.obj.datTurnoAPI.data().length <= 0) {
			return false;
		}
			
	    if ( $(this).hasClass('selected') ) {
	    	$(this).removeClass('selected');
	    } else {
	    	referenciaModulo.obj.datTurnoAPI.$('tr.selected').removeClass('selected');
	    	$(this).addClass('selected');
	    }
	    
	    var indiceFila = referenciaModulo.obj.datTurnoAPI.row(this).index();
	  	referenciaModulo.obj.idTurnoSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila,1).data();
	  	referenciaModulo.obj.fechaHoraInicioSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila,2).data();
	  	referenciaModulo.obj.fechaHoraFinSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila,3).data();
	  	referenciaModulo.obj.horaInicioFinTurnoSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila, 4).data();
	  	referenciaModulo.obj.estacionSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila, 4).data();
	  	referenciaModulo.obj.responsableSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila, 6).data();
	  	referenciaModulo.obj.ayudanteSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila, 7).data();
	  	referenciaModulo.obj.estadoSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila,8).data();
	  	referenciaModulo.obj.idEstacionSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila, 9).data();
	  	referenciaModulo.obj.fechaOperativaSeleccionado = referenciaModulo.obj.datTurnoAPI.cell(indiceFila, 10).data();
	  	
	  	if(referenciaModulo.obj.estadoSeleccionado == constantes.TIPO_TURNO_ABIERTO){
	  		referenciaModulo.obj.btnCierre.removeClass("disabled");
	  	}
	  	
	  	if(referenciaModulo.obj.estadoSeleccionado == constantes.TIPO_TURNO_CERRADO){
	  		referenciaModulo.obj.btnCierre.addClass("disabled");
	  	}
	  	
		referenciaModulo.obj.btnVer.removeClass("disabled");
	});
  } catch(error){
	  referenciaModulo.mostrarDepuracion(error.message);
  }
};

//esto para la grilla de despacho carga
moduloTurno.prototype.llamadaAjaxGrillaDespachoCarga=function(e,configuracion,json){
  var ref=this;
  try {
	  ref.mostrarDepuracion(constantes.DT_EVENTO_AJAX);
	  if (json.estado==true){
	    json.recordsTotal=json.contenido.totalRegistros;
	    json.recordsFiltered=json.contenido.totalEncontrados;
	    json.data= json.contenido.carga;
	    if (ref.modoEdicion==constantes.MODO_LISTAR){
	    	ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
	    }
	  } else {
	    json.recordsTotal=0;
	    json.recordsFiltered=0;
	    json.data= {};
	    ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
	  }
	  if (ref.estaCargadaInterface==false){        
		  ref.estaCargadaInterface=true;
	  }
   } catch(error){
	    ref.mostrarDepuracion(error.message);
   }  
};

//esto para la grilla de despachos
moduloTurno.prototype.llamadaAjaxGrillaDespacho=function(e,configuracion,json){
	  var ref=this;
	  try {
		  ref.mostrarDepuracion(constantes.DT_EVENTO_AJAX);
		  if (json.estado==true){
		    json.recordsTotal=json.contenido.totalRegistros;
		    json.recordsFiltered=json.contenido.totalEncontrados;
		    json.data= json.contenido.carga;
		    if (ref.modoEdicion==constantes.MODO_LISTAR){
		    	ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
		    }
		  } else {
		    json.recordsTotal=0;
		    json.recordsFiltered=0;
		    json.data= {};
		    ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
		  }
		  if (ref.estaCargadaInterface==false){        
			  ref.estaCargadaInterface=true;
		  }
	   } catch(error){
		    ref.mostrarDepuracion(error.message);
	   }  
	};

moduloTurno.prototype.inicializarFormularioPrincipal= function() {  

};

moduloTurno.prototype.activarBotones=function() {
	this.obj.btnCierre.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	this.obj.btnVer.removeClass(constantes.CSS_CLASE_DESHABILITADA);
};

moduloTurno.prototype.desactivarBotones=function() {
	this.obj.btnCierre.addClass(constantes.CSS_CLASE_DESHABILITADA);
	this.obj.btnVer.addClass(constantes.CSS_CLASE_DESHABILITADA);
};

moduloTurno.prototype.listarRegistrosJornada = function() {
	var referenciaModulo = this;
	referenciaModulo.mostrarDepuracion("listarRegistros");  
	referenciaModulo.obj.idJornadaSeleccionada = -1;
	referenciaModulo.obj.datJornadaAPI.ajax.reload(referenciaModulo.despuesListarRegistros, true);	
	referenciaModulo.obj.datTurnoAPI.ajax.reload(referenciaModulo.despuesListarRegistros, true);	
}; 	
	
moduloTurno.prototype.listarRegistrosTurnos = function() {
	var referenciaModulo = this;
  
	try {
		referenciaModulo.mostrarDepuracion("listarRegistros");  
		//referenciaModulo.obj.datTurnoAPI.clear();
		//referenciaModulo.inicializarGrillaTurno();
		referenciaModulo.obj.datTurnoAPI.ajax.reload(referenciaModulo.despuesListarRegistros,true);
	} catch(error) {
		referenciaModulo.mostrarDepuracion(error.message);
	} 
};

moduloTurno.prototype.actualizarBandaInformacion = function(tipo, mensaje) {
	
	var referenciaModulo = this;
	referenciaModulo.mostrarDepuracion("actualizarBandaInformacion");
	referenciaModulo.obj.bandaInformacion.removeClass(constantes.CLASE_MENSAJE_ERROR);
	referenciaModulo.obj.bandaInformacion.removeClass(constantes.CLASE_MENSAJE_EXITO);
	referenciaModulo.obj.bandaInformacion.removeClass(constantes.CLASE_MENSAJE_INFORMACION);
	
	if (tipo == constantes.TIPO_MENSAJE_INFO){
		referenciaModulo.obj.bandaInformacion.addClass(constantes.CLASE_MENSAJE_INFORMACION );
	} else if (tipo == constantes.TIPO_MENSAJE_EXITO){
		referenciaModulo.obj.bandaInformacion.addClass(constantes.CLASE_MENSAJE_EXITO );
	} else if (tipo == constantes.TIPO_MENSAJE_ERROR){
		referenciaModulo.obj.bandaInformacion.addClass(constantes.CLASE_MENSAJE_ERROR );
	}
	
	referenciaModulo.obj.bandaInformacion.text(mensaje);
};

moduloTurno.prototype.obtieneUltimaJornada= function() {
	
	var referenciaModulo = this;

	if (referenciaModulo.obj.filtroEstacion.val() > 0) {
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);
		$.ajax({
		    type: constantes.PETICION_TIPO_GET,
		    url: referenciaModulo.URL_RECUPERA_ULTIMA_JORNADA, 
		    contentType: referenciaModulo.TIPO_CONTENIDO, 
		    data: {
		    	filtroEstacion : referenciaModulo.obj.filtroEstacion.val(),
		        filtroEstado : constantes.TIPO_JORNADA_ABIERTO
		    },	 
		    success: function(respuesta) {
		    	if (!respuesta.estado) {
		    		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
		    	} else {
		    		var valor = respuesta.valor;
		    		if(valor != 0){
		    			referenciaModulo.idJornada=valor;
		    			//iniciar formulario apertura
		    			referenciaModulo.recuperarApertura();
		    		}else{
		    			referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,respuesta.mensaje);
		    		}
	    		}
		    },			    		    
		    error: function(xhr,estado,error) {
		    	referenciaModulo.mostrarErrorServidor(xhr,estado,error);        
		    }
		});
	}else{
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Debe seleccionar la Estaci\u00f3n");
	}
};

moduloTurno.prototype.verRegistro = function() {
	
	var referenciaModulo = this;
	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);

	$.ajax({
	    type: constantes.PETICION_TIPO_GET,
	    url: referenciaModulo.URL_RECUPERAR, 
	    contentType: referenciaModulo.TIPO_CONTENIDO, 
	    data: {ID:referenciaModulo.idRegistro},	
	    success: function(respuesta) {
    	  if (!respuesta.estado) {
    		  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
    	  } else {		 
    		  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
    		  referenciaModulo.llenarDetalles(respuesta.contenido.carga[0]);
    		  referenciaModulo.obj.ocultaContenedorVista.show();
		  }
	    },			    		    
	    error: function() {
	    	referenciaModulo.mostrarErrorServidor(xhr,estado,error); 
	    	referenciaModulo.obj.ocultaContenedorVista.show();
	    }
	});
};

moduloTurno.prototype.botonGuardarApertura = function(){
	var _this = this;
	try {
		_this.modalGuardarApertura();
	} catch(error) {
	  console.log(error.message);
	}
};

moduloTurno.prototype.botonGuardarCierre = function() {
	var _this = this;
	try {
		
		//_this.guardarCierre();
		_this.modalGuardarCierre();
	} catch(error) {
	  console.log(error.message);
	}
};

moduloTurno.prototype.modalGuardarApertura = function() {
	this.obj.modalConfirmacionAccion.modal("show");
	this.obj.modalConfirmacionAccion.find("span.apertura").show();
	this.obj.modalConfirmacionAccion.find("span.cierre").hide();
	this.obj.flagConfirmacionAccion = "apertura";
	return false;
};

moduloTurno.prototype.modalGuardarCierre = function() {
	this.obj.modalConfirmacionAccion.modal("show");
	this.obj.modalConfirmacionAccion.find("span.apertura").hide();
	this.obj.modalConfirmacionAccion.find("span.cierre").show();
	this.obj.flagConfirmacionAccion = "cierre";
	return false;
};

moduloTurno.prototype.procesarConfirmacionAccion = function() {
	
	var accion = this.obj.flagConfirmacionAccion;
	
	if (accion == "apertura") {
		this.guardarApertura();
	} else if (accion == "cierre") {
		this.guardarCierre();
	}
	
	return false;
};

moduloTurno.prototype.guardarApertura = function() {
	
	var referenciaModulo = this;
	
	if (!referenciaModulo.validaFormularioXSS("#frmApertura")) {
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, cadenas.ERROR_VALORES_FORMULARIO);
	} else if (referenciaModulo.obj.frmApertura.valid()) {

		referenciaModulo.obj.ocultaContenedorApertura.show();
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO, cadenas.PROCESANDO_PETICION);
		var eRegistro = referenciaModulo.recuperarValores();

		$.ajax({
			type: constantes.PETICION_TIPO_POST,
			url: referenciaModulo.URL_GUARDAR, 
			contentType: referenciaModulo.TIPO_CONTENIDO, 
			data: JSON.stringify(eRegistro),	
			success: function(respuesta) {
				if (!respuesta.estado) {
					referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, respuesta.mensaje);
				} else {
					referenciaModulo.iniciarListado(respuesta.mensaje);
					referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO, respuesta.mensaje);
					referenciaModulo.obj.flagConfirmacionAccion = "";
				}
				referenciaModulo.obj.ocultaContenedorApertura.hide();
				referenciaModulo.obj.modalConfirmacionAccion.modal("hide");
			},			    		    
			error: function() {
				referenciaModulo.mostrarErrorServidor(xhr,estado,error); 
				referenciaModulo.obj.ocultaContenedorApertura.hide();
			}
		});
	} else {
		referenciaModulo.obj.ocultaContenedorApertura.hide();
	}
};

moduloTurno.prototype.guardarCierre = function() {
	
	var referenciaModulo = this;

	if (!referenciaModulo.validaFormularioXSS("#frmCierre")) {
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, cadenas.ERROR_VALORES_FORMULARIO);
	} else if (referenciaModulo.validarCierre()) {
		
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO, cadenas.PROCESANDO_PETICION);
		referenciaModulo.obj.ocultaContenedorCierre.show();
		var eRegistro = referenciaModulo.recuperarValores();

		console.log(" ***** guardarCierre ******* ");
		console.dir(eRegistro);
		
		
		$.ajax({
			type: constantes.PETICION_TIPO_POST,
			url: referenciaModulo.URL_ACTUALIZAR, 
			contentType: referenciaModulo.TIPO_CONTENIDO, 
			data: JSON.stringify(eRegistro),	
			success: function(respuesta) {
				if (!respuesta.estado) {
					referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, respuesta.mensaje);
				} else {		    				    			    		
					referenciaModulo.iniciarListado(respuesta.mensaje);
					referenciaModulo.obj.flagConfirmacionAccion = "";
				}
				referenciaModulo.obj.ocultaContenedorCierre.hide();
				referenciaModulo.obj.modalConfirmacionAccion.modal("hide");
			},			    		    
			error: function() {
				referenciaModulo.mostrarErrorServidor(xhr,estado,error); 
				referenciaModulo.obj.ocultaContenedorCierre.hide();
			}
		});
	}
};

moduloTurno.prototype.iniciarListado= function(mensaje){
	var referenciaModulo = this;
	try {
		referenciaModulo.modoEdicion = constantes.MODO_LISTAR_TURNO;
	    referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_LISTADO_REGISTROS);
	    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO, mensaje);	    
	    referenciaModulo.obj.cntApertura.hide();
	    referenciaModulo.obj.cntCierre.hide();
	    referenciaModulo.obj.cntVistaDetalleTurno.hide();
	    referenciaModulo.obj.cntTabla.show();
	    referenciaModulo.obj.ocultaContenedorTabla.show();
//	    referenciaModulo.obj.btnCierre.addClass(constantes.CSS_CLASE_DESHABILITADA);
//	    referenciaModulo.obj.btnVer.addClass(constantes.CSS_CLASE_DESHABILITADA);	   
	    referenciaModulo.obj.datTurnoAPI.ajax.reload(referenciaModulo.despuesListarRegistros,true);	
	  	referenciaModulo.desactivarBotones();
	  	referenciaModulo.obj.ocultaContenedorTabla.hide();
	} catch(error){
		console.log(error);
    referenciaModulo.mostrarDepuracion(error.message);
	};
};

moduloTurno.prototype.iniciarContenedores = function(){
  var referenciaModulo = this;
  try {
    referenciaModulo.obj.cntTabla.show();
  } catch(error){
    referenciaModulo.mostrarDepuracion(error.message);
  };
};

moduloTurno.prototype.solicitarActualizarEstado= function(){
	try {
		this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);
		this.obj.frmConfirmarModificarEstado.modal("show");
	} catch(error){
		referenciaModulo.mostrarDepuracion(error.message);
	}
};

moduloTurno.prototype.actualizarEstadoRegistro= function(){
  var eRegistro = {};
  var referenciaModulo=this;
	referenciaModulo.obj.frmConfirmarModificarEstado.modal("hide");
  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);
  if (referenciaModulo.estadoRegistro==constantes.ESTADO_ACTIVO){
    referenciaModulo.estadoRegistro=constantes.ESTADO_INACTIVO;
  } else {
    referenciaModulo.estadoRegistro=constantes.ESTADO_ACTIVO;
  }

  try {
    eRegistro.id = parseInt(referenciaModulo.idRegistro);
    eRegistro.estado = parseInt(referenciaModulo.estadoRegistro);
  }  catch(error){
    referenciaModulo.mostrarDepuracion(error.message);
  }

  $.ajax({
    type: constantes.PETICION_TIPO_POST,
    url: referenciaModulo.URL_ACTUALIZAR_ESTADO, 
    contentType: referenciaModulo.TIPO_CONTENIDO, 
    data: JSON.stringify(eRegistro),	
    success: function(respuesta) {
      if (!respuesta.estado) {
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
      } else {		    				    			    		
        referenciaModulo.listarRegistros();
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);	
        referenciaModulo.obj.cntTabla.show();
      }
    },			    		    
    error: function() {
      referenciaModulo.mostrarErrorServidor(xhr,estado,error); 
    }
    });
	};
	
moduloTurno.prototype.inicializarCampos= function(){
//Implementar en cada caso
};

moduloTurno.prototype.llenarFormulario = function(registro){
//Implementar en cada caso	
};

moduloTurno.prototype.llenarDetalles = function(registro){
//Implementar en cada caso
};

moduloTurno.prototype.llenarTanquesDespachando = function(registro){
//Implementar en cada caso
};

moduloTurno.prototype.recuperarValores = function(registro){
var eRegistro = {};
//Implementar en cada caso
return eRegistro;
};

moduloTurno.prototype.grillaDespuesSeleccionar= function(indice){
//TODO implementar
};

moduloTurno.prototype.despuesListarRegistros=function(){
//Implementar en cada caso
};

moduloTurno.prototype.validaPermisos= function() {
	
  var referenciaModulo = this;
  
  try {
	  referenciaModulo.obj.ocultaContenedorTabla.show();
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO, cadenas.VERIFICANDO_PERMISOS);
	  
	  $.ajax({
	    type: constantes.PETICION_TIPO_GET,
	    url: './validaPermisos/validar',
	    contentType: referenciaModulo.TIPO_CONTENIDO, 
	    data: { permiso : referenciaModulo.descripcionPermiso, },	
	    success: function(respuesta) {
	      if(!respuesta.estado){
	    	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, respuesta.mensaje);
		      referenciaModulo.obj.ocultaContenedorTabla.hide();
	      } else {
		      if (referenciaModulo.descripcionPermiso == 'CREAR_TURNO'){
		    	  //referenciaModulo.obtieneUltimaJornada();
		    	  referenciaModulo.recuperarApertura();
		    	  //referenciaModulo.recuperarTanquesDespachando();
		      } else if (referenciaModulo.descripcionPermiso == 'ACTUALIZAR_TURNO'){
		    	  referenciaModulo.botonCierre();
		    	  //referenciaModulo.recuperarTanquesDespachando();
		      } else if (referenciaModulo.descripcionPermiso == 'RECUPERAR_TURNO'){
		    	  referenciaModulo.botonVer();
		      }
	      }
	      referenciaModulo.obj.ocultaContenedorTabla.hide();
	    },
	    error: function() {
	    	referenciaModulo.obj.ocultaContenedorTabla.hide();
	    	referenciaModulo.mostrarErrorServidor(xhr,estado,error); 
	    }
	  });
  } catch(error){
	  referenciaModulo.obj.ocultaContenedorTabla.hide();
	  referenciaModulo.mostrarDepuracion(error.message);
  };
};

/**
 * Exportar Excel Contometros
 */
moduloTurno.prototype.botonGenerarPlantillaContometros = function() {
	var referenciaModulo = this;
	window.open(referenciaModulo.GENERAR_PLANTILLA_CONTOMETROS + "?idTurno=" + referenciaModulo.obj.idTurnoSeleccionado);
};

/**
 * Open modal
 */
moduloTurno.prototype.modalCargarArchivoContometros = function() {
	$("#modalEstacionCierre").html(this.obj.estacionSeleccionado);
	$("#modalClienteCierre").html(this.obj.operacionSeleccionado + " / " + this.obj.clienteSeleccionado);
	$("#modalDiaOperativoCierre").html(this.obj.fechaOperativaSeleccionado + " " + this.obj.horaInicioFinTurnoSeleccionado);
	
	$("#fileUpload").val("");
    $(".callout-warning").hide();
    $(".callout-danger").html("").hide();
    this.obj.btnProcesarArchivoContometros.prop('disabled', false);
	this.obj.modalCargarArchivoContometros.modal("show");
};

/**
 * Process excel
 */
moduloTurno.prototype.procesarArchivoContometros = function() {

    var _this = this;
    _this.excelRowsObj = null;
    _this.excelRowsCount = 0;
    _this.errorsValidation = [];
    
    _this.messageError = $(".callout-danger");
    _this.messageWarning = $(".callout-warning");
    _this.messageError.html("").hide();
    _this.messageWarning.show();
    _this.fileUpload = $("#fileUpload");
    _this.fileFirstElement = _this.fileUpload[0];
    _this.obj.btnProcesarArchivoContometros.prop('disabled', true);
    
    if (_this.fileFirstElement.files.length == 0) {
    	
    	var errors = [];
    	errors.push($('<li/>').text("No se encontró el archivo indicado, por favor verifique."));
    	_this.messageError.html(errors).show();
    	_this.messageWarning.hide();
    	_this.obj.btnProcesarArchivoContometros.prop('disabled', false);
    	
    	return false;
    }

    var allowedExtensions = new Array("xlsx", "xls");
	if (allowedExtensions.indexOf(_this.fileFirstElement.value.toLowerCase().split('.').pop()) < 0) {
    	
    	var errors = [];
    	errors.push($('<li/>').text("Suba un archivo excel valido."));
    	_this.messageError.html(errors).show();
    	_this.messageWarning.hide();
    	_this.obj.btnProcesarArchivoContometros.prop('disabled', false);
    	
    	return false;
    }
    	
    if (typeof (FileReader) == "undefined") {
    	
    	var errors = [];
    	errors.push($('<li/>').text("Este navegador no soporta HTML5."));
    	_this.messageError.html(errors);
    	_this.messageWarning.hide();
    	_this.obj.btnProcesarArchivoContometros.prop('disabled', false);
    	
    	return false;
    }
    
    /**
     * Set Excel Rows Object
     */
    setExcelRowsObject(_this.fileFirstElement);
    
    setTimeout(function() {
        
        if (_this.excelRowsCount != _this.obj.countListContometro) {
        	
        	var errors = [];
        	errors.push($('<li/>').text("Número de contómetros en archivo (" + _this.excelRowsCount + "), no coincide con la lista (" + _this.obj.countListContometro + "), por favor verifique."));
        	_this.messageError.html(errors).show();
        	_this.messageWarning.hide();
        	_this.obj.btnProcesarArchivoContometros.prop('disabled', false);
        	
        	return false;
        }

        validateLecturaFinal();
        
        setTimeout(function() {
        	
            if (_this.errorsValidation.length > 0) {
            	_this.messageError.html(_this.errorsValidation).show();
            	_this.messageWarning.hide();
            	_this.obj.btnProcesarArchivoContometros.prop('disabled', false);
            	
            	return false;
            }
            
            validateExisteContometro();
            
            setTimeout(function() {
            	
                if (_this.errorsValidation.length > 0) {
                	_this.messageError.html(_this.errorsValidation).show();
                	_this.messageWarning.hide();
                	_this.obj.btnProcesarArchivoContometros.prop('disabled', false);
                	
                	return false;
                }
                
                /**
                 * PROCESS EXCEL
                 */
                processExcel();
                _this.fileUpload.val("");
                _this.messageWarning.hide();
                _this.obj.modalCargarArchivoContometros.modal("hide");
            	
            }, 2000);
        	
        }, 2000);

    }, 2500);
    
    /**
     * FUNCTIONS
     */
    function setExcelRowsObject(fileUpload) {

    	try {
    	
	        var reader = new FileReader();
	
	        //For Browsers other than IE.
	        if (reader.readAsBinaryString) {
	            reader.onload = function (e) {
	            	var data = e.target.result;
	    		    var workbook = XLSX.read(data, {type: 'binary'});
	    		    var firstSheet = workbook.SheetNames[0];
	    		    _this.excelRowsObj = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
	    		    _this.excelRowsCount = _this.excelRowsObj.length;
	            };
	            reader.readAsBinaryString(fileUpload.files[0]);
	        } else {
	        	
	            //For IE Browser.
	            reader.onload = function (e) {
	                var data = "";
	                var bytes = new Uint8Array(e.target.result);
	                
	                for (var i = 0; i < bytes.byteLength; i++) {
	                    data += String.fromCharCode(bytes[i]);
	                }

	    		    var workbook = XLSX.read(data, {type: 'binary'});
	    		    var firstSheet = workbook.SheetNames[0];
	    		    _this.excelRowsObj = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
	    		    _this.excelRowsCount = _this.excelRowsObj.length;
	            };
	            reader.readAsArrayBuffer(fileUpload.files[0]);
	        }
        
    	} catch (error) {
    		
    	};
    }
    
    function validateLecturaFinal() {

    	try {
			
		    var errors = [];
		    var errorsCount = 0;
		    _this.errorsValidation = [];
		    
		    for (var i = 0; i < _this.excelRowsObj.length; i++) {
		    	
		    	var secuencia = _this.excelRowsObj[i].SECUENCIA.trim();
		    	var contometro = _this.excelRowsObj[i].CONTOMETRO.trim();
		    	var lecturaInicial = parseFloat(_this.obj.listCronometro[i].lectura_inicial);
		    	var lecturaFinal = parseFloat(_this.excelRowsObj[i].LECTURA_FINAL).toFixed(6);
		    	
		    	if (isNaN(lecturaInicial) || isNaN(lecturaFinal) || lecturaFinal <= 0) {
		    		continue;
		    	}
		    	
		    	if (lecturaFinal < lecturaInicial) {
		    		errors.push($('<li/>').text("(" + secuencia + ") Para el contómetro '" + contometro + "' la lectura final es menor que la lectura inicial."));
		    		errorsCount++;
		    		
			    	if (errorsCount == _this.obj.validacionExcelRows) {
			    		break;
			    	}
		    	}
		    }
		    
		    _this.errorsValidation = errors;
        
    	} catch (error) {
    		
    	};
    }
    
    function validateExisteContometro() {

    	try {
			
		    var errors = [];
		    var errorsCount = 0;
		    var contometroAliasArray = [];
		    _this.errorsValidation = [];
		    
		    for (var i = 0; i < _this.obj.listCronometro.length; i++) {
		    	contometroAliasArray.push(_this.obj.listCronometro[i].contometro_alias.trim());
		    }
		    
		    for (var i = 0; i < _this.excelRowsObj.length; i++) {
		    	
		    	var secuencia = _this.excelRowsObj[i].SECUENCIA.trim();
		    	var contometro = _this.excelRowsObj[i].CONTOMETRO.trim();

		    	if (contometroAliasArray.indexOf(contometro) < 0) {
		    		errors.push($('<li/>').text("(" + secuencia + ") No se encontró el contómetro '" + contometro + "' en la grilla, por favor verifique."));
		    		errorsCount++;
		    		
			    	if (errorsCount == _this.obj.validacionExcelRows) {
			    		break;
			    	}
		    	}
		    }
		    
		    _this.errorsValidation = errors;
        
    	} catch (error) {
    		
    	};
    }
	
	function processExcel() {
		
    	try {

		    for (var i = 0; i < _this.excelRowsObj.length; i++) {
		    	
		    	$("#GrupoCierre_" + i + "_LecturaFinal").val("");
		    	$("#GrupoCierre_" + i + "_LecturaDifVolEncontrado").val("");
		    	
		    	var lecturaInicial = _this.obj.listCronometro[i].lectura_inicial;
		    	var lecturaFinal = mathRound(_this.excelRowsObj[i].LECTURA_FINAL);

		    	if (isNaN(lecturaFinal)) {
		    		continue;
		    	}
		    	
		    	var diferencia = mathRound(lecturaFinal - lecturaInicial);
		    	diferencia = trailingZeros(diferencia);
		    	lecturaFinal = trailingZeros(lecturaFinal);
		    	
		    	$("#GrupoCierre_" + i + "_LecturaFinal").val(lecturaFinal);
		    	$("#GrupoCierre_" + i + "_LecturaDifVolEncontrado").val(diferencia);
		    }
	    
    	} catch (error) {
    		
    	};
	}
	
	function trailingZeros(num) {
		
		var decimalesContometro = _this.obj.numeroDecimalesContometro;
		
		if (num.toString() == "0") {
			return "0.000000".substring(0, (decimalesContometro + 2));
		}
		
		if (num.toString().indexOf(".") < 0 || !num.toString().split(".").length >= 2) {
			return num;
		}

		var result = num.toString().split(".");
		var integer = result[0];
		var decimal = result[1];
		
		if (decimal.length > decimalesContometro) {
			return integer + "." + decimal.substring(0, decimalesContometro);
		}
		
		while (decimal.length < decimalesContometro) {
			decimal = decimal + "0";
		}

		return integer + "." + decimal;
	}
	
	function mathRound(num) {
		
		var decimalesContometro = (_this.obj.numeroDecimalesContometro + 1);
		var roundPad = "1000000".substring(0, decimalesContometro);
		roundPad = parseInt(roundPad);
		
		return Math.round(num * roundPad) / roundPad;
	}
	
};

