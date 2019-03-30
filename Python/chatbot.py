#Flask
from flask import Flask
from flask import request
from werkzeug.utils import secure_filename
from os.path import join, dirname, realpath
from flask import jsonify
from flask_cors import CORS, cross_origin
import json
#ChatBot
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/train', methods = ['POST','GET'])
def get_response():
	bot = ChatBot('Bot')
	trainer = ListTrainer(bot)
	usrText = "What is the name of the doctor"
	result = bot.get_response(usrText)
	reply = str(result)
	return reply

if __name__ == '__main__':
	app.run(debug = True)
