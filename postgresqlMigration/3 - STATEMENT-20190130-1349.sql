
CREATE OR REPLACE VIEW sgo.v_estacion AS
 SELECT t1.id_estacion,
    t1.metodo_descarga,
    t1.nombre,
    t1.tipo,
    t1.estado,
    t1.id_operacion,
    t4.nombre AS nombre_operacion,
    t1.creado_el,
    t1.creado_por,
    t1.actualizado_por,
    t1.actualizado_el,
    t1.ip_creacion,
    t1.ip_actualizacion,
    u1.identidad AS usuario_creacion,
    u2.identidad AS usuario_actualizacion,
    t5.id_planta,
    t5.descripcion AS planta_despacho,
    t1.cantidad_turnos,
    t1.tipo_apertura_tanque,
    t1.numero_decimales_contometro,
    t6.nombre_perfil,
    t6.id_perfil_horario
   FROM sgo.estacion t1
     JOIN seguridad.usuario u1 ON t1.creado_por = u1.id_usuario
     JOIN seguridad.usuario u2 ON t1.actualizado_por = u2.id_usuario
     JOIN sgo.operacion t4 ON t1.id_operacion = t4.id_operacion
     LEFT JOIN sgo.planta t5 ON t4.planta_despacho_defecto = t5.id_planta
     LEFT JOIN sgo.perfil_horario t6 ON t6.id_perfil_horario = t1.id_perfil_horario
     ;

ALTER TABLE sgo.v_estacion
    OWNER TO sgo_user;

-- *****************************************************************************

CREATE OR REPLACE VIEW sgo.v_jornada AS
 SELECT 
    t1.id_jornada,
    t1.fecha_operativa,
    t1.id_estacion,
    t1.comentario,
    t1.estado,
    t2.nombre,
    t2.tipo,
    t2.estado AS estado_estacion,
    t2.id_operacion,
    t1.creado_el,
    t1.creado_por,
    t1.actualizado_por,
    t1.actualizado_el,
    t1.ip_creacion,
    t1.ip_actualizacion,
    u1.identidad AS usuario_creacion,
    u2.identidad AS usuario_actualizacion,
    t1.operario1,
    t1.operario2,
    count(t3.id_despacho) AS total_despachos,
    t1.observacion,
    t4.nombre_perfil,
    CONCAT(t5.hora_inicio_turno, ' - ', t5.hora_fin_turno) AS horaInicioFinTurno,
    t4.id_perfil_horario,
    t5.id_perfil_detalle_horario,
    t5.numero_orden
   FROM sgo.jornada t1
     JOIN sgo.estacion t2 ON t1.id_estacion = t2.id_estacion
     JOIN seguridad.usuario u1 ON t1.creado_por = u1.id_usuario
     JOIN seguridad.usuario u2 ON t1.actualizado_por = u2.id_usuario
     LEFT JOIN sgo.v_despacho t3 ON t1.id_jornada = t3.id_jornada
     LEFT JOIN sgo.perfil_horario t4 ON t4.id_perfil_horario = t2.id_perfil_horario
     LEFT JOIN sgo.perfil_detalle_horario t5 ON t5.id_perfil_horario = t4.id_perfil_horario
  GROUP BY 
    t1.id_jornada, t1.fecha_operativa, t1.id_estacion, t1.comentario, 
    t1.estado, t2.nombre, t2.tipo, t2.estado, t2.id_operacion, 
    t1.creado_el, t1.creado_por, t1.actualizado_por, t1.actualizado_el, 
    t1.ip_creacion, t1.ip_actualizacion, u1.identidad, u2.identidad, 
    t1.operario1, t1.operario2, t1.observacion,
    t4.nombre_perfil, t5.hora_inicio_turno, t5.hora_fin_turno, t4.id_perfil_horario,
    t5.numero_orden, t5.id_perfil_detalle_horario
    ;

ALTER TABLE sgo.v_jornada
    OWNER TO sgo_user;

-- *****************************************************************************

