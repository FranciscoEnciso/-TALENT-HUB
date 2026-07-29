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
function FG_Dashboard_countCurrentByStatus(status){

  return FG_Repository_getCurrentApplications()

    .filter(function(app){

      return app.Estado === status;

    })

    .length;

}

function FG_Dashboard_getOperationalKPIs(){

  return {

    nuevas: FG_Dashboard_countCurrentByStatus(
      TALENTRY.STATUS.NUEVA
    ),

    contactados: FG_Dashboard_countCurrentByStatus(
      TALENTRY.STATUS.CONTACTADO
    ),

    entrevistas: FG_Dashboard_countCurrentByStatus(
      TALENTRY.STATUS.ENTREVISTA_AGENDADA
    )

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
