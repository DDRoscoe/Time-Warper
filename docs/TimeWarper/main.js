title = "Time Warper";

description = `
   Stop the hand 

on the correct time!
`;

characters = [];

const G = {
	WIDTH: 150,
	HEIGHT: 150,

  CENTERX: 150 * 0.5,
  CENTERY: 150 * 0.5
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
  theme: "dark"
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
 * @type {{
  * text: string
  * }}
  */
  let textHolder;

 let flip;
 let progress;

function update() {
  if (!ticks) {
  clockHand = {
    pos: vec(G.CENTERX, G.CENTERY),
    length: 50,
    thickness: 5,
    rotation: 1.5,
    centerPosRatio: 1
    }
  }

  color("cyan")
  bar(clockHand.pos, clockHand.length, clockHand.thickness, clockHand.rotation, clockHand.centerPosRatio);
  if (flip) {
    clockHand.rotation -= 0.01;
    if (input.isJustPressed) 
      flip = false;
  }
  else if (!flip) {
    clockHand.rotation += 0.01;
    if (input.isJustPressed)
      flip = true;
  }

  let arcs =[];
  for(let i=1;i<=12;i++){
      if(i<=6){
          if(i%2 ==0){
              color("light_black");
          }else{
              color("light_blue");
          }
          arcs[i-1] = arc(G.WIDTH/2,G.HEIGHT/2,50,2,i*PI/6-PI/12,(i-1)*PI/6-PI/12);
      }else if(i>6){
          if(i%2 ==1){
              color("light_black");
          }else{
              color("light_blue");
          }
          arcs[i-1] = arc(G.WIDTH/2,G.HEIGHT/2,50,2,(i-6)*(-1)*PI/6-PI/12,(i-7)*(-1)*PI/6-PI/12);
      } 
  }

  color("yellow")
  text("12", G.CENTERX - 4, G.CENTERY - 40)
  text("1", 96, 39)
  text("2", 108, 55)
  text("3", G.CENTERX + 40, G.CENTERY)
  text("4", 106, 94)
  text("5", 93, 108)
  text("6", G.CENTERX, G.CENTERY + 40)
  text("7", 56, 108)
  text("8", 40, 95)
  text("9", G.CENTERX - 40, G.CENTERY)
  text("10", 39, 55)
  text("11", 52, 39)

  let randomNum = rnd(0, 11)
  let numStr = randomNum.toString();



  // if (progress == true) {
  //   for (let i = 0; i <= arcs.length; i++) {
  //     if (i == randomNum)
  //       color("yellow") 
  //       arc(G.WIDTH/2,G.HEIGHT/2,50,2,(i-6)*(-1)*PI/6-PI/12,(i-7)*(-1)*PI/6-PI/12);
  //       if (bar(clockHand.pos, clockHand.length, clockHand.thickness, clockHand.rotation, clockHand.centerPosRatio).isColliding.arc(G.WIDTH/2,G.HEIGHT/2,50,2,(i-6)*(-1)*PI/6-PI/12,(i-7)*(-1)*PI/6-PI/12)

  //       progress = false;
  //   }
  // }


  //color("yellow")
  //arc(G.WIDTH * 0.5, G.HEIGHT * 0.5, 50)
}
