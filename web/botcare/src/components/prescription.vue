
<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-form
              ref="form"
              lazy-validation>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>MEDICAL PRESCRIPTION</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field

                    <v-flex xs12 sm6 d-flex>
                      <v-select
                        :items="patient"
                        label="PATIENT"
                        type="text"
                        v-model = "selectedPatient"
                          ></v-select>
                        </v-flex>


                    <v-flex xs6>
        <v-subheader>DIAGONISED WITH:</v-subheader>
      </v-flex>
      <v-flex xs12 sm6  d-flex>
<v-select
 :items="dieases"
 label="SELECT"
  type="text"
  v-model="select"
></v-select>
</v-flex>


                </v-card-text>
 <v-container fluid grid-list-xl>
   <v-layout wrap align-center>
                <v-flex xs12 sm6 d-flex>
         <v-select
           :items="drugs"
           label="DRUG"
            type="text"
            v-model="drug"
         ></v-select>
       </v-flex>
       <v-flex xs12 sm6 md3>
            <v-text-field
              label="UNIT"
               v-model="unit"
                type="text"
            ></v-text-field>
          </v-flex>


                       <v-flex xs12 sm6 md3 d-flex>
                <v-select
                  :items="doses"
                  label="DOSE"
                   type="text"
                   v-model="dose"
                ></v-select>
              </v-flex>

 </v-layout>
    </v-container>
    <v-flex xs12 sm4 md4>
              <v-checkbox
                v-model="ex4"
                label="Breakfast"
                color="red darken-3"
                value="red darken-3"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="ex4"
                label="Lunch"
                color="red darken-3"
                value="red darken-3"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="ex4"
                label="Dinner"
                color="red darken-3"
                value="red darken-3"
                hide-details
              ></v-checkbox>
            </v-flex>
    <v-flex xs12 sm6>
     <v-menu
       ref="menu"
       v-model="menu"
       :close-on-content-click="false"
       :nudge-right="40"
       :return-value.sync="date"
       lazy
       transition="scale-transition"
       offset-y
       full-width
       min-width="290px"
     >

       <template v-slot:activator="{ on }">
         <v-text-field
           v-model="date"
           label="NEXT APPOINTMENT DATE"
           prepend-icon="event"
           readonly
           v-on="on"
         ></v-text-field>
       </template>
       <v-date-picker v-model="date" no-title scrollable>
         <v-spacer></v-spacer>
         <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
         <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
       </v-date-picker>
     </v-menu>
   </v-flex>
   <v-flex xs12>
                 <v-textarea
                 v-model="precaution"


                 >
                   <template v-slot:label>
                     <div>
                       INSTRUCTIONS/PRECAUTIONS <small>(optional)</small>
                     </div>
                   </template>
                 </v-textarea>
               </v-flex>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                  color="primary"
                  @click="submit">
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        :top="true"
      >
        {{ this.text }}
        <v-btn
          color="pink"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
  </v-app>
</template>
<script>
import axios from 'axios';
var {ip} = require('../IP.js')
export default {
name: 'Prescription',

data () {
return {
  selectedPatient: "",
  patient: [],
  select: "",
  drug: "",
  unit: "",
  dose: "",
  precaution: "",
  patients: [],
dieases: ['CATARACT','FACTURE'],
        drugs: ['crocin', 'cyclopan', 'combiflam', 'ocaset'],
        doses: ['once','twice','thrice'],
        checkbox1: true,
     checkbox2: false,
        date: new Date().toISOString().substr(0, 10),
     menu: false,
     modal: false,
     menu2: false,
     snackbar:false,
     text: ' '

}
},
methods: {
  submit() {
    //console.log(this.selectedPatient.split(" - ")[0])
    const ID = this.selectedPatient.split(" - ")[0]
    const SELECT =this.select;
    const DRUG=this.drug;
    const UNIT =this.unit;
    const DOSE =this.dose;
    const DATE=this.date;
    const PRECAUTION=this.precaution;
    axios.post(`${ip}/prescriptionSubmit`, {
        ID,SELECT,DRUG,UNIT,DOSE,DATE,PRECAUTION
        })
        .then((res) => {
          this.text = "Successfull";
        })
        .catch((error) => {
          this.text = "Unsuccessfull";
        });
        this.snackbar=true;

  }
},
created(){
  axios.post(`${ip}/prescription`, {
     })
       .then((res) => {
         console.log(res.data);
         for(var i = 0; i < res.data.length;i++){
           this.patient.push(res.data[i].p_id + " - " + res.data[i].name)
         }
       })
       .catch((err) =>{
         console.log(err)
       })
},


}
</script>

<style lang="css" scoped>


</style>
