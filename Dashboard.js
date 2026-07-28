/**
 * ==========================================================
 * FG TALENT HUB
 * Dashboard.js v1.0
 * ==========================================================
 */

/**
 * KPIs generales.
 */
function FG_Dashboard_getKPIs(){

  return {

    candidatos: FG_Repository_countCandidates(),

    postulaciones: FG_Repository_countApplications(),

    entrevistas: FG_Repository_countInterviews(),

    contratados: FG_Repository_countHires()

  };

}

/**
 * Resumen para Dashboard.
 */
function FG_Dashboard_get(){

  return FG_Dashboard_getKPIs();

}