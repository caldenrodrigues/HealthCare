<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">


                                  <v-flex xs6>
                      <v-subheader>DIAGONISED WITH:</v-subheader>
                    </v-flex>
                    <v-flex xs12 sm6  d-flex>
              <v-select
               :items="dieases"
               label="SELECT"
              ></v-select>
              </v-flex>








            </v-card>
            </v-flex>
            </v-layout>
            </v-container>
            </v-content>
            </v-app>
            </template>











            <script>
            export default {
            name: 'Queries',

            data () {
            return {


            }
            }
            }



            </script>



            <style lang="css" scoped>


            </style>
