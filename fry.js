"use strict";

const form = document.querySelector("#converter");
const placeholder = document.querySelector("#result-placeholder");
const estimate = document.querySelector("#estimate");
const temperature = document.querySelector("#air-temperature");
const time = document.querySelector("#air-time");
const checkTime = document.querySelector("#check-time");
const packetNote = document.querySelector("#packet-note");

function clearEstimate() {
  if (estimate.hidden) return;
  estimate.hidden = true;
  placeholder.hidden = false;
}

form.addEventListener("input", clearEstimate);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const settings = new FormData(form);
  const ovenTemperature = Number(settings.get("temperature"));
  const ovenMinutes = Number(settings.get("minutes"));
  const frozen = settings.get("food") === "frozen";
  const conventional = settings.get("oven") === "conventional";
  const reduction = !frozen && conventional ? 20 : 0;
  const start = Math.max(1, Math.floor(ovenMinutes * (frozen ? 50 : 75) / 100));
  const end = Math.ceil(ovenMinutes * (frozen ? 55 : 80) / 100);

  temperature.textContent = `${ovenTemperature - reduction} °C`;
  time.textContent = start === end ? `${start} min` : `${start}–${end} min`;
  checkTime.textContent = `Start checking at ${start} min`;
  packetNote.hidden = !frozen;
  placeholder.hidden = true;
  estimate.hidden = false;
});
