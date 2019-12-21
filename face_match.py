import face_recognition as fr
import base64
import io
from imageio import imread
import numpy


def compare_images(img1, img2):
    first_image = imread(io.BytesIO(base64.b64decode(img1)))
    second_image = imread(io.BytesIO(base64.b64decode(img2)))

    first_image_enc = fr.face_encodings(first_image)[0]
    second_image_enc = fr.face_encodings(second_image)[0]

    results = fr.compare_faces([first_image_enc], second_image_enc)

    if results[0]:
        return 'This is the same person'
    else:
        return 'These are different people'
