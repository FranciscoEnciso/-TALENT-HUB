/**
 * ==========================================================
 * FG TALENT HUB
 * Menu.js v1.0
 * ==========================================================
 */

function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("FG Talent Hub")

    .addItem(
      "Agendar entrevista",
      "FG_Menu_scheduleInterview"
    )

    .addItem(
      "Registrar entrevista",
      "FG_Menu_finishInterview"
    )

    .addItem(
      "Marcar No asistió",
      "FG_Menu_noShow"
    )

    .addSeparator()

    .addItem(
      "Mi Día",
      "FG_Menu_myDay"
    )

    .addItem(
      "Dashboard",
      "FG_Menu_dashboard"
    )

    .addToUi();

}

function FG_Menu_scheduleInterview(){

  SpreadsheetApp.getUi().alert(
    "Pendiente: formulario para agendar entrevista."
  );

}

function FG_Menu_finishInterview(){

  SpreadsheetApp.getUi().alert(
    "Pendiente: formulario para registrar entrevista."
  );

}

function FG_Menu_noShow(){

  SpreadsheetApp.getUi().alert(
    "Pendiente: registrar No asistió."
  );

}

function FG_Menu_myDay(){

  Logger.log(FG_MyDay_summary());

}

function FG_Menu_dashboard(){

  Logger.log(FG_Dashboard_get());

}