CREATE OR REPLACE VIEW sgo.v_turno AS
 SELECT t1.id_turno,
    t1.fecha_hora_apertura,
    t2.id_estacion,
    t3.nombre AS estacion,
    t3.id_operacion,
    t2.fecha_operativa,
    t1.id_jornada,
    t4.nombre_operario,
    t4.apellido_paterno_operario,
    t4.apellido_materno_operario,
    t5.nombre_operario AS ayudante,
    t5.apellido_paterno_operario AS ayudante_paterno,
    t5.apellido_materno_operario AS ayudante_materno,
    t1.estado,
    t1.comentario,
    t1.fecha_hora_cierre,
    t1.creado_el,
    t1.creado_por,
    t1.actualizado_por,
    t1.actualizado_el,
    t1.ip_creacion,
    t1.ip_actualizacion,
    u1.identidad AS usuario_creacion,
    u2.identidad AS usuario_actualizacion,
    t1.observacion,
    t3.cantidad_turnos,
    t7.hora_inicio_turno,
    t7.hora_fin_turno,
    CONCAT(t7.hora_inicio_turno, ' - ', t7.hora_fin_turno) AS horaInicioFinTurno,
    t1.id_perfil_detalle_horario,
    t3.id_perfil_horario,
    t6.nombre_perfil
   FROM sgo.turno t1
     JOIN sgo.jornada t2 ON t2.id_jornada = t1.id_jornada
     JOIN sgo.estacion t3 ON t3.id_estacion = t2.id_estacion
     LEFT JOIN sgo.operario t4 ON t4.id_operario = t1.responsable
     LEFT JOIN sgo.operario t5 ON t5.id_operario = t1.ayudante
     LEFT JOIN seguridad.usuario u1 ON t1.creado_por = u1.id_usuario
     LEFT JOIN seguridad.usuario u2 ON t1.actualizado_por = u2.id_usuario
     LEFT JOIN sgo.perfil_horario t6 ON t6.id_perfil_horario = t3.id_perfil_horario
     LEFT JOIN sgo.perfil_detalle_horario t7 ON t7.id_perfil_horario = t6.id_perfil_horario
     ;

ALTER TABLE sgo.v_turno
    OWNER TO sgo_user;

-- *****************************************************************************

CREATE OR REPLACE VIEW sgo.v_operacion AS
 SELECT t1.id_operacion,
    t1.nombre,
    t1.alias,
    t1.id_cliente,
    t1.referencia_planta_recepcion,
    t1.referencia_destinatario_mercaderia,
    t1.volumen_promedio_cisterna,
    t1.fecha_inicio_planificacion,
    t1.eta_origen,
    t1.planta_despacho_defecto,
    t1.estado,
    t1.creado_el,
    t1.creado_por,
    t1.actualizado_por,
    t1.actualizado_el,
    t1.ip_creacion,
    t1.ip_actualizacion,
    t4.razon_social AS razon_social_cliente,
    t4.nombre_corto AS nombre_corto_cliente,
    u1.identidad AS usuario_creacion,
    u2.identidad AS usuario_actualizacion,
    t5.descripcion AS descripcion_planta_despacho,
    t1.correopara,
    t1.correocc,
    t1.indicador_tipo_registro_tanque,
    t4.estado AS estado_cliente
   FROM sgo.operacion t1
     JOIN seguridad.usuario u1 ON t1.creado_por = u1.id_usuario
     JOIN seguridad.usuario u2 ON t1.actualizado_por = u2.id_usuario
     JOIN sgo.cliente t4 ON t1.id_cliente = t4.id_cliente
     LEFT JOIN sgo.planta t5 ON t1.planta_despacho_defecto = t5.id_planta;

ALTER TABLE sgo.v_operacion
    OWNER TO sgo_user;

-- *****************************************************************************
CREATE OR REPLACE VIEW sgo.v_perfil_horario AS
 SELECT t1.id_perfil_horario,
        t1.nombre_perfil,
        t1.numero_turnos,
        t1.estado,
        t1.creado_el,
        t1.creado_por,
        t1.actualizado_por,
        t1.actualizado_el,
        t1.ip_creacion,
        t1.ip_actualizacion,
        u1.identidad AS usuario_creacion,
        u2.identidad AS usuario_actualizacion
   FROM sgo.perfil_horario t1
   JOIN seguridad.usuario u1 ON t1.creado_por = u1.id_usuario
   JOIN seguridad.usuario u2 ON t1.actualizado_por = u2.id_usuario;

ALTER TABLE sgo.v_perfil_horario
    OWNER TO sgo_user;
    

-- *****************************************************************************
CREATE OR REPLACE VIEW sgo.v_perfil_detalle_horario AS
 SELECT t1.id_perfil_detalle_horario,
        t1.numero_orden,
        t1.glosa_turno,
        t1.hora_inicio_turno,
        t1.hora_fin_turno,
        t1.id_perfil_horario,
        t1.creado_el,
        t1.creado_por,
        t1.actualizado_por,
        t1.actualizado_el,
        t1.ip_creacion,
        t1.ip_actualizacion,
        u1.identidad AS usuario_creacion,
        u2.identidad AS usuario_actualizacion
   FROM sgo.perfil_detalle_horario t1
        JOIN seguridad.usuario u1 ON t1.creado_por = u1.id_usuario
        JOIN seguridad.usuario u2 ON t1.actualizado_por = u2.id_usuario;

ALTER TABLE sgo.v_perfil_detalle_horario
    OWNER TO sgo_user;
-- *****************************************************************************
-- *****************************************************************************
-- *****************************************************************************
-- *****************************************************************************

