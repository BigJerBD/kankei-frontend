<template>
  <div id="GraphQueryForm" v-bind:class={active:isActive}>
    <div id="undo-button" v-bind:class="{empty:undoEmpty,qfactive:queryformActive}"
        @click="sendUndo()"/>
    <b-card no-body class="kankei-formpanel-box">
      <div @click='toggle()' id="QueryFormCloseButton">X</div>
      <h3 id=QueryFormName>
        {{queryName}}
      </h3>
      <div v-if="currentError" class="kankei-error">
        {{currentError}}
      </div>
      <div v-if="hasNoDataResponse" class="query-state-msg" v-bind:class={active:isActive}>
        No data received.<br> Maybe change the parameters a little bit?
      </div>
      <img v-else-if="isLoading" id="LoadingIcon" class="query-state-msg" style="width: 50px"
           src="../assets/loading1.gif"
           v-bind:class={active:isActive}>

      <div class="kankei-form-box">
        <div class="m-2"
             v-for="queryField in queryFields.filter((q) => !q.hidden||showHidden)"
             v-bind:key="queryField.name">
          <div class="query-form-field">
            <h4>{{queryField.name}}</h4>

            <b-form-input
              v-if="queryField.type === 'single'"
              v-model="fieldInputs[queryField['template_name']]"
            ></b-form-input>
            <!-- choice section -->
            <div v-else-if="queryField.type === 'choice'">
              <b-form-select v-model="selectMap[queryField['template_name']]"
                             @change="reset_choice_field(queryField)">
                <option :value="undefined">Choose an option</option>
                <option v-for="(choice,name) in queryField.choices"
                        v-bind:key="name" :value="name">{{name}}
                </option>
              </b-form-select>

              <div class="kankei-subchoice"
                   v-if=" selectMap[queryField['template_name']] != null ">
                <div v-for="subfield in queryField.choices[selectMap[queryField['template_name']]]"
                     v-bind:key="subfield.name">
                  <div class="query-form-field">

                    <h4>{{subfield.name}}</h4>
                    <b-form-input
                      v-model="fieldInputs
                      [queryField['template_name']][1][subfield['template_name']]"
                    ></b-form-input>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <a class="show-hidden" v-if="showHidden" @click="toggle_hidden">
          less options
        </a>
        <a class="show-hidden" v-else @click="toggle_hidden">
          more options
        </a>

        <button class=" send-form-button"
                @click="publish_query_form()"> Get data
        </button>

      </div>

    </b-card>
  </div>

</template>

<script>
import '../styles/BaseStyle.css';
import { runPost } from '../tools/querying';

