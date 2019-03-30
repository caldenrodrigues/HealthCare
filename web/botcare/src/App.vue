<template>
  <div id="app">
    <div id="nav">
      <head>
  <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
</head>
<v-toolbar color="blue darken-3" dark>
  <v-toolbar-side-icon></v-toolbar-side-icon>
  <v-toolbar-title>BOTCARE</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items class="hidden-sm-and-down">
    <v-btn flat to="/" v-if="authenticated == false">Prescription</v-btn>
    <v-btn flat to="/login" v-if="authenticated == false">Queries</v-btn>
      </v-toolbar-items>
    </v-toolbar>

      <router-link to="/prescription">Prescription</router-link> |
      <router-link to="/queries">Queries</router-link> |
      <router-link to="/doctor">Doctor</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
