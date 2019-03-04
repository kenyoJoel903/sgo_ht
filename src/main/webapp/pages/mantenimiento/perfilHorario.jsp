<!-- Agregado por req 9000003068-->
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.HashMap"%>
<% HashMap<?,?> mapaValores = (HashMap<?,?>) request.getAttribute("mapaValores"); %>

<!-- Contenedor de pagina-->
<div class="content-wrapper">
	<section class="content-header">
		<h1> Perfil Horario / <small id="tituloSeccion"><%=mapaValores.get("TITULO_LISTADO_REGISTROS")%></small></h1>
	</section>
	<section class="content" id="cntInterface">
		<div class="row">
			<div class="col-xs-12">
				<div id="bandaInformacion" class="callout callout-success">
					<%=mapaValores.get("MENSAJE_CARGANDO")%>
				</div>
			</div>
		</div>
		<div class="row" id="cntTabla">
			<div class="col-xs-12">
				<div class="box">
					<!-- BOTONES PARA EL MANTENIMIENTO -->
					<div class="box-header">
						<div>
						  <a id="btnAgregar" class="btn btn-default btn-sm espaciado"><i class="fa fa-plus"></i>  <%=mapaValores.get("ETIQUETA_BOTON_AGREGAR")%></a>
			              <a id="btnModificar" class="btn btn-default btn-sm disabled espaciado"><i class="fa fa-edit"></i>  <%=mapaValores.get("ETIQUETA_BOTON_MODIFICAR")%></a>
			              <a id="btnModificarEstado" class="btn btn-default btn-sm disabled espaciado"><i class="fa fa-cloud-upload"></i>  <%=mapaValores.get("ETIQUETA_BOTON_ACTIVAR")%></a>
			              <a id="btnVer" class="btn btn-default btn-sm disabled espaciado"><i class="fa fa-search"></i>  <%=mapaValores.get("ETIQUETA_BOTON_VER")%></a>
						</div>
					</div>
					<div class="box-body">
						<table id="tablaPrincipal" class="sgo-table table table-striped" style="width:100%;">
							<thead>
								<tr>
									<th>#</th>
									<th>ID</th>
									<th>Nombre</th>
									<th>Nro. Turnos</th>
									<th>Usuario</th>
									<th>Ult. Actualización</th>
									<th>Estado</th>
								</tr>
							</thead>
						</table>
						<div id="frmConfirmarModificarEstado" class="modal" data-keyboard="false" data-backdrop="static">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
										<h4 class="modal-title"><%=mapaValores.get("TITULO_VENTANA_MODAL")%></h4>
									</div>
									<div class="modal-body">
										<p><%=mapaValores.get("MENSAJE_CAMBIAR_ESTADO")%></p>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default pull-left" data-dismiss="modal"><%=mapaValores.get("ETIQUETA_BOTON_CERRAR")%></button>
										<button id="btnConfirmarModificarEstado" type="button" class="btn btn-primary"><%=mapaValores.get("ETIQUETA_BOTON_CONFIRMAR")%></button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="overlay" id="ocultaContenedorTabla">
		              <i class="fa fa-refresh fa-spin"></i>
		            </div>
				</div>
			</div>
		</div>
		<div class="row" id="cntFormulario" style="display: none;">
			<div class="col-md-12">
				<div class="box box-default">
				
					<div class="box-body">
						<form id="frmPrincipal" role="form">
							<div class="form-group">
								<label  class="control-label" for="cmpPlaca">Nombre</label> 
								<input name="cmpNombre" id="cmpNombre" type="text" class="form-control text-uppercase input-sm" maxlength="60" required placeholder="Nombre" />
								<input type="hidden" id="cmpEstacionesAsociadas" name="cmpEstacionesAsociadas"/> 
							</div>	
							<div class="form-group">
								<label  class="control-label" for="cmpPlaca">Número de Turnos</label> 
								<input name="cmpNroTurnos" id="cmpNroTurnos" type="text" class="form-control text-uppercase input-sm" maxlength="3" required placeholder="Número de Turnos" />
							</div>	
						</form>
						<label>Nota: La jornada diaria empieza el día cuya hora es el inicio del turno 1 y finaliza al cierre del último turno, la hora debe utilizar el formato 0:00 a 24:00 hr</label> 
						<table class="sgo-simple-table table table-condensed" style="width:100%;">
							<thead>
			      				<tr>
			      				<td class="celda-cabecera-detalle"><label class="etiqueta-titulo-horizontal">Nro. Turno</label></td>
			      				<td class="celda-cabecera-detalle"><label class="etiqueta-titulo-horizontal">Observación</label></td>
			      				<td class="celda-cabecera-detalle"><label class="etiqueta-titulo-horizontal">Hora Inicio</label></td>
			      				<td class="celda-cabecera-detalle"><label class="etiqueta-titulo-horizontal">Hora Fin</label></td>			      				
			      				<td class="celda-cabecera-detalle"></td>
			      				</tr>
			      			</thead>
			      			<tbody id="GrupoPerfilDetalle">
			      				<tr id="GrupoPerfilDetalle_template">
			      					<td class="celda-detalle">
			      						<input elemento-grupo="idPerfilDetalleHorario" id="GrupoPerfilDetalle_#index#_IdPerfilDetalleHorario" name="perfilDetalle[detalle][#index#][idPerfilDetalleHorario]" type="hidden" class="form-control input-sm text-right" readonly value="1" />
      									<input elemento-grupo="numeroOrden" id="GrupoPerfilDetalle_#index#_NumeroOrden" name="perfilDetalle[detalle][#index#][numeroOrden]" type="text" class="form-control input-sm text-right" readonly value="1" />
			      					</td>
			      					<td class="celda-detalle">
			      						<input elemento-grupo="glosaTurno" id="GrupoPerfilDetalle_#index#_GlosaTurno" name="perfilDetalle[detalle][#index#][glosaTurno]" type="text" class="form-control input-sm text-left" maxlength="25" value="" />
			      					</td>
			      					<td class="celda-detalle">
			      						<input elemento-grupo="horaInicioTurno" id="GrupoPerfilDetalle_#index#_HoraInicioTurno" name="perfilDetalle[detalle][#index#][horaInicioTurno]" type="text" class="form-control input-sm text-center" maxlength="8" value="" />
			      					</td>
			      					<td class="celda-detalle">
			      						<input elemento-grupo="horaFinTurno" id="GrupoPerfilDetalle_#index#_HoraFinTurno" name="perfilDetalle[detalle][#index#][horaFinTurno]" type="text" class="form-control input-sm text-center" maxlength="8" value="" />
			      					</td>
			      					<td class="celda-detalle">
			      						<a elemento-grupo="botonElimina" id="GrupoPerfilDetalle_#index#_elimina" class="btn btn-default btn-sm" style="width:100%;display:inline-block"><i class="fa fa-remove"></i></a>
			      					</td>
			      				</tr>
			      				<tr id="GrupoPerfilDetalle_noforms_template">
			      					<td></td>
			      				</tr>  
			      			</tbody>
						</table>
					</div>
				
					<div class="box-footer">
						<a id="btnConfirmGuardarTurno" class="btn btn-primary btn-sm"><i class="fa fa-save"></i>  <%=mapaValores.get("ETIQUETA_BOTON_GUARDAR")%></a>
			            <a id="btnAgregarTurno" class="btn bg-purple btn-sm"><i class="fa fa-plus-circle"></i>  Agregar Turno</a>
			            <a id="btnCancelarGuardar" class="btn btn-danger btn-sm"><i class="fa fa-close"></i>  <%=mapaValores.get("ETIQUETA_BOTON_CANCELAR")%></a>
					</div>
					
					
					<div class="overlay" id="ocultaContenedorFormulario">
						<i class="fa fa-refresh fa-spin"></i>
					</div>
				</div>
			</div>
		</div>
		
		<div class="row" id="cntVistaRegistro" style="display: none;">
			<div class="col-md-12">
				<div class="box box-default">
					<div class="box-header with-border">
						<h3 class="box-title">Detalle del registro</h3>
					</div>
					<div class="box-body">
						<table class="sgo-table table table-striped" style="width:100%;">
							<tbody>
								<tr>
									<td>Id:</td>
									<td><span id='vistaId'></span></td>
								</tr>
								<tr>
									<td>Nombre:</td>
									<td><span id='vistaNombre'></span></td>
								</tr>
								<tr>
									<td>Número de Turno:</td>
									<td><span id='vistaNumeroTurno'></span></td>
								</tr>
								<tr>
									<td>Creado el:</td>
									<td><span id='vistaCreadoEl'></span></td>
								</tr>
								<tr>
									<td>Creado por:</td>
									<td><span id='vistaCreadoPor'></span></td>
								</tr>
								<tr>
									<td>Actualizado por:</td>
									<td><span id='vistaActualizadoPor'></span></td>
								</tr>
								<tr>
									<td>Actualizado El:</td>
									<td><span id='vistaActualizadoEl'></span></td>
								</tr>
								<tr>
									<td>IP (Creación):</td>
									<td><span id='vistaIpCreacion'></span></td>
								</tr>
								<tr>
									<td>IP (Actualizacion):</td>
									<td><span id='vistaIpActualizacion'></span></td>
								</tr>
							</tbody>
						</table>
						<table id="tablaVistaDetalle" class="sgo-table table table-striped" style="width:100%;">
			              	<thead>
			              		<tr>
					                <th>Nro. Turno</th>
					                <th>Observación</th>
					                <th>Hora Inicio</th>
					                <th>Hora Fin</th>
				            	</tr>
			             	</thead>
			             	<tbody>							
							</tbody>
			            </table>
					</div>
					<div class="box-footer">
						<button id="btnCerrarVista"  class="btn btn-danger btn-sm"><%=mapaValores.get("ETIQUETA_BOTON_CERRAR")%></button>
					</div>
					<div class="overlay" id="ocultaContenedorVista">
			            <i class="fa fa-refresh fa-spin"></i>
			        </div>
				</div>
			</div>
		</div>
		
		
	</section>
</div>

<!-- Inicio Agregado por 9000003068 -->
<div id="frmConfirmarGuardarPerfil" class="modal" data-keyboard="false" data-backdrop="static">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title"><%=mapaValores.get("TITULO_VENTANA_MODAL")%></h4>
			</div>
			<div class="modal-body">
				<p><span id="cmpMensajeConfirmGuardarPerfil"></span></p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cerrar</button>
				<button id="btnGuardarTurno" type="button" class="btn btn-primary">Confirmar</button>
			</div>
		</div>
	</div>
</div>
<!-- Fin agregado por 9000003068 -->