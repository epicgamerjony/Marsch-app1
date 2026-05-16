const marschListe = document.getElementById("marschListe");
const seekBar = document.getElementById("seekBar");

// 🔊 EIN globaler Audio Player
const player = new Audio();

// 🔁 Aktiver Loop
let aktiverLoop = null;

// 📀 Alle Märsche
const maersche = [

  {
    name: "Alte Kamaraden",

    komplett: "Alte.Kamaraden/Alte.Kamaraden.Komplett.mp3",

    teile: [
      {
        name: "Teil1",
        file: "Alte.Kamaraden/Alte.Kamaraden.Teil1.mp3"
      },
      {
        name: "Teil 2",
        file: "Alte.Kamaraden/Alte.Kamaraden.Teil2.mp3"
      },
      {
        name: "Teil 3",
        file: "Alte.Kamaraden/Alte.Kamaraden.Teil3.mp3"
      },
      {
        name: "Teil4",
        file: "Alte.Kamaraden/Alte.Kamaraden.Teil4.mp3"
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

// 🔁 Loop stoppen
function clearLoop() {

  if (aktiverLoop) {

    clearInterval(aktiverLoop);

    aktiverLoop = null;
    let isDragging = false;
    // 🎚 Benutzer startet Ziehen
seekBar.addEventListener("mousedown", () => {

  isDragging = true;

});

// 📱 Für Handy Touch
seekBar.addEventListener("touchstart", () => {

  isDragging = true;

});

// 🎚 Benutzer lässt los
seekBar.addEventListener("mouseup", () => {

  player.currentTime = seekBar.value;

  isDragging = false;

});

// 📱 Für Handy Touch
seekBar.addEventListener("touchend", () => {

  player.currentTime = seekBar.value;

  isDragging = false;

});

// 🔄 Slider flüssig aktualisieren
player.addEventListener("timeupdate", () => {

  if (!isDragging) {

    seekBar.value = player.currentTime;

  }

});

  }

}

// 📊 Slider → Song springen


// 📊 Song → Slider aktualisieren


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

    }

    speedSelect.onchange = () => {

      player.playbackRate = parseFloat(speedSelect.value);

    };

    card.appendChild(speedSelect);

    // ⏸ Pause Button
    const pauseBtn = document.createElement("button");

    pauseBtn.innerText = "⏸ Pause";

    pauseBtn.onclick = async () => {

      try {

        if (player.paused) {

          await player.play();

          pauseBtn.innerText = "⏸ Pause";

        } else {

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

      clearLoop();

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

        player.load();

        player.addEventListener("loadedmetadata", () => {

  seekBar.max = Math.floor(player.duration);

}, { once: true });

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

          player.load();

          player.addEventListener("loadedmetadata", () => {

  seekBar.max = Math.floor(player.duration);

}, { once: true });

          player.playbackRate = parseFloat(speedSelect.value);

          await player.play();

          // 🔁 Manueller sauberer Loop
          aktiverLoop = setInterval(() => {

            if (player.currentTime >= player.duration - 0.03) {

              player.currentTime = 0;

              player.play();

            }

          }, 10);

        } catch (error) {

          console.log(error);

        }

      };

      card.appendChild(btn);

    });

    marschListe.appendChild(card);

  });

}

anzeigen();