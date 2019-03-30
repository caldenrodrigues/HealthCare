
<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>MEDICAL PRESCRIPTION</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field

                                           <v-flex xs12 sm6 d-flex>
                                    <v-select
                                      :items="patients"
                                      label="PATIENT"
                                    ></v-select>
                                  </v-flex>


                    <v-flex xs6>
        <v-subheader>DIAGONISED WITH:</v-subheader>
      </v-flex>
      <v-flex xs12 sm6  d-flex>
<v-select
 :items="dieases"
 label="SELECT"
></v-select>
</v-flex>


                </v-card-text>
 <v-container fluid grid-list-xl>
   <v-layout wrap align-center>
                <v-flex xs12 sm6 d-flex>
         <v-select
           :items="drugs"
           label="DRUG"
         ></v-select>
       </v-flex>
       <v-flex xs12 sm6 md3>
            <v-text-field
              label="UNIT"
            ></v-text-field>
          </v-flex>


                       <v-flex xs12 sm6 md3 d-flex>
                <v-select
                  :items="doses"
                  label="DOSE"
                ></v-select>
              </v-flex>

 </v-layout>
    </v-container>
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
                  :disabled="!valid"
                  color="primary"
                  @click="validate">
                    Validate
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
name: 'Prescription',

data () {
return {
  patients: ['pratik','calden','shadrak','rajasi'],
dieases: ['CATARACT','FACTURE'],
        drugs: ['crocin', 'cyclopan', 'combiflam', 'ocaset'],
        doses: ['once','twice','thrice'],
        date: new Date().toISOString().substr(0, 10),
     menu: false,
     modal: false,
     menu2: false,

}
}
}



</script>
















<style lang="css" scoped>


</style>
