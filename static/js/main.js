let input1;
let input2;
let submitButton;
let image1;
let image2;

class ImageUploader {
  init() {
    input1 = document.querySelector('#img1-input');
    input2 = document.getElementById('img2-input');
    submitButton = document.getElementById('submit-button');

    input1.addEventListener('change', e => this.handleFileInput(e, 'image1'));
    input2.addEventListener('change', e => this.handleFileInput(e, 'image2'));
    submitButton.addEventListener('click', this.postFiles);
    submitButton.addEventListener('touchstart', this.postFiles);
  }

  handleFileInput(e, name) {
    const fileList = e.target.files;
    const file = fileList[0];
    this.displayFileAsImg(file, name);
  }

  displayFileAsImg(file, name) {
    const fileReader = new FileReader();
    const imgContainer = document.querySelector('.image-container');
    fileReader.onload = () => {
      const id = `out-${name}`;
      const existingImg = document.getElementById(id);

      if (existingImg) {
        existingImg.src = fileReader.result;
        return;
      }

      const img = document.createElement('img');
      img.id = id;
      const result = fileReader.result;
      img.src = result;
      if (name === 'image1') {
        image1 = result.split(',')[1];
      } else {
        image2 = result.split(',')[1];
      }

      imgContainer.appendChild(img);
    };
    fileReader.readAsDataURL(file);
  }

  async postFiles() {
    if (!image1 || !image2) return;
    const request = {
      files: [image1, image2]
    };

    const textEl = document.querySelector('.result-text');
    const resultContainer = document.querySelector('.result-container');
    resultContainer.style.visibility = 'visible';
    textEl.innerText = 'Loading...';

    try {
      const url = '/api/image-upload';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.text();

      textEl.innerText = data;

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      const textEl = document.querySelector('.result-text');
      textEl.innerText = err.message;
    }
  }
}

const imageUploader = new ImageUploader();
document.addEventListener('DOMContentLoaded', imageUploader.init());
