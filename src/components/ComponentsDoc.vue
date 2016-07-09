<template>
  <div>
    <div v-for="(docId, doc) in Docs">
      <h3>{{ doc.title }}</h3>
      <h5><a><span @click="vm.showCode(doc.exampleId)" class="fa fa-code"></span></a> Example</h5>
      <div v-if="docId === 'formation'" class="well">
        <formation :data.sync="formationData" :config="vm.Ex1"></formation>
      </div>
      <div v-if="docId === 'ftabs'" class="well">
        <f-tabs :config="vm.TabEx1">
          <div slot="tab1" class="bg-primary" style="padding: 10px; margin-top: 5px;">
            <h3>Tab 1</h3>
          </div>
          <div slot="tab2" class="bg-warning" style="padding: 10px; margin-top: 5px;">
            <h3>Tab 2</h3>
          </div>
          <div slot="tab3" class="bg-danger" style="padding: 10px; margin-top: 5px;">
            <h3>Tab 3</h3>
          </div>
        </f-tabs>
      </div>
      <div v-if="docId === 'fmodal'" class="well">
        <button type="button" @click="show = true" class="btn btn-primary">
          Open Modal
        </button>
        <f-modal :show.sync="show" :config="vm.ModalEx1">
          <div slot="body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </f-modal>
      </div>
      <div v-if="doc.params">
        <h5 class="doc-header">Parameters</h5>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>TwoWay</th>
            <th>Required</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="param in doc.params | orderBy 'name'">
              <td>{{ param.name }}</td>
              <td><code>{{ param.type }}</code></td>
              <td><span v-if="param.twoWay" class="fa fa-check"></span></td>
              <td><span v-if="param.required" class="fa fa-check"></span></td>
              <td>{{{ param.default }}}</td>
              <td>{{{ param.description }}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="doc.events">
        <h5 class="doc-header">Events</h5>
        <table v-for="event in doc.events | orderBy 'type'" class="table table-bordered" style="margin-bottom: 10px;">
          <thead>
          <tr>
            <th>{{ event.type }}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              {{ event.description }}
              <table v-if="event.params" class="table table-condensed"
                style="margin-bottom: 0px;">
                <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="param in event.params | orderBy 'name'">
                  <td>{{ param.name }}</td>
                  <td><code>{{ param.type }}</code></td>
                  <td>{{{ param.description }}}</td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="doc.listeners">
        <h5 class="doc-header">Listeners</h5>
        <table v-for="event in doc.listeners | orderBy 'type'"
          class="table table-bordered" style="margin-bottom: 10px;">
          <thead>
          <tr>
            <th>{{ event.type }}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              {{ event.description }}
              <table v-if="event.params" class="table table-condensed" style="margin-bottom: 0px;">
                <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="param in event.params | orderBy 'name'">
                  <td>{{ param.name }}</td>
                  <td><code>{{ param.type }}</code></td>
                  <td>{{{ param.description }}}</td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import Docs from '../docs'
  import { Formation, FTabs, FModal } from '../components'
  export default {
    components: {
      Formation,
      FTabs,
      FModal
    },
    props: {
      vm: {
        type: Object
      }
    },
    data () {
      return {
        Docs,
        show: false,
        formationData: {
          firstName: '',
          lastName: ''
        }
      }
    }
  }
</script>
<style>
  .doc-header {
    font-weight: bold;
  }
</style>
