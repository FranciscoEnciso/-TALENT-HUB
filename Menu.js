/**
 * ==========================================================
 * FG TALENT HUB
 * Menu.js v1.0
 * ==========================================================
 */

function FG_Menu_onOpen() {

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
  "Actualizar Mi Día",
  "FG_Task_generateToday"
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

  SpreadsheetApp.getUi().alert(
  JSON.stringify(
    FG_MyDay_summary(),
    null,
    2
  )
);

}

function FG_Menu_dashboard(){

  SpreadsheetApp.getUi().alert(
  JSON.stringify(
    FG_Dashboard_get(),
    null,
    2
  )
);

}
function onOpen(){

  FG_Menu_onOpen();

}