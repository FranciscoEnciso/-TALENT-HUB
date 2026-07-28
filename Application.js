/**
 * ==========================================================
 * FG TALENT HUB
 * Application.gs v3.1
 * ==========================================================
 */

const FG_APPLICATION_COLUMNS = {
  ID: 1,
  CANDIDATE_ID: 2,
  FECHA: 3,
  NUMERO_SUCURSAL: 4,
  NOMBRE_SUCURSAL: 5,
  MUNICIPIO: 6,
  TIEMPO_TRASLADO: 7,
  PUEDE_ROLAR: 8,
  ESTUDIA: 9,
  ULTIMO_TRABAJO: 10,
  TIEMPO_ULTIMO_TRABAJO: 11,
  MOTIVO_SALIDA: 12,
  TRABAJO_ANTERIOR: 13,
  TIEMPO_TRABAJO_ANTERIOR: 14,
  MOTIVO_SALIDA_ANTERIOR: 15,
  PRIORIDAD: 16,
  SCORE: 17,
  ESTADO: 18,
  MOTIVO_DESCARTE: 19,
  RECLUTADOR: 20
};

/**
 * Obtiene la hoja Postulaciones
 */
function FG_Application_getSheet() {

  return SpreadsheetApp
    .getActive()
    .getSheetByName("Postulaciones");

}

/**
 * Genera un ID único
 */
function FG_Application_generateId(){

  return "POST-" + Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyyMMddHHmmss"
  );

}

/**
 * Construye la fila
 */
function FG_Application_buildRow(app){

  return [

    // A
    FG_Application_generateId(),

    // B
    app.candidateId || "",

    // C
    new Date(),

    // D
    app.numeroSucursal || "",

    // E
    app.nombreSucursal || "",

    // F
    app.municipio || "",

    // G
    app.tiempoTraslado || "",

    // H
    app.puedeRolar || "",

    // I
    app.estudia || "",

    // J
    app.ultimoTrabajo || "",

    // K
    app.tiempoUltimoTrabajo || "",

    // L
    app.motivoSalida || "",

    // M
    app.trabajoAnterior || "",

    // N
    app.tiempoTrabajoAnterior || "",

    // O
    app.motivoSalidaAnterior || "",

    // P
    app.prioridad || "Media",

    // Q
    app.score || "",

    // R
    app.estado || "Nueva",

    // S
    app.motivoDescarte || "",

    // T
    app.reclutador || ""

  ];

}

/**
 * Guarda una postulación
 */
function FG_Application_create(app){

  const sheet = FG_Application_getSheet();

  const row = FG_Application_buildRow(app);

  sheet
    .getRange(
      sheet.getLastRow()+1,
      1,
      1,
      row.length
    )
    .setValues([row]);

  return row[0];

}

/**
 * Prueba
 */
function FG_Application_test(){

  const app = {

    candidateId:"CAND-000001",

    numeroSucursal:"268",

    nombreSucursal:"268 S.L.P. LOMAS",

    municipio:"San Luis Potosí",

    tiempoTraslado:"20 minutos",

    puedeRolar:"Sí",

    estudia:"No",

    ultimoTrabajo:"Empresa Demo",

    tiempoUltimoTrabajo:"2 años",

    motivoSalida:"Mejora laboral",

    trabajoAnterior:"Empresa Anterior",

    tiempoTrabajoAnterior:"1 año",

    motivoSalidaAnterior:"Cambio de residencia",

    prioridad:"Alta",

    score:95,

    estado:"Nueva",

    motivoDescarte:"",

    reclutador:"Francisco"

  };

  Logger.log(FG_Application_create(app));

}