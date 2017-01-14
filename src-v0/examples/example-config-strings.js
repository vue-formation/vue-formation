export default {
  'Ex1': `{
  "liveValidation":true,
  "rows":[
    {
      "columns":[
        {
          "type":"text",
          "label":"First Name",
          "model":"firstName",
          "required":true
        },
        {
          "type":"text",
          "label":"Last Name",
          "model":"lastName"
        }
      ]
    },
    {
      "columns":[
        {
          "type":"buttons",
          "buttons":[
            {
              "text":"Clear",
              "class":"btn-default",
              "iconClass":"glyphicon glyphicon-remove",
              "onClick":(event, vm) => {
                vm.setData([\'firstName\', \'lastName\'], \'\');
              }
            },
            {
              "text":"Submit",
              "class":"btn-primary",
              "iconClass":"glyphicon glyphicon-ok",
              "onClick":(event, vm) => {
                if (!vm.validate()) return;
                vm.$root.$broadcast(\'modal.show\', {
                  title: \'Hello!\',
                  body: \'Welcome \' + vm.data.firstName + \' \' + vm.data.lastName,
                  footerButtons: [{
                    content: \'Close\',
                    class: \'btn btn-default\',
                    onClick:(event, modal) => {
                      modal.hide();
                    }
                  }]
                }, \'dialog\');
              }
            }
          ]
        }
      ]
    }
  ]
}`,
  'Ex2': `{
  "liveValidation":false,
  "rows":[
    {
      "columns":[
        {
          "type":"text",
          "label":"Text Input",
          "model":"text"
        },
        {
          "type":"fselect",
          "label":"FSelect",
          "model":"fselect",
          "multiple":true,
          "options":[
            {
              "value":"dog",
              "text":"Dog"
            },
            {
              "value":"cat",
              "text":"Cat"
            },
            {
              "value":"horse",
              "text":"Horse"
            },
            {
              "value":"duck",
              "text":"Duck"
            },
            {
              "value":"pig",
              "text":"Pig"
            },
            {
              "value":"elephant",
              "text":"Elephant"
            },
            {
              "value":"panda",
              "text":"Panda"
            },
            {
              "value":"koala",
              "text":"Koala"
            }
          ]
        }
      ]
    },
    {
      "columns":[
        {
          "type":"buttons",
          "buttons":[
            {
              "text":"Clear",
              "class":"btn-default",
              "iconClass":"glyphicon glyphicon-remove",
              "onClick":(event, vm) => {
                vm.setData(\'text\', \'\');
                vm.setData(\'fselect\', []);
              }
            },
            {
              "text":"Submit",
              "class":"btn-primary",
              "iconClass":"glyphicon glyphicon-ok",
              "onClick":(event, vm) => {
                if (!vm.validate()) return;
                vm.$root.$broadcast(\'modal.show\', {
                  title: \'Data\',
                  body: \'<pre>\' + (0, _stringify2.default)(vm.data, null, \'  \') + \'</pre>\',
                  footerButtons: [{
                    content: \'Close\',
                    class: \'btn btn-default\',
                    onClick:(event, modal) => {
                      modal.hide();
                    }
                  }]
                }, \'dialog\');
              }
            }
          ]
        }
      ]
    }
  ]
}`,
  'FormationEx1': `{
  "liveValidation":true,
  "rows":[
    {
      "columns":[
        {
          "type":"text",
          "label":"First Name",
          "model":"firstName",
          "required":true
        },
        {
          "type":"text",
          "label":"Last Name",
          "model":"lastName"
        }
      ]
    },
    {
      "columns":[
        {
          "type":"buttons",
          "buttons":[
            {
              "text":"Clear",
              "class":"btn-default",
              "iconClass":"glyphicon glyphicon-remove",
              "onClick":(event, vm) => {
                vm.setData([\'firstName\', \'lastName\'], \'\');
              }
            },
            {
              "text":"Submit",
              "class":"btn-primary",
              "iconClass":"glyphicon glyphicon-ok",
              "onClick":(event, vm) => {
                if (!vm.validate()) return;
                vm.$root.$broadcast(\'modal.show\', {
                  title: \'Hello!\',
                  body: \'Welcome \' + vm.data.firstName + \' \' + vm.data.lastName,
                  footerButtons: [{
                    content: \'Close\',
                    class: \'btn btn-default\',
                    onClick:(event, modal) => {
                      modal.hide();
                    }
                  }]
                }, \'dialog\');
              }
            }
          ]
        }
      ]
    }
  ]
}`,
  'TabEx1': `{
  "tabs":[
    {
      "id":"tab1",
      "text":"Tab 1"
    },
    {
      "id":"tab2",
      "text":"Tab 2"
    },
    {
      "id":"tab3",
      "text":"Tab 3"
    }
  ]
}`,
  'ModalEx1': `{
  "title":"Modal Title",
  "footerButtons":[
    {
      "content":"Close",
      "class":"btn btn-default",
      "onClick":(event, modal) => {
        modal.hide();
      }
    }
  ]
}`
}
