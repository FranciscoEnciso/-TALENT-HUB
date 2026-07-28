/**
 * ==========================================================
 * FG TALENT HUB
 * Utils.gs v2.0
 * Librería General
 * ==========================================================
 */

/**
 * Obtiene una hoja por nombre.
 */
function FG_Utils_getSheet(sheetName){

  return SpreadsheetApp
    .getActive()
    .getSheetByName(sheetName);

}

/**
 * Devuelve la fecha actual.
 */
function FG_Utils_now(){

  return new Date();

}

/**
 * Genera un ID.
 * Ejemplo:
 * CAND-20260726195831
 */
function FG_Utils_generateId(prefix){

  return prefix + "-" +

  Utilities.formatDate(

    new Date(),

    Session.getScriptTimeZone(),

    "yyyyMMddHHmmss"

  );

}

/**
 * Obtiene encabezados.
 */
function FG_Utils_getHeaders(sheetName){

  const sheet = FG_Utils_getSheet(sheetName);

  return sheet
    .getRange(
      1,
      1,
      1,
      sheet.getLastColumn()
    )
    .getValues()[0];

}

/**
 * Convierte una fila en objeto.
 */
function FG_Utils_rowToObject(headers,row){

  const obj = {};

  headers.forEach(function(header,index){

    obj[header] = row[index];

  });

  return obj;

}

/**
 * Busca una fila.
 */
function FG_Utils_findRow(sheetName,column,value){

  const sheet = FG_Utils_getSheet(sheetName);

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(String(data[i][column-1])==String(value)){

      return i+1;

    }

  }

  return -1;

}

/**
 * Escribe una fila.
 */
function FG_Utils_appendRow(sheetName,row){

  const sheet = FG_Utils_getSheet(sheetName);

  sheet.appendRow(row);

}

/**
 * Actualiza una fila.
 */
function FG_Utils_updateRow(sheetName,row,rowData){

  const sheet = FG_Utils_getSheet(sheetName);

  sheet
    .getRange(
      row,
      1,
      1,
      rowData.length
    )
    .setValues([rowData]);

}

/**
 * Obtiene una fila completa.
 */
function FG_Utils_getRow(sheetName,row){

  const sheet = FG_Utils_getSheet(sheetName);

  return sheet
    .getRange(
      row,
      1,
      1,
      sheet.getLastColumn()
    )
    .getValues()[0];

}

/**
 * Verifica si un valor está vacío.
 */
function FG_Utils_isEmpty(value){

  return value===null ||

         value===undefined ||

         value==="";

}

/**
 * Registra mensajes.
 */
function FG_Utils_log(message){

  Logger.log(

    "[FG] " + message

  );

}

/**
 * Prueba.
 */
function FG_Utils_test(){

  FG_Utils_log(

    "Utils funcionando correctamente."

  );

}