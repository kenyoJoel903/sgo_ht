/**
 * Agregado por req 9000003068
 */
$(document).ready(function(){
	var moduloActual = new moduloBase();
	
	moduloActual.urlBase='perfilHorario';
	moduloActual.URL_LISTAR = moduloActual.urlBase + '/listar';
	moduloActual.URL_RECUPERAR = moduloActual.urlBase + '/recuperar';
	moduloActual.URL_GUARDAR = moduloActual.urlBase + '/crear';
	moduloActual.URL_ACTUALIZAR = moduloActual.urlBase + '/actualizar';
	moduloActual.URL_ACTUALIZAR_ESTADO = moduloActual.urlBase + '/actualizarEstado';
	moduloActual.ordenGrilla=[[ 2, 'asc' ]];
		
	moduloActual.columnasGrilla.push({ "data": 'id'}); 					//Target1
	moduloActual.columnasGrilla.push({ "data": 'nombrePerfil'});		//Target2
	moduloActual.columnasGrilla.push({ "data": 'numeroTurnos'});		//Target3
	moduloActual.columnasGrilla.push({ "data": 'usuarioActualizacion'});		//Target4
	moduloActual.columnasGrilla.push({ "data": 'fechaActualizacion'});	//Target5
	moduloActual.columnasGrilla.push({ "data": 'estado'});				//Target6
	
	moduloActual.definicionColumnas.push({ "targets": 1,  "searchable": true, "orderable": true, "visible":false });
	moduloActual.definicionColumnas.push({ "targets": 2,  "searchable": true, "orderable": true, "visible":true  });
	moduloActual.definicionColumnas.push({ "targets": 3,  "searchable": true, "orderable": true, "visible":true, "className": "text-right"  });
	moduloActual.definicionColumnas.push({ "targets": 4,  "searchable": true, "orderable": true, "visible":true, "className": "text-center" });
	moduloActual.definicionColumnas.push({ "targets": 5,  "searchable": true, "orderable": true, "visible":true, "className": "text-center" });
	moduloActual.definicionColumnas.push({ "targets": 6,  "searchable": true, "orderable": true, "visible":true, "render": utilitario.formatearEstado });
	
	moduloActual.grillaDespuesSeleccionar= function(indice){
		var referenciaModulo=this;
		var estadoRegistro = referenciaModulo.obj.datClienteApi.cell(indice,6).data();
		referenciaModulo.estadoRegistro=estadoRegistro;
		if (estadoRegistro == constantes.ESTADO_ACTIVO) {
			referenciaModulo.obj.btnModificarEstado.html('<i class="fa fa-cloud-download"></i> '+constantes.TITULO_DESACTIVAR_REGISTRO);			
		} else {
			referenciaModulo.obj.btnModificarEstado.html('<i class="fa fa-cloud-upload"></i> '+constantes.TITULO_ACTIVAR_REGISTRO);			
	    }
	};
	
	moduloActual.llenarDetalles = function(registro){
		this.idRegistro= registro.id;
		
		this.obj.vistaId.text(this.idRegistro);
	    this.obj.vistaNombre.text(registro.nombrePerfil);
	    this.obj.vistaNumeroTurno.text(registro.numeroTurnos);
	    
	    this.obj.vistaCreadoEl.text(registro.fechaCreacion);
	    this.obj.vistaCreadoPor.text(registro.usuarioCreacion);
	    this.obj.vistaActualizadoEl.text(registro.fechaActualizacion);
	    this.obj.vistaActualizadoPor.text(registro.usuarioActualizacion);
	    this.obj.vistaIpCreacion.text(registro.ipCreacion);
	    this.obj.vistaIpActualizacion.text(registro.ipActualizacion);
	    
	    console.log('1');
	    
	    $("#tablaVistaDetalle tbody tr").remove();
	    if(registro.lstDetalles != null){
	    	var indice= registro.lstDetalles.length;
	    	
	    	console.log('indice: ' + indice);
	    	
	    	$("#tablaVistaDetalle tbody").empty();
		    for(var k = 0; k < indice; k++){ 
		    	numeroOrden=registro.lstDetalles[k].numeroOrden;
		    	glosaTurno=registro.lstDetalles[k].glosaTurno;
		    	horaInicioTurno=registro.lstDetalles[k].horaInicioTurno;
		    	horaFinTurno=registro.lstDetalles[k].horaFinTurno;
		    	
		    	filaNueva='<tr><td class="text-right">'+numeroOrden+'</td><td class="text-left">'+glosaTurno+'</td><td class="text-center">'+horaInicioTurno+'</td><td class="text-center">'+horaFinTurno+'</td></tr>';
		    	
		    	$("#tablaVistaDetalle > tbody:last").append(filaNueva);
		    }
	    }
	};
	
	moduloActual.resetearFormulario = function(){
		
		var referenciaModulo=this;
		referenciaModulo.obj.frmPrincipal[0].reset();
		
		moduloActual.obj.cmpNombre.val('');
	    moduloActual.obj.cmpNroTurnos.val(0);
	    
	    this.obj.GrupoPerfilDetalle.removeAllForms();
		
	};
	
	moduloActual.reglasValidacionFormulario={ 
		cmpNombre: 		{ required: true, maxlength: 60,},
		cmpNroTurnos:	{ required: true, maxlength: 3,}
	};
	
	moduloActual.mensajesValidacionFormulario={
		cmpPlaca: 				{ required: "El campo Nombre es obligatorio", maxlength: "El campo Placa debe contener 60 caracteres como m&aacute;ximo." },		
		cmpTarjetaCubicacion:	{ required: "El número de turnos es un dato obligatorio", maxlength: "El campo Número de Turno debe contener 3 caracteres como m&aacute;ximo." }
	};
	
	moduloActual.inicializarCampos= function(){
		
		this.obj.vistaId=$("#vistaId");
		this.obj.vistaNombre=$("#vistaNombre");
		this.obj.vistaNumeroTurno=$("#vistaNumeroTurno");
		
		this.obj.vistaCreadoEl=$("#vistaCreadoEl");
		this.obj.vistaCreadoPor=$("#vistaCreadoPor");
		this.obj.vistaActualizadoPor=$("#vistaActualizadoPor");
		this.obj.vistaActualizadoEl=$("#vistaActualizadoEl");
		this.obj.vistaIpCreacion=$("#vistaIpCreacion");
		this.obj.vistaIpActualizacion=$("#vistaIpActualizacion");
		
		this.obj.cmpNombre=$("#cmpNombre");
		
		this.obj.btnGuardarTurno=$("#btnGuardarTurno");
		
		this.obj.cmpNroTurnos=$("#cmpNroTurnos");
		this.obj.cmpNroTurnos.inputmask('integer');
		this.obj.cmpNroTurnos.css("text-align","left");
		
		this.obj.btnAgregarTurno=$("#btnAgregarTurno");

		this.obj.GrupoPerfilDetalle = $('#GrupoPerfilDetalle').sheepIt({
		    separator: '',
		    allowRemoveLast: true,
		    allowRemoveCurrent: true,
		    allowRemoveAll: true,
		    allowAdd: true,
		    allowAddN: false,
		    minFormsCount: 0,
		    iniFormsCount: 0,
		    afterAdd: function(origen, formularioNuevo) {
		    	
		    	var cmpId			=	$(formularioNuevo).find("input[elemento-grupo='idPerfilDetalleHorario']");
		    	var cmpTurno		=	$(formularioNuevo).find("input[elemento-grupo='numeroOrden']");
		    	var cmpHoraInicio	=	$(formularioNuevo).find("input[elemento-grupo='horaInicioTurno']");
		    	var cmpHoraFin		=	$(formularioNuevo).find("input[elemento-grupo='horaFinTurno']");
		    	var cmpElimina		=	$(formularioNuevo).find("[elemento-grupo='botonElimina']");
		    	
		    	var nroTurno = moduloActual.obj.GrupoPerfilDetalle.getFormsCount();		    	
		    	
		    	cmpId.val(0);
		    	
		    	cmpTurno.val(nroTurno);
		    	
		    	cmpHoraInicio.inputmask("h:s");
		    	cmpHoraFin.inputmask("h:s");
		    	
		        cmpElimina.on("click", function(){
		            try{
			          	moduloActual.indiceFormulario = ($(formularioNuevo).attr('id')).substring(27);
			          	
			          	moduloActual.obj.GrupoPerfilDetalle.removeForm(moduloActual.indiceFormulario);
			          	  var numeroDetalles = moduloActual.obj.GrupoPerfilDetalle.getFormsCount();
			          	  console.log("numeroDetalles " + numeroDetalles);
			          	  for(var contador=0; contador < numeroDetalles; contador++){
			      			var fila= moduloActual.obj.GrupoPerfilDetalle.getForm(contador);
			      			fila.find("input[elemento-grupo='numeroOrden']").val(contador+1); // contador
			      	  	  }
			          	  
		            } catch(error){
		              console.log(error.message);
		            }
		          });
		    }	    
		});
		
		this.obj.btnAgregarTurno.on("click",function(){
		    try {
		    	
		    	var nroTurnos = $("#cmpNroTurnos").val();
		    	
		    	if(nroTurnos == ''){
		    		moduloActual.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, "El número de turnos es un dato obligatorio");
		    	}else{
		    		var numeroDetalles = moduloActual.obj.GrupoPerfilDetalle.getFormsCount();
			    	
			    	if(parseInt(nroTurnos) > numeroDetalles ){
			    		moduloActual.obj.GrupoPerfilDetalle.addForm();
			    	}else{
			    		moduloActual.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, "No se puede agregar más de " + nroTurnos + " turnos");
			    	}
		    	}

		    } catch(error){
		    	moduloActual.mostrarDepuracion(error.message);
		    };
		});
		
		moduloActual.obj.btnGuardarTurno.on(constantes.NOMBRE_EVENTO_CLICK, function() {
			
			try {
				var mensajeError = moduloActual.validarFormPerfilHorario();
		        console.log('mensajeError: ' + mensajeError);
				if (mensajeError == '') {
					moduloActual.iniciarGuardar();
				} else {
					moduloActual.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, mensajeError);
				}
			} catch (error) {
				moduloActual.mostrarDepuracion(error.message);
				moduloActual.actualizarBandaInformacion(constantes.TIPO_MENSAJE_ERROR, error.message);
			};
		});
		
		moduloActual.validarFormPerfilHorario = function() {
			
			referenciaModulo = this;
			
			var nombre = $("#cmpNombre").val();
			
			if(nombre == '') return "Debe ingresar el nombre";
			
			var nroTurnos = $("#cmpNroTurnos").val();
			
			if(nroTurnos == '') return "El número de turnos es un dato obligatorio";
			
			var numeroFormularios = referenciaModulo.obj.GrupoPerfilDetalle.getForms().length;
			
			if(parseInt(nroTurnos) == 0) return "El número de turnos debe ser mayor a cero";
			
			if(parseInt(nroTurnos) != numeroFormularios) return "El nro. de registros de detalle no coincide con el indicado, por favor verifique";
			
			for(var contador = 0; contador < numeroFormularios;contador++){
				var formulario = referenciaModulo.obj.GrupoPerfilDetalle.getForm(contador);  
								
				var cmpNumeroOrden	=	formulario.find("input[elemento-grupo='numeroOrden']");
		    	var cmpGlosa		=	formulario.find("input[elemento-grupo='glosaTurno']");
		    	var cmpHoraInicio	=	formulario.find("input[elemento-grupo='horaInicioTurno']");
		    	var cmpHoraFin		=	formulario.find("input[elemento-grupo='horaFinTurno']");
		    	
		    	if(cmpGlosa.val() == '') return "En el turno No. " + cmpNumeroOrden.val() + ", Debe llenar la Observación";		    	
		    	
		    	if(cmpHoraInicio.val() == '') return "En el turno No. " + cmpNumeroOrden.val() + ", Debe llenar la Hora Inicio";
		    	if(cmpHoraFin.val() == '') return "En el turno No. " + cmpNumeroOrden.val() + ", Debe llenar la Hora Fin";
		    	
		    	if(cmpHoraFin.val() <= cmpHoraInicio.val()) return "En el turno No. " + cmpNumeroOrden.val() + ", la hora de inicio debe ser menor a la hora fin";
			}
			
			return "";
			
		};
		
	};
	
	moduloActual.recuperarValores = function(registro){
		
		 var eRegistro = {};
		 var referenciaModulo=this;
		 
		 try {
			 eRegistro.id = parseInt(referenciaModulo.idRegistro);
		     eRegistro.nombrePerfil =  	referenciaModulo.obj.cmpNombre.val();
		     
		     eRegistro.numeroTurnos = 	parseInt(referenciaModulo.obj.cmpNroTurnos.val());
		     
		     eRegistro.lstDetalles=[];
		     
		     var numeroFormularios = referenciaModulo.obj.GrupoPerfilDetalle.getForms().length;
		     for(var contador = 0; contador < numeroFormularios;contador++){
		    	 var detalle={};
		    	 
		    	 var formulario= moduloActual.obj.GrupoPerfilDetalle.getForm(contador);
		    	 
		    	 var cmpId			=	formulario.find("input[elemento-grupo='idPerfilDetalleHorario']");
		    	 var cmpNumeroOrden	=	formulario.find("input[elemento-grupo='numeroOrden']");
			     var cmpGlosa		=	formulario.find("input[elemento-grupo='glosaTurno']");
			     var cmpHoraInicio	=	formulario.find("input[elemento-grupo='horaInicioTurno']");
			     var cmpHoraFin		=	formulario.find("input[elemento-grupo='horaFinTurno']");
		    	 
			     detalle.id					=	parseInt(cmpId.val());
			     detalle.numeroOrden		=	parseInt(cmpNumeroOrden.val());
			     detalle.glosaTurno			=	cmpGlosa.val();
			     detalle.horaInicioTurno	=	cmpHoraInicio.val();
			     detalle.horaFinTurno		=	cmpHoraFin.val();
		    	 
		    	 eRegistro.lstDetalles.push(detalle);
		     }

			 console.log(eRegistro);
		 } catch(error){
			 referenciaModulo.mostrarDepuracion(error.message);
		 }
		 return eRegistro;
	};
	
	moduloActual.llenarFormulario = function(registro){
		
		 this.idRegistro= registro.id;
		
		 this.obj.cmpNombre.val(registro.nombrePerfil);
		 this.obj.cmpNroTurnos.val(registro.numeroTurnos);
		 
		 this.obj.GrupoPerfilDetalle.removeAllForms();
		 
		 if (registro.lstDetalles != null) {
			 
			var detalles = registro.lstDetalles.length;
			
		 	for(var contador=0; contador < detalles;contador++){
		 		this.obj.GrupoPerfilDetalle.addForm();
				var formulario= this.obj.GrupoPerfilDetalle.getForm(contador);
		        formulario.find("input[elemento-grupo='idPerfilDetalleHorario']").val(registro.lstDetalles[contador].id);
		        formulario.find("input[elemento-grupo='numeroOrden']").val(registro.lstDetalles[contador].numeroOrden);
		        formulario.find("input[elemento-grupo='glosaTurno']").val(registro.lstDetalles[contador].glosaTurno);
		        formulario.find("input[elemento-grupo='horaInicioTurno']").val(registro.lstDetalles[contador].horaInicioTurno);
		        formulario.find("input[elemento-grupo='horaFinTurno']").val(registro.lstDetalles[contador].horaFinTurno);
	        }

		 }
		
	};
	
	moduloActual.inicializar();

});