const survey = new Survey.Model(json);

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const darkModeOn = darkModeMediaQuery.matches;
if (darkModeOn) {
  survey.applyTheme(SurveyTheme.DefaultDark);
  document.body.classList.add("darkMode");
} else {
  survey.applyTheme(SurveyTheme.DefaultLight);
}

var onceRendered = false;
survey.onAfterRenderPanel.add(function (survey, options) {
  if (options.panel.name === "results") {
    if (onceRendered) {
      return;
    }
    onceRendered = true;

    var div = options.htmlElement;
    var header = div.getElementsByClassName("sd-panel__header")[0];

    var buttonUpdate = document.createElement("button");
    buttonUpdate.innerHTML = "Atualizar";
    buttonUpdate.onclick = function () {
      if (survey.validate()) {
        if (window.encodeJsonToBase64) {
          var data = survey.getData();
          window.encodeJsonToBase64(data);
        }
        if (window.updateChart) {
          window.updateChart();
        }
      }
    };
    buttonUpdate.style =
      "float: right; margin-top: -5px; padding: 5px 10px; margin-left: 10px;";
    buttonUpdate.className = "sd-btn sd-btn--action";
    header.appendChild(buttonUpdate);

    var buttonMakePDF = document.createElement("button");
    buttonMakePDF.innerHTML = "PDF";
    buttonMakePDF.onclick = function () {
      if (window.makePDF) {
        window.makePDF();
      }
    };
    buttonMakePDF.style =
      "float: right; margin-top: -5px; padding: 5px 10px; margin-left: 10px;";
    buttonMakePDF.className = "sd-btn sd-btn--action";
    header.appendChild(buttonMakePDF);

    //adjust h4
    var h4 = header.getElementsByTagName("h4")[0];
    h4.style = "display: inline-block;";
  }
});

survey.render(document.getElementById("surveyElement"));
