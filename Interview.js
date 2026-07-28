/**
 * ==========================================================
 * FG TALENT HUB
 * Interview.gs v1.0
 * ==========================================================
 */

/**
 * Obtiene la hoja Entrevistas
 */
function FG_Interview_getSheet(){

  return FG_Utils_getSheet(FG.SHEETS.ENTREVISTAS);

}

/**
 * Agenda una entrevista.
 */
function FG_Interview_schedule(data){

  const sheet = FG_Interview_getSheet();

  const interviewId = FG_Utils_generateId("INT");

  sheet.appendRow([

  interviewId,

  data.applicationId,

  data.candidateId,

  data.fecha,

  data.hora,

  data.tipo || "Presencial",

  data.entrevistador,

  "",

  "",

  "Agendada",

  "",

  FG_Utils_now()

]);

 FG_State_change(
  data.applicationId,
  FG.STATUS.ENTREVISTA_AGENDADA
);

  FG_Audit_register({

    module:"Interview",

    action:"CREATE",

    candidateId:data.candidateId,

    applicationId:data.applicationId,

    newState:FG.STATUS.ENTREVISTA_AGENDADA,

    description:"Entrevista agendada."

  });

  return interviewId;

}

/**
 * Registrar resultado.
 */
function FG_Interview_finish(interviewId,resultado,observaciones){

  const sheet = FG_Interview_getSheet();

  const row = FG_Utils_findRow(
    FG.SHEETS.ENTREVISTAS,
    1,
    interviewId
  );

  if(row==-1){

    throw new Error("Entrevista no encontrada.");

  }

sheet.getRange(row,8).setValue("Sí");

sheet.getRange(row,9).setValue(resultado);

sheet.getRange(
  row,
  10
).setValue(
  FG.STATUS.ENTREVISTA_REALIZADA
);

sheet.getRange(row,11).setValue(observaciones);

}

/**
 * Marcar como no asistió.
 */
function FG_Interview_noShow(interviewId){

  const sheet = FG_Interview_getSheet();

  const row = FG_Utils_findRow(
    FG.SHEETS.ENTREVISTAS,
    1,
    interviewId
  );

  if(row == -1){
    throw new Error("Entrevista no encontrada.");
  }

  sheet.getRange(row,8).setValue("No");
  sheet.getRange(row,9).setValue("");
  sheet.getRange(row,10).setValue(FG.STATUS.NO_ASISTIO);
  sheet.getRange(row,11).setValue("El candidato no asistió.");

}

/**
 * Obtener entrevista.
 */
function FG_Interview_get(interviewId){

  const row = FG_Utils_findRow(
    FG.SHEETS.ENTREVISTAS,
    1,
    interviewId
  );

  if(row==-1){

    return null;

  }

  return FG_Utils_getRow(
    FG.SHEETS.ENTREVISTAS,
    row
  );

}

/**
 * Prueba
 */
function FG_Interview_test(){

  const interviewId = FG_Interview_schedule({

    applicationId:"POST-20260727013424",

    candidateId:"CAND-000008",

    fecha:"2026-08-01",

    hora:"09:00",

    entrevistador:"Francisco"

  });

  Logger.log(interviewId);

}
function FG_Interview_finish_test(){

  FG_Interview_finish(
    "INT-20260727211556",
    "Aprobado",
    "Entrevista satisfactoria"
  );

}
function FG_Interview_noShow_test(){

  FG_Interview_noShow(
    "INT-20260727212246",
  );

}
/**
 * ==========================================
 * FUNCIONES DE PRUEBA
 * Eliminar antes de liberar la versión 1.0
 * ==========================================
 */
FG_Interview_test()

FG_Interview_finish_test()

FG_Interview_noShow_test()