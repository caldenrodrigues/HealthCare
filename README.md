<div align="center">

<p align="center"><h1>BotCare</h1></p>

[![Hackathon](https://img.shields.io/badge/hackathon-Unscript-orange.svg)](http://unscript2k19.me/) 
[![Status](https://img.shields.io/badge/status-active-green.svg)]() 
[![Github Issues](http://githubbadges.herokuapp.com/chaitanyadukkipaty/LegoDoc/issues.svg?style=flat-square)](https://github.com/chaitanyadukkipaty/LegoDoc/issues) 
[![Pending Pull-Requests](http://githubbadges.herokuapp.com/chaitanyadukkipaty/LegoDoc/pulls.svg?style=flat-square)](https://github.com/chaitanyadukkipaty/LegoDoc/pulls) 
[![License](https://img.shields.io/badge/license-GNU-blue.svg)](LICENSE.md)

</div>

---

<p align="center">Health care for patients post surgery</p>

# Flow Diagram

![LegoDoc](https://i.imgur.com/1zWLwaz.png)

# Table of Content
+ [About](#description)
+ [Getting Started](#getting_started)
+ [Limitations](#limitations)
+ [Future Scope](#future_scope)
+ [File Structure](#file_structure)
+ [Contributing](#contributing)
+ [Authors](#authors)

## About<a name="description"></a>
- A Chatbot that can answer varying levels of queries from the user, these queries range from simple information to booking of appointment for the doctor.
- One can get details about his past doctors, prescriptions, dosage etc, just by quering the bot.
- Questions can even be asked to the doctors directly.
- Reminders can be set for taking medicines.

## Getting Started<a name="getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

Installing NodeJs
```
$ sudo apt-get install nodejs
```
Installing VueJs
```
$ npm install -g @vue/cli
```
Installing Python3
```
$ sudo apt-get install python3
```
### Installing

A step by step series of examples that tell you how to get a development env running

Cloning the repo
```
$ git clone https://github.com/chaitanyadukkipaty/LegoDoc.git
```
Installing the dependencies
```
$ cd HealthCare
$ npm install
$ cd Python
$ pip install -r requiremnt.txt
$ cd ../web/bootcare/
$ npm install
```
If you are running a development environment, use the following command:
```
$ npm run serve 
```
If you are running a deployment environment, use the following command:
```
$ npm run build
```

Running the node server
```
$ node server.js
```

Running the flask server
```
$ python chatbot.py
```
The application will now be running on https://localhost:8080/

## Built With<a name="built_with"></a>
+ [MySQL](https://www.mysql.com/) - Database
+ [Express](https://expressjs.com/) - Server Framework
+ [VueJs](https://vuejs.org/) - Web Framework
+ [NodeJs](https://nodejs.org/en/) - Server Environment
+ [Android Studio](https://developer.android.com/studio) - Android App
+ [Flask](http://flask.pocoo.org/) - Python server, serving the models

## Limitations<a name="limitations"></a>
+ The only way to detect distress is using the conversations with the bot

## Future Scope<a name="future_scope"></a>
+ Integration with Google Fit

## File Structure <a name="file_structure"></a>
/server.js  : Main server code <br>
/web/lego  : Website code <br>
/models     : Data structures and methods to access them <br>
/Python     : Flask app and dependencies for the model

## Contributing<a name="contributing"></a>

1. Fork it (<https://github.com/caldenrodrigues/HealthCare/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Authors<a name="authors"></a>

+ [Calden Rodrigues](https://github.com/caldenrodrigues) <br>
+ [Pratik Nerurkar](https://github.com/PlayPratz) <br>
+ [Shadrak Guruphnor](https://github.com/shadrak98) <br>
+ [Rajasi Jaiswal](https://github.com/Rajasi11) <br>

See also the list of [contributors](https://github.com/caldenrodrigues/HealthCare/contributors) who participated in this project.
