/**
 * ==========================================================
 * FG TALENT HUB
 * Repository.gs v1.0
 * Capa de acceso a datos
 * ==========================================================
 */

/**
 * Obtiene todos los registros de una hoja.
 */
function FG_Repository_getAll(sheetName){

  const sheet = FG_Utils_getSheet(sheetName);

  const data = sheet.getDataRange().getValues();

  if(data.length <= 1){
    return [];
  }

  const headers = data.shift();

  return data.map(function(row){

    return FG_Utils_rowToObject(headers,row);

  });

}

/**
 * Busca un registro por una columna.
 */
function FG_Repository_findBy(sheetName,columnName,value){

  const rows = FG_Repository_getAll(sheetName);

  for(let i=0;i<rows.length;i++){

    if(String(rows[i][columnName])===String(value)){

      return rows[i];

    }

  }

  return null;

}

/**
 * Devuelve un candidato.
 */
function FG_Repository_getCandidate(candidateId){

  return FG_Repository_findBy(

    FG.SHEETS.CANDIDATOS,

    "Candidate_ID",

    candidateId

  );

}

/**
 * Devuelve una postulación.
 */
function FG_Repository_getApplication(applicationId){

  return FG_Repository_findBy(

    FG.SHEETS.POSTULACIONES,

    "Application_ID",

    applicationId

  );

}

/**
 * Devuelve todas las postulaciones.
 */
function FG_Repository_getApplications(){

  return FG_Repository_getAll(

    FG.SHEETS.POSTULACIONES

  );

}

/**
 * Devuelve todos los candidatos.
 */
function FG_Repository_getCandidates(){

  return FG_Repository_getAll(

    FG.SHEETS.CANDIDATOS

  );

}

/**
 * Devuelve las postulaciones por estado.
 */
function FG_Repository_getApplicationsByStatus(status){

  const applications = FG_Repository_getApplications();

  return applications.filter(function(app){

    return app.Estado === status;

  });

}

/**
 * Devuelve todas las entrevistas.
 */
function FG_Repository_getInterviews(){

  return FG_Repository_getAll(

    FG.SHEETS.ENTREVISTAS

  );

}

/**
 * Guarda una fila.
 */
function FG_Repository_insert(sheetName,row){

  FG_Utils_appendRow(

    sheetName,

    row

  );

}

/**
 * Actualiza una fila.
 */
function FG_Repository_update(sheetName,rowNumber,row){

  FG_Utils_updateRow(

    sheetName,

    rowNumber,

    row

  );

}

/**
 * Prueba
 */
function FG_Repository_test(){

  const apps = FG_Repository_getApplications();

  Logger.log(

    "Postulaciones: " +

    apps.length

  );

}