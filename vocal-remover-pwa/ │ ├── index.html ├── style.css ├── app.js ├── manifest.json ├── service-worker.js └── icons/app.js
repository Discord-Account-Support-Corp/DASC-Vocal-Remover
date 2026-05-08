async function processAudio() {
  const fileInput = document.getElementById("audioFile");
  const status = document.getElementById("status");
  const player = document.getElementById("player");

  if (!fileInput.files.length) {
    status.innerText = "Please select a file";
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("audio", file);

  status.innerText = "Uploading & processing...";

  try {
    // This MUST be a real backend (Demucs/Spleeter server)
    const response = await fetch("https://YOUR-AI-BACKEND/remove-stems", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    // backend returns:
    // {
    //   instrumental_url: "...",
    //   vocals_url: "..."
    // }

    const instrumental = data.instrumental_url;
    const vocals = data.vocals_url;

    // Play instrumental
    player.src = instrumental;
    player.style.display = "block";
    player.play();

    status.innerText = "Done! Instrumental ready.";

    // Optional: store vocal track
    window.vocalTrack = vocals;

  } catch (err) {
    console.error(err);
    status.innerText = "Processing failed (no backend connected)";
  }
}
