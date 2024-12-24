const json = {
    "locale": "pt-br",
    "completedHtmlOnCondition": [
      {}
    ],
    "pages": [
      {
        "name": "page1",
        "questionTitleLocation": "left",
        "elements": [
          {
            "type": "panel",
            "name": "personal-information",
            "title": "Dados da Criança",
            "state": "expanded",
            "elements": [
              {
                "type": "text",
                "name": "nome",
                "title": "Nome",
                "isRequired": true
              },
              {
                "type": "text",
                "name": "nascimento",
                "title": "Nascimento",
                "isRequired": true,
                "inputType": "date",
                "dateFormat": "dd/mm/yy",
                "autocomplete": "bday",
                "maxValueExpression": "today()"
              },
              {
                "type": "dropdown",
                "name": "sexo",
                "startWithNewLine": false,
                "title": "Sexo",
                "isRequired": true,
                "choices": [
                  {
                    "value": "1",
                    "text": "Menino"
                  },
                  {
                    "value": "2",
                    "text": "Menina"
                  }
                ]
              }
            ]
          },
          {
            "type": "panel",
            "name": "altura_peso_observados",
            "title": "Altura e peso",
            "state": "expanded",
            "elements": [
              {
                "type": "matrixdynamic",
                "name": "ap",
                "title": " ",
                "alternateRows": true,
                "columns": [
                  {
                    "name": "ano_idade",
                    "title": "Ano - Idade",
                    "cellType": "dropdown",
                    "isRequired": true,
                    "choices": [
                      {
                        "value": "2",
                        "text": "2 anos"
                      },
                      {
                        "value": "3",
                        "text": "3 anos"
                      },
                      {
                        "value": "4",
                        "text": "4 anos"
                      },
                      {
                        "value": "5",
                        "text": "5 anos"
                      },
                      {
                        "value": "6",
                        "text": "6 anos"
                      },
                      {
                        "value": "7",
                        "text": "7 anos"
                      },
                      {
                        "value": "8",
                        "text": "8 anos"
                      },
                      {
                        "value": "9",
                        "text": "9 anos"
                      },
                      {
                        "value": "10",
                        "text": "10 anos"
                      },
                      {
                        "value": "11",
                        "text": "11 anos"
                      },
                      {
                        "value": "12",
                        "text": "12 anos"
                      },
                      {
                        "value": "13",
                        "text": "13 anos"
                      },
                      {
                        "value": "14",
                        "text": "14 anos"
                      },
                      {
                        "value": "15",
                        "text": "15 anos"
                      },
                      {
                        "value": "16",
                        "text": "16 anos"
                      },
                      {
                        "value": "17",
                        "text": "17 anos"
                      },
                      {
                        "value": "18",
                        "text": "18 anos"
                      }
                    ],
                    "allowClear": false
                  },
                  {
                    "name": "mes_idade",
                    "title": "Mês - Idade",
                    "cellType": "dropdown",
                    "isRequired": true,
                    "choices": [
                      {
                        "value": "1",
                        "text": "1 mês"
                      },
                      {
                        "value": "2",
                        "text": "2 meses"
                      },
                      {
                        "value": "3",
                        "text": "3 meses"
                      },
                      {
                        "value": "4",
                        "text": "4 meses"
                      },
                      {
                        "value": "5",
                        "text": "5 meses"
                      },
                      {
                        "value": "6",
                        "text": "6 meses"
                      },
                      {
                        "value": "7",
                        "text": "7 meses"
                      },
                      {
                        "value": "8",
                        "text": "8 meses"
                      },
                      {
                        "value": "9",
                        "text": "9 meses"
                      },
                      {
                        "value": "10",
                        "text": "10 meses"
                      },
                      {
                        "value": "11",
                        "text": "11 meses"
                      }
                    ],
                    "allowClear": false
                  },
                  {
                    "name": "altura",
                    "title": "Altura (cm)",
                    "cellType": "text",
                    "isRequired": true,
                    "inputType": "number",
                    "min": 80,
                    "max": 190
                  },
                  {
                    "name": "peso",
                    "title": {
                      "pt-br": "Peso (kg)"
                    },
                    "cellType": "text",
                    "isRequired": true,
                    "inputType": "number",
                    "min": 15,
                    "max": 100
                  }
                ],
                "minRowCount": 1,
                "maxRowCount": 100,
                "addRowLocation": "bottom"
              }
            ]
          },
          {
            "type": "panel",
            "name": "dados_pais",
            "title": {
              "default": "Dados da Criança",
              "pt-br": "Dados dos Pais"
            },
            "state": "collapsed",
            "elements": [
              {
                "type": "text",
                "name": "altura_pai",
                "title": "Altura do Pai (cm)",
                "isRequired": true,
                "inputType": "number",
                "min": 140,
                "max": 220,
                "step": -2
              },
              {
                "type": "text",
                "name": "altura_mae",
                "title":  "Altura da Mãe (cm)",
                "isRequired": true,
                "inputType": "number",
                "min": 140,
                "max": 220
              }
            ]
          },
          {
            "type": "panel",
            "name": "results",
            "readOnly": true,
            "title": {
              "pt-br": "Gráfico"
            },
            "elements": [
              {
                "type": "html",
                "name": "question2",
                "html":  "<div id='plot-target'></div>"
              }
            ]
          }
        ]
      }
    ],
    "triggers": [
      {
        "type": "complete"
      }
    ],
    "showNavigationButtons": "none",
    "showTitle": false,
    "showPageTitles": false,
    "showCompletedPage": false,
    "showQuestionNumbers": "off",
    "questionErrorLocation": "bottom",
    "questionsOnPageMode": "singlePage",
    "widthMode": "responsive"
  }