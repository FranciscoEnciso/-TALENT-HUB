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

const FG_INTERVIEW_COLUMNS = {
  ID: 1,
  APPLICATION_ID: 2,
  CANDIDATE_ID: 3,
  FECHA: 4,
  HORA: 5,
  TIPO: 6,
  ENTREVISTADOR: 7,
  ASISTIO: 8,
  RESULTADO: 9,
  ESTADO: 10,
  OBSERVACIONES: 11,
  FECHA_REGISTRO: 12
};

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

  // TODO
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

    module: FG_AUDIT.MODULES.INTERVIEW,
action: FG_AUDIT.ACTIONS.CREATE,

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

  if (row === -1){

    throw new Error("Entrevista no encontrada.");

  }

sheet.getRange(
  row,
  FG_INTERVIEW_COLUMNS.ASISTIO
).setValue("Sí");

sheet.getRange(
  row,
  FG_INTERVIEW_COLUMNS.RESULTADO
).setValue(resultado);

sheet.getRange(
  row,
  10
).setValue(
  FG.STATUS.ENTREVISTA_REALIZADA
);

sheet.getRange(row,11).setValue(observaciones);
const applicationId = sheet.getRange(
  row,
  FG_INTERVIEW_COLUMNS.APPLICATION_ID
).getValue();

FG_State_change(
  applicationId,
  FG.STATUS.ENTREVISTA_REALIZADA
);
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

  if (row === -1){
    throw new Error("Entrevista no encontrada.");
  }

  sheet.getRange(
  row,
  FG_INTERVIEW_COLUMNS.ASISTIO
).setValue("No");
  sheet.getRange(
  row,
  FG_INTERVIEW_COLUMNS.RESULTADO
).setValue("");
  sheet.getRange(
  row,
  FG_INTERVIEW_COLUMNS.ESTADO
).setValue(FG.STATUS.NO_ASISTIO);
  sheet.getRange(row,11).setValue("El candidato no asistió.");

  const applicationId = sheet.getRange(
  row,
  FG_INTERVIEW_COLUMNS.APPLICATION_ID
).getValue();

FG_State_change(
  applicationId,
  FG.STATUS.NO_ASISTIO
);
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

  if (row === -1){

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

    applicationId:"POST-20260728014822",

    candidateId:"CAND-000015",

    fecha:"2026-08-01",

    hora:"09:00",

    entrevistador:"Francisco"

  });

  Logger.log(interviewId);

}

function FG_Interview_finish_test(){

  FG_Interview_finish(

    "INT-20260728015719",

    "Aprobado",

    "Entrevista satisfactoria"

  );

}
function FG_Interview_noShow_test(){

  FG_Interview_noShow(
    "INT-20260727212246",
  );

}
