from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import sys

usrText = str(sys.argv[1])
bot = ChatBot('Bot',
logic_adapters=[
    {
        'import_path': 'chatterbot.logic.BestMatch',
        'default_response': 'I am sorry, but I do not understand.',
        'maximum_similarity_threshold': 0.90
    }
])
trainer = ListTrainer(bot)
print(usrText)
result = bot.get_response(usrText)
reply = str(result)
print(reply)
sys.stdout.flush()
# print("hey")
# sys.stdout.flush()
