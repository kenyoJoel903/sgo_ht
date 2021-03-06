package sgo.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

import sgo.entidad.Cliente;
import sgo.entidad.Contenido;
import sgo.entidad.Proforma;
import sgo.entidad.ProformaDetalle;
import sgo.entidad.RespuestaCompuesta;
import sgo.utilidades.Constante;
import sgo.ws.sap.comun.ZPI_Fault;
import sgo.ws.sap.simularcrearproforma.DT_Simular_Crear_Proforma_Request;
import sgo.ws.sap.simularcrearproforma.DT_Simular_Crear_Proforma_RequestHearder_In;
import sgo.ws.sap.simularcrearproforma.DT_Simular_Crear_Proforma_RequestItems_InItem;
import sgo.ws.sap.simularcrearproforma.DT_Simular_Crear_Proforma_RequestPartners_InItem;
import sgo.ws.sap.simularcrearproforma.DT_Simular_Crear_Proforma_Response;
import sgo.ws.sap.simularcrearproforma.DT_Simular_Crear_Proforma_ResponseOrder_Conditions_OutItem;
import sgo.ws.sap.simularcrearproforma.DT_Simular_Crear_Proforma_ResponseReturn_OutItem;
import sgo.ws.sap.simularcrearproforma.SI_Sumular_Crear_Proforma_OutProxy;


public class SimularCrearProformaServicioWS {

	private SI_Sumular_Crear_Proforma_OutProxy proxy;
	
	public RespuestaCompuesta consultar(Cliente eCliente, Proforma proforma){
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		
		proxy = new SI_Sumular_Crear_Proforma_OutProxy();
//		proxy.setEndpoint("http://petpidqc.petroperu.com.pe:50200/XISOAPAdapter/MessageServlet?senderParty=Proforma&senderService=BC_Simular_Crear&receiverParty=&receiverService=&interface=SI_Sumular_Crear_Proforma_Out&interfaceNamespace=urn:petroperu.com.pe:pmerp:sd:proforma");
		proxy.setEndpoint("http://PEPINPRC.petroperu.com.pe:50600/XISOAPAdapter/MessageServlet?senderParty=Proforma&senderService=BC_Simular_Crear&receiverParty=&receiverService=&interface=SI_Sumular_Crear_Proforma_Out&interfaceNamespace=urn:petroperu.com.pe:pmerp:sd:proforma");
		DT_Simular_Crear_Proforma_Request req = this.configurarRequest(proforma);
		
		try {
//			DT_Simular_Crear_Proforma_Response res = proxy.SI_Sumular_Crear_Proforma_Out(req, "PISGOUSER", "P3tr0p3ru!");
			DT_Simular_Crear_Proforma_Response res = proxy.SI_Sumular_Crear_Proforma_Out(req, "PISGOUSER", "P3tr0p3ru042016");
			return configurarRespCompuesta(res,proforma);
		} catch (ZPI_Fault e) {

			e.printStackTrace();
			respuesta.mensaje=e.getMessage();
			respuesta.error=Constante.EXCEPCION_INTEGRIDAD_DATOS;
			respuesta.estado=false;
			return respuesta;
		} catch (RemoteException e) {
			
			e.printStackTrace();
			respuesta.mensaje=e.getMessage();
			respuesta.error=Constante.EXCEPCION_ACCESO_DATOS;
			respuesta.estado=false;
			return respuesta;
		}
	}

