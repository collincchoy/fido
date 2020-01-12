import { Level } from "./level";

import State from "./state";

function trackKeys(keys: string[]) {
  let down = Object.create(null);
  function track(event: KeyboardEvent) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
}
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

function runAnimation(animation: (time: number) => boolean) {
  const MAX_FRAME_STEP = 100; // milliseconds
  let lastTime = null;
  function frame(time: number) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, MAX_FRAME_STEP) / 1000;
      if (animation(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level: Level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

export default async function runGame(plans: string[], Display) {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(new Level(plans[level]), Display);
    if (status == "won") level++;
  }
  console.log("You've won!");
}