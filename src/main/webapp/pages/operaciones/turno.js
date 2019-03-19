$(document).ready(function() {

	var moduloActual = new moduloTurno();
	moduloActual.urlBase='turno';
	moduloActual.SEPARADOR_MILES = ",";
	moduloActual.URL_LISTAR_JORNADA = './jornada/listar';
	moduloActual.URL_RECUPERAR_APERTURA = './turno/recuperarApertura';
	moduloActual.URL_RECUPERAR_CIERRE = './turno/recuperarCierre';
	moduloActual.URL_RECUPERA_ULTIMA_JORNADA = './turno/obtieneUltimaJornada'; 
	moduloActual.URL_LISTAR = moduloActual.urlBase + '/listar';
	moduloActual.URL_ELIMINAR = moduloActual.urlBase + '/eliminar';
	moduloActual.URL_GUARDAR = moduloActual.urlBase + '/crear';
	moduloActual.URL_ACTUALIZAR = moduloActual.urlBase + '/actualizar';
	moduloActual.URL_RECUPERAR = moduloActual.urlBase + '/recuperar';
	moduloActual.URL_ACTUALIZAR_ESTADO = moduloActual.urlBase + '/actualizarEstado';
	moduloActual.GENERAR_PLANTILLA_CONTOMETROS = moduloActual.urlBase + '/generarPlantillaContometros';
	
	//listado de jornadaf
	moduloActual.ordenGrillaJornada=[[ 2, 'asc' ]];
	moduloActual.columnasGrillaJornada.push({ "data": 'id'});
	moduloActual.columnasGrillaJornada.push({ "data": 'estacion.id'});
	moduloActual.columnasGrillaJornada.push({ "data": 'estacion.nombre'});
	moduloActual.columnasGrillaJornada.push({ "data": 'fechaOperativa'}); // antes 5 - ahora 4
	moduloActual.columnasGrillaJornada.push({ "data": 'perfilHorario.nombrePerfil'}); // 5
	moduloActual.columnasGrillaJornada.push({ "data": 'totalDespachos'});
	moduloActual.columnasGrillaJornada.push({ "data": 'fechaActualizacion'});
	moduloActual.columnasGrillaJornada.push({ "data": 'usuarioActualizacion'});
	moduloActual.columnasGrillaJornada.push({ "data": 'estado'});
	moduloActual.columnasGrillaJornada.push({ "data": 'perfilHorario.id'}); // 10

	// Columnas jornada
	moduloActual.definicionColumnasJornada.push({"targets" : 1, "searchable" : true, "orderable" : false, "visible" : false });
	moduloActual.definicionColumnasJornada.push({"targets" : 2, "searchable" : true, "orderable" : false, "visible" : false });
	moduloActual.definicionColumnasJornada.push({"targets" : 3, "searchable" : true, "orderable" : false, "visible" : true });
	moduloActual.definicionColumnasJornada.push({"targets" : 4, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-center", "render" : utilitario.formatearFecha });
	moduloActual.definicionColumnasJornada.push({"targets" : 5, "searchable" : true, "orderable" : false, "visible" : true });
	moduloActual.definicionColumnasJornada.push({"targets" : 6, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-right" });
	moduloActual.definicionColumnasJornada.push({"targets" : 7, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-center" });
	moduloActual.definicionColumnasJornada.push({"targets" : 8, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-rigth" });
	moduloActual.definicionColumnasJornada.push({"targets" : 9, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-center", "render" : utilitario.formatearEstadoJornada });
	moduloActual.definicionColumnasJornada.push({"targets" : 10, "searchable" : true, "orderable" : false, "visible" : false });

	//listado de jornada
	moduloActual.ordenGrillaTurno=[[ 2, 'asc' ]];
	moduloActual.columnasGrillaTurno.push({ "data": 'id'}); 
	moduloActual.columnasGrillaTurno.push({ "data": 'fechaHoraApertura'});
	moduloActual.columnasGrillaTurno.push({ "data": 'fechaHoraCierre'});
	moduloActual.columnasGrillaTurno.push({ "data": 'jornada.estacion.nombre'});
	moduloActual.columnasGrillaTurno.push({ "data": 'perfilHorario.lstDetalles[0].horaInicioFinTurno'});
	moduloActual.columnasGrillaTurno.push({ "data": 'responsable.nombreCompletoOperario'});
	moduloActual.columnasGrillaTurno.push({ "data": 'ayudante.nombreCompletoOperario'});
	moduloActual.columnasGrillaTurno.push({ "data": 'estado'});
	moduloActual.columnasGrillaTurno.push({ "data": 'jornada.estacion.id'});
	moduloActual.columnasGrillaTurno.push({ "data": 'jornada.fechaOperativa'});

	//Columnas jornada
	moduloActual.definicionColumnasTurno.push({"targets" : 1, "searchable" : true, "orderable" : false, "visible" : false });
	moduloActual.definicionColumnasTurno.push({"targets" : 2, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-center", "render" : utilitario.formatearTimestampToString });
	moduloActual.definicionColumnasTurno.push({"targets" : 3, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-center", "render" : utilitario.formatearTimestampToString });
	moduloActual.definicionColumnasTurno.push({"targets" : 4, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-rigth" });
	moduloActual.definicionColumnasTurno.push({"targets" : 5, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-rigth" });
	moduloActual.definicionColumnasTurno.push({"targets" : 6, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-rigth" });
	moduloActual.definicionColumnasTurno.push({"targets" : 7, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-rigth" });
	moduloActual.definicionColumnasTurno.push({"targets" : 8, "searchable" : true, "orderable" : false, "visible" : true, "class": "text-center", "render" : utilitario.formatearEstadoTurno });
	moduloActual.definicionColumnasTurno.push({"targets" : 9, "searchable" : true, "orderable" : false, "visible" : false });
	moduloActual.definicionColumnasTurno.push({"targets" : 10, "searchable" : true, "orderable" : false, "visible" : false });

	moduloActual.reglasValidacionFormulario = {
	   cmpHoraInicio :     { required: true },
	   cmpOperarioResponsable: { required: true}
	};

  moduloActual.mensajesValidacionFormulario = {
	cmpHoraInicio: 			{ required: "El campo 'Hora Apertura' es obligatorio" },
	cmpOperarioResponsable: { required: "El campo 'Responsable' es obligatorio" },
  };
 
  moduloActual.inicializarFormularioPrincipal= function() {
	  
	  var referenciaModulo=this;
	  referenciaModulo.obj.verificadorFormulario = referenciaModulo.obj.frmApertura.validate({
	      rules: referenciaModulo.reglasValidacionFormulario,
	      messages: referenciaModulo.mensajesValidacionFormulario,
	    highlight: function(element, errorClass, validClass) {
	      $("#cnt" + $(element).attr("id")).removeClass(validClass).addClass(errorClass);
	    },
	    unhighlight: function(element, errorClass, validClass) {
	      $("#cnt" + $(element).attr("id")).removeClass(errorClass).addClass(validClass);
	    },
	    errorPlacement: function(error, element) {
	      console.log(error);     
	    },
	    errorClass: "has-error",
	    validClass: "has-success",
	    showErrors: function(errorMap, errorList) {
	      this.checkForm();
	      this.defaultShowErrors();
	      var numeroErrores = this.errorList.length;
	      
	      if (numeroErrores > 0) {
	        var mensaje = numeroErrores == 1 ? 'Existe un campo con error.' : 'Existen ' + numeroErrores + ' campos con errores';
	        for (var indice in this.errorMap) {
	          mensaje+=". " + this.errorMap[indice];    
	        }  
	        
	        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR,mensaje);
	      } else {
	        mensaje="Todos los campos son validos";
	        referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_EXITO,mensaje);
	      }
	    }
	  });
	};

  moduloActual.inicializarCampos = function() {
	  
	this.obj.tableGrupoApertura = $("table.grupo-apertura");
	this.obj.tableGrupoCierre = $("table.grupo-cierre");
    this.obj.idOperacionSeleccionado =$("#idOperacionSeleccionado");
    this.obj.idClienteSeleccionado =$("#idClienteSeleccionado");
    this.obj.idEstacionSeleccionado =$("#idEstacionSeleccionado");
    this.obj.idJornadaSeleccionado =$("#idJornadaSeleccionado");
	this.obj.clienteSeleccionado=$("#clienteSeleccionado");
    this.obj.operacionSeleccionado=$("#operacionSeleccionado");
    this.obj.filtroFechaJornada = $("#filtroFechaJornada");
    
    // Recupera la fecha actual enviada por el servidor
    var fechaActual = this.obj.filtroFechaJornada.attr('data-fecha-actual');
    
    //PARA QUE COJA LAS ULTIMAS FECHAS CARGADAS
    var rangoSemana = utilitario.retornarfechaInicialFinal(fechaActual);
    this.obj.filtroFechaJornada.val(utilitario.formatearFecha2Cadena(rangoSemana.fechaInicial) + " - " +utilitario.formatearFecha2Cadena(rangoSemana.fechaFinal));
    this.obj.filtroFechaJornada.daterangepicker({
        singleDatePicker: false,        
        showDropdowns: false,
        locale: { 
          "format": 'DD/MM/YYYY',
          "applyLabel": "Aceptar",
          "cancelLabel": "Cancelar",
          "fromLabel": "Desde",
          "toLabel": "Hasta",
          "customRangeLabel": "Seleccionar",
          "daysOfWeek": [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab" ],
          "monthNames": [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
        }
    }); 
	
	this.obj.filtroEstacion = $("#filtroEstacion");
	this.obj.filtroEstacion.select2();

	this.obj.idCliente = $("#idCliente");
	this.obj.filtroOperacion = $("#filtroOperacion");
	this.obj.filtroOperacion.select2();
	
	this.obj.filtroOperacion.on('change', function(e) {
		
	   moduloActual.obj.idOperacionSeleccionado=$(this).val();
	   moduloActual.obj.operacionSeleccionado=$(this).find("option:selected").attr('data-nombre-operacion');
	   moduloActual.obj.clienteSeleccionado=$(this).find("option:selected").attr('data-nombre-cliente');
	   moduloActual.obj.filtroEstacion.select2("val", moduloActual.obj.filtroEstacion.attr("data-valor-inicial"));		
	   moduloActual.obj.ocultaContenedorTabla.show();
	   
	   $.ajax({
		    type: constantes.PETICION_TIPO_GET,
		    url: "./estacion/listar", 
		    dataType: 'json',
		    data: {
		    	filtroOperacion: moduloActual.obj.filtroOperacion.val(),
		    	filtroEstado: constantes.ESTADO_ACTIVO
		    },
		    success: function (respuesta) {
		    	if (respuesta.contenido.carga.length > 0) {
		    		document.getElementById("filtroEstacion").innerHTML = "";
		    		for(var cont = 0; cont < respuesta.contenido.carga.length; cont++){
		    			var registro = respuesta.contenido.carga[cont];
		    			moduloActual.obj.nombreEstacion = registro.nombre;
		    			$('#filtroEstacion').append("<option value="+ registro.id +"> " + registro.nombre + "</option>");
		    		}
		    		moduloActual.obj.filtroEstacion.select2("val", respuesta.contenido.carga[0].id);		
 		    	} else {
		    		var elemento2 =constantes.PLANTILLA_OPCION_SELECTBOX;
		    	    elemento2 = elemento2.replace(constantes.ID_OPCION_CONTENEDOR, -1);
		    	    elemento2 = elemento2.replace(constantes.VALOR_OPCION_CONTENEDOR, "SELECCIONAR...");
		  	        moduloActual.obj.filtroEstacion.empty().append(elemento2).val(-1).trigger('change');
		  	        $('#filtroEstacion').find("option:selected").val(-1);
		    	    moduloActual.obj.filtroEstacion.val(-1);
		    	}
		    },			    		    
		    error: function(xhr,estado,error) {
	        referenciaModulo.mostrarErrorServidor(xhr,estado,error);        
		    }
		});
	   moduloActual.obj.ocultaContenedorTabla.hide();
	   e.preventDefault(); 
	});
	
	this.obj.filtroEstacion.on('change', function(e){
	   moduloActual.obj.idEstacionSeleccionado=$(this).val();
	   moduloActual.obj.nombreEstacion = $(this).find("option:selected").attr('data-estacion');	
	   $.ajax({
		    type: constantes.PETICION_TIPO_GET,
		    url: "./jornada/recuperar-ultimo-dia", 
		    dataType: 'json',
		    data: {
		    	idOperacion: moduloActual.obj.filtroOperacion.val(),
		    	filtroEstacion: moduloActual.obj.filtroEstacion.val()
		    },	
		    success: function(respuesta) {
		    	if (!respuesta.estado) {
		    		referenciaModulo.actualizarBandaInformacion("La estación no cuenta con jornadas.");
		    	} else {
		    		var valor = respuesta.valor;
		    		if(valor != null){
		    			var rangoSemana = utilitario.retornarfechaInicialFinal(valor);
			    	    moduloActual.obj.filtroFechaJornada.val(utilitario.formatearFecha2Cadena(rangoSemana.fechaInicial) + " - " +utilitario.formatearFecha2Cadena(rangoSemana.fechaFinal));
		    		}
	    		}
		    },
		    error: function(xhr,estado,error) {
	        referenciaModulo.mostrarErrorServidor(xhr,estado,error);        
		    }
		});

	   moduloActual.modoEdicion=constantes.MODO_LISTAR;
	   moduloActual.listarRegistrosJornada();
	   e.preventDefault(); 
	});
	
    this.obj.cmpOperarioResponsable=$("#cmpOperarioResponsable");
    this.obj.cmpOperarioResponsable.tipoControl="select2";
    this.obj.cmpSelect2OperarioResponsable=$("#cmpOperarioResponsable").select2({
  	  ajax: {
  		    url: "./operario/listar",
  		    dataType: 'json',
  		    delay: 250,
  		    data: function (parametros) {
  		      return {
  		    	valorBuscado: parametros.term, // search term
  		        page: parametros.page,
  		        paginacion:0,
  		        indicadorOperario: constantes.INDICADOR_OPERARIO_RESPONSABLE,
  		        filtroEstado: constantes.ESTADO_ACTIVO
  		      };
  		    },
  		    processResults: function (respuesta, pagina) {
  		      var resultados= respuesta.contenido.carga;
  		      return { results: resultados};
  		    },
  		    cache: true
  		  },
  		language: "es",
  		escapeMarkup: function (markup) { return markup; },
  		templateResult: function (registro) {
  			if (registro.loading) {
  				return "Buscando...";
  			}		    	
  				return "<div class='select2-user-result'>" + registro.nombreCompletoOperario + "</div>";
		    },
		    templateSelection: function (registro) {
		        return registro.nombreCompletoOperario || registro.text;
		    },
    });
    
    //ayudante
    this.obj.cmpOperarioAyudante=$("#cmpOperarioAyudante");
    this.obj.cmpOperarioAyudante.tipoControl="select2";
    this.obj.cmpSelect2OperarioAyudante=$("#cmpOperarioAyudante").select2({
  	  ajax: {
  		    url: "./operario/listar",
  		    dataType: 'json',
  		    delay: 250,
  		    data: function (parametros) {
  		      return {
  		    	valorBuscado: parametros.term, // search term
  		        page: parametros.page,
  		        paginacion:0,
  		        filtroEstado: constantes.ESTADO_ACTIVO
  		      };
  		    },
  		    processResults: function (respuesta, pagina) {
  		      var resultados= respuesta.contenido.carga;
  		      return { results: resultados};
  		    },
  		    cache: true
  		  },
  		language: "es",
  		escapeMarkup: function (markup) { return markup; },
  		templateResult: function (registro) {
  			if (registro.loading) {
  				return "Buscando...";
  			}		    	
		        return "<div class='select2-user-result'>" + registro.nombreCompletoOperario + "</div>";
		    },
		    templateSelection: function (registro) {
		        return registro.nombreCompletoOperario || registro.text;
		    },
    });

    //Campos de Formulario Apertura
    this.obj.cmpClienteApertura = $("#cmpClienteApertura");
    this.obj.cmpEstacion = $("#cmpEstacion");
    this.obj.cmpDiaOperativoApertura = $("#cmpDiaOperativoApertura");
    this.obj.cmpHoraInicio = $("#cmpHoraInicio");
    //this.obj.cmpHoraInicio.inputmask("h:s:s");
    this.obj.cmpHoraInicio.inputmask("datetime", {
        mask: "1/2/y h:s", //se quita :s por req 9000003068
        placeholder: "dd/mm/yyyy HH:mm", 	//se quita :ss por req 9000003068
        leapday: "-02-29", 
        separator: "/", 
        alias: "dd/mm/yyyy"
    });
    
    //campos de formulario Cierre    
    this.obj.cmpClienteCierre = $("#cmpClienteCierre");
    this.obj.cmpEstacionCierre = $("#cmpEstacionCierre");
    this.obj.cmpDiaOperativoCierre = $("#cmpDiaOperativoCierre");
    this.obj.cmpHoraCierre = $("#cmpHoraCierre");
    //this.obj.cmpHoraCierre.inputmask("h:s:s"); 
    this.obj.cmpHoraCierre.inputmask("datetime", {
        mask: "1/2/y h:s:s", 
        placeholder: "dd/mm/yyyy hh:mm:ss", 
        leapday: "-02-29", 
        separator: "/", 
        alias: "dd/mm/yyyy"
    });
    
    this.obj.cmpCierreEstacion=$("#cmpCierreEstacion");   
    this.obj.cmpCierreResponsable=$("#cmpCierreResponsable");
    this.obj.cmpCierreAyudante=$("#cmpCierreAyudante");
    this.obj.cmpObservacionApertura=$("#cmpObservacionApertura");
    this.obj.cmpObservacionCierre=$("#cmpObservacionCierre");
    
    //campos de formulario Vista   
    this.obj.cmpVistaClienteOperacion=$("#cmpVistaClienteOperacion");
    this.obj.cmpVistaEstacion=$("#cmpVistaEstacion");
    this.obj.cmpVistaFInicio=$("#cmpVistaFInicio");
    this.obj.cmpVistaFFinal=$("#cmpVistaFFinal");
    this.obj.cmpVistaResponsable=$("#cmpVistaResponsable");
    this.obj.cmpVistaAyudante=$("#cmpVistaAyudante");
    this.obj.cmpVistaEstado=$("#cmpVistaEstado");
    this.obj.cmpVistaObservacion=$("#cmpVistaObservacion");
    
    this.obj.vistaCreadoEl=$("#vistaCreadoEl");
    this.obj.vistaCreadoPor=$("#vistaCreadoPor");
    this.obj.vistaActualizadoEl=$("#vistaActualizadoEl");
    this.obj.vistaActualizadoPor=$("#vistaActualizadoPor");	
    this.obj.vistaIPCreacion=$("#vistaIPCreacion");
    this.obj.vistaIPActualizacion=$("#vistaIPActualizacion");	
    this.obj.cmpLecturaInicial=$("#cmpLecturaInicial");    
    this.obj.cmpLecturaFinal=$("#cmpLecturaFinal");

    moduloActual.obj.cmpLecturaInicial.val(0);
    moduloActual.obj.cmpLecturaFinal.val(0);
    moduloActual.obj.cmpLecturaFinal.on("keypress", function(e){
   	  	if (e.which == 13) {  //valido que se presione la tecla enter
   	  		var totalVolumen = parseFloat(moduloActual.obj.cmpLecturaFinal.val()) - parseInt(moduloActual.obj.cmpLecturaInicial.val()); 
   	  		moduloActual.obj.cmpVolObservado.val(totalVolumen);
   	  	}
    });
	
    this.obj.grupoApertura = $('#GrupoApertura').sheepIt({
        separator: '',
        allowRemoveLast: true,
        allowRemoveCurrent: true,
        allowRemoveAll: true,
        allowAdd: true,
        allowAddN: false,
        maxFormsCount: 0,
        minFormsCount: 0,
        iniFormsCount: 0,
        afterAdd: function(origen, formularioNuevo) {
        	var cmpElementoLecturaInicial = $(formularioNuevo).find("input[elemento-grupo='lecturaInicial']");
        	cmpElementoLecturaInicial.inputmask('decimal', {
        		//digits: 2, // Se comento para la cantidad de decimales especificada en el Módulo de Estaciones de Servicios.
        		groupSeparator:',',
        		autoGroup:true,
        		groupSize:3
        	}); 
        }
    });
    
    this.obj.grupoCierre = $('#GrupoCierre').sheepIt({
        separator: '',
        allowRemoveLast: true,
        allowRemoveCurrent: true,
        allowRemoveAll: true,
        allowAdd: true,
        allowAddN: false,
        maxFormsCount: 0,
        minFormsCount: 0,
        iniFormsCount: 0,
        afterAdd: function(origen, formularioNuevo) {
        	
        	var cmpElementoLecturaFinal = $(formularioNuevo).find("input[elemento-grupo='lecturaFinal']");
        	cmpElementoLecturaFinal.attr('maxlength','14');
        	cmpElementoLecturaFinal.inputmask('decimal', {
        		//digits: 2, // Se comento para la cantidad de decimales especificada en el Módulo de Estaciones de Servicios.
        		groupSeparator: ',',
        		autoGroup: true,
        		groupSize: 3,
        	});
        	cmpElementoLecturaFinal.keyup(delay(function(e) {
        		var num = $(this).val();
        		num = trailingZeros(num);
        		$(this).val(num);
        	}, 900));
        	cmpElementoLecturaFinal.keyup(function(e) {
        		elementoLecturaFinalFunction();
        	});
        	
        	var cmpElementoLecturaInicial = $(formularioNuevo).find("input[elemento-grupo='lecturaInicial']");
        	cmpElementoLecturaInicial.inputmask('decimal', {
        		//digits: 2, // Se comento para la cantidad de decimales especificada en el Módulo de Estaciones de Servicios.
        		groupSeparator: ',',
        		autoGroup: true,
        		groupSize: 3
        	});
        	
        	var cmpElementoLecturaDifVolEncontrado = $(formularioNuevo).find("input[elemento-grupo='lecturaDifVolEncontrado']");
        	cmpElementoLecturaDifVolEncontrado.inputmask('decimal', {
        		//digits: 2, // Se comento para la cantidad de decimales especificada en el Módulo de Estaciones de Servicios.
        		groupSeparator: ',', 
        		autoGroup: true, 
        		groupSize: 3
        	});
        	
        	var cmpElementoDiferencia = $(formularioNuevo).find("input[elemento-grupo='lecturaDifVolEncontrado']");
        	cmpElementoLecturaFinal.on("change", function(e) {
        		elementoLecturaFinalFunction();
            });
        	
        	function elementoLecturaFinalFunction() {
        		var lecturaIni = moduloActual.eliminaSeparadorComa(cmpElementoLecturaInicial.val());
        		var lenturaFin = moduloActual.eliminaSeparadorComa(cmpElementoLecturaFinal.val());    		
        		var diferencia = parseFloat(lenturaFin) - parseFloat(lecturaIni);
        		diferencia = trailingZeros(diferencia);
        		cmpElementoDiferencia.val(diferencia);
        	}
        	
        	function trailingZeros(num) {
        		
        		var decimalesContometro = moduloActual.obj.numeroDecimalesContometro;
        		
        		if (!num.toString().includes(".") || !num.toString().split(".").length >= 2) {
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
        }
      });    
  };
  
  moduloActual.eliminaSeparadorComa = function(numeroFloat) {
	  
		var parametros = numeroFloat.split(',');
	  	var retorno = new String(parametros[0]);
	  	
	  	if (parametros[1] != null) {
	  		retorno = new String(parametros[0] + parametros[1]);
	  	}
	  	
	  	if (parametros[2] != null) {
	  		retorno = new String(parametros[0] + parametros[1] + parametros[2]);
	  	}
	  	
	  	if (parametros[3] != null) {
	  		retorno = new String(parametros[0] + parametros[1] + parametros[2] + parametros[3]);
	  	}
	  	
	  	if (parametros[4] != null) {
	  		retorno = new String(parametros[0] + parametros[1] + parametros[2] + parametros[3] + parametros[4]);
	  	}
	  	
	  	return retorno;
  };
  
  //llena el formularo de contometro jornada
moduloActual.llenarApertura = function(registro) {
	
	var _this = this;
	
	/**
	 * Mostrar el loading
	 */
	_this.obj.tableGrupoApertura.addClass("loading");
	var contometroRegistros = moduloActual.obj.tableGrupoApertura.attr("data-contometro-registros");
	moduloActual.obj.grupoApertura.css("height", contometroRegistros * 25);
	
    var numeroDetalles = registro.length;
    var cmpHoraInicioDate = utilitario.formatearTimestampToString(registro[0].turno.fechaHoraCierre);
    moduloActual.obj.cmpHoraInicio.val(cmpHoraInicioDate);
    moduloActual.obj.cmpObservacionApertura.val("");
    _this.obj.grupoApertura.removeAllForms();

    $('#cmpOperarioResponsable').prop('disabled', false);
    $('#cmpOperarioAyudante').prop('disabled', false);
    
    setTimeout(function() {
    	
        for(var contador=0; contador < numeroDetalles; contador++) {
        	moduloActual.obj.grupoApertura.addForm();
            var form = moduloActual.obj.grupoApertura.getForm(contador);
            
            form.find("input[elemento-grupo='secuencia']").val(contador + 1);
      	  	form.find("input[elemento-grupo='contometro']").val(registro[contador].contometro.alias);  	  
      	  	form.find("input[elemento-grupo='contometro']").attr("data-idContometro", registro[contador].contometro.id); 
      	  	form.find("input[elemento-grupo='producto']").val(registro[contador].producto.nombre);   	  
      	  	form.find("input[elemento-grupo='producto']").attr("data-idProducto", registro[contador].producto.id); 
      	  	//form.find("input[elemento-grupo='lecturaInicial']").val(registro[contador].lecturaFinal);
      	  	form.find("input[elemento-grupo='lecturaInicial']").val(registro[contador].lecturaFinalStr);
         }
        
		/**
		 * Ocultar el loading
		 */
		_this.obj.tableGrupoApertura.removeClass("loading");
        
    	/**
    	 * Modificar altura del tbody de la tabla de contometros
    	 */
    	var contometroRegistros = moduloActual.obj.tableGrupoApertura.attr("data-contometro-registros");

    	if (numeroDetalles < contometroRegistros) {
    		moduloActual.obj.grupoApertura.css("height", numeroDetalles * 25);
    	}
    	
    }, 300);
    
};
  
moduloActual.llenarAperturaContometroJornada = function(registro) {
	
	//actualiza cabecera operador ay
	var numeroDetalles = registro.length;
	moduloActual.obj.cmpHoraInicio.val(moduloActual.obj.cmpDiaOperativoApertura.text());
	//se agrega moduloActual.obj.cmpDiaOperativoApertura.text() por req 9000003068
	moduloActual.obj.cmpObservacionApertura.val("");
	
	/**
	 * Modificar altura del tbody de la tabla de contometros
	 */
	var contometroRegistros = moduloActual.obj.tableGrupoApertura.attr("data-contometro-registros");

	if (numeroDetalles < contometroRegistros) {
		moduloActual.obj.grupoApertura.css("height", numeroDetalles * 25);
	}
	
	if (numeroDetalles > 0) {

		//operario
		try {
			$.ajax({
				type: constantes.PETICION_TIPO_GET,
				url: "./operario/recuperar", 
				contentType: moduloActual.TIPO_CONTENIDO, 
				data: {ID: parseInt(registro[0].jornada.idOperario1) },
				success: function(respuesta) {
			  		if (respuesta.estado) {
					  	var contenido = respuesta.contenido.carga.length;
					  
						if (contenido > 0) {
							var reg = respuesta.contenido.carga[0];
							var elemento1 =constantes.PLANTILLA_OPCION_SELECTBOX;
							elemento1 = elemento1.replace(constantes.ID_OPCION_CONTENEDOR, reg.id);
							elemento1 = elemento1.replace(constantes.VALOR_OPCION_CONTENEDOR, reg.nombreCompletoOperario);
							moduloActual.obj.cmpOperarioResponsable.empty().append(elemento1).val(reg.id).trigger('change');
							$('#cmpOperarioResponsable').prop('disabled', true);
						} 
					}
				},
				error: function(xhr,estado,error) {
					moduloActual.mostrarErrorServidor(xhr,estado,error); 
				}
			}); 
		} catch(error) {
			moduloActual.mostrarDepuracion(error.message);
		}

		//ayudante
		try {
			$.ajax({
				type: constantes.PETICION_TIPO_GET,
				url: "./operario/recuperar", 
				contentType: moduloActual.TIPO_CONTENIDO, 
				data: {ID: parseInt(registro[0].jornada.idOperario2) },
				success: function(respuesta) {
					if (respuesta.estado) {
						var contenido = respuesta.contenido.carga.length;

						if (contenido > 0) {
							var reg = respuesta.contenido.carga[0];
							var elemento1 =constantes.PLANTILLA_OPCION_SELECTBOX;
							elemento1 = elemento1.replace(constantes.ID_OPCION_CONTENEDOR, reg.id);
							elemento1 = elemento1.replace(constantes.VALOR_OPCION_CONTENEDOR, reg.nombreCompletoOperario);
							moduloActual.obj.cmpOperarioAyudante.empty().append(elemento1).val(reg.id).trigger('change');
							$('#cmpOperarioAyudante').prop('disabled', true);
						} 
					}
				},
				error: function(xhr,estado,error) {
					moduloActual.mostrarErrorServidor(xhr,estado,error); 
				}
			}); 
		} catch(error){
			moduloActual.mostrarDepuracion(error.message);
		}

	}
   
    this.obj.grupoApertura.removeAllForms();

	for (var contador = 0; contador < numeroDetalles; contador++) {      
		moduloActual.obj.grupoApertura.addForm();
	    var formulario = moduloActual.obj.grupoApertura.getForm(contador);
	    
	    if (!formulario) {
	    	continue;
	    }
    	
	    formulario.find("input[elemento-grupo='secuencia']").val(contador + 1);
	    formulario.find("input[elemento-grupo='contometro']").val(registro[contador].contometro.alias);
	    formulario.find("input[elemento-grupo='contometro']").attr("data-idContometro", registro[contador].contometro.id);
	    formulario.find("input[elemento-grupo='producto']").val(registro[contador].producto.nombre);  	  
	    formulario.find("input[elemento-grupo='producto']").attr("data-idProducto", registro[contador].producto.id);
	    formulario.find("input[elemento-grupo='lecturaInicial']").val(registro[contador].lecturaInicialStr);  
	    //formulario.find("input[elemento-grupo='lecturaInicial']").val(registro[contador].lecturaInicial);
	}
};

//llena el formularo de contometro jornada
moduloActual.llenarFormularioCierre = function(registro) {
	
	var _this = this;
	
	/**
	 * Mostrar el loading
	 */
	_this.obj.tableGrupoCierre.addClass("loading");
	var contometroRegistros = moduloActual.obj.tableGrupoCierre.attr("data-contometro-registros");
	moduloActual.obj.grupoCierre.css("height", contometroRegistros * 25);
	
	var numeroDetalles = registro.length;
	_this.obj.listCronometro = [];
	_this.obj.grupoCierre.removeAllForms();
	_this.obj.cmpObservacionCierre.val(registro[0].turno.observacion);
	_this.obj.cmpHoraCierre.val(utilitario.formatearTimestampToString(registro[0].turno.fechaHoraCierre));
	_this.obj.countListContometro = registro.length;
	
	
	setTimeout(function(){
		
		for (var contador = 0; contador < numeroDetalles; contador++) {  
			moduloActual.obj.grupoCierre.addForm();
			var form = moduloActual.obj.grupoCierre.getForm(contador);
			
			form.find("input[elemento-grupo='secuencia']").val(contador + 1);
			form.find("input[elemento-grupo='contometro']").val(registro[contador].contometro.alias);   	  
			form.find("input[elemento-grupo='contometro']").attr("data-idContometro", registro[contador].contometro.id); 
			form.find("input[elemento-grupo='producto']").val(registro[contador].producto.nombre);   	  
			form.find("input[elemento-grupo='producto']").attr("data-idProducto", registro[contador].producto.id); 
			form.find("input[elemento-grupo='lecturaInicial']").val(registro[contador].lecturaInicialStr);
			form.find("input[elemento-grupo='lecturaInicial']").attr("data-idDetalleTurno", registro[contador].id); 
			//form.find("input[elemento-grupo='lecturaInicial']").val(registro[contador].lecturaInicial);
			
			var list = new Array();
			list["contometro_alias"] = registro[contador].contometro.alias;
			list["lectura_inicial"] = registro[contador].lecturaInicialStr;
			_this.obj.listCronometro.push(list);
		}
		
		/**
		 * Ocultar el loading
		 */
		_this.obj.tableGrupoCierre.removeClass("loading");
		
		/**
		 * Modificar altura del tbody de la tabla de contometros
		 */
		var contometroRegistros = moduloActual.obj.tableGrupoCierre.attr("data-contometro-registros");
		
		if (numeroDetalles < contometroRegistros) {
			moduloActual.obj.grupoCierre.css("height", numeroDetalles * 25);
		}

	}, 300);
	
};

  /**
   * Detalle de Perfil de Horario
   * Solo en el primer elemento del array se coloco los datos del Perfil Horario
   */
  moduloActual.perfilDetalleHorario = function(registro) {
	  
	  var perfilDetalleHorario = null;
	  
	  try {
		  perfilDetalleHorario = registro[0].perfilHorario.lstDetalles[0];
	  } catch(error){
	
	  }
	
	  try {
		  perfilDetalleHorario = registro[0].lstDetalles[0];
	  } catch(error){
	
	  }
	
	  try {
		  perfilDetalleHorario = registro[0].turno.perfilHorario.lstDetalles[0];
	  } catch(error){
	
	  }
	  
	  return perfilDetalleHorario;
  };
  
  moduloActual.datosCabecera = function(registro) {
	  
	  var referenciaModulo = this;
	  var horaInicioFinTurno = null;
	  
	  var perfilDetalleHorario = moduloActual.perfilDetalleHorario(registro);
	  
	  if (typeof perfilDetalleHorario != null && referenciaModulo.modoEdicion == constantes.MODO_APERTURA_TURNO) {
		  horaInicioFinTurno = perfilDetalleHorario.horaInicioTurno;
	  } else if (typeof perfilDetalleHorario != null && referenciaModulo.modoEdicion == constantes.MODO_CIERRE_TURNO) {
		  horaInicioFinTurno = perfilDetalleHorario.horaFinTurno;
	  }
	  
	  try {
		  moduloActual.obj.numeroDecimalesContometro = registro[0].jornada.estacion.numeroDecimalesContometro;
	  } catch(error){
	
	  }
	  
	  //para pantalla apertura
	  moduloActual.obj.cmpClienteApertura.text($(referenciaModulo.obj.filtroOperacion).find("option:selected").attr('data-nombre-operacion') + " / " + $(referenciaModulo.obj.filtroOperacion).find("option:selected").attr('data-nombre-cliente') );
	  moduloActual.obj.cmpEstacion.text(moduloActual.obj.nombreEstacion);
	  moduloActual.obj.cmpDiaOperativoApertura.text(
		  utilitario.formatearFecha(referenciaModulo.obj.fechaOperativaSeleccionado)+ " " + horaInicioFinTurno
	  ); 
	  moduloActual.obj.cmpHoraInicio.val("");
	  var elemento1 = constantes.PLANTILLA_OPCION_SELECTBOX;
      elemento1 = elemento1.replace(constantes.ID_OPCION_CONTENEDOR, 0);
      elemento1 = elemento1.replace(constantes.VALOR_OPCION_CONTENEDOR, "SELECCIONAR...");
      moduloActual.obj.cmpOperarioResponsable.select2("val", null);
      moduloActual.obj.cmpOperarioAyudante.select2("val", null);      
      moduloActual.obj.cmpOperarioResponsable.empty().append(elemento1).val(0).trigger('change'); 	  
      moduloActual.obj.cmpOperarioAyudante.empty().append(elemento1).val(0).trigger('change');

  	  //para cierre
      moduloActual.obj.cmpClienteCierre.text($(referenciaModulo.obj.filtroOperacion).find("option:selected").attr('data-nombre-operacion') + " / " + $(referenciaModulo.obj.filtroOperacion).find("option:selected").attr('data-nombre-cliente') );
	  moduloActual.obj.cmpEstacionCierre.text(moduloActual.obj.nombreEstacion);
	  moduloActual.obj.cmpDiaOperativoCierre.text(
		  utilitario.formatearFecha(referenciaModulo.obj.fechaOperativaSeleccionado) + " " + horaInicioFinTurno
	  );
      
	  moduloActual.obj.cmpCierreEstacion.val(referenciaModulo.obj.estacionSeleccionado);
	  moduloActual.obj.cmpCierreResponsable.val(moduloActual.obj.responsableSeleccionado);
	  moduloActual.obj.cmpCierreAyudante.val(moduloActual.obj.ayudanteSeleccionado);

	  //para formulario vista
	  var operacionCliente=$(referenciaModulo.obj.filtroOperacion).find("option:selected").attr('data-nombre-operacion')+"/"+$(referenciaModulo.obj.filtroOperacion).find("option:selected").attr('data-nombre-cliente');
  	  this.obj.cmpVistaClienteOperacion.text(operacionCliente);
  	  moduloActual.obj.cmpVistaEstacion.text(referenciaModulo.obj.estacionSeleccionado);
  	  
	  moduloActual.obj.cmpVistaFInicio.text(utilitario.formatearTimestampToString(referenciaModulo.obj.fechaHoraInicioSeleccionado));
	  moduloActual.obj.cmpVistaFFinal.text(utilitario.formatearTimestampToString(referenciaModulo.obj.fechaHoraFinSeleccionado));
	  moduloActual.obj.cmpVistaResponsable.text(moduloActual.obj.responsableSeleccionado);
	  moduloActual.obj.cmpVistaAyudante.text(moduloActual.obj.ayudanteSeleccionado);
	  moduloActual.obj.cmpVistaEstado.text(constantes.ESTADOS_TURNO[referenciaModulo.obj.estadoSeleccionado]);
  };

  moduloActual.limpiarFormularioPrincipal = function(){
	  var referenciaModulo=this;
	  referenciaModulo.obj.frmApertura[0].reset();

	  var elemento1 =constantes.PLANTILLA_OPCION_SELECTBOX;
      elemento1 = elemento1.replace(constantes.ID_OPCION_CONTENEDOR, 0);
      elemento1 = elemento1.replace(constantes.VALOR_OPCION_CONTENEDOR, "SELECCIONAR...");

      moduloActual.obj.cmpIdVehiculo.select2("val", null);
      moduloActual.obj.cmpIdProducto.select2("val", null);
      moduloActual.obj.cmpIdContometro.select2("val", null);
      moduloActual.obj.cmpIdTanque.select2("val", null);

      moduloActual.obj.cmpIdVehiculo.empty().append(elemento1).val(0).trigger('change');
      moduloActual.obj.cmpIdProducto.empty().append(elemento1).val(0).trigger('change');
      moduloActual.obj.cmpIdContometro.empty().append(elemento1).val(0).trigger('change');
      moduloActual.obj.cmpIdTanque.empty().append(elemento1).val(0).trigger('change');
  };

  moduloActual.recuperarValores = function(registro) {
	  
    var eRegistro = {};
    var referenciaModulo = this;
    
    try {
    	
	    //datos para el despacho
	    eRegistro.idJornada = parseInt(referenciaModulo.idJornada);
	    eRegistro.idResponsable = parseInt(referenciaModulo.obj.cmpOperarioResponsable.val());
	    eRegistro.idAyudante = parseInt(referenciaModulo.obj.cmpOperarioAyudante.val());
	    eRegistro.estado = parseInt(constantes.TIPO_TURNO_ABIERTO);
	    eRegistro.idPerfilHorario = parseInt(referenciaModulo.obj.idPerfilHorarioSeleccionado);
	    eRegistro.cantidadTurnos = parseInt(referenciaModulo.cantidadTurnos);
	    
	    //detalle
	    eRegistro.turnoDetalles=[];
	    var numeroFormularios=0;
	    
	    if (referenciaModulo.modoEdicion == constantes.MODO_CIERRE_TURNO) {
	    	
	    	console.log("recuperarValores ::: 111111111");
	    	
	    	eRegistro.estado = parseInt(constantes.TIPO_TURNO_CERRADO);
	    	eRegistro.id = parseInt(referenciaModulo.obj.idTurnoSeleccionado);
	    	//eRegistro.fechaHoraCierre = utilitario.formatearStringToDateHour(referenciaModulo.obj.cmpDiaOperativoApertura.text() + " " + referenciaModulo.obj.cmpHoraCierre.val());
	    	eRegistro.fechaHoraCierre = utilitario.formatearStringToDateHour(referenciaModulo.obj.cmpHoraCierre.val());
	    	eRegistro.observacion = referenciaModulo.obj.cmpObservacionCierre.val().toUpperCase();
	        numeroFormularios = referenciaModulo.obj.grupoCierre.getForms().length;
	        
	        for(var contador = 0; contador < numeroFormularios; contador++){
	          var detalles={};
	          var formulario = referenciaModulo.obj.grupoCierre.getForm(contador);
	          var cmpElementoContometro     = formulario.find("input[elemento-grupo='contometro']").attr("data-idContometro");
	          var cmpElementoProducto     	= formulario.find("input[elemento-grupo='producto']").attr("data-idProducto");
	          var cmpElementoLecturaInicial = formulario.find("input[elemento-grupo='lecturaInicial']");
	          var cmpElementoLecturaFinal   = formulario.find("input[elemento-grupo='lecturaFinal']");
	          var cmpElementoId				= formulario.find("input[elemento-grupo='lecturaInicial']").attr("data-idDetalleTurno");
	          detalles.lecturaInicialStr  	= cmpElementoLecturaInicial.val().replaceAll(moduloActual.SEPARADOR_MILES,"");
	          //detalles.lecturaInicial  		= parseFloat(cmpElementoLecturaInicial.val().replaceAll(moduloActual.SEPARADOR_MILES,""));
	          //detalles.lecturaFinal  		= parseFloat(cmpElementoLecturaFinal.val().replaceAll(moduloActual.SEPARADOR_MILES,""));
	          detalles.lecturaFinalStr      = cmpElementoLecturaFinal.val().replaceAll(moduloActual.SEPARADOR_MILES, "");
	          detalles.idProducto  			= parseInt(cmpElementoProducto);
	          detalles.idContometro  		= parseInt(cmpElementoContometro);
	          detalles.id  					= parseInt(cmpElementoId);
	          detalles.idTurno				= parseInt(referenciaModulo.obj.idTurnoSeleccionado);
	          eRegistro.turnoDetalles.push(detalles);        
	        }	    	
	    } else {
	    	
	    	console.log("recuperarValores ::: 22222222");

	    	eRegistro.estado = parseInt(constantes.TIPO_TURNO_ABIERTO);
	    	//eRegistro.fechaHoraApertura = utilitario.formatearStringToDateHour(referenciaModulo.obj.cmpDiaOperativoApertura.text() + " " + referenciaModulo.obj.cmpHoraInicio.val());
	    	eRegistro.fechaHoraApertura = utilitario.formatearStringToDateHour(referenciaModulo.obj.cmpHoraInicio.val());
	    	eRegistro.observacion = referenciaModulo.obj.cmpObservacionApertura.val().toUpperCase();
	        numeroFormularios = referenciaModulo.obj.grupoApertura.getForms().length;
	        
	        for(var contador = 0; contador < numeroFormularios; contador++) {
	          var detalles = {};
	          var formulario = referenciaModulo.obj.grupoApertura.getForm(contador);
	          var cmpElementoContometro = formulario.find("input[elemento-grupo='contometro']").attr("data-idContometro");
	          var cmpElementoProducto = formulario.find("input[elemento-grupo='producto']").attr("data-idProducto");
	          var cmpElementoLecturaInicial = formulario.find("input[elemento-grupo='lecturaInicial']");	          
	          //detalles.lecturaInicial = parseFloat(cmpElementoLecturaInicial.val().replaceAll(moduloActual.SEPARADOR_MILES, ""));
	          detalles.lecturaInicialStr = cmpElementoLecturaInicial.val().replaceAll(moduloActual.SEPARADOR_MILES, "");
	          detalles.idProducto = parseInt(cmpElementoProducto);
	          detalles.idContometro = parseInt(cmpElementoContometro);
	          eRegistro.turnoDetalles.push(detalles);          
	        }
	    }
	        
    } catch (error) {
      console.log(error.message);
    }
    
    return eRegistro;
  };
  
  moduloActual.validarCierre = function(retorno) {

	  referenciaModulo = this;
	  retorno = true;
	  
	  try {   
		  
		  if(referenciaModulo.obj.cmpHoraCierre.val().length == 0) {
			  referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, "Debe de ingresar el campo Hora Cierre.");
			  return false;
		  }
		  
	    var numeroFormularios = referenciaModulo.obj.grupoCierre.getForms().length;
	    
	    for(var contador = 0; contador < numeroFormularios; contador++) {
	    	var formulario = referenciaModulo.obj.grupoCierre.getForm(contador);
	    	var cmpElementoLecturaFinal = formulario.find("input[elemento-grupo='lecturaFinal']");
	    	var cmpElementoLecturaInicial = formulario.find("input[elemento-grupo='lecturaInicial']");
	    	var lecturaIni = moduloActual.eliminaSeparadorComa(cmpElementoLecturaInicial.val());
	    	var lenturaFin = moduloActual.eliminaSeparadorComa(cmpElementoLecturaFinal.val()); 
	          	
	    	if(lenturaFin==null || lenturaFin.length==0) {
    		//if(lenturaFin==null || lenturaFin.length==0 || parseFloat(lenturaFin)<=0) {
	    		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, "Debe de ingresar la lectura final correcta del cont\u00f3metro. (Fila " + (contador + 1) + ")");
	    		referenciaModulo.obj.modalConfirmacionAccion.modal("hide");
	    		return false;
    		}
	    	
	    	var diferencia = parseFloat(lenturaFin) - parseFloat(lecturaIni); 
	    	if(diferencia < 0){
	    		referenciaModulo.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, "La diferencia de lectura no debe ser negativa.");
	    		referenciaModulo.obj.modalConfirmacionAccion.modal("hide");
	    		return false;
	    	}  
	      }

	  } catch(error){
		  console.log(error.message);	      
	  };
	  
	  return retorno;
	  
  };

//========================== llenarTanquesApertura ============================================================ 
  moduloActual.llenarTanquesApertura = function(registro){
    var indice = registro.tanqueJornada.length;
    var filaNueva 	= $('#grillaApertura');
    $('#grillaApertura').html("");
    g_tr = '<thead><tr><th class="text-center">Tanque				</th>' +
    				  '<th class="text-center">Producto				</th>' + 
    				  '<th class="text-center">Vol. Obs. Inicial	</th>' + 
    				  '<th class="text-center">Vol. 60F Inicial		</th></tr></thead>'; 
    filaNueva.append(g_tr);

    for(var j=0; j < indice; j++){ 	
		 g_tr  = '<tr><td class="text-left" style="width:20%;">'   	 + registro.tanqueJornada[j].descripcionTanque			+ '</td>' + 
 				 '    <td class="text-left" style="width:40%;">'   	 + registro.tanqueJornada[j].producto.nombre  			+ '</td>' + 
 				 '    <td class="text-right" style="width:20%;">'    + registro.tanqueJornada[j].volumenObservadoInicial  	+ '</td>' + 
 				 '    <td class="text-right"	style="width:20%;">' + registro.tanqueJornada[j].volumenCorregidoInicial 	+ '</td></tr>'; 
		 filaNueva.append(g_tr);
	}
};

//========================== llenarTanquesCierre ============================================================ 
moduloActual.llenarTanquesCierre = function(registro){
  var indice = registro.tanqueJornada.length;
  var filaNueva = $('#grillaCierre');
  $('#grillaCierre').html("");
  g_tr = '<thead><tr><th class="text-center">Tanque				</th>' +
  				  '<th class="text-center">Producto				</th>' + 
  				  '<th class="text-center">Vol. Obs. Inicial	</th>' + 
  				  '<th class="text-center">Vol. 60F Inicial		</th></tr></thead>'; 
  filaNueva.append(g_tr);

  for(var j=0; j < indice; j++){ 	
	 g_tr  = '<tr><td class="text-left"  style="width:20%;">' + registro.tanqueJornada[j].descripcionTanque			+ '</td>' + 
			 '    <td class="text-left"  style="width:40%;">' + registro.tanqueJornada[j].producto.nombre  			+ '</td>' + 
			 '    <td class="text-right" style="width:20%;">' + registro.tanqueJornada[j].volumenObservadoInicial  	+ '</td>' + 
			 '    <td class="text-right" style="width:20%;">' + registro.tanqueJornada[j].volumenCorregidoInicial 	+ '</td></tr>'; 
	 filaNueva.append(g_tr);
  }
};

//========================== cntVistaFormulario ============================================================ 
  moduloActual.llenarDetalles = function(registro) {
		
		var turno = registro[0].turno;	
	    var contometro = "";
	    var producto = "";
	    var lecturaInicial = "";
	    var lecturaFinal = "";
	    var filaNueva = "";
	    var diferenciaVolumen = 0;
	    
	    if(registro != null) {
		    var indice= registro.length;		    
		    $("#tablaVistaDetalle tbody").empty();
		    //$("#tablaVistaDetalle tr").remove(); 
		    for (var k = 0; k < indice; k++) {
		    	contometro=registro[k].contometro.alias;		    	
		    	producto=registro[k].producto.nombre;
		    	lecturaInicial= registro[k].lecturaInicialStr;
		    	lecturaFinal= registro[k].lecturaFinalStr;
		    	
		    	diferenciaVolumen = trailingZerosDiferencia(registro[k].lecturaInicialStr, registro[k].lecturaFinalStr);	
		    	filaNueva='<tr><td>'+contometro+'</td>'
		    	+'<td class="text-left">'+producto+'</td>'
		    	+'<td class="text-right">'+lecturaInicial+'</td>'
		    	+'<td class="text-right">'+lecturaFinal+'</td>'
		    	+'<td class="text-right">'+diferenciaVolumen+'</td></tr>';
		    	$("#tablaVistaDetalle > tbody:last").append(filaNueva);
		    }
		    
		    this.obj.cmpVistaObservacion.text(turno.observacion);
     	    //Vista de auditoria
		    this.obj.vistaActualizadoEl.text(turno.fechaActualizacion);
		    this.obj.vistaActualizadoPor.text(turno.usuarioActualizacion);
		    this.obj.vistaIPActualizacion.text(turno.ipActualizacion);
		    this.obj.vistaIPCreacion.text(turno.ipCreacion);		    
		    this.obj.vistaCreadoEl.text(turno.fechaCreacion);
		    this.obj.vistaCreadoPor.text(turno.usuarioCreacion);		    
	    } else {
	    	$("#tablaVistaDetalle tbody tr").remove();
	    	this.obj.vistaActualizadoEl.text("");
		    this.obj.vistaActualizadoPor.text("");
		    this.obj.vistaIpActualizacion.text("");
	    }
  };

  function delay(callback, ms) {
      var timer = 0;
      return function() {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
              callback.apply(context, args);
          }, ms || 0);
      };
  }
  
  function trailingZerosDiferencia(lecturaInicialStr, lecturaFinalStr) {
		
    var different = lecturaFinalStr - lecturaInicialStr;
	different = Math.round(different * 100000) / 100000;
	
	var lecturaInicialArray = lecturaInicialStr.toString().split(".");
	var decimalLecturaInicial = lecturaInicialArray[1];
	
	if (different.toString() == "0") {
		return "0.000000".substring(0, (decimalLecturaInicial.length + 2));
	}
	
	if (different.toString().indexOf(".") < 0 || !different.toString().split(".").length >= 2) {
		return different;
	}
	
	var differentArray = different.toString().split(".");
	var integerDifferent = differentArray[0];
	var decimalDifferent = differentArray[1];
	
	if (decimalDifferent.length < decimalLecturaInicial.length) {
		while (decimalDifferent.length < decimalLecturaInicial.length) {
			decimalDifferent = decimalDifferent + "0";
		}
		return integerDifferent + "." + decimalDifferent;
	}

	return integerDifferent + "." + decimalDifferent.substring(0, decimalLecturaInicial.length);
  }
  
	function mathRoundDiferencia(num) {
		
		var decimalesContometro = (_this.obj.numeroDecimalesContometro + 1);
		var roundPad = "1000000".substring(0, decimalesContometro);
		roundPad = parseInt(roundPad);
		
		return Math.round(num * roundPad) / roundPad;
	}
	
  moduloActual.inicializar();
});


