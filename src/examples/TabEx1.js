export default {
  title: 'Tabs',
  showExample: false,
  exampleType: 'ftabs',
  description: 'Simple tabbed content',
  headerClass: 'bg-primary',
  formConfig: {
    tabs: [
      {
        id: 'tab1',
        text: 'Tab 1'
      },
      {
        id: 'tab2',
        text: 'Tab 2'
      },
      {
        id: 'tab3',
        text: 'Tab 3'
      }
    ]
  },
  formHtml: `<f-tabs :config="config">
  <div slot="tab1" class="bg-primary">
    <h3>Tab 1</h3>
  </div>
  <div slot="tab2" class="bg-warning">
    <h3>Tab 2</h3>
  </div>
  <div slot="tab3" class="bg-danger">
    <h3>Tab 3</h3>
  </div>
</f-tabs>`
}
