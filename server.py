from flask import Flask, render_template, url_for


app = Flask(__name__)

@app.route("/")
def index():
    return "Please visit /door-one or /door-two or /door-three to see all the doors"


@app.route("/door-one")
def door_one():
    return render_template('door-one.html')


@app.route("/door-two")
def door_two():
    return render_template('door-two.html')


@app.route("/door-three")
def door_three():
    return render_template('door-three.html')