export default {
  name: 'GraphQueryForm',
  components: {},
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.$eventBus.$emit('queryform-active', this.isActive);
      if (!this.isActive) {
        this.$eventBus.$emit('query-list', null);
      }
    },
    sendUndo() {
      this.$eventBus.$emit('undo-run', true);
    },
    async publish_query_form() {
      const query = this.currentQuery;
      if (query != null) {
        console.log(this.fieldInputs);
        try {
          this.isLoading = true;
          this.hasNoDataResponse = false;
          const currentResult = await runPost(
            `${process.env.VUE_APP_BACKEND_URL}/api/run_query/${query.group}/${query.name}`, {}, this.fieldInputs,
          );
          this.isLoading = false;
          // we check if null because we dont handle error properly with querying
          console.warn(currentResult);
          if (currentResult != null && Object.keys(currentResult.nodes).length !== 0) {
            this.currentError = null;
            this.hasNoDataResponse = false;
            this.send_to_canvas(currentResult);
          } else {
            this.hasNoDataResponse = true;
          }
        } catch (err) {
          console.log(err);
          this.isLoading = false;
          this.currentError = err;
        }
      }
    },
    send_to_canvas(result) {
      console.debug(this.currentQuery.info);
      const resultdic = {
        result,
        shownProperties: this.currentQuery.info.shown_properties,
        nodeColoringTypes: this.currentQuery.info.coloring_types,
      };
      this.$eventBus.$emit('graph-result', resultdic);
    },
    reset_input_fields() {
      Object.keys(this.queryFields)
        .forEach((field) => {
          const val = this.queryFields[field];
          if (val.type === 'choice') {
            // note :: not good but default are not supported in choices
            this.reset_choice_field(val);
          } else if (val.default !== null) {
            this.fieldInputs[val.template_name] = val.default;
          }
        });
    },
    reset_choice_field(field) {
      const tmptName = field.template_name;
      const selection = this.selectMap[tmptName];
      if (selection !== null) {
        const choiceInputs = {};

        Object.keys(field.choices[selection] || [])
          .forEach((subfield) => {
            const val = field.choices[selection][subfield];
            if (val.default !== null) {
              choiceInputs[val.template_name] = val.default;
            }
          });
        this.fieldInputs[tmptName] = [selection, choiceInputs];
      } else {
        this.fieldInputs[tmptName] = [null, {}];
      }
      this.$forceUpdate();
    },
    toggle_hidden() {
      this.showHidden = !this.showHidden;
    },
  },
  created() {
    this.$eventBus.$on('undo-empty', (payload) => {
      this.undoEmpty = payload;
    });
    this.$eventBus.$on('query-form', (payLoad) => {
      this.currentQuery = payLoad;
      this.isActive = !!payLoad;
      this.$eventBus.$emit('queryform-active', this.isActive);
      if (payLoad) {
        this.queryFields = payLoad.info.fields;
        this.showHidden = false;
        this.reset_input_fields();
        this.queryName = payLoad.info.name;
      }
    });
  },
  data() {
    return {
      isActive: false,
      showHidden: false,
      hasNoDataResponse: false,
      isLoading: false,
      currentQuery: null,
      currentError: null,
      // currently the field of the kankeiforms are coppied here for easier access
      queryFields: [],
      undoEmpty: true,
      fieldInputs: {},
      selectMap: {},
      queryName: '',

    };
  },

};
</script>

<style>

  .panel-box {
    box-shadow: inset 0px 25px 18px -26px rgba(0, 0, 0, 0.75);
    padding-top: 20px;
  }

  #QueryFormName {
    padding-bottom: 20px;
    padding-left: 20px
  }

  .kankei-formpanel-box {
    box-shadow: inset 0px 25px 18px -26px rgba(0, 0, 0, 0.75);
    padding: 40px 0px 0px;
    height: calc(100vh - 80px);
  }

  .query-form-field {
    margin-top: 15px;
  }

  .send-form-button {
    transition: all 0.20s ease 0s;
    color: white;
    bottom: 0;
    padding: 3px 5px 3px 5px;
    border-radius: 10px;
    border-width: 0px;
    background-color: rgb(78, 111, 183);
    float: right;
    margin-bottom: 20px;
  }

  .send-form-button:hover {
    background: rgb(65, 90, 145);
  }

  #QueryFormCloseButton {
    box-shadow: inset 0px 25px 18px -25px rgba(0, 0, 0, 0.75);
    height: 25px;
    width: 25px;
    background-color: #66B245;
    color: rgb(72, 128, 39);
    position: absolute;
    text-align: center;
    top: 0;
    border-bottom-left-radius: 20%;
    right: 0;
    font-size: 18px;
    font-family: Roboto, sans-serif, monospace;
    transition: all 0.1s ease 0s;
    user-select: none;
  }

  #QueryFormCloseButton:hover {
    color: white;
  }

  .kankei-form-box {
    overflow-y: auto;
    padding-left: 20px;
    padding-right: 20px;

  }

  .show-hidden {
    padding-left: 10px;
  }

  .query-state-msg:not(.active) {
    text-align: center;
    position: fixed;
    top: 50vh;
    left: 15vh;
    width: 100%;
    transition: all 1.0s ease 0s;
  }

  .query-state-msg.active {
    z-index: -1;
    user-select: none;
    text-align: center;
    position: fixed;
    top: 50vh;
    left: 30vh;
    width: 100%;
    transition: all 1.0s ease 0s;
  }

  #LoadingIcon {
    width: 50px;
    margin-left: 50%;
  }

</style>
