<template lang="html">
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="queries"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.question }}</td>
          <td class="text-xs-left">{{ props.item.answer }}</td>
        </template>
      </v-data-table>
    </v-app>
    <AddQuery/>
  </div>
</template>

<script>
import axios from 'axios';
var {ip} = require('../IP.js')
import AddQuery from '../components/AddQuery.vue'
export default {
  name: 'Queries',
  components: {
    AddQuery
  },
  data() {
    return {
      headers: [
        { text: 'Questions', value: 'question', sortable: false },
        { text: 'Answers', value: 'answer', sortable: false }
      ],
      queries: []
    }
  },
  mounted() {
    console.log(ip)
    axios.post(`${ip}/getQuery`, {
    })
    .then((res) => {
      var i
      var flag = true
      console.log(res.data)
      var myArray = res.data.query
      var temp = []
      for(i = 0; i < myArray.length; i++){
        if(i > 2){
          if(flag == true){
            var temp_json = {}
            temp_json["question"] = myArray[i].substring(3)
            flag = false
          }
          else{
            temp_json["answer"] = myArray[i].substring(3)
            flag = true
            temp.push(temp_json)
          }
        }
      }
      this.queries = temp
      // this.queries = [{"question":"calden","answer":"calden"}]
    })
    .catch((err) => {
      console.log(err)
    });
  }

}
</script>

<style lang="css" scoped>
</style>
