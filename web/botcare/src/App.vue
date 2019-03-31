<template>
  <div id="app">
    <div id="nav">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
      </head>
<v-toolbar color="blue darken-3" dark>
  <v-toolbar-side-icon></v-toolbar-side-icon>
  <v-toolbar-title >BOTCARE</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items class="hidden-sm-and-down">
    <v-btn flat to="/prescription">Prescription</v-btn>
    <v-btn flat to="/queries">Queries</v-btn>
    <v-btn flat to="/doctor">Doctor</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </div>
    <router-view/>
  </div>
</template>

<style>
</style>
