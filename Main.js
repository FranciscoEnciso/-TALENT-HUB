// @ts-nocheck
/**
 * ==========================================================
 * FG TALENT HUB
 * Main.gs v2.1
 * Orquestador Principal
 * ==========================================================
 */

/**
 * Procesa un candidato y su postulación.
 */
function FG_Main_process(candidate, application) {

  // Guardar candidato
  const candidateId = FG_Candidate_save(candidate);

  // Auditoría del candidato
  if (typeof FG_Audit_candidateCreated === "function") {
    FG_Audit_candidateCreated(candidateId);
  }

  // Relacionar la postulación con el candidato
  application.candidateId = candidateId;

  // Guardar postulación
  const applicationId = FG_Application_create(application);

  // Auditoría de la postulación
  if (typeof FG_Audit_applicationCreated === "function") {
    FG_Audit_applicationCreated(
      applicationId,
      candidateId
    );
  }

  Logger.log("====================================");
  Logger.log("FG TALENT HUB");
  Logger.log("Candidate ID: " + candidateId);
  Logger.log("Application ID: " + applicationId);
  Logger.log("Proceso terminado correctamente.");
  Logger.log("====================================");

  return {
    candidateId: candidateId,
    applicationId: applicationId
  };

}

/**
 * Procesa una respuesta del formulario.
 */
function FG_Main_processForm(headers, values) {

  const data = FG_FormParser_parse(headers, values);

  return FG_Main_process(
    data.candidate,
    data.application
  );

}

/**
 * Prueba completa del flujo.
 */
function FG_Main_test(){

  const candidate = {

    nombre:"Francisco Enciso",

    telefono:"4441239999",

    edad:28,

    escolaridad:"Preparatoria",

    estudia:"No",

    municipio:"San Luis Potosí",

    colonia:"Centro"

  };

  const application = {

    numeroSucursal:268,

    nombreSucursal:"S.L.P. LOMAS",

    municipio:"San Luis Potosí",

    tiempoTraslado:"20 minutos",

    puedeRolar:"Sí",

    estudia:"No",

    experienciaClientes:"Sí",

    experienciaCajas:"Sí",

    ultimoTrabajo:"Empresa Demo",

    tiempoUltimoTrabajo:"2 años",

    motivoSalida:"Mejora laboral"

  };

  const result = FG_Main_process(candidate, application);

  Logger.log(result);

}
// Prueba de sincronización