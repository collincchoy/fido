import { Level, simpleLevelPlan } from "./level";
import { DOMDisplay } from "./display/display";
import State from "./state";

const simpleLevel = new Level(simpleLevelPlan);
const display = new DOMDisplay(document.body, simpleLevel);
display.syncState(State.start(simpleLevel));
