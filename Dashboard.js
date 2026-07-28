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
/**
 * Indicadores operativos.
 */
function FG_Dashboard_getOperationalKPIs(){

  return {

    nuevas: FG_Repository_getApplicationsByStatus(
      FG.STATUS.NUEVA
    ).length,

    contactados: FG_Repository_getApplicationsByStatus(
      FG.STATUS.CONTACTADO
    ).length,

    entrevistas: FG_Repository_getApplicationsByStatus(
      FG.STATUS.ENTREVISTA_AGENDADA
    ).length

  };

}

function FG_Dashboard_get(){

  return {

    generales: FG_Dashboard_getKPIs(),

    operativos: FG_Dashboard_getOperationalKPIs()

  };

}

function FG_Dashboard_test(){

  Logger.log(
    JSON.stringify(FG_Dashboard_get(), null, 2)
  );

}
