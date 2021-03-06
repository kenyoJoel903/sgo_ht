function moduloProgramacion (){
	
  this.obj={};
  this.NUMERO_REGISTROS_PAGINA = constantes.NUMERO_REGISTROS_PAGINA;
  this.TOPES_PAGINACION = constantes.TOPES_PAGINACION;
  this.URL_LENGUAJE_GRILLA = "tema/datatable/language/es-ES.json";
  this.TIPO_CONTENIDO=constantes.TIPO_CONTENIDO_JSON;
  this.NOMBRE_EVENTO_CLICK=constantes.NOMBRE_EVENTO_CLICK;
  this.modoEdicion=constantes.MODO_LISTAR;
  this.depuracionActivada=true;
  this.estaCargadaInterface=false;
  //Inicializar propiedades
  this.urlBase='';  
  this.mensajeEsMostrado=false;
  this.idDiaOperativo = 0;
  this.idProgramacion = 0;
  
  this.columnasGrilla={};
  this.definicionColumnas=[];
  this.reglasValidacionFormulario={};
  this.mensajesValidacionFormulario={};  
  this.NUMERO_REGISTROS_PAGINA_TRANSPORTE = constantes.NUMERO_REGISTROS_PAGINA_TRANSPORTE;
  this.TOPES_PAGINACION_TRANSPORTE = constantes.TOPES_PAGINACION_TRANSPORTE;  
  this.reglasValidacionFormularioEvento={};
  this.mensajesValidacionFormularioEvento={};  
  this.reglasValidacionFormularioPesaje={};
  this.mensajesValidacionFormularioPesaje={};  
  this.ordenGrilla=[[ 1, 'asc' ]];
  this.columnasGrilla=[{ "data": null} ];//Target 0
  // this.cmpFitlroEstado.val("2");
  this.definicionColumnas=[{
	  "targets": 0, 
	  "searchable": false, 
	  "orderable": false, 
	  "visible":false, 
	  "render": function (datos, tipo, fila, meta) {
		  var configuracion =meta.settings;
          return configuracion._iDisplayStart + meta.row + 1;
      }
  }];  
  
  //Inicio agregado por req 9000002857
  this.columnasGrillaAforo={};
  this.definicionColumnasAforo=[];
  this.columnasGrillaAforo=[{ "data": null} ];
  this.definicionColumnasAforo=[{
	  "targets": 0,
	  "searchable": false, 
	  "orderable": false, 
	  "visible":false, 
	  "render": function ( datos, tipo, fila, meta ) {
		  var configuracion =meta.settings;
		  return configuracion._iDisplayStart + meta.row + 1;
	  }
  }];
  
  //Fin agregado por req 9000002857
  
  this.columnasGrillaDetalleProgramacion={};
  this.definicionColumnasDetalleProgramacion=[];
  this.ordenGrillaDetalleProgramacion=[[ 1, 'asc' ]];
  this.columnasGrillaDetalleProgramacion=[{ "data": null} ];//Target 0
  this.definicionColumnasDetalleProgramacion=[{
	  "targets": 0,
	  "searchable": false, 
	  "orderable": false, 
	  "visible":false, 
	  "render": function ( datos, tipo, fila, meta ) {
		  var configuracion =meta.settings;
		  return configuracion._iDisplayStart + meta.row + 1;
	  }
  }];
  
  // Atenci�n Ticket 9000002608
  this.detalle_volumen= null;
  this.detalle_compartimento = null;
  this.detalleProgramacionConductorDisable = null;
  this.identificadorFilaProgramacion = null;
  this.duplicidadConductores = false;
  this.duplicidadCisterna = false;
  this.indicesEliminacion = [];
  // Atenci�n Ticket 9000002608
  
  console.log('Iniciando Modulo Programaci�n');
};

moduloProgramacion.prototype.mostrarDepuracion=function(mensaje){
  var referenciaModulo=this;
  if (referenciaModulo.depuracionActivada=true){
    console.log(mensaje);
  }
};

moduloProgramacion.prototype.inicializar=function(){
	this.configurarAjax();
  this.mostrarDepuracion("inicializar");
  this.inicializarControlesGenericos();
  this.inicializarGrilla();
  this.inicializarGrillaDetalleProgramacion();
  
  //Inicio agregado por req 9000002857
  this.inicializarGrillaDetalleAforo();
  //Fin agregado por req 9000002857
  
//  this.inicializarDetalleDiaOperativo();
//  this.inicializarFormularioPrincipal();
//  this.inicializarFormularioEvento();
//  this.inicializarFormularioPesaje();
  this.inicializarCampos();
  
  this.cargarTractoCisterna();
  
  
};

moduloProgramacion.prototype.configurarAjax=function(){
	console.log("configurarAjax");
	var csrfConfiguracion = $("#csrf-token");
	var nombreParametro = csrfConfiguracion.attr("name");
	var valorParametro = csrfConfiguracion.val();
	var parametros = {};
	parametros[nombreParametro]=valorParametro;
	console.log(parametros);
	$.ajaxSetup({
        data: parametros,
        headers : {'X-CSRF-TOKEN' : valorParametro}
    });
};

moduloProgramacion.prototype.resetearFormularioPrincipal= function(){
  var referenciaModulo= this;
  referenciaModulo.obj.frmPrincipal[0].reset();
  jQuery.each( this.obj, function( i, val ) {
    if (typeof referenciaModulo.obj[i].tipoControl != "undefined" ){
      if (referenciaModulo.obj[i].tipoControl =="select2"){
        referenciaModulo.obj[i].select2("val", null);
      }
    }
  });
};

moduloProgramacion.prototype.validaFormularioXSS= function(formulario){
	//$(document).ready(function(){
	var retorno = true;
    $(formulario).find(':input').each(function() {
     var elemento= this;
     if(!utilitario.validaCaracteresFormulario(elemento.value)){
    	 retorno = false;
     }
    });
    return retorno;
  // });
	};

