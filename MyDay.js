/**
 * ==========================================================
 * FG TALENT HUB
 * MyDay.js v1.0
 * ==========================================================
 */

/**
 * Obtiene las tareas pendientes del reclutador.
 */
function FG_MyDay_get(){

  return FG_Task_getPending();

}

/**
 * Obtiene las entrevistas del día.
 */
function FG_MyDay_getTodayInterviews(){

  return FG_Task_getTodayInterviews();

}

/**
 * Resumen del día.
 */
/**
 * Total de tareas pendientes.
 */
function FG_MyDay_pendingCount(){

  return FG_MyDay_get().length;

}

function FG_MyDay_summary(){

  return {

    totalPendientes: FG_MyDay_pendingCount(),

    tareas: FG_MyDay_get(),

    entrevistas: FG_MyDay_getTodayInterviews()

  };

}
function FG_MyDay_test(){

  Logger.log(
    JSON.stringify(FG_MyDay_summary(), null, 2)
  );

}
