const marschListe = document.getElementById("marschListe");

// 🔊 EIN globaler Audio Player
const player = new Audio();

// 🔁 Aktiver Loop
let aktiverLoop = null;

// 📀 Alle Märsche
const maersche = [

  {
    name: "Larridah",

    komplett: "Larridah/Larridah.komplett.mp3",

    teile: [
      {
        name: "Teil1",
        file: "Larridah/Larridah.teil1.mp3"
      },
      {
        name: "Teil 2",
        file: "Larridah/Larridah.teil2.mp3"
      },
        {
        name: "Teil 3",
        file: "Larridah/Larridah.teil3.mp3"
      },
    
      {
        name: "Teil4",
        file: "Larridah/Larridah.teil4.mp3"
      }
    ]
  },
  {
    name: "Larridah",

    komplett: "Larridah/Larridah.komplett.mp3",

    teile: [
      {
        name: "Teil1",
        file: "Larridah/Larridah.teil1.mp3"
      },
      {
        name: "Teil 2",
        file: "Larridah/Larridah.teil2.mp3"
      },
        {
        name: "Teil 3",
        file: "Larridah/Larridah.teil3.mp3"
      },
    
      {
        name: "Teil4",
        file: "Larridah/Larridah.teil4.mp3"
      }
    ]
  },

  {
    name: "Marsch 2",

    komplett: "marsch2/komplett.mp3",

    teile: [
      {
        name: "Teil A",
        file: "marsch2/a.mp3"
      },
      {
        name: "Teil B",
        file: "marsch2/b.mp3"
      }
    ]
  }

];

// 🎵 Anzeige
function anzeigen() {

  marschListe.innerHTML = "";

  maersche.forEach((marsch) => {

    const card = document.createElement("div");
    card.classList.add("marsch-card");

    // Titel
    const title = document.createElement("h2");
    title.innerText = marsch.name;

    card.appendChild(title);

    // Geschwindigkeit
    const speedSelect = document.createElement("select");

    for (let speed = 0.5; speed <= 1.5; speed += 0.05) {

  const rounded = speed.toFixed(2);

  const option = document.createElement("option");

  option.value = rounded;

  option.innerText = rounded + "x";

  if (rounded == 1.00) {
    option.selected = true;
  }

  speedSelect.appendChild(option);
  speedSelect.onchange = () => {

  player.playbackRate = parseFloat(speedSelect.value);

};

}

    card.appendChild(speedSelect);
    // ⏸ Pause Button
const pauseBtn = document.createElement("button");

pauseBtn.innerText = "⏸ Pause";

pauseBtn.onclick = async () => {

  try {

    // Wenn gerade pausiert → weitermachen
    if (player.paused) {

      await player.play();

      pauseBtn.innerText = "⏸ Pause";

    }

    // Wenn gerade läuft → pausieren
    else {

      player.pause();

      pauseBtn.innerText = "▶ Weiter";

    }

  } catch (error) {

    console.log(error);

  }

};

card.appendChild(pauseBtn);

// ⏹ Stop Button
const stopBtn = document.createElement("button");

stopBtn.innerText = "⏹ Stop";

stopBtn.onclick = () => {

  player.pause();

  player.currentTime = 0;

  player.loop = false;

};

card.appendChild(stopBtn);

    // ▶ Kompletter Marsch
    const komplettBtn = document.createElement("button");

    komplettBtn.innerText = "▶ Kompletter Marsch";

    komplettBtn.onclick = async () => {

      clearLoop();

      try {

        player.pause();

        player.src = marsch.komplett;

        player.loop = false;

        player.playbackRate = parseFloat(speedSelect.value);

        await player.play();

      } catch (error) {

        console.log(error);

      }

    };

    card.appendChild(komplettBtn);

    // 🔁 Teile
    marsch.teile.forEach((teil) => {

      const btn = document.createElement("button");

      btn.innerText = "🔁 " + teil.name;

      btn.onclick = async () => {

        clearLoop();

        try {

          player.pause();

          player.src = teil.file;
          player.onloadedmetadata = () => {
  seekBar.max = player.duration;
};

          player.loop = true;

          player.playbackRate = parseFloat(speedSelect.value);

          await player.play();

        } catch (error) {

          console.log(error);

        }

      };

      card.appendChild(btn);

    });

    marschListe.appendChild(card);

  });

}

// 🔁 Loop stoppen
function clearLoop() {

  player.loop = false;

}

seekBar.oninput = () => {
  player.currentTime = seekBar.value;
};

player.addEventListener("timeupdate", () => {
  seekBar.value = player.currentTime;
});

player.addEventListener("timeupdate", () => {
  if (!seekBar.dragging) {
    seekBar.value = player.currentTime;
  }
});

anzeigen();