moduloProgramacion.prototype.inicializarControlesGenericos=function(){
  // Inicio Atenci�n Ticket 9000002608
  this.obj.frmAddCisterna=$("#frmAddCisterna");
  // Fin Atenci�n Ticket 9000002608
  this.mostrarDepuracion("inicializarControlesGenericos");
  var referenciaModulo=this;
  this.obj.tituloSeccion=$("#tituloSeccion");
  //valida permisos de botones
  this.descripcionPermiso=$("#descripcionPermiso");
  //Contenedores
  this.obj.cntTabla=$("#cntTabla");             //1
  this.obj.cntDetalleProgramacion=$("#cntDetalleProgramacion"); //2
  this.obj.cntFormulario=$("#cntFormulario");       //3
  this.obj.cntFormularioCompletar=$("#cntFormularioCompletar");     //4
  this.obj.cntVistaRegistro=$("#cntVistaRegistro");//5

  //contenedor de detalle de transporte (sheepit)
  this.obj.contenedorDetalles=$("#contenedorDetalles");
  //formularios
  this.obj.frmPrincipal = $("#frmPrincipal");
  this.obj.frmCompletar = $("#frmCompletar");
  
  //dataTables
  this.obj.tablaPrincipal=$('#tablaPrincipal');
  this.obj.tablaDetalleProgramacion=$('#tablaDetalleProgramacion');
  
  //Inicio Agregado por req 9000002857
  this.obj.tablaDetalleAforo=$('#tablaDetalleAforo');
  //Fin Agregado por req 9000002857
  
  //botones
  this.obj.btnFiltrar=$("#btnFiltrar");
  this.obj.btnDetalle=$("#btnDetalle");
  this.obj.btnAgregarProgramacion=$("#btnAgregarProgramacion");
  this.obj.btnCompletar=$("#btnCompletar");
  this.obj.btnComentar=$("#btnComentar");
  this.obj.btnVer=$("#btnVer");
  this.obj.btnNotificar=$("#btnNotificar");
  this.obj.btnExportarCSV = $("#btnExportarCSV");
  this.obj.btnAgregarCisterna=$("#btnAgregarCisterna");
  

  this.obj.btnCerrarDetalleProgramacion=$("#btnCerrarDetalleProgramacion");
  this.obj.btnGuardar=$("#btnGuardar");
  this.obj.btnConfirmarDucplicidadRegistros = $("#btnConfirmarDucplicidadRegistros");
  this.obj.btnCancelarGuardarFormulario=$("#btnCancelarGuardarFormulario");
  this.obj.btnCerrarVista=$("#btnCerrarVista");
  //botones de formulario completar
  this.obj.btnGuardarCompletar=$("#btnGuardarCompletar");
  this.obj.btnCancelarGuardarCompletar=$("#btnCancelarGuardarCompletar");

  //titulo de las pantallas
  this.obj.cmpTituloFormulario=$("#cmpTituloFormulario"); 
  //Protectores de pantallas
  this.obj.ocultaContenedorTabla=$("#ocultaContenedorTabla");
  this.obj.ocultaContenedorDetalleProgramacion=$("#ocultaContenedorDetalleProgramacion");
  this.obj.ocultaContenedorFormulario=$("#ocultaContenedorFormulario");
  this.obj.ocultaContenedorCompletar=$("#ocultaContenedorCompletar");
  this.obj.ocultaContenedorVista=$("#ocultaContenedorVista");
  //banda para mensajes de error o exito
  this.obj.bandaInformacion=$("#bandaInformacion");
  //Identificadores principales para la recuperacion del registro
  this.obj.idDiaOperativo=$("#idDiaOperativo");
  this.obj.idTransporte=$("#idTransporte");
  

  this.obj.clienteSeleccionado=$("#clienteSeleccionado");
  this.obj.idOperacionSeleccionado =$("#idOperacionSeleccionado");
  this.obj.idProgramacionSeleccionado =$("#idProgramacionSeleccionado");
  this.obj.plantaSeleccionado =$("#plantaSeleccionado");
  this.obj.operacionSeleccionado=$("#operacionSeleccionado");
  
  this.obj.fechaCargaSeleccionado=$("#fechaCargaSeleccionado");  
  this.obj.fechaDescargaSeleccionado=$("#fechaDescargaSeleccionado");
  
  this.obj.cisternaPlanificadoSeleccionado=$("#cisternaPlanificadoSeleccionado");
  
  this.obj.cisternaProgramadoSeleccionado=$("#cisternaProgramadoSeleccionado");
  this.obj.cisternaProgramadoFormSeleccionado=$("#cisternaProgramadoFormSeleccionado");
  this.obj.ordenEntregaSeleccionado=$("#ordenEntregaSeleccionado");
  this.obj.cisternaTractoSeleccionado=$("#cisternaTractoSeleccionado");  
  this.obj.cmpFechaInicial=$("#cmpFechaInicial");
  this.obj.cmpFechaFinal=$("#cmpFechaFinal");
  this.obj.idCliente=$("#idCliente");
  this.obj.idTransportista=$("#idTransportista");
  this.estadoDiaOperativo=$("#estadoDiaOperativo");

//para notificar
  this.obj.btnNotificar=$("#btnNotificar");
  this.obj.btnConfirmarNotificar=$("#btnConfirmarNotificar");
  
  this.obj.btnEnviarCorreo=$("#btnEnviarCorreo");
  this.obj.frmNotificar=$("#frmNotificar");
  this.obj.frmConfirmarNotificar=$("#frmConfirmarNotificar");
  this.obj.frmCorreo=$("#frmCorreo"); 
    
  this.obj.cmpPara=$("#cmpPara");
  this.obj.cmpCC=$("#cmpCC");
  this.obj.cmpAsunto=$("#cmpAsunto");
  
  //para comentar
  
  this.obj.btnComentar=$("#btnComentar");
  this.obj.btnGuardarComentario=$("#btnGuardarComentario");  
  this.obj.frmComentar=$("#frmComentar");
  this.obj.frmComentario=$("#frmComentario");  
  this.obj.cmpComentarComentario=$("#cmpComentarComentario");
  
  //

  this.obj.frmConfirmarModificarEstado=$("#frmConfirmarModificarEstado");
  
//  //Inicializar controles 

//  this.obj.btnListar=$("#btnListar");
//  this.obj.btnAgregar=$("#btnAgregar");
  this.obj.btnModificar=$("#btnModificar");

  
  //eventos click
  this.obj.btnFiltrar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
    referenciaModulo.botonFiltro();
  });

  this.obj.btnDetalle.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'LEER_PROGRAMACION';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.botonDetalle();
  });
  
  this.obj.btnExportarCSV.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){ 
	  referenciaModulo.descripcionPermiso = 'REPORTAR_PROGRAMACION';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.mostrarReporte(constantes.FORMATO_XLS);
  });
  
  this.obj.btnNotificar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'NOTIFICAR_PROGRAMACION';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.vericaNotificacion();
   });
  
  this.obj.btnConfirmarNotificar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.enviarCorreo();
	  //referenciaModulo.crearPorProgramacion();
  });
  
  this.obj.btnEnviarCorreo.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  if (referenciaModulo.obj.frmCorreo.valid()){ //confirmar	
//		  referenciaModulo.obj.frmNotificar.modal("hide");
//		  referenciaModulo.abrirVentanaConfirmacionNotificacion();
//		  referenciaModulo.datosCabecera();//esto para llenar la cabecera
		  referenciaModulo.enviarCorreo();
		  //referenciaModulo.crearPorProgramacion();
	  }
  });
  
  this.obj.btnAgregarProgramacion.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'CREAR_PROGRAMACION';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.botonAgregarProgramacion();
  });
  
  this.obj.btnModificar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'ACTUALIZAR_PROGRAMACION';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.iniciarModificar();
	  referenciaModulo.iniciarModificarListaCisterna();
  });
  
  this.obj.btnCompletar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'COMPLETAR_PROGRAMACION';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.iniciarCompletar();
  });

  this.obj.btnVer.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'RECUPERAR_PROGRAMACION';
	  referenciaModulo.validaPermisos();
	  //referenciaModulo.iniciarVer();
   });
  
  this.obj.btnComentar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.descripcionPermiso = 'COMENTAR_PROGRAMACION';
	  referenciaModulo.validaPermisos();
  }); 
   
  this.obj.btnCerrarDetalleProgramacion.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
    referenciaModulo.botonCerrarDetalleProgramacion();    
  }); 
  
  this.obj.btnGuardar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	
    referenciaModulo.botonGuardar();
  });
  
  // Ticket 9000002608
  this.obj.btnConfirmarDucplicidadRegistros.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.aceptarDuplicidad(); 
  });
  // Ticket 9000002608
  
  this.obj.btnGuardarCompletar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	referenciaModulo.botonGuardarCompletar();
  });
  
  this.obj.btnCancelarGuardarFormulario.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
    referenciaModulo.botonCancelarGuardarFormulario();    
  }); 
  
  this.obj.btnCancelarGuardarCompletar.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	referenciaModulo.botonCancelarGuardarCompletar();    
   });
  this.obj.btnCerrarVista.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  referenciaModulo.iniciarCerrarVista();
   });
  
  this.obj.btnAgregarCisterna.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
	  //$('#cmbCisterna').val('').trigger("change");
	  console.log('select2-results clean');
	 var trasnportistaSeleccionado = referenciaModulo.obj.cmpTransportista.val();
	 console.log('Seleccion: ' + trasnportistaSeleccionado);
	if(trasnportistaSeleccionado > 0){
		// Inicio Atencion Ticket 9000002608
		referenciaModulo.abrirVentanaAddCisterna();
		console.log('abrir Ventana de Cisterna');
		// Fin Atencion Ticket 9000002608 
	}else{
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, "Seleccione el Transportista primero");
	}
  });
  
  this.obj.btnGuardarComentario.on(referenciaModulo.NOMBRE_EVENTO_CLICK,function(){
		referenciaModulo.guardarComentario();     
  });
};

moduloProgramacion.prototype.mostrarReporte= function(formato){
	var ref = this;
	window.open("./programacion/reporte?idDiaOperativo="+ref.idDiaOperativo+"&formato="+formato);
};

moduloProgramacion.prototype.vericaNotificacion= function(){
	  var eRegistro = {};
	  var ref=this;	  
	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);
	  ref.obj.ocultaContenedorTabla.show();
      eRegistro.id = parseInt(ref.idDiaOperativo);
    try{
	  $.ajax({
	    type: constantes.PETICION_TIPO_GET,
	    url: './programacion/verifica-notificacion', 
	    contentType: ref.TIPO_CONTENIDO, 
	    data: {
	    	ID : eRegistro.id
	    	},
	    success: function(respuesta) {
	      if (!respuesta.estado) {
	    	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
	      } else {		    				
	    	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);	  
	    	  ref.abrirVentanaCorreo(respuesta.contenido.carga);	    	  
	      }	      
	    },			    		    
	    error: function() {
	    	ref.mostrarErrorServidor(xhr,estado,error); 
	    }
	    });
    } catch(error){
  	  ref.mostrarDepuracion(error.message);
  	  ref.obj.ocultaContenedorTabla.hide();
	  }  
};


moduloProgramacion.prototype.crearPorProgramacion= function(){
	  var ref=this;	  
	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);
	  ref.obj.ocultaContenedorTabla.show();
	  try{
		  $.ajax({
		    type: constantes.PETICION_TIPO_GET,
		    url: './transporte/crearPorProgramacion', 
		    contentType: ref.TIPO_CONTENIDO, 
		    data: { ID : parseInt(ref.idDiaOperativo) },
		    success: function(respuesta) {
		      if (!respuesta.estado) {
		    	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
		      } else {		    				
		    	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
		    	  //ref.iniciarListado();
		    	  ref.listarRegistros();
		    	  //ref.obj.datClienteApi.ajax.reload(referenciaModulo.despuesListarRegistros,true);  
		      }
		      ref.obj.ocultaContenedorTabla.hide();
		    },			    		    
		    error: function() {
		    	ref.mostrarErrorServidor(xhr,estado,error); 
		    }
		    });
	  } catch(error){
		  ref.mostrarDepuracion(error.message);
		  ref.obj.ocultaContenedorTabla.hide();
	  }  
};

moduloProgramacion.prototype.enviarCorreo= function(){
	  var eRegistro = {};
	  var ref=this;
	  ref.obj.frmNotificar.modal("hide");
//	  ref.obj.frmConfirmarNotificar.modal("hide");
	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);
	  ref.obj.ocultaContenedorTabla.show();
      eRegistro.id = parseInt(ref.idDiaOperativo);
      try{
	  $.ajax({
	    type: constantes.PETICION_TIPO_GET,
	    url: './programacion/notificar', 
	    contentType: ref.TIPO_CONTENIDO, 
	    data: {filtroMailPara : ref.obj.cmpPara.val(), 
	    	   filtroMailCC : ref.obj.cmpCC.val(),
	    	   filtroMailComentario : ref.obj.cmpComentarComentario.val(),
	    	   //filtroFechaDiaOperativo : utilitario.formatearFecha(ref.obj.fechaCargaSeleccionado),
	    	   //filtroFechaCarga : utilitario.formatearFecha(ref.obj.fechaDescargaSeleccionado),
	    	   filtroFechaDiaOperativo : utilitario.formatearFecha(ref.obj.fechaDescargaSeleccionado),
	    	   filtroFechaCarga : utilitario.formatearFecha(ref.obj.fechaCargaSeleccionado),
	    	   filtroNombreCliente : ref.obj.clienteSeleccionado,
	    	   filtroDiaOperativo : ref.idDiaOperativo,
	    	   filtroNombreOperacion : ref.obj.operacionSeleccionado,
	    	   //filtroCisterna : ref.obj.cantidadCisternasSolicitadas,
	    	   //filtroOperacion : ref.obj.filtroOperacion.val()
	    	},	
	    success: function(respuesta) {
	      if (!respuesta.estado) {
	    	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
	      } else {		    				
	    	  console.log("mensaje " +respuesta.mensaje);
	    	  //var mensaje=respuesta.mensaje;
	    	  //ref.listarRegistros();
	    	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);  
	    	  //se tiene que programar s�lo cuando la notificaci�n es correcta
	    	  ref.crearPorProgramacion();
	    	  
	      }
	      ref.obj.ocultaContenedorTabla.hide();
	    },			    		    
	    error: function() {
	    	ref.mostrarErrorServidor(xhr,estado,error); 
	    	ref.obj.ocultaContenedorTabla.hide();
	    }
	    });
      } catch(error){
    	  ref.mostrarDepuracion(error.message);
    	  ref.obj.ocultaContenedorTabla.hide();
	  }  
};

