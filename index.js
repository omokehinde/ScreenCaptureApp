
// create icon
let icon = document.createElement('i');
icon.className = 'fa fa-desktop';
icon.style.position = 'absolute';
icon.style.right = '10px';
icon.style.bottom = '10px';
// add icon to page
document.body.appendChild(icon);

// feedback submit button 
let submitBtn = document.createElement('button');
// close button
let close_button = document.createElement('span');
close_button.innerHTML = '&times;';
close_button.style.float = 'right';
close_button.style.width = '1.5rem';
close_button.style.lineHeight = '1.5rem';
close_button.style.textAlign = 'center';
close_button.style.cursor = 'pointer';
close_button.style.borderRadius = '0.25rem';
close_button.style.backgroundColor = 'lightgray';

let content;
// create the modal
let modal = document.createElement('div');
let modal_content = document.createElement('div');
modal_content.style.position = 'absolute';
modal_content.style.top = '50%';
modal_content.style.left = '50%';
modal_content.style.transform = 'translate(-50%, -50%)';
modal_content.style.backgroundColor = 'white';
modal_content.style.padding = '1rem 1.5rem';
modal_content.style.width = '24rem';
modal_content.style.borderRadius = '0.5rem';
modal_content.appendChild(close_button);
modal.appendChild(modal_content);
modal.style.visibility = 'hidden';
modal.style.left = 0;
modal.style.top = 0;
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
modal.style.opacity = 0;
modal.style.transform = 'scale(1.1)';
modal.style.transition = 'visibility 0s linear 0.25s opacity 0.25s| 0s transform 0.25s';

document.body.appendChild(modal);


let video = document.createElement('video');
let captureVideoBtn = document.createElement('button');
let captureImageBtn = document.createElement('button');
captureImageBtn.className = 'btn yellow';
captureVideoBtn.className = 'btn green';
captureVideoBtn.textContent = 'Capture Video';
captureImageBtn.textContent = 'Capture Image';
let a = document.createElement('a');
document.body.appendChild(a);
a.style = 'display: none';
document.body.appendChild(video);
// captureVideoBtn.onclick = recordScreen;

// feed back input 
let summary = document.createElement('input');
summary.setAttribute('type', 'text');
summary.placeholder = 'Summary...';
let description = document.createElement('input');
description.setAttribute('type', 'text');
description.placeholder = 'Description...';

function showModal() {
  document.body.style.backgroundColor = 'grey';
  modal.style.visibility = 'visible';
  modal.style.opacity = 1;
  modal.style.transform = 'scale(1.0)';
  modal.style.transition = 'visibility 0s linear 0s opacity 0.25s| 0s transform 0.25s';
  // add buttons to modal content
  content = document.createElement('div');
  content.appendChild(captureVideoBtn); 
  content.appendChild(captureImageBtn);
  modal_content.appendChild(content);
}
// show feedback modal 
function showFeedback() {
  modal_content.style.visibility = 'hidden';
  submitBtn.className = 'btn blue';
  submitBtn.textContent = 'Submit';
  submitBtn.style.position = 'absolute';
  submitBtn.style.right = '10px';
  submitBtn.style.bottom = '10px';
  let feedback_modal = document.createElement('div');
  feedback_modal.style.position = 'absolute';
  feedback_modal.style.top = '50%';
  feedback_modal.style.left = '50%';
  feedback_modal.style.transform = 'translate(-50%, -50%)';
  feedback_modal.style.backgroundColor = 'white';
  feedback_modal.style.padding = '1rem 1.5rem';
  feedback_modal.style.width = '24rem';
  feedback_modal.style.borderRadius = '0.5rem';
  feedback_modal.appendChild(close_button);
  feedback_modal.appendChild(summary);
  feedback_modal.appendChild(description);
  feedback_modal.appendChild(submitBtn);
  modal.appendChild(feedback_modal);
}

// hide modal
function hideModal() {
  document.body.style.backgroundColor = 'white';
  modal.style.visibility = 'hidden';
}

async function captureScreen(switchAudio, mediaType) {
    // creaete video stream
    const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: switchAudio,
        video: { mediaSource: "screen" }
      });
    
    //   recorder the stream
    const recorder = new MediaRecorder(stream);
    
    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.start();
    
    // convert the recording to a Blob
    recorder.onstop = e => {
        const completeBlob = new Blob(chunks, { type: mediaType });
        download(completeBlob);
        showFeedback();
      };
}
// function to download capture file to screen 
function download(completeBlob) {
  video.src = URL.createObjectURL(completeBlob);
  let file = URL.createObjectURL(completeBlob);
  a.href = file;
  a.download = 'Screen Capture' + Date.now();
  a.click();
  window.URL.revokeObjectURL(file);
}
// set event listener to show modal on click of icon
icon.addEventListener('click', showModal);
// set event listener for close of modal
close_button.addEventListener('click', hideModal);
// set event listener to capture screen Video
captureVideoBtn.addEventListener('click', function (event) {
  captureScreen(true, "video\/mp4");
}, false);
// set event listener to capture screen image
captureImageBtn.addEventListener('click', function (event) {
  captureScreen(false, 'image/png');
});
// event listener to submit feedback 
// submitBtn.addEventListener('click', hideModal);