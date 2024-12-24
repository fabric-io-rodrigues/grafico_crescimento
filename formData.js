function encodeJsonToBase64_share(jsonObject) {
  const jsonString = JSON.stringify(jsonObject);
  const base64String = btoa(jsonString);
  const url =
    window.location.href.split("?")[0] +
    "?data=" +
    encodeURIComponent(base64String);
  return url;
}

function encodeJsonToBase64(jsonObject) {
  const jsonString = JSON.stringify(jsonObject);
  const base64String = btoa(jsonString);
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?data=" +
    encodeURIComponent(base64String);
  window.history.pushState({ path: newUrl }, "", newUrl);
}

var sampleData = {
  nome: "A definir ...",
  nascimento: "2021-12-21",
  sexo: "1",
  ap: [{ ano_idade: "10", mes_idade: "1", altura: 130.5, peso: 34.5 }],
  altura_pai: 165.5,
  altura_mae: 165.5,
};
function decodeJsonFromQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  const base64String = urlParams.get("data");

  if (base64String) {
    const jsonString = atob(base64String);

    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (error) {
      console.error("Erro ao decodificar JSON", error);
      return null;
    }
  }
  return null;
}

//check data
var objData = decodeJsonFromQueryString() || sampleData;
survey.setDataCore(objData);