moduloProgramacion.prototype.guardarComentario= function(){
	  var eRegistro = {};
	  var ref=this;
	  ref.obj.frmComentar.modal("hide");
//	  ref.obj.frmConfirmarNotificar.modal("hide");
	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);
	  ref.obj.ocultaContenedorTabla.show();
 
    try{    	
    	eRegistro.id = parseInt(ref.idProgramacion); 
    	eRegistro.comentario  = ref.obj.cmpComentarComentario.val().toUpperCase();
    	eRegistro.idDiaOperativo  = ref.idDiaOperativo;
	    $.ajax({
	        type: constantes.PETICION_TIPO_POST,
	        url: ref.URL_COMENTAR, 
	        contentType: ref.TIPO_CONTENIDO, 
		    data: JSON.stringify(eRegistro),  
		    success: function(respuesta) {
		      if (!respuesta.estado) {
		    	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
		      } else {		    				
		    	  console.log("mensaje " +respuesta.mensaje);
		    	  //var mensaje=respuesta.mensaje;
		    	  //ref.listarRegistros();
		    	  ref.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
		      }
		      ref.obj.ocultaContenedorTabla.hide();
		    },			    		    
		    error: function() {
		    	ref.mostrarErrorServidor(xhr,estado,error); 
		    	ref.obj.ocultaContenedorTabla.hide();
		    }
		    });
    } catch(error){
  	  ref.mostrarDepuracion(error.message);
  	  ref.obj.ocultaContenedorTabla.hide();
	}  
};

moduloProgramacion.prototype.abrirVentanaCorreo= function(registro){
	var referenciaModulo=this;
	
	try {
		//this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);		
		referenciaModulo.obj.cmpComentarComentario.val(registro[0].programacion.comentario);
		var para = "";
		var cc = "";		
		referenciaModulo.obj.cmpPara.val("");
		referenciaModulo.obj.cmpCC.val("");
		
		if(registro.length>0){				
			for (var i = 0; i < registro.length; i++) {	
				var correo = registro[i].planta.correoPara.trim(); 
				if(correo==null || correo.trim().length==0){
					break;
				}else{	
					if(para.length==0){
						para = correo;
					}else{					
						if(correo.indexOf(";")){
							var tempCorreo = correo.split(';');
							for (var j = 0; j < tempCorreo.length; j++) {	
								if(!para.includes(tempCorreo[j].trim())){ 
									para = para+ "; " + tempCorreo[j].trim();     
								}
							}					
						}else{    
							if(!para.includes(correo.trim())){
								para = para+ "; " + correo.trim();  
							}  
						}
					}
					
				}	
				
				var correoCC = registro[i].planta.correoCC.trim(); 
				if(correoCC==null || correo.trim().length==0){
					break;
				}else{	
					if(cc.length==0){
						cc = correoCC;
					}else{					
						if(correoCC.indexOf(";")){
							var tempCorreoCC = correoCC.split(';');
							for (var j = 0; j < tempCorreoCC.length; j++) {	
								if(!cc.includes(tempCorreoCC[j].trim())){ 
									cc = cc+ "; " + tempCorreoCC[j].trim();     
								}
							}						
						}else{
							if(!cc.includes(correoCC.trim())){
								cc = cc+ "; " + correoCC.trim();  
							}  
						}
					}
					
				}	
				
			}// fin for
		}else{
			return;
		}
		
		referenciaModulo.obj.cmpPara.val(para);
		referenciaModulo.obj.cmpCC.val(cc);		
		referenciaModulo.obj.cmpAsunto.val(referenciaModulo.obj.operacionSeleccionado);
		referenciaModulo.obj.frmNotificar.modal("show");
	} catch(error){
		referenciaModulo.mostrarDepuracion(error.message);
	}
};

moduloProgramacion.prototype.abrirVentanaConfirmacionNotificacion= function(){
	try {
		//this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);			
		this.obj.frmConfirmarNotificar.modal("show");
	} catch(error){
		referenciaModulo.mostrarDepuracion(error.message);
	}
};

moduloProgramacion.prototype.botonFiltro = function(){
  var referenciaModulo = this;
  try {                 
  referenciaModulo.listarRegistros();
  } catch(error){
    console.log(error.message);
  }
};

moduloProgramacion.prototype.botonDetalle = function(){
  var referenciaModulo = this;
  try {
    referenciaModulo.modoEdicion = constantes.MODO_DETALLE_PROGRAMACION;
    referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_VER_DETALLE_PROGRAMACION);
    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,cadenas.INICIAR_DETALLE_PROGRAMACION);
    referenciaModulo.obj.cntTabla.hide();
    referenciaModulo.obj.cntFormulario.hide();
    referenciaModulo.obj.ocultaContenedorDetalleProgramacion.show();
    referenciaModulo.obj.cntDetalleProgramacion.show();
    referenciaModulo.obj.datDetalleProgramacionApi.ajax.reload(referenciaModulo.despuesListarRegistros,true); 
    referenciaModulo.desactivarBotones();
    referenciaModulo.datosCabecera();//esto para llenar la cabecera
    //referenciaModulo.recuperarPlanificacionProduct();//llena el datasource combo producto
    
    //referenciaModulo.obj.ocultaContenedorDetalleProgramacion.hide();
  } catch(error){
    console.log(error.message);
  }
};

moduloProgramacion.prototype.iniciarModificarListaCisterna= function(){
	  var referenciaModulo=this;  
	  console.log('lista temporal');
	  
	  
};

moduloProgramacion.prototype.iniciarModificar= function(){
	  var referenciaModulo=this;  
	  referenciaModulo.modoEdicion=constantes.MODO_FORMULARIO_PROGRAMACION_MODIFICAR;
	  referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_MODIFICA_REGISTRO);
	  referenciaModulo.obj.cntTabla.hide();
	  //referenciaModulo.obj.cntFormularioCompletar.hide();
	  referenciaModulo.obj.cntDetalleProgramacion.hide();
	  referenciaModulo.obj.ocultaContenedorFormulario.hide();
	  referenciaModulo.obj.cntFormulario.show();  
	  referenciaModulo.recuperarRegistro();
};

moduloProgramacion.prototype.iniciarCompletar= function(){
	  var referenciaModulo=this;  
	  referenciaModulo.modoEdicion=constantes.MODO_FORMULARIO_PROGRAMACION_COMPLETAR;
	  referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_COMPLETA_REGISTRO);
	  referenciaModulo.obj.cntTabla.hide();
	  //referenciaModulo.obj.cntFormularioCompletar.hide();
	  referenciaModulo.obj.cntDetalleProgramacion.hide();
	  referenciaModulo.obj.ocultaContenedorFormulario.hide();
	  referenciaModulo.obj.cntFormulario.hide();
	  referenciaModulo.obj.cntFormularioCompletar.show();
	  referenciaModulo.recuperarRegistro();
};

moduloProgramacion.prototype.iniciarVer = function(){
	  var referenciaModulo=this;
	  referenciaModulo.mostrarDepuracion("iniciarVer");
	    try {
	      referenciaModulo.modoEdicion=constantes.MODO_FORMULARIO_PROGRAMACION_VER;
	      referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_VER_PROGRAMACION);
	      referenciaModulo.obj.cntTabla.hide();
	      referenciaModulo.obj.cntDetalleProgramacion.hide();
	      referenciaModulo.obj.cntFormulario.hide();
	      referenciaModulo.obj.cntFormularioCompletar.hide();
	      referenciaModulo.obj.ocultaContenedorVista.show();      
	      referenciaModulo.obj.cntVistaRegistro.show();
	      referenciaModulo.recuperarRegistro();
	    } catch(error){
	      console.log(error.message);
	    } 
	};


	moduloProgramacion.prototype.iniciarCerrarVista=function(){
		  var referenciaModulo=this;
		  referenciaModulo.mostrarDepuracion("iniciarCerrarVista");
		  referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_DETALLE_PROGRAMACION);
		  referenciaModulo.obj.cntFormulario.hide();
		  referenciaModulo.obj.cntVistaRegistro.hide();
		  referenciaModulo.obj.cntDetalleProgramacion.show();
		  referenciaModulo.obj.cntTabla.hide();
		  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.CERRAR_VISTA);
		  referenciaModulo.obj.ocultaContenedorDetalleProgramacion.hide();
		  referenciaModulo.obj.ocultaContenedorVista.hide();
	};
	
	
	
moduloProgramacion.prototype.botonAgregarProgramacion = function(){
	
   console.log('JESUS MATOS');
	
	
  var referenciaModulo=this;
  referenciaModulo.inicializarFormularioPrincipal();
    try {
      referenciaModulo.modoEdicion = constantes.MODO_FORMULARIO_PROGRAMACION_NUEVO;
      referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_AGREGAR_PROGRAMACION);
      referenciaModulo.obj.cmpTransportista.attr('disabled',false);
      referenciaModulo.obj.cntTabla.hide();
      referenciaModulo.obj.cntDetalleProgramacion.hide();
      referenciaModulo.obj.cntFormulario.show();     
      this.limpiarFormularioPrincipal();
      referenciaModulo.datosCabecera();
      referenciaModulo.recuperarPlanificacion();     
      
      referenciaModulo.obj.ocultaContenedorFormulario.hide();
      referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.INICIAR_OPERACION);
  } catch(error) {
    console.log(error.message);
  }
};




