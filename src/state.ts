import { Level } from "./level";
import { Actor } from "./objects";

function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

export enum StateStatus {
  PLAYING, WON, LOST
}

export default class State {
  constructor(public level: Level, public actors: Actor[], public status: StateStatus) {}

  static start(level) {
    return new State(level, level.startActors, StateStatus.PLAYING);
  }

  get player() {
    return this.actors.find(a => a.type == "player");
  }

  update(time, keys) {
    const actors = this.actors.map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status != StateStatus.PLAYING) return newState;

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, StateStatus.LOST);
    }

    for (let actor of actors) {
      if (actor != player && overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }

    return newState;
  }
}
