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
import os
#NLP
import nltk
import numpy as np
import random
import string # to process standard python strings
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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
	with open("data/fracture_default.yml","a") as f:
		f.write("  - " + queryQuestion + "\n")
		f.write("  - " + queryAnswer + "\n")
	chatbot = ChatBot('Bot', storage_adapter='chatterbot.storage.SQLStorageAdapter', trainer='chatterbot.trainers.ListTrainer')
	for file in os.listdir('data/'):
		convData = open(r'data/' + file,encoding='latin-1').readlines()
		trainer = ListTrainer(chatbot)
		trainer.train(convData)
	return "Success"

@app.route('/getQuery', methods = ['POST','GET'])
def getQuery():
	with open("data/fracture_default.yml","r") as f:
		queryList = f.readlines()
		query = {}
		query["query"] = queryList
		return jsonify(query)

#Runs by default for NLP
f=open('chatbot_nlp.txt','r',errors = 'ignore')

raw=f.read()

raw=raw.lower()# converts to lowercase

nltk.download('punkt') # first-time use only
nltk.download('wordnet') # first-time use only

sent_tokens = nltk.sent_tokenize(raw)# converts to list of sentences
word_tokens = nltk.word_tokenize(raw)# converts to list of word

lemmer = nltk.stem.WordNetLemmatizer()

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up","hey",)

GREETING_RESPONSES = ["hi", "hey", "*nods*", "hi there", "hello", "I am glad! You are talking to me"]

@app.route('/nlpQuery', methods = ['POST','GET'])
def nlpQuery():
	user_response = request.get_json()["queryQuestion"]
	user_response=user_response.lower()
	if(user_response!='bye'):
		if(user_response=='thanks' or user_response=='thank you' ):
			return "You are welcome.."
		else:
			if(greeting(user_response)!=None):
				return str(greeting(user_response))
			else:
				mystr = str(response(user_response))
				sent_tokens.remove(user_response)
				return mystr
	else:
		return "Bye! take care.."
	return "It worked"

#Hellper functions for NLP
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

def greeting(sentence):

    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)

def response(user_response):
    robo_response=''
    sent_tokens.append(user_response)

    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx=vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]

    if(req_tfidf==0):
        robo_response=robo_response+"I am sorry! I don't understand you"
        return robo_response
    else:
        robo_response = robo_response+sent_tokens[idx]
        return robo_response

if __name__ == '__main__':
	app.run(debug = True)