moduloProgramacion.prototype.botonCerrarDetalleProgramacion = function(){
  var referenciaModulo=this;
  try {
    referenciaModulo.modoEdicion = constantes.MODO_DETALLE_PROGRAMACION;
    referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_LISTADO_DIA_PLANIFICADO);
    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.CERRAR_DETALLE_PROGRAMACION);
    referenciaModulo.obj.cntTabla.show();
    referenciaModulo.obj.cntFormularioCompletar.hide();
    referenciaModulo.obj.cntDetalleProgramacion.hide();
    referenciaModulo.obj.cntFormulario.hide();
    referenciaModulo.obj.cntFormularioCompletar.hide();
    referenciaModulo.obj.btnDetalle.removeClass(constantes.CSS_CLASE_DESHABILITADA);
    this.listarRegistros();
    } catch(error){
      console.log(error.message);
    }
};

moduloProgramacion.prototype.botonGuardar = function(){
  var referenciaModulo=this;
  if (referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_NUEVO){
    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Detalle de Programacion validado.");
    referenciaModulo.guardarRegistro();
  } else if  (referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_MODIFICAR){
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Detalle de Programacion validado.");
      referenciaModulo.actualizarRegistro();
  }
};
moduloProgramacion.prototype.botonGuardarCompletar = function(){
	var referenciaModulo=this;	 
    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Completar Programacion.");
    referenciaModulo.actualizarRegistroCompletar();	  
};


moduloProgramacion.prototype.botonCancelarGuardarFormulario = function(){
  var referenciaModulo=this;
  try {
	  	referenciaModulo.modoEdicion = constantes.MODO_DETALLE_PROGRAMACION;
      	referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_DETALLE_PROGRAMACION);
     	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.CANCELAR_OPERACION);
	    referenciaModulo.obj.cntTabla.hide();
	    referenciaModulo.obj.cntDetalleProgramacion.show();
	    referenciaModulo.obj.cntFormulario.hide();
	    referenciaModulo.obj.cntFormularioCompletar.hide();
	    // Inicio Ticket 9000002608
	    // jmatos rev002
		referenciaModulo.detalleProgramacionConductorDisable = false;
	    referenciaModulo.obj.cisterna.listado = [];
	    // Fin Ticket 9000002608
	  } catch (error) {
	    console.log(error.message);
	  }
};

moduloProgramacion.prototype.botonCancelarGuardarCompletar = function(){
	  var referenciaModulo=this;
	  try {
	        referenciaModulo.modoEdicion = constantes.MODO_DETALLE_PROGRAMACION;
	        referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_VER_DETALLE_PROGRAMACION);
	        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,cadenas.CANCELAR_OPERACION);	 
		    referenciaModulo.obj.cntTabla.hide();
		    referenciaModulo.obj.cntDetalleProgramacion.show();
		    referenciaModulo.obj.cntFormulario.hide();
		    referenciaModulo.obj.cntFormularioCompletar.hide();

		  } catch (error) {
		    console.log(error.message);
		  }
	};




moduloProgramacion.prototype.botonCerrarVista= function(){  
  var referenciaModulo = this;
  try {
    referenciaModulo.modoEdicion = constantes.MODO_DETALLE_PROGRAMACION;
      referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_DETALLE_PROGRAMACION);
      referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.CERRAR_VISTA);
    referenciaModulo.obj.cntTabla.hide();
    referenciaModulo.obj.cntFormularioCompletar.hide();
    referenciaModulo.obj.cntDetalleProgramacion.show();
    referenciaModulo.obj.cntFormulario.hide();
    referenciaModulo.obj.cntFormularioCompletar.hide();
  } catch(error){
    console.log(error.message);
  };
};

//Inicio agregado por req 9000002857
moduloProgramacion.prototype.inicializarGrillaDetalleAforo = function(){
	var referenciaModulo=this;
	
  this.obj.tablaDetalleAforo.on(constantes.DT_EVENTO_AJAX, function (e,configuracion,json) {
	  referenciaModulo.llamadaAjaxGrillaDetalleAforo(e,configuracion,json);
 });

	this.obj.datDetalleAforoApi= this.obj.tablaDetalleAforo.DataTable({
		retrieve: true,	    
		processing: true,
        deferLoading: 0,
        responsive: true,
        dom: constantes.DT_ESTRUCTURA,
        iDisplayLength: referenciaModulo.NUMERO_REGISTROS_PAGINA,
        lengthMenu: referenciaModulo.TOPES_PAGINACION,
        language: { "url": referenciaModulo.URL_LENGUAJE_GRILLA },
        serverSide: true,
        ajax: {
          url: './aforo-cisterna/listar',
          type:constantes.PETICION_TIPO_GET,
          data: function (d) {
          		console.dir(d);
        	  	   var indiceOrdenamiento = d.order[0].column;
    	           d.registrosxPagina =  d.length; 
    	           d.inicioPagina = d.start; 
    	           d.campoOrdenamiento= d.columns[indiceOrdenamiento].data;
    	           d.sentidoOrdenamiento=d.order[0].dir;
    	           d.filtroTracto = referenciaModulo.idTracto;
    			   d.filtroCisterna = referenciaModulo.idCisterna;
    			   d.filtroCompartimento = referenciaModulo.idCompartimento;
          }
        },
        columns: referenciaModulo.columnasGrillaAforo,
        columnDefs: referenciaModulo.definicionColumnasAforo
    });	
	
};

moduloProgramacion.prototype.llamadaAjaxGrillaDetalleAforo=function(e,configuracion,json){
	    var referenciaModulo=this;
	    
	    if (json.estado==true){
	      json.recordsTotal=json.contenido.totalRegistros;
	      json.recordsFiltered=json.contenido.totalEncontrados;
	      json.data= json.contenido.carga;
	      
	    } else {
	      json.recordsTotal=0;
	      json.recordsFiltered=0;
	      json.data= {};
	    }
	   
	  };
//Fin agregado por req 9000002857



moduloProgramacion.prototype.inicializarGrilla=function(){
  //Nota no retornar el objeto solo manipular directamente
  //Establecer grilla y su configuracion
  var referenciaModulo=this;
  this.obj.tablaPrincipal.on('xhr.dt', function (e,settings,json) {
    referenciaModulo.mostrarDepuracion("xhr.dt");
    referenciaModulo.desactivarBotones();
    if (json.estado==true){
      json.recordsTotal=json.contenido.totalRegistros;
      json.recordsFiltered=json.contenido.totalEncontrados;
      json.data= json.contenido.carga;
      if (referenciaModulo.modoEdicion==constantes.MODO_LISTAR){
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
      }
      //
    } else {
      json.recordsTotal=0;
      json.recordsFiltered=0;
      json.data= {};
      if (referenciaModulo.modoEdicion==constantes.MODO_LISTAR){
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
      } else {
        
      }
    }
    if (referenciaModulo.estaCargadaInterface==false){        
        referenciaModulo.estaCargadaInterface=true;
    }
    referenciaModulo.obj.ocultaContenedorTabla.hide();     
  });
  
  this.obj.tablaPrincipal.on('preXhr.dt', function ( e, settings, data ) {
    //Se ejecuta antes de cualquier llamada ajax
    referenciaModulo.mostrarDepuracion("preXhr");
    if (referenciaModulo.estaCargadaInterface==true){
      referenciaModulo.obj.ocultaContenedorTabla.show();
    }
  });
  
  this.obj.tablaPrincipal.on('page.dt', function () {
    //Se ejecuta cuando se hace clic en boton de paginacion
    referenciaModulo.mostrarDepuracion("page.dt");
  });
  
  this.obj.tablaPrincipal.on('order.dt', function () {
    //Se ejecuta cuando se hace clic en alguna cabecera de columna para ordenarla
    referenciaModulo.mostrarDepuracion("order.dt");
  });

  this.obj.datClienteApi= this.obj.tablaPrincipal.DataTable({
    "processing": true,
    "responsive": true,
    "dom": '<"row" <"col-sm-12" t> ><"row" <"col-sm-3"l> <"col-sm-4"i> <"col-sm-5"p>>',
    "iDisplayLength": referenciaModulo.NUMERO_REGISTROS_PAGINA,
    "lengthMenu": referenciaModulo.TOPES_PAGINACION,
    "language": {
      "url": referenciaModulo.URL_LENGUAJE_GRILLA
    },
    "serverSide": true,
    "ajax": {
          "url": referenciaModulo.URL_LISTAR,
          "type":constantes.PETICION_TIPO_GET,
          "data": function (d) {
        	  console.dir(d);
            var indiceOrdenamiento = d.order[0].column;
            d.registrosxPagina =  d.length; 
            d.inicioPagina = d.start; 
            d.campoOrdenamiento= d.columns[indiceOrdenamiento].data;
            d.sentidoOrdenamiento=d.order[0].dir;
            d.filtroOperacion= referenciaModulo.obj.filtroOperacion.val();
            d.filtroFechaPlanificada= referenciaModulo.obj.filtroFechaPlanificada.val();
            var rangoFecha = referenciaModulo.obj.filtroFechaPlanificada.val().split("-");
            var fechaInicio = utilitario.formatearFecha2Iso(rangoFecha[0]) ;
            var fechaFinal = utilitario.formatearFecha2Iso(rangoFecha[1]);
            d.filtroFechaInicio= fechaInicio; 
            d.filtroFechaFinal = fechaFinal;  
          }
    },
    "columns": referenciaModulo.columnasGrilla,
    "columnDefs": referenciaModulo.definicionColumnas
    //"order": referenciaModulo.ordenGrilla
  }); 
  
  $('#tablaPrincipal tbody').on( 'click', 'tr', function () {
	if (referenciaModulo.obj.datClienteApi.data().length>0){
	    if ( $(this).hasClass('selected') ) {
	        $(this).removeClass('selected');
	      } else {
	        referenciaModulo.obj.datClienteApi.$('tr.selected').removeClass('selected');
	        $(this).addClass('selected');
	      }
	      var indiceFila = referenciaModulo.obj.datClienteApi.row( this ).index();
	      var idRegistro = referenciaModulo.obj.datClienteApi.cell(indiceFila,1).data();
	      referenciaModulo.idRegistro = idRegistro;   

	      referenciaModulo.idDiaOperativo = referenciaModulo.obj.datClienteApi.cell(indiceFila,1).data();
	    //  referenciaModulo.idTransporte = -1;

	  	referenciaModulo.idCliente = referenciaModulo.obj.datClienteApi.cell(indiceFila,11).data();
	  	referenciaModulo.obj.clienteSeleccionado = referenciaModulo.obj.datClienteApi.cell(indiceFila,10).data();
	  	referenciaModulo.obj.idOperacionSeleccionado = referenciaModulo.obj.datClienteApi.cell(indiceFila,12).data();
	  	referenciaModulo.obj.operacionSeleccionado = referenciaModulo.obj.datClienteApi.cell(indiceFila,9).data();
	  	referenciaModulo.obj.plantaSeleccionado = referenciaModulo.obj.datClienteApi.cell(indiceFila,13).data();
	  	
	      referenciaModulo.obj.fechaCargaSeleccionado = referenciaModulo.obj.datClienteApi.cell(indiceFila,3).data();
	      referenciaModulo.obj.fechaDescargaSeleccionado = referenciaModulo.obj.datClienteApi.cell(indiceFila,2).data();
	      referenciaModulo.obj.cisternaPlanificadoSeleccionado = referenciaModulo.obj.datClienteApi.cell(indiceFila,4).data();
	      referenciaModulo.obj.cisternaProgramadoSeleccionado = referenciaModulo.obj.datClienteApi.cell(indiceFila,5).data();
	      
	      var estado = referenciaModulo.obj.datClienteApi.cell(indiceFila, 8).data();
	      
	      referenciaModulo.obj.btnDetalle.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	      referenciaModulo.obj.btnExportarCSV.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	      
	      if(estado == constantes.ESTADO_PLANIFICADO && referenciaModulo.obj.cisternaProgramadoSeleccionado > 0){
	      	referenciaModulo.obj.btnNotificar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	      } else {
	      	referenciaModulo.obj.btnNotificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
	      }

	      if(estado == constantes.ESTADO_PLANIFICADO){
	      	referenciaModulo.obj.btnAgregarProgramacion.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	      	referenciaModulo.obj.btnModificar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	      	referenciaModulo.obj.btnCompletar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	      	referenciaModulo.obj.btnComentar.removeClass(constantes.CSS_CLASE_DESHABILITADA);	      	
	      } else {
	      	referenciaModulo.obj.btnAgregarProgramacion.addClass(constantes.CSS_CLASE_DESHABILITADA);
	      	referenciaModulo.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
	      	referenciaModulo.obj.btnCompletar.addClass(constantes.CSS_CLASE_DESHABILITADA);
	      	referenciaModulo.obj.btnComentar.addClass(constantes.CSS_CLASE_DESHABILITADA);
	      }
	      
	      if(referenciaModulo.obj.cisternaProgramadoSeleccionado > 0){
	      	referenciaModulo.obj.btnExportarCSV.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	      } else {
	      	referenciaModulo.obj.btnExportarCSV.addClass(constantes.CSS_CLASE_DESHABILITADA);
	      }
	      
	      referenciaModulo.estadoDiaOperativo = referenciaModulo.obj.datClienteApi.cell(indiceFila,8).data();
	      referenciaModulo.estadoTransporte = 2;
	}

  });
};

