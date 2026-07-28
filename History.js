/**
 * ==========================================================
 * FG TALENT HUB
 * History.js v1.0
 * Historial del candidato
 * ==========================================================
 */

/**
 * Obtiene todas las postulaciones de un candidato.
 */
function FG_History_getApplications(candidateId){

  return FG_Repository_getApplicationsByCandidate(candidateId);

}

/**
 * Obtiene todas las entrevistas de un candidato.
 */
function FG_History_getInterviews(candidateId){

  return FG_Repository_getInterviewsByCandidate(candidateId);

}

/**
 * Obtiene el historial completo.
 */
function FG_History_get(candidateId){

  return {

    candidate: FG_Repository_getCandidate(candidateId),

    applications: FG_History_getApplications(candidateId),

    interviews: FG_History_getInterviews(candidateId)

  };

}