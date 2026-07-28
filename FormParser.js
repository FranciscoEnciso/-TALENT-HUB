/**
 * ==========================================================
 * FG TALENT HUB
 * FormParser.gs v2.0
 * ==========================================================
 */

const FG_FORM = {

  NAME: "Nombre completo",
  PHONE: "Número telefónico.",
  AGE: "Edad",
  EDUCATION: "Escolaridad",
  STUDYING: "¿Estás estudiando?",
  BRANCH: "Sucursal de interés.",
  TRAVEL_TIME: "¿Cuánto tiempo te toma llegar de tu domicilio a la sucursal/es?",
  LAST_JOB: "¿Dónde fue tu último trabajo?",
  LAST_JOB_TIME: "¿Cuánto tiempo estuviste laborando?",
  LAST_JOB_EXIT: "Motivo de salida",
  PREVIOUS_JOB: "¿En dónde trabajaste anterior a tu último empleo?",
  PREVIOUS_JOB_TIME: "Trabajo anterior ¿Cuánto tiempo estuviste laborando?",
  PREVIOUS_JOB_EXIT: "Trabajo anterior - Motivo de salida",
  COLONY: "¿En qué colonia vives?",
  SHIFT: "¿Puedes rolar los 3 turnos?",
  MUNICIPALITY: "Municipio",
  EXPERIENCE_CUSTOMER: "¿Tienes experiencia en atención a clientes?",
  EXPERIENCE_CASH: "¿Tienes experiencia en cajas o cobro de mercancía?",
  SCORE: "Puntuación"

};

/**
 * Convierte la fila del formulario
 * en objetos candidate y application.
 */
function FG_FormParser_parse(headers, values){

  const row = {};

  headers.forEach(function(header,index){

    row[String(header).trim()] = values[index];

  });

  return {

  candidate:{

    nombre: row[FG_FORM.NAME],
    telefono: row[FG_FORM.PHONE],
    edad: row[FG_FORM.AGE],
    escolaridad: row[FG_FORM.EDUCATION],
    estudia: row[FG_FORM.STUDYING],
    municipio: row[FG_FORM.MUNICIPALITY],
    colonia: row[FG_FORM.COLONY]

  },

  application:{

    numeroSucursal: FG_FormParser_getBranchNumber(row[FG_FORM.BRANCH]),
    nombreSucursal: row[FG_FORM.BRANCH],
    municipio: row[FG_FORM.MUNICIPALITY],
    tiempoTraslado: row[FG_FORM.TRAVEL_TIME],
    puedeRolar: row[FG_FORM.SHIFT],
    estudia: row[FG_FORM.STUDYING],

    experienciaClientes: row[FG_FORM.EXPERIENCE_CUSTOMER],
    experienciaCajas: row[FG_FORM.EXPERIENCE_CASH],

    ultimoTrabajo: row[FG_FORM.LAST_JOB],
    tiempoUltimoTrabajo: row[FG_FORM.LAST_JOB_TIME],
    motivoSalida: row[FG_FORM.LAST_JOB_EXIT],

    trabajoAnterior: row[FG_FORM.PREVIOUS_JOB],
    tiempoTrabajoAnterior: row[FG_FORM.PREVIOUS_JOB_TIME],
    motivoSalidaAnterior: row[FG_FORM.PREVIOUS_JOB_EXIT],

    score: row[FG_FORM.SCORE]

  }

};

}

/**
 * Extrae el número de sucursal.
 *
 * Ejemplo:
 * 268 S.L.P. LOMAS
 *
 * Resultado:
 * 268
 */
function FG_FormParser_getBranchNumber(texto){

  if(!texto){

    return null;

  }

  const match = String(texto).match(/^(\d+)/);

  if(match){

    return match[1];

  }

  return null;

}

/**
 * Prueba
 */
function FG_FormParser_test(){

  Logger.log(
  FG_FormParser_getBranchNumber(
    "268 S.L.P. LOMAS"
  )
);

}