//ESTO PARA LA GRILLA DE ASIGNACION DE TRANSPORTE
moduloProgramacion.prototype.llamadaAjaxGrillaDetalleProgramacion=function(e,configuracion,json){
    var referenciaModulo=this;
    referenciaModulo.obj.ocultaContenedorDetalleProgramacion.show();
    referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_AJAX);
    referenciaModulo.desactivarBotones();
    if (json.estado==true){
      json.recordsTotal=json.contenido.totalRegistros;
      json.recordsFiltered=json.contenido.totalEncontrados;
      json.data= json.contenido.carga;
      if (referenciaModulo.modoEdicion==constantes.MODO_AUTORIZAR){
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
      }
    } else {
      json.recordsTotal=0;
      json.recordsFiltered=0;
      json.data= {};
      if (referenciaModulo.modoEdicion==constantes.MODO_AUTORIZAR){
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,json.mensaje);
      } else {

      }
    }
    if (referenciaModulo.estaCargadaInterface==false){        
      referenciaModulo.estaCargadaInterface=true;
    }
    referenciaModulo.obj.ocultaContenedorDetalleProgramacion.hide();  
  };

moduloProgramacion.prototype.inicializarGrillaDetalleProgramacion=function(){
//Nota no retornar el objeto solo manipular directamente
  //Establecer grilla y su configuracion
var referenciaModulo=this;
this.obj.tablaDetalleProgramacion.on(constantes.DT_EVENTO_AJAX, function (e,configuracion,json) {
     referenciaModulo.llamadaAjaxGrillaDetalleProgramacion(e,configuracion,json);
});
};

moduloProgramacion.prototype.inicializarGrillaDetalleProgramacion = function(){
    //Nota no retornar el objeto solo manipular directamente
    //Establecer grilla y su configuracion
    var referenciaModulo=this;
    //referenciaModulo.obj.ocultaContenedorAutorizacion.show();
    
    this.obj.tablaDetalleProgramacion.on(constantes.DT_EVENTO_AJAX, function (e,configuracion,json) {
       referenciaModulo.llamadaAjaxGrillaDetalleProgramacion(e,configuracion,json);
    });
    
    this.obj.tablaDetalleProgramacion.on(constantes.DT_EVENTO_PREAJAX, function (e,configuracion,datos) {
      //Se ejecuta antes de cualquier llamada ajax
      referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_PREAJAX);
      referenciaModulo.obj.ocultaContenedorDetalleProgramacion.show();
      if (referenciaModulo.estaCargadaInterface==true){
    	  referenciaModulo.obj.ocultaContenedorDetalleProgramacion.hide();
      }
    });

    this.obj.tablaDetalleProgramacion.on(constantes.DT_EVENTO_PAGINACION, function () {
    //Se ejecuta cuando se hace clic en boton de paginacion
      referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_PAGINACION);
    });

    this.obj.tablaDetalleProgramacion.on(constantes.DT_EVENTO_ORDENACION, function () {
    //Se ejecuta cuando se hace clic en alguna cabecera de columna para ordenarla
      referenciaModulo.mostrarDepuracion(constantes.DT_EVENTO_ORDENACION);
    });
    try{
	      this.obj.datDetalleProgramacionApi = this.obj.tablaDetalleProgramacion.DataTable({
	        "processing": true,
	        "responsive": true,
	        "dom": constantes.DT_ESTRUCTURA,
	      "iDisplayLength": referenciaModulo.NUMERO_REGISTROS_PAGINA,
	        "lengthMenu": referenciaModulo.TOPES_PAGINACION_TRANSPORTE,
	        "language": { "url": referenciaModulo.URL_LENGUAJE_GRILLA},
	        "serverSide": true,
	        "ajax": {
	          "url": "./programacion/listardet",
	          "type":constantes.PETICION_TIPO_GET,
	          "data": function (d) {
	           var indiceOrdenamiento = d.order[0].column;
	           d.registrosxPagina =  d.length; 
	           d.inicioPagina = d.start; 
	           d.campoOrdenamiento= d.columns[indiceOrdenamiento].data;
	           d.sentidoOrdenamiento=d.order[0].dir;
	           d.idDiaOperativo= referenciaModulo.idDiaOperativo;
	         }
	       },
	        "columns": referenciaModulo.columnasGrillaDetalleProgramacion,
	        "columnDefs": referenciaModulo.definicionColumnasDetalleProgramacion,
	    }); 

      $('#tablaDetalleProgramacion tbody').on( 'click', 'tr', function () {
    	  if (referenciaModulo.obj.datDetalleProgramacionApi.data().length > 0){
    	         if ( $(this).hasClass('selected') ) {
    	                $(this).removeClass('selected');
    	         } else {
    	           referenciaModulo.obj.datDetalleProgramacionApi.$('tr.selected').removeClass('selected');
    	          $(this).addClass('selected');
    	         }
    	         var indiceFilaProgramacion = referenciaModulo.obj.datDetalleProgramacionApi.row( this ).index();
    	         referenciaModulo.idProgramacion = referenciaModulo.obj.datDetalleProgramacionApi.cell(indiceFilaProgramacion,1).data();//abarrios         
    	         referenciaModulo.obj.cmpComentarComentario.val(referenciaModulo.obj.datDetalleProgramacionApi.cell(indiceFilaProgramacion,7).data());
    	         referenciaModulo.obj.cisternaProgramadoFormSeleccionado = referenciaModulo.obj.datDetalleProgramacionApi.cell(indiceFilaProgramacion,3).data();
    	         
    	         
    	         referenciaModulo.activarBotones();
    	         /*referenciaModulo.obj.btnModificar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
    	         referenciaModulo.obj.btnCompletar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
    	         referenciaModulo.obj.btnVer.removeClass(constantes.CSS_CLASE_DESHABILITADA);*/
    	  }

      });
 } catch(error){
      console.log(error.message);
  }
};

moduloProgramacion.prototype.inicializarFormularioPrincipal= function(){  
  //Establecer validaciones del formulario
  var referenciaModulo=this;
  this.obj.frmPrincipal.validate({
    rules: referenciaModulo.reglasValidacionFormulario,
    messages: referenciaModulo.mensajesValidacionFormulario,
    submitHandler: function(form) {
    // form.submit();
    }
  });
};

moduloProgramacion.prototype.inicializarFormularioEvento= function(){  
  //Establecer validaciones del formulario
  var referenciaModulo=this;
  this.obj.frmEvento.validate({
    rules: referenciaModulo.reglasValidacionFormularioEvento,
    messages: referenciaModulo.mensajesValidacionFormularioEvento,
    submitHandler: function(form) {
    // form.submit();
    }
  });
};

