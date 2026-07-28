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
function FG_Menu_scheduleInterview(){

  const html = HtmlService
    .createHtmlOutputFromFile("InterviewForm")
    .setWidth(450)
    .setHeight(520);

  SpreadsheetApp
    .getUi()
    .showModalDialog(
      html,
      "Agendar entrevista"
    );

}
function FG_Menu_scheduleInterviewSave(data){

  const interviewId = FG_Interview_schedule(data);

  FG_Task_generateToday();

  return interviewId;

}
