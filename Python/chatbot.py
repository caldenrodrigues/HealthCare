from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

def get_response():
	bot = ChatBot('Bot')
	trainer = ListTrainer(bot)
	while True:
		usrText = input('You:')
		if usrText.strip()!= 'Bye':
			result = bot.get_response(usrText)
			reply = str(result)
			print(reply)
		if usrText.strip() == 'Bye':
			return('Bye')
			break
get_response()
