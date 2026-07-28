/**
 * ==========================================================
 * FG TALENT HUB
 * Main.gs v2.1Logger.log("====================================")
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
  FG_Audit_candidateCreated(candidateId);

  // Relacionar la postulación con el candidato
  application.candidateId = candidateId;

  // Guardar postulación
  const applicationId = FG_Application_create(application);

  // Auditoría de la postulación
  FG_Audit_applicationCreated(
    applicationId,
    candidateId
  );

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