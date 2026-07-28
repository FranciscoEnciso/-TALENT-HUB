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

    return app.Estado === String(status);

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
 * Postulaciones por candidato.
 */
function FG_Repository_getApplicationsByCandidate(candidateId){

  return FG_Repository_getApplications().filter(function(app){

    return String(app.Candidate_ID) === String(candidateId);

  });

}

/**
 * Entrevistas por candidato.
 */
function FG_Repository_getInterviewsByCandidate(candidateId){

  return FG_Repository_getInterviews().filter(function(interview){

    return String(interview.Candidate_ID) === String(candidateId);

  });

}

/**
 * Total de candidatos.
 */
function FG_Repository_countCandidates(){

  return FG_Repository_getCandidates().length;

}

/**
 * Total de postulaciones.
 */
function FG_Repository_countApplications(){

  return FG_Repository_getApplications().length;

}

/**
 * Total de entrevistas.
 */
function FG_Repository_countInterviews(){

  return FG_Repository_getInterviews().length;

}

/**
 * Total de contratados.
 */
function FG_Repository_countHires(){

  return FG_Repository_getApplicationsByStatus(
    FG.STATUS.CONTRATADO
  ).length;

}
/**
 * Prueba
 */
/**
 * Devuelve únicamente la última postulación de cada candidato.
 */

function FG_Repository_getCurrentApplications(){

  const applications = FG_Repository_getApplications();

  const map = {};

  applications.forEach(function(app){

    map[app.Candidate_ID] = app;

  });

  return Object.values(map);

}

/**
 * Devuelve únicamente la última postulación de cada candidato.
 */
function FG_Repository_getCurrentApplications(){

  const applications = FG_Repository_getApplications();

  const map = {};

  applications.forEach(function(app){

    map[app.Candidate_ID] = app;

  });

  return Object.values(map);

}

function FG_Repository_test(){

  const apps = FG_Repository_getApplications();

  Logger.log(

    "Postulaciones: " +

    apps.length

  );

}