	private DT_Simular_Crear_Proforma_Request configurarRequest(Proforma proforma) {
		
		DT_Simular_Crear_Proforma_Request request = new DT_Simular_Crear_Proforma_Request();
		
		//cabecera de proforma
		DT_Simular_Crear_Proforma_RequestHearder_In hearderIn = new DT_Simular_Crear_Proforma_RequestHearder_In ();
		hearderIn.setDocVenta("ZCNW");
		hearderIn.setOrgVenta("1000");//proforma.getCanalSector().getOrgVentaSap());
		hearderIn.setCanal(proforma.getCanalSector().getCanalDistribucionSap());
		hearderIn.setSector(proforma.getCanalSector().getSectorSap());
		hearderIn.setFecValida_De(proforma.getFechaCotizacion());
//		//mas 30 dias
//		Calendar cal = new GregorianCalendar();
//		cal.setTime(proforma.getFechaCotizacion());
//		cal.add(Calendar.DAY_OF_MONTH, 30);
//		hearderIn.setFecValida_A(cal.getTime());
		hearderIn.setFecValida_A(proforma.getFechaCotizacion());
		hearderIn.setMoneda(proforma.getMoneda());
		hearderIn.setProceso(proforma.getProceso());
		
		//Detalle de proforma
		DT_Simular_Crear_Proforma_RequestItems_InItem[] items = new DT_Simular_Crear_Proforma_RequestItems_InItem[proforma.getItems().size()];
		DT_Simular_Crear_Proforma_RequestItems_InItem item = null;
		for(int i = 0;i<proforma.getItems().size();i++){
			item= new DT_Simular_Crear_Proforma_RequestItems_InItem();
//			proforma.getItems().get(i).setVolumenDecimal(new BigDecimal(proforma.getItems().get(i).getVolumen().replaceAll(",", "")));
			
			item.setCantidad(proforma.getItems().get(i).getVolumen());
		    item.setCentro(proforma.getItems().get(i).getPlanta().getCodigoReferencia());
		    item.setMaterial(proforma.getItems().get(i).getProducto().getCodigoReferencia());//"000000000000030086");//i%2==0?"000000000000030086":"000000000000030037");//comentado solo para probar//proforma.getItems().get(i).getProducto().getCodigoReferencia());
		    item.setPosicion(configurarPosReq(proforma.getItems().get(i).getPosicion()));
		    item.setUnidadMedida(proforma.getItems().get(i).getProducto().getUnidadMedida());
		    
		    items[i] = item;
		}
		DT_Simular_Crear_Proforma_RequestPartners_InItem[] partner = {
				new DT_Simular_Crear_Proforma_RequestPartners_InItem(),
				new DT_Simular_Crear_Proforma_RequestPartners_InItem() };
		// Cliente
		partner[0].setFunInterlocutor("AG");
		partner[0].setCodInterlocutor(proforma.getCliente().getCodigoSAP());
		partner[0].setPosicion("000000");

		// interlocutor-destinatario
		partner[1].setFunInterlocutor("WE");// proforma.getInterlocutor().getFunInterlocutorSap());
		partner[1].setCodInterlocutor(proforma.getInterlocutor().getCodInterlocutorSap());
		partner[1].setPosicion("000000");

		request.setHearder_In(hearderIn);
	    request.setPartners_In(partner);
		request.setItems_In(items);
		return request;
	}

	private String configurarPosReq(Integer posicion) {
		int pos = 10*(posicion+1);
		return String.valueOf(pos);
	}

	private RespuestaCompuesta configurarRespCompuesta(
			DT_Simular_Crear_Proforma_Response response, Proforma proforma) {
		RespuestaCompuesta respuesta = new RespuestaCompuesta();
		
		DT_Simular_Crear_Proforma_ResponseReturn_OutItem error = esConsultaExitosa(response);
		if(error == null){
			List<Proforma> lista = new ArrayList<Proforma>();
			Contenido<Proforma> contenido = new Contenido<Proforma>();
			
			DT_Simular_Crear_Proforma_ResponseOrder_Conditions_OutItem[] rs = response
					.getOrder_Conditions_Out();
	
			proforma.setNroCotizacion(response.getDocumento_Out());
			BigDecimal total = new BigDecimal(0);
			int pos = 0;
			ProformaDetalle it = null;
			for (int i = 0; i < rs.length; i++) {
				pos = Integer.parseInt(rs[i].getPosicion());
	//			for (int j = 0; j < proforma.getItems().size(); j++) {
					it = proforma.getItems().get(i);
	//				if(pos == it.getPosicion()){
						it.setPrecio(rs[i].getCond_ZP00());
						it.setDescuento(rs[i].getCond_ZD01());
						it.setRodaje(rs[i].getCond_ZROD());
						it.setIsc(rs[i].getCond_ZISC());
						it.setIgv(rs[i].getCond_ZIGV());
						it.setFise(rs[i].getCond_ZFIS());
						
						it.setPrecioPercepcion(rs[i].getCond_ZPER());
						it.setImporteTotal(rs[i].getValor_Total());
						
						total = total.add(calcularCampos(it));
	//				}
	//			}
			}
			proforma.setMonto(total);
	
			lista.add(proforma);
			contenido.carga = lista;
			respuesta.mensaje = "OK";
			respuesta.estado = true;
			respuesta.contenido = contenido;
		} else {
			respuesta.mensaje = error.getMessage();
			respuesta.estado = false;
			respuesta.contenido = null;
		}
		
		return respuesta;
	}

