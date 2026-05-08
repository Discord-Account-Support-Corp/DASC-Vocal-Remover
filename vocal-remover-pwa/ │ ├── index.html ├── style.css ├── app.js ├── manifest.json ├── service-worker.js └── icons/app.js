async function processAudio() {
  const fileInput = document.getElementById("audioFile");
  const status = document.getElementById("status");
  const player = document.getElementById("player");

  if (!fileInput.files.length) {
    status.innerText = "Please select a file first";
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("audio", file);

  status.innerText = "Processing audio...";

  try {
    // 🔴 Replace this with your backend URL later
    const response = await fetch("https://your-backend-url.com/remove", {
      method: "POST",
      body: formData
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    player.src = url;
    player.style.display = "block";
    player.play();

    status.innerText = "Done! Playing instrumental.";
  } catch (err) {
    console.error(err);
    status.innerText = "Error processing audio.";
  }
}
