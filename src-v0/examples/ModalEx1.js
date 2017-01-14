export default {
  title: 'Modal',
  showExample: false,
  exampleType: 'fmodal',
  description: 'Modal',
  headerClass: 'bg-primary',
  formConfig: {
    title: 'Modal Title',
    footerButtons: [
      {
        content: 'Close',
        class: 'btn btn-default',
        onClick (event, modal) {
          modal.hide()
        }
      }
    ]
  },
  formHtml: `<button type="button" @click="show = true" class="btn btn-primary">
  Open Modal
</button>
<f-modal :show.sync="show" :config="config">
  <div slot="body">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
</f-modal>`
}
