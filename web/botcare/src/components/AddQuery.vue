<template lang="html">
  <div class="">
    <v-app id="inspire">
      <v-btn
        fixed
        dark
        fab
        bottom
        right
        color="green accent-4"
        @click="dialog = true"
      >
        <v-icon style="height: auto">add</v-icon>
      </v-btn>

      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-dialog
                v-model="dialog"
                width="500"
              >
                <v-card class="elevation-12">
                  <v-form
                  lazy-validation>
                    <v-toolbar dark color="primary">
                      <v-toolbar-title>Add Query</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                        label="Question"
                        type="text"
                        v-model="question"
                        required>
                        </v-text-field>
                        <v-text-field
                        label="Answer"
                        type="text"
                        v-model="answer"
                        required>
                        </v-text-field>
                    </v-card-text>
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
              </v-dialog>
              </v-flex>
            </v-layout>
          </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      question: "",
      answer: "",
      dialog: false
    }
  },
  methods: {
    submit() {
      const ques = this.question;
      const ans = this.answer;
      axios.post('http://localhost:8081/addQuery', {
        ques,
        ans
      })
        .then((res) => {
          console.log("Success");
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err);
          this.dialog = false;
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
