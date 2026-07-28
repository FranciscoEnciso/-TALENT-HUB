/**
 * ==========================================================
 * FG TALENT HUB
 * Workflow.js v1.0
 * Orquestador del proceso
 * ==========================================================
 */

/**
 * Agenda una entrevista para una postulación.
 */
function FG_Workflow_scheduleInterview(data){

  return FG_Interview_schedule(data);

}

/**
 * Finaliza una entrevista.
 */
function FG_Workflow_finishInterview(
  interviewId,
  resultado,
  observaciones
){

  FG_Interview_finish(
    interviewId,
    resultado,
    observaciones
  );

}

/**
 * Marca una entrevista como No asistió.
 */
function FG_Workflow_noShow(interviewId){

  FG_Interview_noShow(interviewId);

}

/**
 * Cambia el estado de una postulación.
 */
function FG_Workflow_changeState(
  applicationId,
  newState
){

  FG_State_change(
    applicationId,
    newState
  );

}

/**
 * Obtiene una postulación.
 */
function FG_Workflow_getApplication(applicationId){

  return FG_Repository_getApplication(
    applicationId
  );

}

/**
 * Obtiene un candidato.
 */
function FG_Workflow_getCandidate(candidateId){

  return FG_Repository_getCandidate(
    candidateId
  );

}