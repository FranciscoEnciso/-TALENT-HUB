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
function FG_MyDay_summary(){

  return {

    tareas: FG_MyDay_get(),

    entrevistas: FG_MyDay_getTodayInterviews()

  };

}