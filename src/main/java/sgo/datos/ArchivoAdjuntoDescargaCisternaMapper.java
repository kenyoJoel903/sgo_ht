package sgo.datos;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import sgo.entidad.ArchivoAdjuntoDescargaCisterna;

public class ArchivoAdjuntoDescargaCisternaMapper implements RowMapper<ArchivoAdjuntoDescargaCisterna> {

	public ArchivoAdjuntoDescargaCisterna mapRow(ResultSet rs, int rowNum) throws SQLException {
		ArchivoAdjuntoDescargaCisterna adjunto = null;
		try {
			adjunto = new ArchivoAdjuntoDescargaCisterna(
					rs.getInt("id_adj_descarga_cisterna"), 
					rs.getInt("tipo_proceso"), 
					rs.getInt("id_descarga_cisterna"), 
					rs.getString("nombre_archivo_original"), 
					rs.getString("nombre_archivo_adjunto"), 
					rs.getString("adjunto_referencia"));
			adjunto.setCreadoEl(rs.getLong("creado_el"));
			adjunto.setCreadoPor(rs.getInt("creado_por"));
			adjunto.setUsuarioCreacion(rs.getString("usuario_creacion"));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return adjunto;
	}
}
