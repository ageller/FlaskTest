import subprocess 
from flask import Flask,render_template, request

if __name__ == "__main__":  

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

	# p1 = subprocess.Popen(["python", "serve.py", "UI.html", "8082"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	# p2 = subprocess.Popen(["python", "serve.py", "index.html", "8081"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

	# while True:
	# 	for err in iter(p1.stderr.readline, 'b'): 
	# 		e =  err.decode('utf-8')
	# 		if (e):
	# 			vals = e.split("?")
	# 			for i in range(len(vals)):
	# 				if (i > 0):
	# 					v = vals[i].split('=')
	# 					name = v[0]
	# 					tmp = v[1].split()
	# 					val = tmp[0]
	# 					print(f"name={name}, val={val}")
	# 	# for out in iter(p1.stdout.readline, 'b'):  
	# 	# 	print("stdout:", out)

	# 	if (out == '' and err =='' and p1.poll() != None):
	# 		break

	# print("returncode of subprocess:", p1.returncode)


