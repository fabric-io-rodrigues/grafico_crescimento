document.pyodideMplTarget = document.getElementById("plot-target");

//add overlay
var overlay = document.getElementsByClassName("overlay")[0];
if (overlay) {
  var plotTarget = document.getElementById("plot-target");
  plotTarget.appendChild(overlay);
}

var hideOverlay = function () {
  overlay.style.display = "none";
};
var showOverlay = function () {
  overlay.style.display = "";
};
var updateTextOverlay = function (text) {
  $(".overlay span").text(text);
};

var pyodide = {};
var scripts = {};
var populateData = function () {
  var objData = survey.getData() || sampleData;

  pyodide.runPython(`dados_paciente['nome'] = "${objData.nome}"`);
  pyodide.runPython(`dados_paciente['nascimento'] = "${objData.nascimento}"`);
  pyodide.runPython(`dados_paciente['sexo_id'] = ${objData.sexo}`);
  pyodide.runPython(`dados_paciente['altura_pai'] = ${objData.altura_pai}`);
  pyodide.runPython(`dados_paciente['altura_mae'] = ${objData.altura_mae}`);
  pyodide.runPython(`clear_data()`);
  for (var i = 0; i < objData.ap.length; i++) {
    pyodide.runPython(
      `add_data(${objData.ap[i].ano_idade}, ${objData.ap[i].mes_idade}, ${objData.ap[i].peso}, ${objData.ap[i].altura})`
    );
  }
  pyodide.runPython(`update_data()`);
};
function runScript() {
  var img = document
    .getElementById("plot-target")
    .getElementsByTagName("img")[0];
  if (img) {
    img.remove();
  }
  showOverlay();
  updateTextOverlay("Ploting data ...");
  Promise.all([
    fetch("script_def.py")
      .then((responseScript) => responseScript.text())
      .then((script) => (scripts["script_def.py"] = script)),
    fetch("script_plot.py")
      .then((responseScript) => responseScript.text())
      .then((script) => (scripts["script_plot.py"] = script)),
  ]).then((csvDataScript) => {
    pyodide.runPython(scripts["script_def.py"]);
    populateData();
    pyodide.runPython(scripts["script_plot.py"]);
    hideOverlay();

    var img = document.createElement("img");
    document.getElementById("plot-target").appendChild(img);
    img.src = pyodide.globals.get("img_str");
  });
}

async function main() {
  pyodide = await loadPyodide();
  updateTextOverlay("Loading libs ...");
  console.log(
    pyodide.runPython(`
        import sys
        sys.version
    `)
  );
  updateTextOverlay("Loading matplotlib ...");
  await pyodide.loadPackage("matplotlib");
  updateTextOverlay("Loading pandas ...");
  await pyodide.loadPackage("pandas");
  updateTextOverlay("Loading numpy ...");
  await pyodide.loadPackage("numpy");

  updateTextOverlay("Loading data ...");
  const csvUrl1 = "https://www.cdc.gov/growthcharts/data/zscore/statage.csv";
  const csvUrl2 = "https://www.cdc.gov/growthcharts/data/zscore/wtage.csv";
  const response1 = await fetch(csvUrl1);
  const csvData1 = await response1.text();
  pyodide.globals.set("csv_data1", csvData1);
  const response2 = await fetch(csvUrl2);
  const csvData2 = await response2.text();
  pyodide.globals.set("csv_data2", csvData2);
  runScript();
}

setTimeout(main, 10);

window.updateChart = runScript;

window.makePDF = function () {
  var img = document
    .getElementById("plot-target")
    .getElementsByTagName("img")[0];
  const { jsPDF } = window.jspdf;
  var pdf = new jsPDF({ compress: true, format: "a4" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  var imgData = img.src;
  var imgWidth = img.width;
  var imgHeight = img.height;
  var imgAspectRatio = imgWidth / imgHeight;
  var newWidth = pageWidth;
  var newHeight = pageWidth / imgAspectRatio;
  if (newHeight > pageHeight) {
    newHeight = pageHeight;
    newWidth = pageHeight * imgAspectRatio;
  }
  var xOffset = (pageWidth - newWidth) / 2;
  var yOffset = (pageHeight - newHeight) / 2;
  pdf.addImage(imgData, "PNG", xOffset, yOffset, newWidth, newHeight);
  pdf.save("plot.pdf");
};
