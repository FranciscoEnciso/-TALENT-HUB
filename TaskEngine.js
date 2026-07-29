/**
 * ==========================================================
 * FG TALENT HUB
 * TaskEngine.gs v1.0
 * ==========================================================
 */

/**
 * Obtiene la hoja Mi_Dia
 */
function FG_Task_getSheet(){

  return FG_Utils_getSheet(TALENTRY.SHEETS.MI_DIA);

}

/**
 * Limpia las tareas anteriores
 */
function FG_Task_clear(){

  const sheet = FG_Task_getSheet();

  if(sheet.getLastRow()>1){

    sheet.getRange(
      2,
      1,
      sheet.getLastRow()-1,
      sheet.getLastColumn()
    ).clearContent();

  }

}

/**
 * Agrega una tarea
 */
function FG_Task_add(task){

  const sheet = FG_Task_getSheet();

  sheet.appendRow([

    task.prioridad,

    task.tarea,

    task.hora,

    task.candidateId,

    task.applicationId,

    task.nombre,

    task.telefono,

    task.sucursal,

    task.estado

  ]);

}

/**
 * Genera todas las tareas del día
 */
function FG_Task_generateToday(){

  FG_Task_clear();

  const applications =
  FG_Repository_getCurrentApplications();

  applications.forEach(function(app){

    const candidate =
      FG_Repository_getCandidate(
        app.Candidate_ID
      );

    if(!candidate){

      return;

    }

    switch(app.Estado){

      case TALENTRY.STATUS.NUEVA:

        FG_Task_add({

          prioridad: TALENTRY.PRIORITY.ALTA,

          tarea:"Llamar candidato",

          hora:"09:00",

          candidateId:app.Candidate_ID,

          applicationId:app.Application_ID,

          nombre:candidate.Nombre_Completo,

          telefono:candidate.Telefono,

          sucursal:app.Nombre_Sucursal,

          estado:app.Estado

        });

      break;



      case TALENTRY.STATUS.CONTACTADO:

        FG_Task_add({

          prioridad:TALENTRY.PRIORITY.MEDIA,

          tarea:"Confirmar entrevista",

          hora:"10:00",

          candidateId:app.Candidate_ID,

          applicationId:app.Application_ID,

          nombre:candidate.Nombre_Completo,

          telefono:candidate.Telefono,

          sucursal:app.Nombre_Sucursal,

          estado:app.Estado

        });

      break;



      case TALENTRY.STATUS.NO_RESPONDIO:

        FG_Task_add({

          prioridad: TALENTRY.PRIORITY.ALTA,

          tarea:"Reintentar llamada",

          hora:"11:00",

          candidateId:app.Candidate_ID,

          applicationId:app.Application_ID,

          nombre:candidate.Nombre_Completo,

          telefono:candidate.Telefono,

          sucursal:app.Nombre_Sucursal,

          estado:app.Estado

        });

      break;



      case TALENTRY.STATUS.ENTREVISTA_AGENDADA:

        FG_Task_add({

          prioridad: TALENTRY.PRIORITY.ALTA,

          tarea:"Recordar entrevista",

          hora:"08:30",

          candidateId:app.Candidate_ID,

          applicationId:app.Application_ID,

          nombre:candidate.Nombre_Completo,

          telefono:candidate.Telefono,

          sucursal:app.Nombre_Sucursal,

          estado:app.Estado

        });

      break;



      case TALENTRY.STATUS.EN_DOCUMENTACION:

        FG_Task_add({

          prioridad: TALENTRY.PRIORITY.ALTA,

          tarea:"Solicitar documentación",

          hora:"12:00",

          candidateId:app.Candidate_ID,

          applicationId:app.Application_ID,

          nombre:candidate.Nombre_Completo,

          telefono:candidate.Telefono,

          sucursal:app.Nombre_Sucursal,

          estado:app.Estado

        });

      break;

    }

  });

  FG_Utils_log("Mi_Dia actualizado.");

}

/**
 * Devuelve únicamente las tareas pendientes
 */
function FG_Task_getTasks(){

  const sheet = FG_Task_getSheet();

  const data = sheet.getDataRange().getValues();

return data.length > 1 ? data.slice(1) : [];

}

/**
 * Prueba
 */
function FG_Task_getPending(){

  return FG_Task_getTasks();

}

function FG_Task_getTodayInterviews(){

  return FG_Repository_getApplicationsByStatus(
    TALENTRY.STATUS.ENTREVISTA_AGENDADA
  );

}
function FG_Task_test(){

  Logger.log(FG_Task_getPending());

}
