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

#global variables to hold the params and camera
params = 1
updateParams = False
camera = {}
updateCamera = False

#number of seconds between updates
seconds = 0.01

#this will pass to the viewer every "seconds" 
def background_thread():
	"""Example of how to send server generated events to clients."""
	global params, updateParams, camera, updateCamera
	while True:
		socketio.sleep(seconds)
		if (updateParams):
			print("========= params:",params)
			socketio.emit('update_params', params, namespace='/test')
		if (updateCamera):
			#print("========= camera:",camera)
			socketio.emit('update_camera', camera, namespace='/test')
		updateParams = False
		updateCamera = False

#testing the connection
@socketio.on('connection_test', namespace='/test')
def connection_test(message):
	session['receive_count'] = session.get('receive_count', 0) + 1
	emit('connection_response',{'data': message['data'], 'count': session['receive_count']})


#will receive data from gui (and print to console as a test within "from_gui")
@socketio.on('gui_input', namespace='/test')
def gui_input(message):
	global params, updateParams
	updateParams = True
	params = message
	emit('from_gui',message)

#will receive data from camera 
@socketio.on('camera_input', namespace='/test')
def camera_input(message):
	global camera, updateCamera
	updateCamera = True
	camera = message

#the background task sends data to the viewer
@socketio.on('connect', namespace='/test')
def from_gui():
	global thread
	with thread_lock:
		if thread is None:
			thread = socketio.start_background_task(target=background_thread)
##############


@app.route("/viewer")
def viewer():  
	return render_template("viewer.html")

@app.route("/gui")
def gui(): 
	return render_template("gui.html")

@app.route("/gui")
def getGUIdata():
	return args

if __name__ == "__main__":
	socketio.run(app, debug=True)#, host='0.0.0.0')
	#app.run(host='0.0.0.0')




