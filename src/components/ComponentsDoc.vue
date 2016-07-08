<template>
  <h3>Formation</h3>
  <h5><a><span @click="vm.showCode('Ex1')" class="fa fa-code"></span></a> Example</h5>
  <div class="well">
    <formation :data.sync="vm.exampleData.Ex1" :config="vm.Ex1"></formation>
  </div>
  <h5>Parameters</h5>
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
    <tr>
      <td>config</td>
      <td><code>Object&lt;FormationConfig&gt;</code></td>
      <td></td>
      <td><span class="fa fa-check"></td>
      <td></td>
      <td>Formation configuration object</td>
    </tr>
    <tr>
      <td>data</td>
      <td><code>Object</code></td>
      <td><span class="fa fa-check"></span></td>
      <td><span class="fa fa-check"></td>
      <td></td>
      <td>Data object to bind to</td>
    </tr>
    <tr>
      <td>width</td>
      <td><code>String</code> | <code>Number</code></td>
      <td></span></td>
      <td></span></td>
      <td></td>
      <td>Width of component (e.g "100%" or "500px"). Numbers will be evaluated as pixels</td>
    </tr>
    </tbody>
  </table>
  <h5>Events</h5>
  <table class="table table-bordered">
    <thead>
    <tr>
      <th>formation.error ( info )</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>
        This event fires immediately when an error encountered by either the formation component or any child components
        <table class="table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>info</td>
              <td><code>Object</code></td>
              <td>Contains details on the error including which component emitted the error</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    </tbody>
  </table>
  <h3>FTabs</h3>
  <h5><a><span @click="vm.showCode('TabEx1')" class="fa fa-code"></span></a> Example</h5>
  <div class="well">
    <f-tabs :config="tabEx1">
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
</template>
<script type="text/babel">
  import { Formation, FTabs } from '../components'
  export default {
    components: {
      Formation,
      FTabs
    },
    props: {
      vm: {
        type: Object
      }
    },
    data () {
      return {
        tabEx1: {
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
        }
      }
    }
  }
</script>
