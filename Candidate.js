/**
 * FG TALENT HUB - Candidate.gs v2.1
 */

const FG_CANDIDATE_COLUMNS = {
  ID:1,
  NAME:2,
  PHONE:3,
  AGE:4,
  EDUCATION:5,
  STUDYING:6,
  MUNICIPALITY:7,
  COLONY:8,
  FIRST_DATE:9,
  LAST_APPLICATION:10,
  TOTAL_APPLICATIONS:11,
  TOTAL_INTERVIEWS:12,
  TOTAL_HIRES:13,
  STATUS:14,
  REHIRE:15,
  TRAFFIC:16,
  NOTES:17
};

function FG_Candidate_getSheet(){

  return FG_Utils_getSheet(
    TALENTRY.SHEETS.CANDIDATOS
  );

}

function FG_Candidate_generateId(){

  const sheet = FG_Candidate_getSheet();

  const lastRow = sheet.getLastRow();

  if(lastRow <= 1){

    return "CAND-000001";

  }

  const ids = sheet
    .getRange(
      2,
      FG_CANDIDATE_COLUMNS.ID,
      lastRow - 1,
      1
    )
    .getValues()
    .flat();

  let maxId = 0;

  ids.forEach(function(id){

    const match = String(id).match(/^CAND-(\d+)$/);

    if(match){

      maxId = Math.max(
        maxId,
        Number(match[1])
      );

    }

  });

  return "CAND-" + Utilities.formatString(
    "%06d",
    maxId + 1
  );

}
 
/**
 * Normaliza teléfonos.
 */
function FG_Candidate_normalizePhone(phone){

  if(phone===null || phone===undefined){
    return "";
  }

  return String(phone)
    .replace(/\D/g,"")
    .trim();

}

/**
 * Busca candidato por teléfono.
 */
function FG_Candidate_findByPhone(phone){

  const normalized = FG_Candidate_normalizePhone(phone);

  const data = FG_Candidate_getSheet()
    .getDataRange()
    .getValues();

  for(let i=1;i<data.length;i++){

    const current = FG_Candidate_normalizePhone(data[i][FG_CANDIDATE_COLUMNS.PHONE - 1]);

    if(current===normalized){

      return {
        row:i+1,
        id:data[i][0]
      };

    }

  }

  return null;

}

function FG_Candidate_exists(phone){

  return FG_Candidate_findByPhone(phone) !== null;

}

function FG_Candidate_buildRow(c,id){

  const d = FG_Utils_now();

  return [

    id,

    c.nombre || "",

    FG_Candidate_normalizePhone(c.telefono),

    c.edad || "",

    c.escolaridad || "",

    c.estudia || "",

    c.municipio || "",

    c.colonia || "",

    d,

    d,

    1,

    0,

    0,

    TALENTRY.CANDIDATE_STATUS.NUEVO,
"",
TALENTRY.TRAFFIC.VERDE,
""

  ];

}

function FG_Candidate_create(c){

  const sheet = FG_Candidate_getSheet();

  const id = FG_Candidate_generateId();

const row = FG_Candidate_buildRow(c, id);

sheet
  .getRange(
    sheet.getLastRow() + 1,
    1,
    1,
    row.length
  )
  .setValues([row]);
  return id;

}

function FG_Candidate_update(c){

  const found = FG_Candidate_findByPhone(c.telefono);

  if(!found){

    return null;

  }

  const sheet = FG_Candidate_getSheet();

  const total = Number(

    sheet.getRange(
  found.row,
  FG_CANDIDATE_COLUMNS.TOTAL_APPLICATIONS
).getValue()

  ) + 1;

  sheet.getRange(
  found.row,
  FG_CANDIDATE_COLUMNS.LAST_APPLICATION
).setValue(FG_Utils_now());

  sheet.getRange(
  found.row,
  FG_CANDIDATE_COLUMNS.TOTAL_APPLICATIONS
).setValue(total);

  sheet.getRange(
  found.row,
  FG_CANDIDATE_COLUMNS.STATUS
).setValue(TALENTRY.CANDIDATE_STATUS.REPOSTULACION);

  return found.id;

}

function FG_Candidate_save(c){

  return FG_Candidate_exists(c.telefono)

    ? FG_Candidate_update(c)

    : FG_Candidate_create(c);

}

function FG_Candidate_test(){

  Logger.log(

    FG_Candidate_save({

      nombre:"Prueba Producción",

      telefono:"444-111-2233",

      edad:25,

      escolaridad:"Preparatoria",

      estudia:"No",

      municipio:"San Luis Potosí",

      colonia:"Centro"

    })

  );

}