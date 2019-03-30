
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
                    prepend-icon="NAME"
                    label="patient name"
                    type="text"
                    v-model="id"
                    :rules="idRules"
                    required>
                    </v-text-field>
                    <v-text-field
                    prepend-icon="AGE"
                    label="patient age"
                    type="text"
                    v-model="password"
                    :rules="passwordRules"
                    required>
                    </v-text-field>
                    <v-text-field
                    prepend-icon="DATE"
                    label="DATE OF PRESCRIPTION"
                    type="text"
                    v-model="password"
                    :rules="passwordRules"
                    required>
                    </v-text-field>
                    <v-flex xs6>
        <v-subheader>DIAGONISED WITH:</v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-select
          v-model="e1"
          :items="states"
          menu-props="auto"
          label="Select"
          hide-details
          
          single-line
        ></v-select>
      </v-flex>
                </v-card-text>
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
 e1: 'SELECT',
 items: [
          { text: 'State 1' },
        ],
        states: [
          'FACTURE', 'CATARACT'
        ]
}
}
}



</script>
















<style lang="css" scoped>


</style>
