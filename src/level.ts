import { Player, Coin, Lava, Vec, Actor } from "./objects";

const simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

const levelChars = new Map<string, typeof Actor | string>(Object.entries({
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
}));

class Level {
  height: number;
  width: number;
  startActors: Actor[];
  rows: any;
  constructor(plan) {
    const rows = plan
      .trim()
      .split("\n")
      .map(l => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars.get(ch);
        if (typeof type == "string") return type;
        this.startActors.push(type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }

  /**
   * This method tells us whether a rectangle (specified by a position and a size) touches a grid element of the given type.
   * @param pos 
   * @param {*} size 
   * @param {*} type 
   */
  touches(pos: Vec, size: Vec, type: string) {
    const xStart = Math.floor(pos.x),
         xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y),
         yEnd = Math.ceil(pos.y + size.y);
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const isOutside = (x < 0 || x >= this.width) ||
          (y < 0 || y >= this.rows[y][x]);
        const typeHere = isOutside ? "wall" : this.rows[y][x];
        if (typeHere == type) return true;
      }
    }
    return false;
  }
}

export { simpleLevelPlan, Level };