moduloProgramacion.prototype.inicializarFormularioCompletar= function(){  
  //Establecer validaciones del formulario
  var referenciaModulo=this;
  this.obj.frmCompletar.validate({
    rules: referenciaModulo.reglasValidacionFormularioPesaje,
    messages: referenciaModulo.mensajesValidacionFormularioPesaje,
    submitHandler: function(form) {
    // form.submit();
    }
  });
};

moduloProgramacion.prototype.activarBotones=function(){
  var ref=this;
  this.obj.btnDetalle.addClass(constantes.CSS_CLASE_DESHABILITADA);
  this.obj.btnExportarCSV.addClass(constantes.CSS_CLASE_DESHABILITADA);;
  //this.obj.btnAgregarCisterna.addClass(constantes.CSS_CLASE_DESHABILITADA);;
  
  this.obj.btnNotificar.addClass(constantes.CSS_CLASE_DESHABILITADA);; 
  //this.obj.btnAgregarProgramacion.removeClass(constantes.CSS_CLASE_DESHABILITADA);
  //this.obj.btnCompletar.addClass(constantes.CSS_CLASE_DESHABILITADA);;
  this.obj.btnVer.removeClass(constantes.CSS_CLASE_DESHABILITADA);;

//s�lo cuando el d�a operativo se encuentre en estqado planificado habilitamos los botones  
  if(ref.estadoDiaOperativo == constantes.ESTADO_PLANIFICADO){
	  this.obj.btnAgregarProgramacion.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	  this.obj.btnModificar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	  this.obj.btnCompletar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
	  this.obj.btnComentar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
  } else {
	  this.obj.btnAgregarProgramacion.addClass(constantes.CSS_CLASE_DESHABILITADA);
	  this.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
	  this.obj.btnCompletar.addClass(constantes.CSS_CLASE_DESHABILITADA);
	  this.obj.btnComentar.addClass(constantes.CSS_CLASE_DESHABILITADA);
  }
  
   /* if(referenciaModulo.estadoDiaOperativo == 3 || referenciaModulo.estadoDiaOperativo == 4 || referenciaModulo.estadoDiaOperativo == 5){
      //this.obj.btnAgregarProgramacion.addClass(constantes.CSS_CLASE_DESHABILITADA);
      this.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
    }
    else{
      
      //this.obj.btnAgregarProgramacion.removeClass(constantes.CSS_CLASE_DESHABILITADA);
      this.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
    }*/
    /*//Desabilitadmos el bot�n modificar cuando el estado del transporte sea inactivo, descargado o anulado
    if(referenciaModulo.estadoTransporte== 2 || referenciaModulo.estadoTransporte == 4 || referenciaModulo.estadoTransporte == 5){
      this.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
    }
    else{
      this.obj.btnModificar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
    }*/
};

moduloProgramacion.prototype.desactivarBotones=function(){
  //var referenciaModulo=this;
  //estos botones deshabilitados
  this.obj.btnDetalle.addClass(constantes.CSS_CLASE_DESHABILITADA);
  this.obj.btnExportarCSV.addClass(constantes.CSS_CLASE_DESHABILITADA);
  //this.obj.btnAgregarCisterna.addClass(constantes.CSS_CLASE_DESHABILITADA);
  this.obj.btnNotificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
  this.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
  this.obj.btnCompletar.addClass(constantes.CSS_CLASE_DESHABILITADA);
  this.obj.btnComentar.addClass(constantes.CSS_CLASE_DESHABILITADA);
  this.obj.btnVer.addClass(constantes.CSS_CLASE_DESHABILITADA);
  /*//Desabilitadmos el bot�n agregar cuando el estado del d�a operativo sea descargando, cerrado o liquidado
    if(referenciaModulo.estadoDiaOperativo == 3 || referenciaModulo.estadoDiaOperativo == 4 || referenciaModulo.estadoDiaOperativo == 5){
      this.obj.btnAgregarProgramacion.addClass(constantes.CSS_CLASE_DESHABILITADA);
      this.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
    }
    else{
      this.obj.btnAgregarProgramacion.removeClass(constantes.CSS_CLASE_DESHABILITADA);
      this.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
    }
    //Desabilitadmos el bot�n modificar cuando el estado del transporte sea inactivo, descargado o anulado
    if(referenciaModulo.estadoTransporte== 2 || referenciaModulo.estadoTransporte == 4 || referenciaModulo.estadoTransporte == 5){
      this.obj.btnModificar.addClass(constantes.CSS_CLASE_DESHABILITADA);
    }
    else{
      this.obj.btnModificar.removeClass(constantes.CSS_CLASE_DESHABILITADA);
    }*/
};

moduloProgramacion.prototype.listarRegistros = function(){
  var referenciaModulo=this;
    referenciaModulo.mostrarDepuracion("listarRegistros");
  this.obj.datClienteApi.ajax.reload(referenciaModulo.despuesListarRegistros,true); 
};

moduloProgramacion.prototype.listarTransportes = function(){
  var referenciaModulo=this;
  referenciaModulo.mostrarDepuracion("listarRegistros de tabla AsignacionTransporte");
  this.obj.datDetalleProgramacionApi.ajax.reload(referenciaModulo.despuesListarRegistros,true);   
  //this.obj.datDetalleProgramacionApi.ajax.reload(referenciaModulo.despuesListarRegistros,true);  
};

moduloProgramacion.prototype.actualizarBandaInformacion=function(tipo, mensaje){
  var referenciaModulo=this;
  referenciaModulo.mostrarDepuracion("actualizarBandaInformacion");
  referenciaModulo.obj.bandaInformacion.removeClass(constantes.CLASE_MENSAJE_ERROR);
  referenciaModulo.obj.bandaInformacion.removeClass(constantes.CLASE_MENSAJE_EXITO);
  referenciaModulo.obj.bandaInformacion.removeClass(constantes.CLASE_MENSAJE_INFORMACION);
  if (tipo==constantes.TIPO_MENSAJE_INFO){
  referenciaModulo.obj.bandaInformacion.addClass(constantes.CLASE_MENSAJE_INFORMACION );
  } else if (tipo==constantes.TIPO_MENSAJE_EXITO){
  referenciaModulo.obj.bandaInformacion.addClass(constantes.CLASE_MENSAJE_EXITO );
  } else if (tipo==constantes.TIPO_MENSAJE_ERROR){
  referenciaModulo.obj.bandaInformacion.addClass(constantes.CLASE_MENSAJE_ERROR );
  } 
  referenciaModulo.obj.bandaInformacion.text(mensaje);
};

moduloProgramacion.prototype.recuperarRegistro= function(){
  var referenciaModulo = this;
  referenciaModulo.obj.ocultaContenedorTabla.show();
  referenciaModulo.obj.ocultaContenedorTabla.show();
  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,cadenas.PROCESANDO_PETICION);
  //esto para recuperar los datos de la cabecera de los formularios.
  referenciaModulo.datosCabecera(); 
  $.ajax({
      type: "GET",
      url: referenciaModulo.URL_RECUPERAR, 
      contentType: "application/json", 
      data: {ID:referenciaModulo.idProgramacion},
      success: function(respuesta) {
        if (!respuesta.estado) {
          referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
        } else {
          if(referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_MODIFICAR){        	  
        	//referenciaModulo.recuperarPlanificacionProduct();//llena el datasource combo producto 
        	
  		  $.ajax({
		      type: constantes.PETICION_TIPO_GET,
		      url: referenciaModulo.URL_RECUPERAR_PLANIFICACION, 
		      contentType: referenciaModulo.TIPO_CONTENIDO, 
		      data: {ID:referenciaModulo.idDiaOperativo}, 
		      success: function(respuestaPlan) {
		        if (!respuestaPlan.estado) {
		          referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuestaPlan.mensaje);
		        }else {     
		        	referenciaModulo.llenarProductos(respuestaPlan.contenido.carga[0]);//datasource		        	
		            referenciaModulo.llenarFormulario(respuesta.contenido.carga);
		            referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
		            referenciaModulo.obj.cmpTransportista.attr('disabled',true);             
		            referenciaModulo.obj.ocultaContenedorFormulario.hide();		        	
		        }
		      },                  
		      error: function() {
		        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
		        referenciaModulo.obj.ocultaContenedorVista.show();
		      }
		  });
        	

          } else if (referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_COMPLETAR){
        	  referenciaModulo.llenarFormularioCompletar(respuesta.contenido.carga);
              referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
              referenciaModulo.obj.ocultaContenedorCompletar.hide(); 
          } else if (referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_VER){
  			referenciaModulo.llenarDetalles(respuesta.contenido.carga);
  			referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
			referenciaModulo.obj.ocultaContenedorVista.hide();
		 }
        }
      },                  
      error: function(xhr,estado,error) {
        referenciaModulo.mostrarErrorServidor(xhr,estado,error);        
        if (referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_MODIFICAR){
          referenciaModulo.obj.ocultaContenedorFormulario.hide();
        } else if (referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_COMPLETAR){
          referenciaModulo.obj.ocultaContenedorCompletar.hide();
        } 
    }
  });
};


moduloProgramacion.prototype.recuperarPlanificacion= function(){
	  var referenciaModulo = this;
	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici\u00f3n...");
	  $.ajax({
	      type: constantes.PETICION_TIPO_GET,
	      url: referenciaModulo.URL_RECUPERAR_PLANIFICACION, 
	      contentType: referenciaModulo.TIPO_CONTENIDO, 
	      data: {ID:referenciaModulo.idDiaOperativo}, 
	      success: function(respuesta) {
	        if (!respuesta.estado) {
	          referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
	        }   else {     
	          referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
	          referenciaModulo.llenarProductos(respuesta.contenido.carga[0]);//llena el datasource combo producto
	          referenciaModulo.llenarFormularioAgregar(respuesta.contenido.carga[0]);//MODO_FORMULARIO_PROGRAMACION_NUEVO	          
	          referenciaModulo.obj.ocultaContenedorVista.show();
	        }
	      },                  
	      error: function() {
	        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
	        referenciaModulo.obj.ocultaContenedorVista.show();
	      }
	  });
	};
	///para agregar productos boton agrega cisterna
	moduloProgramacion.prototype.recuperarPlanificacionProduct= function(){
		  var referenciaModulo = this;
		  //referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici�n...");
		  $.ajax({
		      type: constantes.PETICION_TIPO_GET,
		      url: referenciaModulo.URL_RECUPERAR_PLANIFICACION, 
		      contentType: referenciaModulo.TIPO_CONTENIDO, 
		      data: {ID:referenciaModulo.idDiaOperativo}, 
		      success: function(respuesta) {
		        if (!respuesta.estado) {
		          referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
		        }   else {     
		        	referenciaModulo.llenarProductos(respuesta.contenido.carga[0]);
		        }
		      },                  
		      error: function() {
		        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
		        referenciaModulo.obj.ocultaContenedorVista.show();
		      }
		  });
		};
	

