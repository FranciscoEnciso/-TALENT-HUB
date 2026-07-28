/**
 * ==========================================================
 * FG TALENT HUB
 * Workflow.js v2.0
 * Orquestador del proceso
 * ==========================================================
 */

/**
 * Agenda una entrevista.
 */
function FG_Workflow_scheduleInterview(data){

 const interviewId = FG_Interview_schedule(data);

FG_Task_generateToday();

return interviewId;

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
 
  FG_Task_generateToday();
}

/**
 * Registrar No Asistió.
 */
function FG_Workflow_noShow(interviewId){

  FG_Interview_noShow(interviewId);
  FG_Task_generateToday();
}

/**
 * Cambiar estado.
 */
function FG_Workflow_changeState(
  applicationId,
  newState
){

  FG_State_change(
    applicationId,
    newState
  );

 FG_Task_generateToday();
 
}

/**
 * Obtener candidato.
 */
function FG_Workflow_getCandidate(candidateId){

  return FG_Repository_getCandidate(candidateId);

}

/**
 * Obtener postulación.
 */
function FG_Workflow_getApplication(applicationId){

  return FG_Repository_getApplication(applicationId);

}