import State, { StateStatus } from "./state";

export class Vec {
  constructor(public x: number, public y: number) {}
  plus(other: Vec) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor: number) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

export abstract class Actor {
  constructor(public pos: Vec, public size: Vec) {}

  abstract update(time, ...args): Actor;

  // abstract
  static create(pos: Vec, ...args): Actor {
    return;
  }

  abstract collide(state: State): State;
}

export class Player extends Actor {
  static size = new Vec(0.8, 1.5);
  static readonly xSpeed = 7;
  static readonly gravity = 30;
  static readonly jumpSpeed = 17;
  constructor(pos: Vec, public speed: Vec) {
    super(pos, Player.size);
  }

  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }

  update(time: number, state: State, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= Player.xSpeed;
    if (keys.ArrowRight) xSpeed += Player.xSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + time * Player.gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -Player.jumpSpeed;
    } else {
      ySpeed = 0
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
  }

  collide = state => state;
}

export class Lava extends Actor {
  static size = new Vec(1, 1);
  constructor(public pos: Vec, public speed: Vec, public reset?: Vec) {
    super(pos, Lava.size);
  }

  get type() {
    return "lava";
  }

  static create(pos, ch) {
    if (ch == "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch == "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch == "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }

  collide(state: State) {
    return new State(state.level, state.actors, StateStatus.LOST);
  }

  update(time: number, state: State) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.pos, this.speed.times(-1));
    }
  }
}

export class Coin extends Actor {
  static size = new Vec(0.6, 0.6);
  static readonly wobbleSpeed = 8;
  static readonly wobbleDist = 0.07;
  constructor(public pos: Vec, public basePos: Vec, public wobble) {
    super(pos, Coin.size);
  }

  get type() {
    return "coin";
  }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }

  collide(state: State) {
    let filtered = state.actors.filter(a => a != this);
    let status = state.status;
    if (!filtered.some(a => a.type == "coin")) status = StateStatus.WON;
    return new State(state.level, filtered, status);
  }

  update(time) {
    let wobble = this.wobble + time * Coin.wobbleSpeed;
    let wobblePos = Math.sin(wobble) * Coin.wobbleDist;
    return new Coin(
      this.basePos.plus(new Vec(0, wobblePos)),
      this.basePos,
      wobble
    );
  }
}