moduloProgramacion.prototype.verRegistro= function(){
  var referenciaModulo = this;
  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici\u00f3n...");
  $.ajax({
      type: constantes.PETICION_TIPO_GET,
      url: referenciaModulo.URL_RECUPERAR, 
      contentType: referenciaModulo.TIPO_CONTENIDO, 
      data: {ID:referenciaModulo.idRegistro}, 
      success: function(respuesta) {
        if (!respuesta.estado) {
          referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
        }   else {     
          referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
          referenciaModulo.llenarDetalles(respuesta.contenido.carga[0]);
          referenciaModulo.obj.ocultaContenedorVista.show();
        }
      },                  
      error: function() {
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
        referenciaModulo.obj.ocultaContenedorVista.show();
      }
  });
};

moduloProgramacion.prototype.aceptarDuplicidad = function() {
	var referenciaModulo=this;
	  if (referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_NUEVO){
		  $("#frmConfirmarCisternasDuplicadas").modal("hide");
			var referenciaModulo = this;
			referenciaModulo.obj.ocultaContenedorFormulario.show();
		    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando Petici\u00f3n...");
		    var eRegistro = referenciaModulo.recuperarValores();
		    $.ajax({
		      type: constantes.PETICION_TIPO_POST,
		      url: referenciaModulo.URL_GUARDAR, 
		        contentType: referenciaModulo.TIPO_CONTENIDO, 
		        data: JSON.stringify(eRegistro),  
		        success: function(respuesta) {
		            if (!respuesta.estado) {
		              referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
		            } else {                
			                referenciaModulo.iniciarListado(respuesta.mensaje);
			            	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
			            	referenciaModulo.detalleProgramacionConductorDisable = false;
			            	referenciaModulo.obj.cisterna.listado = [];
		            }
		            referenciaModulo.obj.ocultaContenedorFormulario.hide();
		      },                  
		      error: function() {
		          referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
		       }
		     });
	  } else if  (referenciaModulo.modoEdicion == constantes.MODO_FORMULARIO_PROGRAMACION_MODIFICAR){
		  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici\u00f3n...");
		  referenciaModulo.obj.ocultaContenedorFormulario.show();
        
        $("#frmConfirmarCisternasDuplicadas").modal("hide");
      	referenciaModulo.detalleProgramacionConductorDisable = false;
      	referenciaModulo.obj.cisterna.listado = [];
          var eRegistro = referenciaModulo.recuperarValores();
          console.log(eRegistro);
          $.ajax({
              type: constantes.PETICION_TIPO_POST,
              url: referenciaModulo.URL_ACTUALIZAR, 
              contentType: referenciaModulo.TIPO_CONTENIDO, 
              data: JSON.stringify(eRegistro),  
              success: function(respuesta) {
                if (!respuesta.estado) {
                  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
                }   else {              
                  //referenciaModulo.recuperarRegistro();
                  referenciaModulo.iniciarListado(respuesta.mensaje);
              	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
                }
                referenciaModulo.obj.ocultaContenedorFormulario.hide();
              },                  
              error: function() {
                referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
                referenciaModulo.obj.ocultaContenedorFormulario.hide();
              }
          });
	  }
};

moduloProgramacion.prototype.guardarRegistro= function(){
  var referenciaModulo = this;
  if (!referenciaModulo.validaFormularioXSS("#frmPrincipal")){
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, cadenas.ERROR_VALORES_FORMULARIO);
	} else if (referenciaModulo.obj.frmPrincipal.valid()){
    if (referenciaModulo.validarDetallesProgramacion()){ // jmatos rev
      // Inicio Ticket 9000002608
    	console.log('existe duplicidad de conductores: ' + referenciaModulo.duplicidadConductores);
    	var mensajeDuplicidad = "";
    	if(referenciaModulo.duplicidadConductores==true && referenciaModulo.duplicidadCisterna == true){
    		mensajeDuplicidad = "Existe al menos un Conductor y/o Cisterna ";
    	}else{
    		if(referenciaModulo.duplicidadConductores){
        		mensajeDuplicidad = "Existe al menos un Conductor ";
        	}
        	if(referenciaModulo.duplicidadCisterna){
        		mensajeDuplicidad = "Existe al menos una cisterna ";
        	}
    	}
    	$('.nombre_cisterna').html(mensajeDuplicidad);
        if(referenciaModulo.duplicidadConductores || referenciaModulo.duplicidadCisterna){
        	$("#frmConfirmarCisternasDuplicadas").modal("show");
        }else{
        	referenciaModulo.obj.ocultaContenedorFormulario.show();
            referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando Petici\u00f3n...");
            var eRegistro = referenciaModulo.recuperarValores();
            $.ajax({
              type: constantes.PETICION_TIPO_POST,
              url: referenciaModulo.URL_GUARDAR, 
                contentType: referenciaModulo.TIPO_CONTENIDO, 
                data: JSON.stringify(eRegistro),  
                success: function(respuesta) {
                    if (!respuesta.estado) {
                      referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
                    } else {                
      	                referenciaModulo.iniciarListado(respuesta.mensaje);
      	            	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
      	            	referenciaModulo.detalleProgramacionConductorDisable = false;
      	            	referenciaModulo.obj.cisterna.listado = [];
                    }
                    referenciaModulo.obj.ocultaContenedorFormulario.hide();
              },                  
              error: function() {
                  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
               }
             });
        }
      // Fin Ticket 9000002608
    } else{
      //referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Debe de completar los datos del detalle de la programaci\u00f3n");
      referenciaModulo.obj.ocultaContenedorFormulario.hide();
    }
  } else {
    referenciaModulo.obj.ocultaContenedorFormulario.hide();
  }
};

moduloProgramacion.prototype.iniciarListado= function(mensaje){
  var referenciaModulo = this;
  console.log("entra en iniciarListado");
  try{
    referenciaModulo.modoEdicion = constantes.MODO_DETALLE_TRANSPORTE;
      referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_LISTADO_DIA_PLANIFICADO);
    referenciaModulo.obj.cntTabla.hide();
    referenciaModulo.obj.cntDetalleProgramacion.show();
    referenciaModulo.obj.cntFormulario.hide();
    referenciaModulo.obj.cntFormularioCompletar.hide();
    this.obj.datDetalleProgramacionApi.ajax.reload(referenciaModulo.despuesListarRegistros,true);//abarrios
    //this.obj.datTablaDetalleDiaOperativoApi.ajax.reload(referenciaModulo.despuesListarRegistros,true);  
    referenciaModulo.desactivarBotones();
    //referenciaModulo.recuperarRegistro();
  } catch(error){
      referenciaModulo.mostrarDepuracion(error.message);
  };
};
moduloProgramacion.prototype.actualizarRegistroCompletar= function(){
	  //Ocultar alertas de mensaje
	  var referenciaModulo = this;
	  if (!referenciaModulo.validaFormularioXSS("#frmCompletar")){
			referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, cadenas.ERROR_VALORES_FORMULARIO);
		} else if (referenciaModulo.obj.frmCompletar.valid()){
	    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici\u00f3n...");
	    referenciaModulo.obj.ocultaContenedorCompletar.show();
	    //var validar = this.validarFechaEmision();
	    //var validarFechaCubicacion = this.validarFechaVigenciaTarjetaCubicacion();
	    if (this.validarDetallesCompletar()){
	      var eRegistro = referenciaModulo.recuperarValoresCompletar();
	      console.log(eRegistro);
	      $.ajax({
	          type: constantes.PETICION_TIPO_POST,
	          url: referenciaModulo.URL_COMPLETAR, 
	          contentType: referenciaModulo.TIPO_CONTENIDO, 
	          data: JSON.stringify(eRegistro),  
	          success: function(respuesta) {
	            if (!respuesta.estado) {
	              referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
	            }   else {              
	              
	                referenciaModulo.iniciarListado(respuesta.mensaje);
	            	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
	            }	            
	            referenciaModulo.obj.ocultaContenedorCompletar.hide();
	          },                  
	          error: function() {
	            referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
	            referenciaModulo.obj.ocultaContenedorCompletar.hide();
	          }
	      });
	    } else{
	      referenciaModulo.obj.ocultaContenedorCompletar.hide();
	    }
	  } else {
	  
	  } 
	};
