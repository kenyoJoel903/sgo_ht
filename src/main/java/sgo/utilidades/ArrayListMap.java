package sgo.utilidades;

import java.util.ArrayList;
import sgo.entidad.DecimalContometro;
import sgo.entidad.TanqueJornada;

public class ArrayListMap extends BaseUtilidades {

	public static ArrayList<DecimalContometro> decimalContometroArray() {

		ArrayList<DecimalContometro> list = new ArrayList<DecimalContometro>();
		
		try {
			
			for (int i = DecimalContometro.MIN; i <= DecimalContometro.MAX; i++) {
				DecimalContometro o = new DecimalContometro();
				o.setValue(i);
				list.add(o);
			}

		} catch (Exception e) {

		}
		
		return list;
	}
 
	public static ArrayList<TanqueJornada> tipoAperturaTanqueArray() {

		ArrayList<TanqueJornada> list = new ArrayList<TanqueJornada>();
		
		try {
			
			TanqueJornada o = new TanqueJornada();
			o.setTipoAperturaTanque(TanqueJornada.DESPLIEGUE_UNO_POR_PRODUCTO);
			o.setTipoAperturaTanqueText("Uno por producto");
			list.add(o);
			
			TanqueJornada oo = new TanqueJornada();
			oo.setTipoAperturaTanque(TanqueJornada.DESPLIEGUE_VARIOS_POR_PRODUCTO);
			oo.setTipoAperturaTanqueText("Varios por producto");
			list.add(oo);

		} catch (Exception e) {

		}
		
		return list;
	}
}