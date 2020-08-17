
let video = document.createElement('video');
let startBtn = document.createElement('button');
startBtn.className = 'btn green';
startBtn.textContent = 'Start';
let a = document.createElement('a');
document.body.appendChild(startBtn);
document.body.appendChild(a);
a.style = 'display: none';
document.body.appendChild(video);
startBtn.onclick = recordScreen;


async function recordScreen() {
    // creaete video stream
    const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: { mediaSource: "screen" }
      });
    
    //   recorder the stream
    const recorder = new MediaRecorder(stream);
    
    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.start();
    
    // convert the recording to a Blob
    recorder.onstop = e => {
        const completeBlob = new Blob(chunks, { type: chunks[0].type });
        video.src = URL.createObjectURL(completeBlob);
        let vidFile = URL.createObjectURL(completeBlob);
        a.href = vidFile;
        a.download = 'Screen Capture' + Date.now();
        a.click();
        window.URL.revokeObjectURL(vidFile);
      };
}