moduloProgramacion.prototype.actualizarRegistro= function(){
  //Ocultar alertas de mensaje
  var referenciaModulo = this;
  if (!referenciaModulo.validaFormularioXSS("#frmPrincipal")){
		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, cadenas.ERROR_VALORES_FORMULARIO);
	} else if (referenciaModulo.obj.frmPrincipal.valid()){
    //var validar = this.validarFechaEmision();
    //var validarFechaCubicacion = this.validarFechaVigenciaTarjetaCubicacion();
    if (this.validarDetallesProgramacion()){
    	// Inicio Ticket 9000002608
    	console.log('existe duplicidad de conductores: ' + referenciaModulo.duplicidadConductores);
    	var mensajeDuplicidad = "";
    	if(referenciaModulo.duplicidadConductores==true && referenciaModulo.duplicidadCisterna == true){
    		mensajeDuplicidad = "Existe al menos un Conductor y/o Cisterna ";
    	}else{
    		if(referenciaModulo.duplicidadConductores){
        		mensajeDuplicidad = "Existe al menos un Conductor ";
        	}
        	if(referenciaModulo.duplicidadCisterna){
        		mensajeDuplicidad = "Existe al menos una cisterna ";
        	}
    	}
    	$('.nombre_cisterna').html(mensajeDuplicidad);
        if(referenciaModulo.duplicidadConductores || referenciaModulo.duplicidadCisterna){
        	$("#frmConfirmarCisternasDuplicadas").modal("show");
        }else{
        	
        	referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici\u00f3n...");
            referenciaModulo.obj.ocultaContenedorFormulario.show();
        	
        	referenciaModulo.detalleProgramacionConductorDisable = false;
        	referenciaModulo.obj.cisterna.listado = [];
            var eRegistro = referenciaModulo.recuperarValores();
            console.log(eRegistro);
            $.ajax({
                type: constantes.PETICION_TIPO_POST,
                url: referenciaModulo.URL_ACTUALIZAR, 
                contentType: referenciaModulo.TIPO_CONTENIDO, 
                data: JSON.stringify(eRegistro),  
                success: function(respuesta) {
                  if (!respuesta.estado) {
                    referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,respuesta.mensaje);
                  }   else {              
                    //referenciaModulo.recuperarRegistro();
                    referenciaModulo.iniciarListado(respuesta.mensaje);
                	  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,respuesta.mensaje);
                  }
                  referenciaModulo.obj.ocultaContenedorFormulario.hide();
                },                  
                error: function() {
                  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
                  referenciaModulo.obj.ocultaContenedorFormulario.hide();
                }
            });
        }
    } else{
      referenciaModulo.obj.ocultaContenedorFormulario.hide();
    }
  } else {
  
  } 
};

moduloProgramacion.prototype.iniciarContenedores = function(){
	
	
	
  var referenciaModulo = this;
  try {
	    referenciaModulo.modoEdicion = constantes.MODO_DETALLE_TRANSPORTE;
	    referenciaModulo.obj.tituloSeccion.text(cadenas.TITULO_LISTADO_DIA_PLANIFICADO);
	    referenciaModulo.obj.cntTabla.hide();
	    referenciaModulo.obj.cntDetalleProgramacion.show();
	    referenciaModulo.obj.cntFormulario.hide();
	    referenciaModulo.obj.cntFormularioCompletar.hide();
	    referenciaModulo.recuperarRegistro();
  } catch (error) {
	  referenciaModulo.mostrarDepuracion(error.message);
  }
};

moduloProgramacion.prototype.solicitarActualizarEstado= function(){
  try {
    this.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici\u00f3n...");
    this.obj.frmConfirmarModificarEstado.modal("show");
  } catch(error){
    referenciaModulo.mostrarDepuracion(error.message);
  }
};

moduloProgramacion.prototype.actualizarEstadoRegistro= function(){
  var eRegistro = {};
  var referenciaModulo=this;
  referenciaModulo.obj.frmConfirmarModificarEstado.modal("hide");
  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_INFO,"Procesando petici\u00f3n...");
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
        referenciaModulo.obj.cntFormulario.hide();  
        referenciaModulo.obj.cntTabla.show();
      }
    },                  
    error: function() {
        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,"Hubo un error en la petici\u00f3n");
        //referenciaModulo.protegeFormulario(false);
    }
    });
  };

  
moduloProgramacion.prototype.validarUnDetalleTransporte= function(){
//Implementar en cada caso
};
  
moduloProgramacion.prototype.limpiarFormularioPrincipal= function(){
//Implementar en cada caso
};

moduloProgramacion.prototype.validarFechaEmision= function(){
//Implementar en cada caso
};

moduloProgramacion.prototype.validarFechaVigenciaTarjetaCubicacion= function(){
//Implementar en cada caso
};

moduloProgramacion.prototype.datosCabecera= function(){
//Implementar en cada caso
};
  
moduloProgramacion.prototype.inicializarCampos= function(){
//Implementar en cada cas
	
};

moduloProgramacion.prototype.llenarFormularioAgregar = function(registro){
//Implementar en cada caso  
};
moduloProgramacion.prototype.agregarProductoCisterna = function(registro){
	//Implementar en cada caso  
};
moduloProgramacion.prototype.llenarFormulario = function(registro){
 //Implementar en cada caso  
};
moduloProgramacion.prototype.llenarFormularioCompletar = function(registro){
	 //Implementar en cada caso  
};
moduloProgramacion.prototype.llenarDetalles = function(registro){
//Implementar en cada caso
};

moduloProgramacion.prototype.llenarDetalleTransporte = function(){
//Implementar en cada caso
};

moduloProgramacion.prototype.recuperarValores = function(registro){
var eRegistro = {};
//Implementar en cada caso
return eRegistro;
};

moduloProgramacion.prototype.grillaDespuesSeleccionar= function(indice){
//implementar
};

moduloProgramacion.prototype.despuesListarRegistros=function(){
//Implementar en cada caso
};
moduloProgramacion.prototype.agregarCisterna=function(){
	//Implementar en cada caso
};

//Inicio Atenci�n Ticket 9000002608
moduloProgramacion.prototype.abrirVentanaAddCisterna = function () {
	var ref = this;
	try{
		$('#frmAddCisterna').modal("show");
	}catch(error){
		ref.mostrarDepuracion(error.message);
	}
}

moduloProgramacion.prototype.cargarTractoCisterna = function () {
	var ref = this;
	try {
		/*var cmpElementoCisterna=$('#cmbCisterna');
		cmpElementoCisterna.select2();          
        cmpElementoCisterna.tipoControl="select2";
        
        var cmpElementoConductor = $('#cmbConductor');
        cmpElementoConductor.select2();
        cmbElementoConductor.tipoControl = "select2";*/
       
        /*cmpElementoCisterna.select2({
        	  ajax: {
        		    url: "./cisterna/recuperarPorTransportista", 
        		    dataType: 'json',
        		    delay: 250,
        		    "data": function (parametros) {
        		    	console.log('parametros: ' + parametros);
        		    	try{
        		    		var transportista = 0;  
        		    		
        		    		if(moduloActual.idTransportista > 0){
        		    			transportista = moduloActual.idTransportista ;
        		    		}
      	  		      return { 
      	  		    	idTransportista:parseInt(transportista),
      	  		    	txt: parametros.term // search term
      	  		      };
        		    	} catch(error){
        		          console.log(error.message);
        		        };
        		    },
        		    processResults: function (respuesta, pagina) {
        		    	var resultados= respuesta.contenido.carga;
        		    	 //7000001924
        		    	if(moduloActual.obj.cisterna.es_vacio()){
            		    	moduloActual.obj.cisterna.registrarTodo(resultados);      		    		
        		    	}
        		        return { results: resultados};
        		    },
        		    cache: true
        		  },
        		"language": "es",
        		"escapeMarkup": function (markup) { return markup; },
        		"templateResult": function (registro) {
        			if (registro.loading) {
        				return registro.text;
        			}
        			moduloActual.placaCisternaTracto=registro.placaCisternaTracto; 
        	        return "<div class='select2-user-result' >" + registro.placaCisternaTracto + "</div>";},
        	    "templateSelection": function (registro) {
        	    	return registro.placaCisternaTracto || registro.text;
        	    },
          });*/
        
	} catch (error) {
		ref.mostrarDepuracion(error.message);
	}
}

moduloProgramacion.prototype.generarRandomId = function(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}



//Fin Atenci�n Ticket 9000002608
moduloProgramacion.prototype.validaPermisos = function(){
  var referenciaModulo = this;
  
  try{

  referenciaModulo.obj.ocultaContenedorTabla.show();
  referenciaModulo.obj.ocultaContenedorDetalleProgramacion.show();
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
		      referenciaModulo.obj.ocultaContenedorDetalleProgramacion.hide();
	      } else {
		      if (referenciaModulo.descripcionPermiso == 'LEER_PROGRAMACION'){
		    	  referenciaModulo.botonDetalle();
		      } else if (referenciaModulo.descripcionPermiso == 'REPORTAR_PROGRAMACION'){
		    	  referenciaModulo.mostrarReporte(constantes.FORMATO_XLS);
		      } else if (referenciaModulo.descripcionPermiso == 'NOTIFICAR_PROGRAMACION'){

		    	  referenciaModulo.vericaNotificacion();   
		      } else if (referenciaModulo.descripcionPermiso == 'CREAR_PROGRAMACION'){
		    	  referenciaModulo.botonAgregarProgramacion();
		      } else if (referenciaModulo.descripcionPermiso == 'ACTUALIZAR_PROGRAMACION'){
		    	  referenciaModulo.iniciarModificar();
		      } else if (referenciaModulo.descripcionPermiso == 'COMPLETAR_PROGRAMACION'){
		    	  referenciaModulo.iniciarCompletar();
		      } else if (referenciaModulo.descripcionPermiso == 'RECUPERAR_PROGRAMACION'){
		    	  referenciaModulo.iniciarVer();
		      } else if (referenciaModulo.descripcionPermiso == 'ELIMINAR_PROGRAMACION'){
		    	  referenciaModulo.obj.frmConfirmarModificarEstado.modal("show");
		      } else if (referenciaModulo.descripcionPermiso == 'COMENTAR_PROGRAMACION'){		    	  
		    	  referenciaModulo.obj.frmComentar.modal("show");
		      }
	      }
	      referenciaModulo.obj.ocultaContenedorTabla.hide();
	      referenciaModulo.obj.ocultaContenedorDetalleProgramacion.hide();
	    },
	    error: function() {
	    	referenciaModulo.obj.ocultaContenedorTabla.hide();
	    	referenciaModulo.obj.ocultaContenedorDetalleProgramacion.hide();
	    	referenciaModulo.mostrarErrorServidor(xhr,estado,error); 
	    }
	  });
  } catch(error){
	  referenciaModulo.obj.ocultaContenedorTabla.hide();
	  referenciaModulo.obj.ocultaContenedorDetalleProgramacion.hide();
	  referenciaModulo.mostrarDepuracion(error.message);
  };
};