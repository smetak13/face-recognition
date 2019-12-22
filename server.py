from flask import Flask, render_template, json, request
from face_match import compare_images

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/image-upload', methods=['POST'])
def post_image():
    req = request.json
    image1 = req['files'][0]
    image2 = req['files'][1]
    msg = compare_images(image1, image2)
    return msg, 200


if __name__ == '__main__':
    app.run(debug=True)
