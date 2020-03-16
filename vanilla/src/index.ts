import { Level, simpleLevelPlan, moreLevels } from "./level";
import { DOMDisplay } from "./display/display";
import State from "./state";
import runGame from "./game";

runGame(moreLevels, DOMDisplay);

function displaySimpleLevel() {
  const simpleLevel = new Level(simpleLevelPlan);
  const display = new DOMDisplay(document.body, simpleLevel);
  display.syncState(State.start(simpleLevel));
}
