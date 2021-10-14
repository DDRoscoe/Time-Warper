title = "Time Warper";

description = `
    Stop the hand 
 on the correct time!

How much can you score
    in 30 seconds?
`;

characters = [];

const G = {
  WIDTH: 150,
  HEIGHT: 150,

  CENTERX: 150 * 0.5,
  CENTERY: 150 * 0.5
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  theme: "dark",
  isPlayingBgm: true,
  seed: 69,
  isReplayEnabled: true
};


/**
 * @type {{
 * pos: Vector,
 * length: number,
 * thickness: number,
 * rotation: number,
 * centerPosRatio: number
 * }}
 */
let clockHand;

/**
 * @type { number }
 */
let arcNum;
let randomNum;
let accel;
let flip;
let time;

let timeStr;


function update() {
  if (!ticks) {
    clockHand = {
      pos: vec(G.CENTERX, G.CENTERY),
      length: 48,
      thickness: 5,
      rotation: 0.05,
      centerPosRatio: 1
    }
    arcNum = 0;
    accel = 0.01;
  }

  color("green");
  if (time >= 15)
    color("yellow");
  if (time >= 25) {
    color("red")
    if (time%2 == 1)
      color("yellow")
  }

  time = Math.floor(ticks / 60);
  timeStr = time.toString();
  text("Time:", 5, 20);
  text(timeStr, 40, 20);

  if (time == 30)
    end();

  color("yellow");
  text("12", G.CENTERX - 4, G.CENTERY - 40);
  text("1", 96, 39);
  text("2", 108, 55);
  text("3", G.CENTERX + 40, G.CENTERY);
  text("4", 106, 94);
  text("5", 93, 108);
  text("6", G.CENTERX, G.CENTERY + 40);
  text("7", 56, 108);
  text("8", 40, 95);
  text("9", G.CENTERX - 40, G.CENTERY);
  text("10", 39, 55);
  text("11", 52, 39);

  color("cyan");
  bar(clockHand.pos, clockHand.length, clockHand.thickness, clockHand.rotation, clockHand.centerPosRatio);
  if (flip) {
    clockHand.rotation -= accel;
    if (input.isJustPressed) {
      flip = false;
    }
  }
  else if (!flip) {
    clockHand.rotation += accel;
    if (input.isJustPressed)
      flip = true;
  }

  let arcs = [];

  for (let i = 1; i <= 12; i++) {
    if (i <= 6) {
      if (i % 2 == 0) {
        color("light_black");
      } else {
        color("light_blue");
      }
      arcs[i - 1] = arc(G.WIDTH / 2, G.HEIGHT / 2, 50, 2, i * PI / 6 - PI / 12, (i - 1) * PI / 6 - PI / 12);
    }
    else if (i > 6) {
      if (i % 2 == 1) {
        color("light_black");
      } else {
        color("light_blue");
      }
      arcs[i - 1] = arc(G.WIDTH / 2, G.HEIGHT / 2, 50, 2, (i - 6) * (-1) * PI / 6 - PI / 12, (i - 7) * (-1) * PI / 6 - PI / 12);
    }
  }

  color("yellow");
  
  let target = arc(G.WIDTH / 2, G.HEIGHT / 2, 50, 2, (arcNum - 7) * (-1) * PI / 6 - PI / 12, (arcNum - 6) * (-1) * PI / 6 - PI / 12);

  console.log(flip);
  let tapCheck = target.isColliding.rect["cyan"];
  if (input.isJustPressed) {
    if (tapCheck) {
      particle(
        G.CENTERX,
        G.CENTERY,
        30,
        10
      );
      play("coin");
      accel += 0.005;
      addScore(10);
    } else {
      end();
    }
    randomNum = rnd(0, 11);
    arcNum = Math.floor(randomNum);
  } 
}