	/**
	 * @param response
	 * @return
	 */
	private DT_Simular_Crear_Proforma_ResponseReturn_OutItem esConsultaExitosa(DT_Simular_Crear_Proforma_Response response) {
		for (int i = 0; i < response.getReturn_Out().length; i++) {
			if(Constante.TIPO_RESP_ERROR.equals(response.getReturn_Out()[i].getType())){
				return response.getReturn_Out()[i];
			}
		}
		return null;
	}

	private BigDecimal calcularCampos(ProformaDetalle it) {

		System.out.println("-->it.getVolumen():"+it.getVolumen());
		System.out.println("-->it.getDescuento():"+it.getDescuento());
		System.out.println("-->it.getPrecio():"+it.getPrecio());
		System.out.println("-->it.getRodaje():"+it.getRodaje());
		System.out.println("-->it.getIsc():"+it.getIsc());
		System.out.println("-->it.getIgv():"+it.getIgv());
		System.out.println("-->it.getFise():"+it.getFise());
		
		BigDecimal volumen = it.getVolumen();
		//A: calculos
		//1.descuento en valor absoluto
		it.setDescuento(it.getDescuento().abs());
		//2.Precio neto = Precio - descuento
		it.setPrecioNeto(it.getPrecio().subtract(it.getDescuento().abs()));
		//3.acumulado = precio neto + rodaje + isc
		it.setAcumulado(it.getPrecioNeto().add(it.getRodaje().add(it.getIsc())));
		//4.Precio con descuento = acumulado + igv + fise
		it.setPrecioDescuento(it.getAcumulado().add(it.getIgv().add(it.getFise())));
		

		System.out.println("-->it.getPrecioPercepcion():"+it.getPrecioPercepcion());
		System.out.println("-->it.getImporteTotal():"+it.getImporteTotal());
		
		if(it.getPrecioPercepcion().intValue()<1){
			//5a.Precio con percepcion= precio con descuento + percepcion (del servicio)
			it.setPrecioPercepcion(it.getPrecioDescuento().add(it.getPrecioPercepcion()));
		} else {
//			BigDecimal percepDivid = it.getPrecioPercepcion().divide(volumen,RoundingMode.HALF_UP);
//			//5b.Precio con percepcion= precio con descuento + percepcion (del servicio)
//			it.setPrecioPercepcion(it.getPrecioDescuento().add(percepDivid));
			
			//5b.Precio con percepcion= precio con descuento + percepcion (del servicio)
			it.setPrecioPercepcion(it.getPrecioDescuento().add(it.getPrecioPercepcion()));
		}
		//6.Total=percepcion(del servicio)+total(del servicio). tomar la percepcion antes de ser recalculada mas abajo
		it.setImporteTotal(it.getPrecioPercepcion().multiply(volumen));
		
		//B: division
		//dividiendo entre el volumen
		it.setPrecio(it.getPrecio().divide(volumen,RoundingMode.HALF_UP));
		it.setDescuento(it.getDescuento().divide(volumen,RoundingMode.HALF_UP));
		it.setPrecioNeto(it.getPrecioNeto().divide(volumen,RoundingMode.HALF_UP));
		it.setRodaje(it.getRodaje().divide(volumen,RoundingMode.HALF_UP));
		it.setIsc(it.getIsc().divide(volumen,RoundingMode.HALF_UP));
		it.setAcumulado(it.getAcumulado().divide(volumen,RoundingMode.HALF_UP));
		it.setIgv(it.getIgv().divide(volumen,RoundingMode.HALF_UP));
		it.setFise(it.getFise().divide(volumen,RoundingMode.HALF_UP));
		it.setPrecioDescuento(it.getPrecioDescuento().divide(volumen,RoundingMode.HALF_UP));
		it.setPrecioPercepcion(it.getPrecioPercepcion().divide(volumen,RoundingMode.HALF_UP));
		it.setImporteTotal(it.getImporteTotal().divide(volumen,RoundingMode.HALF_UP));
				
		return it.getImporteTotal();
	}

}
