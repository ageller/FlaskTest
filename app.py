from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit

from threading import Lock
import sys
import numpy as np

app = Flask(__name__)

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()

radius = 1

def background_thread():
	"""Example of how to send server generated events to clients."""
	global radius
	count = 0
	while True:
		socketio.sleep(1)
		print("========= radius=",radius)
		count += 0.1
		socketio.emit('my_response',
					  {'radius': radius},
					  namespace='/test')

@socketio.on('connection_test', namespace='/test')
def connection_test(message):
	session['receive_count'] = session.get('receive_count', 0) + 1
	emit('my_response',
		 {'data': message['data'], 'count': session['receive_count']})

#will receive data from gui
@socketio.on('gui_event', namespace='/test')
def gui_event(message):
	global radius
	session['receive_count'] = session.get('receive_count', 0) + 1
	radius = message['data']
	emit('my_response',
		 {'data': message['data'], 'count': session['receive_count']})

@socketio.on('connect', namespace='/test')
def test_connect():
	global thread
	with thread_lock:
		if thread is None:
			thread = socketio.start_background_task(target=background_thread)
	emit('my_response', {'data': 'Connected', 'count': 0})
##############


@app.route("/viewer")
def viewer():  
	return render_template("viewer.html")

@app.route("/gui")
def gui(): 
	args = request.args
	print("========  testing", args, file=sys.stderr) 
	return render_template("gui.html")

@app.route("/gui")
def getGUIdata():
	args = request.args
	print("========  testing", args, file=sys.stderr) 
	return args

if __name__ == "__main__":
	socketio.run(app, debug=True)




