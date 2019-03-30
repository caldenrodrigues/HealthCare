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

@app.route('/testQuery', methods = ['POST','GET'])
def get_response():
	usrText = request.get_json()["myvar"]
	bot = ChatBot('Bot',
	logic_adapters=[
	    {
	        'import_path': 'chatterbot.logic.BestMatch',
	        'default_response': 'I am sorry, but I do not understand.',
	        'maximum_similarity_threshold': 0.90
	    }
	])
	trainer = ListTrainer(bot)
	result = bot.get_response(usrText)
	reply = str(result)
	return reply

@app.route('/addQuery', methods = ['POST','GET'])
def addQuery():
	queryQuestion = request.get_json()["queryQuestion"]
	queryAnswer = request.get_json()["queryAnswer"]
	with open("data/fracture.yml","a") as f:
		f.write("  - " + queryQuestion + "\n")
		f.write("  - " + queryAnswer + "\n")
	return "Success"

@app.route('/getQuery', methods = ['POST','GET'])
def getQuery():
	with open("data/fracture.yml","r") as f:
		queryList = f.readlines()
		query = {}
		query["query"] = queryList
		return jsonify(query)

if __name__ == '__main__':
	app.run(debug = True)
