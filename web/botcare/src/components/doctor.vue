<template>
<div id="app">
  <v-app id="inspire">
    <v-card>
      <v-toolbar
        card
        color="blue-grey"
        dark
      >
        <v-toolbar-title>QUESTIONARE</v-toolbar-title>
      </v-toolbar>
  <v-card-text>
      <v-text-field

                             <v-flex xs12 sm6 d-flex>
                      <v-select
                        :items="questions"
                        label="QUESTION"
                         v-model="question"
                         item-text="questions"
                         single-line
                         return-object
                          type="text"
                      ></v-select>
                    </v-flex>





        <v-textarea
          box
          label="ANSWER"
          type="text"
          v-model="answer"></v-textarea>


      </v-card-text>

      <v-divider></v-divider>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          color="primary"
          @click="submit">
            Submit
          </v-btn>
        </v-card-actions>

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
      </v-card-actions>
    </v-card>
  </v-app>
</div>
</template>



<script>
import axios from 'axios';
export default {
name: 'Doctor',

data () {
return {
    questions: [],
    question: "",
      answer: "",
  snackbar:false,
  text: ' '
}
},
methods: {
  submit() {
    console.log("IN")
    const ANSWER=this.answer;
    const q_id=this.question.question_id
    const p_id=this.question.patient_id
    console.log(this.question)
    axios.post('http://192.168.43.24:8081/getAnswers', {
      ANSWER,
      q_id,
      p_id,
        })

        .then((res) => {
          this.text = "Successfully answered";
        })
        .catch((err) => {
          this.text = "Unsuccessfull";
        });
        this.snackbar=true;

  }
},
created(){
  axios.post('http://192.168.43.24:8081/getPendings', {
     })
       .then((res) => {
         console.log(res.data);
         this.questions = res.data;
         console.log(this.questions);
       })
       .catch((err) =>{
         console.log(err)
       })
},
}


</script>
<style lang="css" scoped>


</style>
