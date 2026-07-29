/**
 * ==========================================================
 * FG TALENT HUB
 * StateEngine.gs v1.0
 * Motor de Estados
 * ==========================================================
 */

/**
 * Estados permitidos
 */
const FG_STATE_FLOW = {

 "Nueva": [
  "Contactado",
  "Entrevista Agendada",
  "Descartado"
],

  "Contactado": [
    "No respondió",
    "Entrevista Agendada",
    "Descartado"
  ],

  "No respondió": [
    "Contactado",
    "Descartado"
  ],

  "Entrevista Agendada": [
    "Entrevista Realizada",
    "No asistió",
    "Descartado"
  ],

  "No asistió": [
    "Entrevista Agendada",
    "Descartado"
  ],

  "Entrevista Realizada": [
    "Documentación",
    "Descartado"
  ],

  "Documentación": [
    "Contratado",
    "Descartado"
  ],

  "Contratado": [],

  "Descartado": []

};

/**
 * Devuelve si el cambio de estado es válido.
 */
function FG_State_validate(currentState, newState){

  const allowed = FG_STATE_FLOW[currentState];

  if(!allowed){
    return false;
  }

  return allowed.includes(newState);

}

/**
 * Devuelve los siguientes estados posibles.
 */
function FG_State_getNext(currentState){

  return FG_STATE_FLOW[currentState] || [];

}

/**
 * Cambia el estado de una postulación.
 */
/**
 * Cambia el estado de una postulación.
 */
function FG_State_change(applicationId, newState){

  const sheet = FG_Utils_getSheet(
  TALENTRY.SHEETS.POSTULACIONES
);

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(data[i][FG_APPLICATION_COLUMNS.ID - 1] == applicationId){

      const row = i + 1;

      const currentState =
        data[i][FG_APPLICATION_COLUMNS.ESTADO - 1];

      if(!FG_State_validate(currentState,newState)){

        throw new Error(
          "Cambio de estado no permitido: " +
          currentState +
          " → " +
          newState
        );

      }

      sheet
        .getRange(
          row,
          FG_APPLICATION_COLUMNS.ESTADO
        )
        .setValue(newState);
        FG_Audit_stateChanged(
  applicationId,
  data[i][FG_APPLICATION_COLUMNS.CANDIDATE_ID - 1],
  currentState,
  newState
);

      Logger.log(
        "Estado actualizado correctamente."
      );

      return true;

    }

  }

  throw new Error(
    "No existe la postulación: " +
    applicationId
  );

}

/**
 * Devuelve el estado actual.
 */
function FG_State_get(applicationId){

  const sheet = FG_Utils_getSheet(
  TALENTRY.SHEETS.POSTULACIONES
);

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(data[i][FG_APPLICATION_COLUMNS.ID - 1] == applicationId){

      return data[i][FG_APPLICATION_COLUMNS.ESTADO - 1];

    }

  }

  return null;

}


/**
 * Prueba
 */
function FG_State_test(){

  Logger.log(

    FG_State_getNext(
  TALENTRY.STATUS.NUEVA
)

  );

}