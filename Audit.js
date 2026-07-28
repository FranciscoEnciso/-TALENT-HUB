/**
 * ==========================================================
 * FG TALENT HUB
 * Audit.gs v1.0
 * ==========================================================
 */

const FG_AUDIT = {

  MODULES: {

    CANDIDATE: "Candidate",

    APPLICATION: "Application",

    INTERVIEW: "Interview",

    STATE: "StateEngine",

    SYSTEM: "System"

  },

  ACTIONS: {

    CREATE: "CREATE",

    UPDATE: "UPDATE",

    DELETE: "DELETE",

    STATE_CHANGE: "STATE_CHANGE",

    ERROR: "ERROR"

  }

};

/**
 * Devuelve la hoja Auditoría
 */
function FG_Audit_getSheet(){

  return SpreadsheetApp
    .getActive()
    .getSheetByName(FG.SHEETS.AUDITORIA);

}

/**
 * Obtiene el usuario actual.
 */
function FG_Audit_getUser(){

  try{

    const email = Session.getActiveUser().getEmail();

    if(email){

      return email;

    }

  }

  catch(e){}

  return FG.SYSTEM.DEFAULT_RECRUITER;

}

/**
 * Registra un evento.
 */
function FG_Audit_register(log){

  const sheet = FG_Audit_getSheet();

  sheet.appendRow([

    new Date(),

    FG_Audit_getUser(),

    log.module || "",

    log.action || "",

    log.candidateId || "",

    log.applicationId || "",

    log.previousState || "",

    log.newState || "",

    log.description || ""

  ]);

}

/**
 * Registrar error.
 */
function FG_Audit_error(module,error){

  FG_Audit_register({

    module:module,

    action:FG_AUDIT.ACTIONS.ERROR,

    description:error.toString()

  });

}

/**
 * Crear candidato.
 */
function FG_Audit_candidateCreated(candidateId){

  FG_Audit_register({

    module:FG_AUDIT.MODULES.CANDIDATE,

    action:FG_AUDIT.ACTIONS.CREATE,

    candidateId:candidateId,

    description:"Nuevo candidato registrado."

  });

}

/**
 * Nueva postulación.
 */
function FG_Audit_applicationCreated(applicationId,candidateId){

  FG_Audit_register({

    module:FG_AUDIT.MODULES.APPLICATION,

    action:FG_AUDIT.ACTIONS.CREATE,

    applicationId:applicationId,

    candidateId:candidateId,

    description:"Nueva postulación registrada."

  });

}

/**
 * Cambio de estado.
 */
function FG_Audit_stateChanged(applicationId,candidateId,oldState,newState){

  FG_Audit_register({

    module:FG_AUDIT.MODULES.STATE,

    action:FG_AUDIT.ACTIONS.STATE_CHANGE,

    applicationId:applicationId,

    candidateId:candidateId,

    previousState:oldState,

    newState:newState,

    description:"Cambio de estado."

  });

}

/**
 * Prueba
 */
function FG_Audit_test(){

  FG_Audit_register({

    module:FG_AUDIT.MODULES.SYSTEM,

    action:"TEST",

    description:"Prueba de Auditoría."

  });

}