from flask import Flask,render_template, request


app = Flask(__name__)

# a route where we will display a welcome message via an HTML template
@app.route("/viewer")
def viewer():  
	return render_template("index.html")

@app.route("/gui")
def gui(): 
	text = request.args.get()
	print(text) 
	return render_template("UI.html")

app.run(port=5000, debug=True, threaded=True)




