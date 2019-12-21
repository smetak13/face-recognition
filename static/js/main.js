class ImageUploader {
  constructor() {
    this.init();
    this.image1;
    this.image2;
    this.input1;
    this.input2;
    this.submitButton;
  }

  init = () => {
    this.input1 = document.querySelector('#img1-input');
    this.input2 = document.getElementById('img2-input');
    this.submitButton = document.getElementById('submit-button');

    this.input1.addEventListener('change', e =>
      this.handleFileInput(e, 'image1')
    );
    this.input2.addEventListener('change', e =>
      this.handleFileInput(e, 'image2')
    );
    this.submitButton.addEventListener('click', this.postFiles);
  };

  handleFileInput = (e, name) => {
    const fileList = e.target.files;
    const file = fileList[0];
    this.displayFileAsImg(file, name);
  };

  displayFileAsImg = (file, name) => {
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
      this[name] = result.split(',')[1];
      imgContainer.appendChild(img);
    };
    fileReader.readAsDataURL(file);
  };

  postFiles = async () => {
    if (!this.image1 || !this.image2) return;
    const request = {
      files: [this.image1, this.image2]
    };

    const textEl = document.querySelector('.result-text');
    const resultContainer = document.querySelector('.result-container');
    resultContainer.style.visibility = 'visible';
    textEl.innerText = 'Loading...';

    try {
      const response = await fetch('http://localhost:5858/api/image-upload', {
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
      this.reset();
    } catch (err) {
      console.error(err.message);
    }
  };

  reset = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
}

const imageUploader = new ImageUploader();
document.addEventListener('DOMContentLoaded', imageUploader);
