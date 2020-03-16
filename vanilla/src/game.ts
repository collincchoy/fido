import { Level } from "./level";

import State, { StateStatus } from "./state";

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
  down.unregister = () => {
    window.removeEventListener("keydown", track);
    window.removeEventListener("keyup", track);
  };
  return down;
}
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

function runAnimation(animation: (secondsPast: number) => boolean) {
  // Limit large time skips caused by "lag" or switched tabs
  const MAX_FRAME_STEP = 100; // milliseconds
  let lastTime = null;
  function frame(time: number) {
    if (lastTime != null) {
      let secondsPast = Math.min(time - lastTime, MAX_FRAME_STEP) / 1000;
      if (animation(secondsPast) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level: Level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let endingDelayLeft = 1;
  return new Promise((resolve: (status: StateStatus) => void) => {
    const runSingleFrame = (secondsPast: number) => {
      state = state.update(secondsPast, arrowKeys);
      display.syncState(state);
      if (state.status === StateStatus.PLAYING) {
        return true;
      } else if (state.status === StateStatus.PAUSED) {
        return false;
      } else if (endingDelayLeft > 0) {  // 1 second delay/ending phase
        endingDelayLeft -= secondsPast;
        return true;
      } else {  // game is over
        display.clear();
        window.removeEventListener("keydown", pauseHandler);
        resolve(state.status);
        return false;
      }
    };
    const pauseHandler = (event: KeyboardEvent) => {
      if (event.key != "Escape") return
      if (state.status === StateStatus.PLAYING) {
        console.log("Pausing");
        state.status = StateStatus.PAUSED;
      } else if (state.status === StateStatus.PAUSED) {
        console.log("unpausing");
        state.status = StateStatus.PLAYING;
        runAnimation(runSingleFrame);
      }
    };
    window.addEventListener("keydown", pauseHandler);

    runAnimation(runSingleFrame);
  });
}

export default async function runGame(plans: string[], Display) {
  const livesToStartWith = 3;
  let livesLeft = livesToStartWith;
  for (let level = 0; level < plans.length; ) {
    console.log(`Lives: ${livesLeft}`);
    let endOfLevelStatus = await runLevel(new Level(plans[level]), Display);
    if (endOfLevelStatus === StateStatus.WON) level++;
    else if (endOfLevelStatus === StateStatus.LOST) {
      if (livesLeft > 0) livesLeft--;
      else {
        console.log("Game over! Out of lives!");
        // reset
        level = 0;
        livesLeft = livesToStartWith;
      }
    }
    console.log("You've won!");
  }
  console.log("You've won!");
}