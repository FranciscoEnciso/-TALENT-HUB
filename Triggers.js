/**
 * ==========================================================
 * FG TALENT HUB
 * Triggers.gs v3.0
 * ==========================================================
 */

/**
 * Se ejecuta automáticamente cuando el formulario recibe
 * una nueva respuesta.
 */
function FG_onFormSubmit(e) {

  try {

    const sheet = e.range.getSheet();

    const lastColumn = sheet.getLastColumn();

    const headers = sheet
      .getRange(1, 1, 1, lastColumn)
      .getValues()[0];

    const values = sheet
      .getRange(e.range.getRow(), 1, 1, lastColumn)
      .getValues()[0];

    
    FG_Main_processForm(
      headers,
      values
    );


  } catch (error) {

    FG_Audit_error(
  FG_AUDIT.MODULES.SYSTEM,
  error
);

throw error;

  }

}

/**
 * Instala nuevamente el Trigger.
 * Ejecutar UNA sola vez.
 */
function FG_InstallTrigger(){

  const triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(trigger => {

    if(trigger.getHandlerFunction() === "FG_onFormSubmit"){

      ScriptApp.deleteTrigger(trigger);

    }

  });

  ScriptApp.newTrigger("FG_onFormSubmit")
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create();

  Logger.log("Trigger instalado correctamente.");

}

/**
 * Elimina todos los triggers del proyecto.
 */
function FG_DeleteTriggers(){

  const triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(trigger => {

    ScriptApp.deleteTrigger(trigger);

  });

  Logger.log("Todos los triggers fueron eliminados.");

}
