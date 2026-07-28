/**
 * ==========================================================
 * FG TALENT HUB
 * Config.gs v3.0
 * Configuración Central
 * ==========================================================
 */

const FG = {

  /*==========================================================
   HOJAS
  ==========================================================*/

  SHEETS:{

    FORM:"Respuestas de formulario 1",

    CANDIDATOS:"Candidatos",

    POSTULACIONES:"Postulaciones",

    ENTREVISTAS:"Entrevistas",

    VACANTES:"Vacantes",

    SEGUIMIENTO:"Seguimiento_Operativo",

    PERMANENCIA:"Permanencia",

    CATALOGOS:"Catálogos",

    AUDITORIA:"Auditoría",

    DASHBOARD:"Dashboard",

    MI_DIA:"Mi_Dia",

    CENTRO_CONTROL:"Centro_Control"

  },



  /*==========================================================
   ESTADOS
  ==========================================================*/

  STATUS:{

    NUEVA:"Nueva",

    CONTACTADO:"Contactado",

    NO_RESPONDIO:"No respondió",

    ENTREVISTA_AGENDADA:"Entrevista Agendada",

    ENTREVISTA_REALIZADA:"Entrevista Realizada",

    DOCUMENTACION:"Documentación",

    CONTRATADO:"Contratado",

    DESCARTADO:"Descartado"

  },



  /*==========================================================
   PRIORIDADES
  ==========================================================*/

  PRIORITY:{

    ALTA:"Alta",

    MEDIA:"Media",

    BAJA:"Baja"

  },



  /*==========================================================
   SEMAFORO
  ==========================================================*/

  TRAFFIC:{

    VERDE:"Verde",

    AMARILLO:"Amarillo",

    ROJO:"Rojo"

  },



  /*==========================================================
   RECLUTADOR
  ==========================================================*/

  SYSTEM:{

    DEFAULT_RECRUITER:"Francisco"

  },



  /*==========================================================
   ENCABEZADOS FORMULARIO
  ==========================================================*/

  FORM_HEADERS:[

    "Marca temporal",
    "Nombre completo",
    "Edad",
    "Número telefónico.",
    "Escolaridad",
    "¿Estás estudiando?",
    "Sucursal de interés.",
    "¿Cuánto tiempo te toma llegar de tu domicilio a la sucursal/es?",
    "Marcar el recuadro si cuentas con la siguiente documentación:",
    "¿Dónde fue tu último trabajo?",
    "¿Cuánto tiempo estuviste laborando?",
    "Motivo de salida",
    "¿En dónde trabajaste anterior a tu último empleo?",
    "Trabajo anterior ¿Cuánto tiempo estuviste laborando?",
    "Trabajo anterior - Motivo de salida",
    "¿En qué colonia vives?",
    "¿Puedes rolar los 3 turnos?",
    "Municipio",
    "¿De qué manera te trasladarías?",
    "¿En qué modalidad estudias?",
    "¿En qué horario?",
    "Puntuación",
    "¿Haz laborado anteriormente en Farmacias Guadalajara?",
    "¿En qué sucursal estuviste laborando?",
    "Indicar jefa o jefe primero con quien laboraste",
    "Indicar nombre de la jefa o jefe segundo con quien laboraste",
    "Cuánto tiempo laboraste con nosotros",
    "¿Cuál fue el motivo de tu salida?",
    "Motivo por el cual buscas reingresar",
    "¿En qué días asistes a estudiar?",
    "¿Tienes experiencia en atención a clientes?",
    "¿Tienes experiencia en cajas o cobro de mercancía?"

  ],



  /*==========================================================
   ENCABEZADOS CANDIDATOS
  ==========================================================*/

  CANDIDATE_HEADERS:[

    "Candidate_ID",

    "Nombre_Completo",

    "Telefono",

    "Edad",

    "Escolaridad",

    "Estudia",

    "Municipio",

    "Colonia",

    "Fecha_Primer_Registro",

    "Ultima_Postulacion",

    "Total_Postulaciones",

    "Total_Entrevistas",

    "Total_Contrataciones",

    "Estado_Actual",

    "Elegible_Reingreso",

    "Semaforo",

    "Observaciones"

  ],



  /*==========================================================
   ENCABEZADOS POSTULACIONES
  ==========================================================*/

  APPLICATION_HEADERS:[

    "Application_ID",

    "Candidate_ID",

    "Fecha_Postulacion",

    "Numero_Sucursal",

    "Nombre_Sucursal",

    "Municipio",

    "Tiempo_Traslado",

    "Puede_Rolar",

    "Estudia",

    "Ultimo_Trabajo",

    "Tiempo_Ultimo_Trabajo",

    "Motivo_Salida",

    "Trabajo_Anterior",

    "Tiempo_Trabajo_Anterior",

    "Motivo_Salida_Anterior",

    "Prioridad",

    "Score",

    "Estado",

    "Motivo_Descarte",

    "Reclutador"

  ],



  /*==========================================================
   ENCABEZADOS AUDITORIA
  ==========================================================*/

  AUDIT_HEADERS:[

    "Fecha_Hora",

    "Usuario",

    "Modulo",

    "Accion",

    "Candidate_ID",

    "Application_ID",

    "Estado_Anterior",

    "Estado_Nuevo",

    "Descripcion"

  ]

};