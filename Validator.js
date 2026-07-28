/**
 * ==========================================================
 * FG TALENT HUB
 * Validator.gs v1.0
 * ==========================================================
 */

/**
 * Punto de entrada principal.
 */
function FG_Validator_validateSystem(){

  FG_Validator_checkSheets();

  FG_Validator_checkHeaders();

  Logger.log("Sistema validado correctamente.");

  return true;

}

/**
 * Verifica que existan todas las hojas.
 */
function FG_Validator_checkSheets(){

  const spreadsheet = SpreadsheetApp.getActive();

  Object.keys(FG.SHEETS).forEach(function(key){

    const sheetName = FG.SHEETS[key];

    const sheet = spreadsheet.getSheetByName(sheetName);

    if(!sheet){

      throw new Error(
        "No existe la hoja: " + sheetName
      );

    }

  });

}

/**
 * Valida encabezados.
 */
function FG_Validator_checkHeaders(){

  FG_Validator_validateHeader(
    FG.SHEETS.CANDIDATOS,
    FG.CANDIDATE_HEADERS
  );

  FG_Validator_validateHeader(
    FG.SHEETS.POSTULACIONES,
    FG.APPLICATION_HEADERS
  );

  FG_Validator_validateHeader(
    FG.SHEETS.AUDITORIA,
    FG.AUDIT_HEADERS
  );

}

/**
 * Valida una hoja específica.
 */
function FG_Validator_validateHeader(sheetName, expectedHeaders){

  const sheet = SpreadsheetApp
    .getActive()
    .getSheetByName(sheetName);

  const headers = sheet
    .getRange(
      1,
      1,
      1,
      expectedHeaders.length
    )
    .getValues()[0];

  for(let i=0;i<expectedHeaders.length;i++){

    if(headers[i] != expectedHeaders[i]){

      throw new Error(

        "Error en hoja '" +

        sheetName +

        "' columna " +

        (i+1) +

        ". Se esperaba '" +

        expectedHeaders[i] +

        "' y existe '" +

        headers[i] +

        "'."

      );

    }

  }

}

/**
 * Detecta encabezados duplicados.
 */
function FG_Validator_checkDuplicateHeaders(sheetName){

  const sheet = SpreadsheetApp
    .getActive()
    .getSheetByName(sheetName);

  const headers = sheet
    .getDataRange()
    .offset(0,0,1)
    .getValues()[0];

  const duplicates = [];

  headers.forEach(function(header,index){

    if(headers.indexOf(header)!=index){

      duplicates.push(header);

    }

  });

  if(duplicates.length){

    throw new Error(

      "Encabezados duplicados en " +

      sheetName +

      ": " +

      duplicates.join(", ")

    );

  }

}

/**
 * Ejecuta todas las validaciones.
 */
function FG_Validator_runFullCheck(){

  FG_Validator_checkSheets();

  FG_Validator_checkHeaders();

  FG_Validator_checkDuplicateHeaders(
    FG.SHEETS.CANDIDATOS
  );

  FG_Validator_checkDuplicateHeaders(
    FG.SHEETS.POSTULACIONES
  );

  FG_Validator_checkDuplicateHeaders(
    FG.SHEETS.AUDITORIA
  );

  Logger.log("VALIDACIÓN COMPLETA EXITOSA.");

}

/**
 * Prueba
 */
function FG_Validator_test(){

  FG_Validator_runFullCheck();

}