# from https://stackabuse.com/serving-static-files-with-flask/

# serve.py

from flask import Flask,render_template
import sys

class server(object):

	def __init__(self, html="index.html", port=5000, debug=True, threaded=True):
		self.html = html
		self.port = port
		self.debug = debug
		self.threaded = threaded

# creates a Flask application, named app
	def startServer(self):
		app = Flask(__name__)

		# a route where we will display a welcome message via an HTML template
		@app.route("/")
		def page():  
			message = "Hello, World" #not used, but keeping so I don't forget :)
			return render_template(self.html, message=message)

		app.run(debug=self.debug, port=self.port, threaded=self.threaded)


# run the application
if __name__ == "__main__":  

	s = server(sys.argv[1], sys.argv[2])
	s.startServer()

