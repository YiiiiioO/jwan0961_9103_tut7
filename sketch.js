let imgDrwPrps = {aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0};
let canvasAspectRatio = 0;
let numRandomthreeDRects; // number of random cube 
let cam;
let run2D = false;
let run3D = false;
let clearall = true;
let breakindex = false;
let elementcolors = [
  [75, 107, 186],  // blue
  [230, 207, 48], // yellow
  [173, 58, 47], // red
  [219, 217, 213], // grey
  [75, 107, 186],  // blue
  [230, 207, 48], // yellow
  [173, 58, 47], // red
  [219, 217, 213], // grey
];
let yellow_ratio = 0.02
let colorindex = 0;
let cubes = [];



// setup
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  calculateCanvasProps();
  cam = createCamera();   // set up camera vie

  // Generate 100 random cubes
  for (let i = 0; i < 100; i++) {
    let selectedColor = random(elementcolors);
    let cube = {
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      size: random(20, 50),
      c1: selectedColor[0], 
      c2: selectedColor[1], 
      c3: selectedColor[2]
    };
    cubes.push(cube);
  }

}



// draw
function draw() {
  background(240, 240, 240); // background
  
  // if 2 is pressed
  if (run2D){
    loop();
    artwork();
  }

  // if 3 is pressed
  if (run3D){
    orbitControl();
    loop();
    threeDartwork();
  }

  // if space is pressed
  if (breakindex){
    background(240, 240, 240); 
    orbitControl();
    loop();
    for (let cube of cubes) {
      push();
      translate(cube.x, cube.y, cube.z);
      noStroke(); 
      fill(cube.c1, cube.c2, cube.c3)
      box(cube.size);
      pop();
    }
  }
  
  // if c is pressed
  if (clearall){
    loop();
    newrect(0,0,5,5)  // create sin and cos 
    rotateX(45);      // rotate plane
    clearartwork();
    
    // create a blur background
    fill(240, 240, 240, frameCount*1);
    depth = 100;
    box(windowWidth*2, windowHeight*2, depth);
  }

}

 

// resize window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateCanvasProps();
  redraw(); 
}



// calculate canvas width and height ratio
function calculateCanvasProps() {
  // Calculate the aspect ratio of the canvas
  canvasAspectRatio = windowWidth / windowHeight;
  // Set imgDrwPrps to match the window aspect ratio
  if (canvasAspectRatio >= 1) {
    // Landscape or square
    imgDrwPrps.width = windowHeight;
    imgDrwPrps.height = windowHeight;
    imgDrwPrps.xOffset = (windowWidth - windowHeight) / 2;
    imgDrwPrps.yOffset = 0;
  } else {
    // Portrait
    imgDrwPrps.width = windowWidth;
    imgDrwPrps.height = windowWidth;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = (windowHeight - windowWidth) / 2;
  }
}


// define key press
function keyPressed(){

  // increase width
  if (keyCode == UP_ARROW) {
    yellow_ratio += 0.01;
    yellow_ratio  = constrain(yellow_ratio, 0.001,0.1)
  }

  // decrease width
  if (keyCode == DOWN_ARROW) {
    yellow_ratio -= 0.01;
    yellow_ratio  = constrain(yellow_ratio, 0.001,0.08)
  }
  
  // change color
  if (keyCode == LEFT_ARROW) {
    colorindex -= 1;
    colorindex = constrain(colorindex, 0, 3);
  }
  
  // change color
  if (keyCode == RIGHT_ARROW) {
    colorindex += 1;
    colorindex = constrain(colorindex, 0, 3);
  }

  if (key === "3") {
    loop();
    calculateCanvasProps();
    cam = createCamera();
    run3D = true;                     // switch to 3d view
    run2D = false;
    clearall = false;
    breakindex = false;
  } else if (key === "2") {
    noLoop();
    run2D = true;
    run3D = false;                    // switch to 2d view
    clearall = false;
    breakindex = false;
    calculateCanvasProps();
    cam = createCamera();
  } else if (key === "c") {
    run2D = false;
    run3D = false;
    clearall = true; 
    breakindex = false;                 // back to beginning
  } else if (key === " ") {
    run2D = false;
    run3D = false;
    clearall = false;
    breakindex = true;                //break everything
  }
}

// sin and cos vortex
function newrect(x,y,w,h) {
    for (let j = 0; j < 5; j++) {
        push();
        for (let i = 0; i < 80; i++) {
          translate(
            sin(frameCount * 0.002 + j) * 100,
            sin(frameCount * 0.002 + j) * 100,
            i * 1
          );
          rotateZ(frameCount * 0.005);
          push();
          let selectedColor = random(elementcolors);
          fill(selectedColor[0], selectedColor[1], selectedColor[2])
          box(10,10,10)
          pop();
        }
        pop();
      }
    rotateX(-45);
}


// =========================================================================
// =========================================================================
// ===============================3D view ========================================
// =========================================================================
// =========================================================================

// general 3d box
function threeDrect(x, y, w, h){
  push();
  translate(x+w/2,y+h/2)
  // depth = 2*w;
  // depth = constrain(depth, h, w)
  depth = 100;
  box(w, h, depth)
  pop();
}

// for yellow box
function threeDrecty(x, y, w, h){
  push();
  translate(x+w/2,y+h/2)
  // depth = 2*w;
  // depth = constrain(depth, h, w)
  depth = 50;
  box(w, h, depth)
  pop();
}

// for blue box
function threeDrectb(x, y, w, h){
  push();
  translate(x+w/2,y+h/2)
  // depth = 2*w;
  // depth = constrain(depth, h, w)
  depth = 70;
  box(w, h, depth)
  pop();
}

// for red box
function threeDrectr(x, y, w, h){
  push();
  translate(x+w/2,y+h/2)
  // depth = 2*w;
  // depth = constrain(depth, h, w)
  depth = 100;
  box(w, h, depth)
  pop();
}

// for grey box
function threeDrectg(x, y, w, h){
  push();
  translate(x+w/2,y+h/2)
  // depth = 2*w;
  // depth = constrain(depth, h, w)
  depth = 50;
  box(w, h, depth)
  pop();
}


// create 3d view
function threeDartwork() {

  noStroke(); 

  translate(-windowWidth/2, -windowHeight/2)

  // 计算相对位置和大小
  // Y轴开始从上到下的黄色线条矩形
  let threeDrect1X = imgDrwPrps.xOffset;
  let threeDrect1Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let threeDrect1W = imgDrwPrps.width;
  let threeDrect1H = imgDrwPrps.height * yellow_ratio;

  let threeDrect2X = imgDrwPrps.xOffset;
  let threeDrect2Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.16;
  let threeDrect2W = imgDrwPrps.width;
  let threeDrect2H = imgDrwPrps.height * yellow_ratio;

  let threeDrect3X = imgDrwPrps.xOffset;
  let threeDrect3Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.35;
  let threeDrect3W = imgDrwPrps.width;
  let threeDrect3H = imgDrwPrps.height * yellow_ratio;

  let threeDrect4X = imgDrwPrps.xOffset;
  let threeDrect4Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.43;
  let threeDrect4W = imgDrwPrps.width;
  let threeDrect4H = imgDrwPrps.height * yellow_ratio;

  let threeDrect5X = imgDrwPrps.xOffset;
  let threeDrect5Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.56;
  let threeDrect5W = imgDrwPrps.width;
  let threeDrect5H = imgDrwPrps.height * yellow_ratio;

  let threeDrect6X = imgDrwPrps.xOffset;
  let threeDrect6Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let threeDrect6W = imgDrwPrps.width;
  let threeDrect6H = imgDrwPrps.height * yellow_ratio;

  let threeDrect7X = imgDrwPrps.xOffset;
  let threeDrect7Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.685;
  let threeDrect7W = imgDrwPrps.width * 0.06;
  let threeDrect7H = imgDrwPrps.height * yellow_ratio;

  let threeDrect8X = imgDrwPrps.xOffset;
  let threeDrect8Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.775;
  let threeDrect8W = imgDrwPrps.width * 0.06;
  let threeDrect8H = imgDrwPrps.height * yellow_ratio;

  let threeDrect9X = imgDrwPrps.xOffset;
  let threeDrect9Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.85;
  let threeDrect9W = imgDrwPrps.width;
  let threeDrect9H = imgDrwPrps.height * yellow_ratio;

  let threeDrect10X = imgDrwPrps.xOffset;
  let threeDrect10Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.885;
  let threeDrect10W = imgDrwPrps.width * 0.06;
  let threeDrect10H = imgDrwPrps.height * yellow_ratio;

  let threeDrect11X = imgDrwPrps.xOffset;
  let threeDrect11Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let threeDrect11W = imgDrwPrps.width;
  let threeDrect11H = imgDrwPrps.height * yellow_ratio;

  let threeDrect12X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.08;
  let threeDrect12Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let threeDrect12W = imgDrwPrps.width * 0.457;
  let threeDrect12H = imgDrwPrps.height * yellow_ratio;

  let threeDrect13X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let threeDrect13Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.805;
  let threeDrect13W = imgDrwPrps.width * 0.1;
  let threeDrect13H = imgDrwPrps.height * yellow_ratio;

  

  // X轴上从左到右的黄色线条矩形
  let threeDrect14X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let threeDrect14Y = imgDrwPrps.yOffset;
  let threeDrect14W = imgDrwPrps.width * yellow_ratio;
  let threeDrect14H = imgDrwPrps.height * 0.35;

  let threeDrect15X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect15Y = imgDrwPrps.yOffset;
  let threeDrect15W = imgDrwPrps.width * yellow_ratio;
  let threeDrect15H = imgDrwPrps.height;

  let threeDrect16X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect16Y = imgDrwPrps.yOffset;
  let threeDrect16W = imgDrwPrps.width * yellow_ratio;
  let threeDrect16H = imgDrwPrps.height * 0.96;

  let threeDrect17X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let threeDrect17Y = imgDrwPrps.yOffset;
  let threeDrect17W = imgDrwPrps.width * yellow_ratio;
  let threeDrect17H = imgDrwPrps.height;

  let threeDrect18X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect18Y = imgDrwPrps.yOffset;
  let threeDrect18W = imgDrwPrps.width * yellow_ratio;
  let threeDrect18H = imgDrwPrps.height;

  let threeDrect19X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let threeDrect19Y = imgDrwPrps.yOffset;
  let threeDrect19W = imgDrwPrps.width * yellow_ratio;
  let threeDrect19H = imgDrwPrps.height;

  let threeDrect20X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect20Y = imgDrwPrps.yOffset;
  let threeDrect20W = imgDrwPrps.width * yellow_ratio;
  let threeDrect20H = imgDrwPrps.height;

  let threeDrect21X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let threeDrect21Y = imgDrwPrps.yOffset;
  let threeDrect21W = imgDrwPrps.width * yellow_ratio;
  let threeDrect21H = imgDrwPrps.height * 0.35;

  let threeDrect22X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let threeDrect22Y = imgDrwPrps.yOffset;
  let threeDrect22W = imgDrwPrps.width * yellow_ratio;
  let threeDrect22H = imgDrwPrps.height * 0.430;

  let threeDrect23X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let threeDrect23Y = imgDrwPrps.yOffset;
  let threeDrect23W = imgDrwPrps.width * yellow_ratio;
  let threeDrect23H = imgDrwPrps.height;

  let threeDrect24X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.647;
  let threeDrect24Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.450;
  let threeDrect24W = imgDrwPrps.width * yellow_ratio;
  let threeDrect24H = imgDrwPrps.height * 0.175;

  let threeDrect25X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let threeDrect25Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.645;
  let threeDrect25W = imgDrwPrps.width * yellow_ratio;
  let threeDrect25H = imgDrwPrps.height * 0.160;

  //固定的交叉处的正方形蓝色方块
  //第一行三个
  let threeDrect26X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let threeDrect26Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let threeDrect26W = imgDrwPrps.width * yellow_ratio;
  let threeDrect26H = imgDrwPrps.height * yellow_ratio;

  let threeDrect27X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect27Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let threeDrect27W = imgDrwPrps.width * yellow_ratio;
  let threeDrect27H = imgDrwPrps.height * yellow_ratio;

  let threeDrect28X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let threeDrect28Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let threeDrect28W = imgDrwPrps.width * yellow_ratio;
  let threeDrect28H = imgDrwPrps.height * yellow_ratio;

  //第二行四个
  let threeDrect29X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect29Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let threeDrect29W = imgDrwPrps.width * yellow_ratio;
  let threeDrect29H = imgDrwPrps.height * yellow_ratio;

  let threeDrect30X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect30Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let threeDrect30W = imgDrwPrps.width * yellow_ratio;
  let threeDrect30H = imgDrwPrps.height * yellow_ratio;

  let threeDrect31X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect31Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let threeDrect31W = imgDrwPrps.width * yellow_ratio;
  let threeDrect31H = imgDrwPrps.height * yellow_ratio;

  let threeDrect32X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let threeDrect32Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let threeDrect32W = imgDrwPrps.width * yellow_ratio;
  let threeDrect32H = imgDrwPrps.height * yellow_ratio;

  //第三行四个
  let threeDrect33X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect33Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect33W = imgDrwPrps.width * yellow_ratio;
  let threeDrect33H = imgDrwPrps.height * yellow_ratio;

  let threeDrect34X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let threeDrect34Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect34W = imgDrwPrps.width * yellow_ratio;
  let threeDrect34H = imgDrwPrps.height * yellow_ratio;

  let threeDrect35X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let threeDrect35Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect35W = imgDrwPrps.width * yellow_ratio;
  let threeDrect35H = imgDrwPrps.height * yellow_ratio;

  let threeDrect36X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect36Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect36W = imgDrwPrps.width * yellow_ratio;
  let threeDrect36H = imgDrwPrps.height * yellow_ratio;

  //第四行两个
  let threeDrect37X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect37Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let threeDrect37W = imgDrwPrps.width * yellow_ratio;
  let threeDrect37H = imgDrwPrps.height * yellow_ratio;

  let threeDrect38X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let threeDrect38Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let threeDrect38W = imgDrwPrps.width * yellow_ratio;
  let threeDrect38H = imgDrwPrps.height * yellow_ratio;

  //第五行三个
  let threeDrect39X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect39Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let threeDrect39W = imgDrwPrps.width * yellow_ratio;
  let threeDrect39H = imgDrwPrps.height * yellow_ratio;

  let threeDrect40X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect40Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let threeDrect40W = imgDrwPrps.width * yellow_ratio;
  let threeDrect40H = imgDrwPrps.height * yellow_ratio;

  let threeDrect41X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let threeDrect41Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let threeDrect41W = imgDrwPrps.width * yellow_ratio;
  let threeDrect41H = imgDrwPrps.height * yellow_ratio;

  //第六行两个
  let threeDrect42X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect42Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let threeDrect42W = imgDrwPrps.width * yellow_ratio;
  let threeDrect42H = imgDrwPrps.height * yellow_ratio;

  let threeDrect43X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect43Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let threeDrect43W = imgDrwPrps.width * yellow_ratio;
  let threeDrect43H = imgDrwPrps.height * yellow_ratio;

  //第八行一个
  let threeDrect44X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let threeDrect44Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let threeDrect44W = imgDrwPrps.width * yellow_ratio;
  let threeDrect44H = imgDrwPrps.height * yellow_ratio;
  
  //第十行一个
  let threeDrect45X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect45Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.805;
  let threeDrect45W = imgDrwPrps.width * yellow_ratio;
  let threeDrect45H = imgDrwPrps.height * yellow_ratio;

  //第十一行四个
  let threeDrect46X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect46Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let threeDrect46W = imgDrwPrps.width * yellow_ratio;
  let threeDrect46H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect47X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect47Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let threeDrect47W = imgDrwPrps.width * yellow_ratio;
  let threeDrect47H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect48X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let threeDrect48Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let threeDrect48W = imgDrwPrps.width * yellow_ratio;
  let threeDrect48H = imgDrwPrps.height * yellow_ratio;

  let threeDrect49X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect49Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let threeDrect49W = imgDrwPrps.width * yellow_ratio;
  let threeDrect49H = imgDrwPrps.height * yellow_ratio;

  //第十三行三个
  let threeDrect50X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect50Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let threeDrect50W = imgDrwPrps.width * yellow_ratio;
  let threeDrect50H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect51X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let threeDrect51Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let threeDrect51W = imgDrwPrps.width * yellow_ratio;
  let threeDrect51H = imgDrwPrps.height * yellow_ratio;

  let threeDrect52X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect52Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let threeDrect52W = imgDrwPrps.width * yellow_ratio;
  let threeDrect52H = imgDrwPrps.height * yellow_ratio;


  //固定的交叉处的正方形红色方块
  //第二行两个个
  let threeDrect53X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let threeDrect53Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let threeDrect53W = imgDrwPrps.width * yellow_ratio;
  let threeDrect53H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect54X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let threeDrect54Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let threeDrect54W = imgDrwPrps.width * yellow_ratio;
  let threeDrect54H = imgDrwPrps.height * yellow_ratio;

  //第三行三个
  let threeDrect55X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let threeDrect55Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect55W = imgDrwPrps.width * yellow_ratio;
  let threeDrect55H = imgDrwPrps.height * yellow_ratio;

  let threeDrect56X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect56Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect56W = imgDrwPrps.width * yellow_ratio;
  let threeDrect56H = imgDrwPrps.height * yellow_ratio;

  let threeDrect57X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let threeDrect57Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect57W = imgDrwPrps.width * yellow_ratio;
  let threeDrect57H = imgDrwPrps.height * yellow_ratio;

  //第四行四个
  let threeDrect58X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect58Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let threeDrect58W = imgDrwPrps.width * yellow_ratio;
  let threeDrect58H = imgDrwPrps.height * yellow_ratio;

  let threeDrect59X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect59Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let threeDrect59W = imgDrwPrps.width * yellow_ratio;
  let threeDrect59H = imgDrwPrps.height * yellow_ratio;

  let threeDrect60X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let threeDrect60Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let threeDrect60W = imgDrwPrps.width * yellow_ratio;
  let threeDrect60H = imgDrwPrps.height * yellow_ratio;

  let threeDrect61X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let threeDrect61Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let threeDrect61W = imgDrwPrps.width * yellow_ratio;
  let threeDrect61H = imgDrwPrps.height * yellow_ratio;

  //第五行三个
  let threeDrect62X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.647;
  let threeDrect62Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let threeDrect62W = imgDrwPrps.width * yellow_ratio;
  let threeDrect62H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect63X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect63Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let threeDrect63W = imgDrwPrps.width * yellow_ratio;
  let threeDrect63H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect64X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let threeDrect64Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let threeDrect64W = imgDrwPrps.width * yellow_ratio;
  let threeDrect64H = imgDrwPrps.height * yellow_ratio;

  //第六行三个
  let threeDrect65X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect65Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let threeDrect65W = imgDrwPrps.width * yellow_ratio;
  let threeDrect65H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect66X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let threeDrect66Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let threeDrect66W = imgDrwPrps.width * yellow_ratio;
  let threeDrect66H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect67X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let threeDrect67Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let threeDrect67W = imgDrwPrps.width * yellow_ratio;
  let threeDrect67H = imgDrwPrps.height * yellow_ratio;

  //第七行一个
  let threeDrect68X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect68Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.685;
  let threeDrect68W = imgDrwPrps.width * yellow_ratio;
  let threeDrect68H = imgDrwPrps.height * yellow_ratio;

  //第八行两个
  let threeDrect69X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect69Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let threeDrect69W = imgDrwPrps.width * yellow_ratio;
  let threeDrect69H = imgDrwPrps.height * yellow_ratio;

  let threeDrect70X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect70Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let threeDrect70W = imgDrwPrps.width * yellow_ratio;
  let threeDrect70H = imgDrwPrps.height * yellow_ratio;

  //第九行一个
  let threeDrect71X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect71Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.775;
  let threeDrect71W = imgDrwPrps.width * yellow_ratio;
  let threeDrect71H = imgDrwPrps.height * yellow_ratio;

  //第十行三个
  let threeDrect72X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let threeDrect72Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let threeDrect72W = imgDrwPrps.width * yellow_ratio;
  let threeDrect72H = imgDrwPrps.height * yellow_ratio;
  
  let threeDrect73X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let threeDrect73Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let threeDrect73W = imgDrwPrps.width * yellow_ratio;
  let threeDrect73H = imgDrwPrps.height * yellow_ratio;

  let threeDrect74X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let threeDrect74Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let threeDrect74W = imgDrwPrps.width * yellow_ratio;
  let threeDrect74H = imgDrwPrps.height * yellow_ratio;

  //第十三行两个
  let threeDrect75X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let threeDrect75Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let threeDrect75W = imgDrwPrps.width * yellow_ratio;
  let threeDrect75H = imgDrwPrps.height * yellow_ratio;

  let threeDrect76X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let threeDrect76Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let threeDrect76W = imgDrwPrps.width * yellow_ratio;
  let threeDrect76H = imgDrwPrps.height * yellow_ratio;

  //固定的交叉处的正方形灰色方块
  //第一行一个
  let threeDrect77X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let threeDrect77Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let threeDrect77W = imgDrwPrps.width * yellow_ratio;
  let threeDrect77H = imgDrwPrps.height * yellow_ratio;

  //第三行三个
  let threeDrect78X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let threeDrect78Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect78W = imgDrwPrps.width * yellow_ratio;
  let threeDrect78H = imgDrwPrps.height * yellow_ratio;

  let threeDrect79X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let threeDrect79Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect79W = imgDrwPrps.width * yellow_ratio;
  let threeDrect79H = imgDrwPrps.height * yellow_ratio;

  let threeDrect80X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let threeDrect80Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let threeDrect80W = imgDrwPrps.width * yellow_ratio;
  let threeDrect80H = imgDrwPrps.height * yellow_ratio;
  
  //第四行两个
  let threeDrect81X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect81Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let threeDrect81W = imgDrwPrps.width * yellow_ratio;
  let threeDrect81H = imgDrwPrps.height * yellow_ratio;

  let threeDrect82X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let threeDrect82Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let threeDrect82W = imgDrwPrps.width * yellow_ratio;
  let threeDrect82H = imgDrwPrps.height * yellow_ratio;

  //第五行两个
  let threeDrect83X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect83Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let threeDrect83W = imgDrwPrps.width * yellow_ratio;
  let threeDrect83H = imgDrwPrps.height * yellow_ratio;

  let threeDrect84X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let threeDrect84Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let threeDrect84W = imgDrwPrps.width * yellow_ratio;
  let threeDrect84H = imgDrwPrps.height * yellow_ratio;

  //第六行两个
  let threeDrect85X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect85Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let threeDrect85W = imgDrwPrps.width * yellow_ratio;
  let threeDrect85H = imgDrwPrps.height * yellow_ratio;

  let threeDrect86X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let threeDrect86Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let threeDrect86W = imgDrwPrps.width * yellow_ratio;
  let threeDrect86H = imgDrwPrps.height * yellow_ratio;

  //第七行一个
  let threeDrect87X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect87Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let threeDrect87W = imgDrwPrps.width * yellow_ratio;
  let threeDrect87H = imgDrwPrps.height * yellow_ratio;

  //第十三行两个
  let threeDrect88X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let threeDrect88Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let threeDrect88W = imgDrwPrps.width * yellow_ratio;
  let threeDrect88H = imgDrwPrps.height * yellow_ratio;

  let threeDrect89X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let threeDrect89Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let threeDrect89W = imgDrwPrps.width * yellow_ratio;
  let threeDrect89H = imgDrwPrps.height * yellow_ratio;

  //固定的灰色矩形
  let threeDrect106X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.165;
  let threeDrect106Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.285;
  let threeDrect106W = imgDrwPrps.width * 0.03;
  let threeDrect106H = imgDrwPrps.height * 0.03;

  let threeDrect107X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.17;
  let threeDrect107Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.39;
  let threeDrect107W = imgDrwPrps.width * 0.025;
  let threeDrect107H = imgDrwPrps.height * 0.025;

  let threeDrect108X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.170;
  let threeDrect108Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.795;
  let threeDrect108W = imgDrwPrps.width * 0.03;
  let threeDrect108H = imgDrwPrps.height * 0.025;



  //移动的灰色矩形
  let threeDrect115X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.407;
  let randomthreeDRect5 = 0;
  let threeDrect115Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomthreeDRect5;
  let threeDrect115W = imgDrwPrps.width * 0.07;
  let threeDrect115H = imgDrwPrps.height * 0.055;

  let randomthreeDRect6 = 0;
  let threeDrect116X = imgDrwPrps.xOffset + imgDrwPrps.width * randomthreeDRect6;
  let randomthreeDRect7 = 0;
  let threeDrect116Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomthreeDRect7;
  let randomthreeDRect8 = 0;
  let threeDrect116W = imgDrwPrps.width * randomthreeDRect8;
  let randomthreeDRect9 = 0;
  let threeDrect116H = imgDrwPrps.height * randomthreeDRect9;

  //固定的红色矩形
  let threeDrect90X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.155;
  let threeDrect90Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.044;
  let threeDrect90W = imgDrwPrps.width * 0.045;
  let threeDrect90H = imgDrwPrps.height * 0.116;

  let threeDrect91X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let threeDrect91Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.495;
  let threeDrect91W = imgDrwPrps.width * 0.09;
  let threeDrect91H = imgDrwPrps.height * 0.065;

  let threeDrect92X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let threeDrect92Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.765;
  let threeDrect92W = imgDrwPrps.width * 0.06;
  let threeDrect92H = imgDrwPrps.height * 0.04;

  let threeDrect93X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.697;
  let threeDrect93Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.450;
  let threeDrect93W = imgDrwPrps.width * 0.085;
  let threeDrect93H = imgDrwPrps.height * 0.11;

  let threeDrect95X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.652;
  let threeDrect95Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.23;
  let threeDrect95W = imgDrwPrps.width * 0.09;
  let threeDrect95H = imgDrwPrps.height * 0.08;

  let threeDrect109X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let threeDrect109Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.780;
  let threeDrect109W = imgDrwPrps.width * 0.09;
  let threeDrect109H = imgDrwPrps.height * 0.07;

  //移动的红色矩形
  let threeDrect120X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let randomthreeDRect11 = 0;
  let threeDrect120Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomthreeDRect11;
  let threeDrect120W = imgDrwPrps.width * 0.065;
  let threeDrect120H = imgDrwPrps.height * 0.06;

  let randomthreeDRect12 = 0;
  let threeDrect121X = imgDrwPrps.xOffset + imgDrwPrps.width * randomthreeDRect12;
  let threeDrect121Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.94;
  let threeDrect121W = imgDrwPrps.width * 0.065;
  let threeDrect121H = imgDrwPrps.height * 0.06;

  //固定的蓝色矩形
  let threeDrect94X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.652;
  let threeDrect94Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.180;
  let threeDrect94W = imgDrwPrps.width * 0.09;
  let threeDrect94H = imgDrwPrps.height * 0.170;

  let threeDrect96X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.285;
  let threeDrect96Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.475;
  let threeDrect96W = imgDrwPrps.width * 0.065;
  let threeDrect96H = imgDrwPrps.height * 0.085;

  let threeDrect97X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let threeDrect97Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.665;
  let threeDrect97W = imgDrwPrps.width * 0.06;
  let threeDrect97H = imgDrwPrps.height * 0.065;

  //移动的蓝色矩形
  let threeDrect111X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.08;
  let randomthreeDRect2 = 0;
  let threeDrect111Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomthreeDRect2;
  let threeDrect111W = imgDrwPrps.width * 0.055;
  let threeDrect111H = imgDrwPrps.height * 0.055;

  let threeDrect113X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.897;
  let randomthreeDRect3 = 0;
  let threeDrect113Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomthreeDRect3;
  let threeDrect113W = imgDrwPrps.width * 0.065;
  let threeDrect113H = imgDrwPrps.height * 0.035;

  let randomthreeDRect4 = 0;
  let threeDrect114X = imgDrwPrps.xOffset + imgDrwPrps.width * randomthreeDRect4;
  let threeDrect114Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.67;
  let threeDrect114W = imgDrwPrps.width * 0.055;
  let threeDrect114H = imgDrwPrps.height * 0.055;

  //固定的黄色矩形
  let threeDrect98X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let threeDrect98Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.265;
  let threeDrect98W = imgDrwPrps.width * 0.09;
  let threeDrect98H = imgDrwPrps.height * 0.06;
  
  let threeDrect99X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.155;
  let threeDrect99Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.370;
  let threeDrect99W = imgDrwPrps.width * 0.046;
  let threeDrect99H = imgDrwPrps.height * 0.06;

  let threeDrect100X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.285;
  let threeDrect100Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.45;
  let threeDrect100W = imgDrwPrps.width * 0.065;
  let threeDrect100H = imgDrwPrps.height * 0.025;

  let threeDrect101X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.407;
  let threeDrect101Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.370;
  let threeDrect101W = imgDrwPrps.width * 0.07;
  let threeDrect101H = imgDrwPrps.height * 0.19;

  let threeDrect102X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let threeDrect102Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.48;
  let threeDrect102W = imgDrwPrps.width * 0.1;
  let threeDrect102H = imgDrwPrps.height * 0.05;

  let threeDrect103X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let threeDrect103Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.72;
  let threeDrect103W = imgDrwPrps.width * 0.06;
  let threeDrect103H = imgDrwPrps.height * 0.045;

  let threeDrect104X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.682;
  let threeDrect104Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.260;
  let threeDrect104W = imgDrwPrps.width * 0.045;
  let threeDrect104H = imgDrwPrps.height * 0.035;

  let threeDrect105X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.295;
  let threeDrect105Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.5;
  let threeDrect105W = imgDrwPrps.width * 0.045;
  let threeDrect105H = imgDrwPrps.height * 0.035;
  
  //移动的黄色矩形
  let threeDrect110X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let randomthreeDRect1 = 0;
  let threeDrect110Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomthreeDRect1;
  let threeDrect110W = imgDrwPrps.width * 0.09;
  let threeDrect110H = imgDrwPrps.height * 0.03;

  //组合矩形移动
  let randomthreeDRect10 = 0;
  let threeDrect117X = imgDrwPrps.xOffset + imgDrwPrps.width * randomthreeDRect10;
  let threeDrect117Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.044;
  let threeDrect117W = imgDrwPrps.width * 0.07;
  let threeDrect117H = imgDrwPrps.height * 0.085;

  let threeDrect118X = imgDrwPrps.xOffset + imgDrwPrps.width * randomthreeDRect10;
  let threeDrect118Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.129;
  let threeDrect118W = imgDrwPrps.width * 0.07;
  let threeDrect118H = imgDrwPrps.height * 0.031;

  let threeDrect119X = imgDrwPrps.xOffset + imgDrwPrps.width * (randomthreeDRect10 + 0.015);
  let threeDrect119Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.069;
  let threeDrect119W = imgDrwPrps.width * 0.04;
  let threeDrect119H = imgDrwPrps.height * 0.035;

  // 绘制色块
  fill(75, 107, 186); // 蓝色，图层
  threeDrectb(threeDrect113X, threeDrect113Y, threeDrect113W, threeDrect113H);

  fill(230, 207, 48); // 黄色
  //横着的固定黄色矩形线条
  threeDrecty(threeDrect1X, threeDrect1Y, threeDrect1W, threeDrect1H);
  threeDrecty(threeDrect2X, threeDrect2Y, threeDrect2W, threeDrect2H);
  threeDrecty(threeDrect3X, threeDrect3Y, threeDrect3W, threeDrect3H);
  threeDrecty(threeDrect4X, threeDrect4Y, threeDrect4W, threeDrect4H);
  threeDrecty(threeDrect5X, threeDrect5Y, threeDrect5W, threeDrect5H);
  threeDrecty(threeDrect6X, threeDrect6Y, threeDrect6W, threeDrect6H);
  threeDrecty(threeDrect7X, threeDrect7Y, threeDrect7W, threeDrect7H);
  threeDrecty(threeDrect8X, threeDrect8Y, threeDrect8W, threeDrect8H);
  threeDrecty(threeDrect9X, threeDrect9Y, threeDrect9W, threeDrect9H);
  threeDrecty(threeDrect10X, threeDrect10Y, threeDrect10W, threeDrect10H);
  threeDrecty(threeDrect11X, threeDrect11Y, threeDrect11W, threeDrect11H);
  threeDrecty(threeDrect12X, threeDrect12Y, threeDrect12W, threeDrect12H);
  threeDrecty(threeDrect13X, threeDrect13Y, threeDrect13W, threeDrect13H);
  //竖着的固定黄色矩形线条
  threeDrecty(threeDrect14X, threeDrect14Y, threeDrect14W, threeDrect14H);
  threeDrecty(threeDrect15X, threeDrect15Y, threeDrect15W, threeDrect15H);
  threeDrecty(threeDrect16X, threeDrect16Y, threeDrect16W, threeDrect16H);
  threeDrecty(threeDrect17X, threeDrect17Y, threeDrect17W, threeDrect17H);
  threeDrecty(threeDrect18X, threeDrect18Y, threeDrect18W, threeDrect18H);
  threeDrecty(threeDrect19X, threeDrect19Y, threeDrect19W, threeDrect19H);
  threeDrecty(threeDrect20X, threeDrect20Y, threeDrect20W, threeDrect20H);
  threeDrecty(threeDrect21X, threeDrect21Y, threeDrect21W, threeDrect21H);
  threeDrecty(threeDrect22X, threeDrect22Y, threeDrect22W, threeDrect22H);
  threeDrecty(threeDrect23X, threeDrect23Y, threeDrect23W, threeDrect23H);
  threeDrecty(threeDrect24X, threeDrect24Y, threeDrect24W, threeDrect24H);
  threeDrecty(threeDrect25X, threeDrect25Y, threeDrect25W, threeDrect25H);

  //固定的黄色矩形
  threeDrecty(threeDrect98X, threeDrect98Y, threeDrect98W, threeDrect98H);
  threeDrecty(threeDrect99X, threeDrect99Y, threeDrect99W, threeDrect99H);
  threeDrecty(threeDrect100X, threeDrect100Y, threeDrect100W, threeDrect100H);
  threeDrecty(threeDrect101X, threeDrect101Y, threeDrect101W, threeDrect101H);
  threeDrecty(threeDrect102X, threeDrect102Y, threeDrect102W, threeDrect102H);
  threeDrecty(threeDrect103X, threeDrect103Y, threeDrect103W, threeDrect103H);

  fill(173, 58, 47); // 红色
  //第二行两个个
  threeDrectr(threeDrect53X, threeDrect53Y, threeDrect53W, threeDrect53H);
  threeDrectr(threeDrect54X, threeDrect54Y, threeDrect54W, threeDrect54H);

  //第三行三个
  threeDrectr(threeDrect55X, threeDrect55Y, threeDrect55W, threeDrect55H);
  threeDrectr(threeDrect56X, threeDrect56Y, threeDrect56W, threeDrect56H);
  threeDrectr(threeDrect57X, threeDrect57Y, threeDrect57W, threeDrect57H);

  //第四行四个
  threeDrectr(threeDrect58X, threeDrect58Y, threeDrect58W, threeDrect58H);
  threeDrectr(threeDrect59X, threeDrect59Y, threeDrect59W, threeDrect59H);
  threeDrectr(threeDrect60X, threeDrect60Y, threeDrect60W, threeDrect60H);
  threeDrectr(threeDrect61X, threeDrect61Y, threeDrect61W, threeDrect61H);

  //第五行三个
  threeDrectr(threeDrect62X, threeDrect62Y, threeDrect62W, threeDrect62H);
  threeDrectr(threeDrect63X, threeDrect63Y, threeDrect63W, threeDrect63H);
  threeDrectr(threeDrect64X, threeDrect64Y, threeDrect64W, threeDrect64H);

  //第六行三个
  threeDrectr(threeDrect65X, threeDrect65Y, threeDrect65W, threeDrect65H);
  threeDrectr(threeDrect66X, threeDrect66Y, threeDrect66W, threeDrect66H);
  threeDrectr(threeDrect67X, threeDrect67Y, threeDrect67W, threeDrect67H);

  //第六行三个
  threeDrectr(threeDrect68X, threeDrect68Y, threeDrect68W, threeDrect68H);

  //第七行两个
  threeDrectr(threeDrect69X, threeDrect69Y, threeDrect69W, threeDrect69H);
  threeDrectr(threeDrect70X, threeDrect70Y, threeDrect70W, threeDrect70H);

  //第七行一个
  threeDrectr(threeDrect71X, threeDrect71Y, threeDrect71W, threeDrect71H);

  //第十行三个
  threeDrectr(threeDrect72X, threeDrect72Y, threeDrect72W, threeDrect72H);
  threeDrectr(threeDrect73X, threeDrect73Y, threeDrect73W, threeDrect73H);
  threeDrectr(threeDrect74X, threeDrect74Y, threeDrect74W, threeDrect74H);

  //第十三行两个
  threeDrectr(threeDrect75X, threeDrect75Y, threeDrect75W, threeDrect75H);
  threeDrectr(threeDrect76X, threeDrect76Y, threeDrect76W, threeDrect76H);

  //固定的红色矩形
  threeDrectr(threeDrect90X, threeDrect90Y, threeDrect90W, threeDrect90H);
  threeDrectr(threeDrect91X, threeDrect91Y, threeDrect91W, threeDrect91H);
  threeDrectr(threeDrect92X, threeDrect92Y, threeDrect92W, threeDrect92H);
  threeDrectr(threeDrect93X, threeDrect93Y, threeDrect93W, threeDrect93H);
  threeDrectr(threeDrect109X, threeDrect109Y, threeDrect109W, threeDrect109H);

  //移动的红色矩形
  threeDrectr(threeDrect117X, threeDrect117Y, threeDrect117W, threeDrect117H);
  threeDrectr(threeDrect120X, threeDrect120Y, threeDrect120W, threeDrect120H);
  threeDrectr(threeDrect121X, threeDrect121Y, threeDrect121W, threeDrect121H);

  //移动的红色小矩形
  for (let i = 0; i < 2; i++) {
    let randX = threeDrect1X 
    let randY = threeDrect1Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect2X 
    let randY = threeDrect2Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect3X 
    let randY = threeDrect3Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect4X 
    let randY = threeDrect4Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect5X 
    let randY = threeDrect5Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect6X 
    let randY = threeDrect6Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect12X
    let randY = threeDrect12Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect11X
    let randY = threeDrect11Y
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect17X
    let randY = threeDrect17Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectr(randX, randY, randW, randH);
  }

  fill(75, 107, 186); // 蓝色
  //第一行三个
  threeDrectb(threeDrect26X, threeDrect26Y, threeDrect26W, threeDrect26H);
  threeDrectb(threeDrect27X, threeDrect27Y, threeDrect27W, threeDrect27H);
  threeDrectb(threeDrect28X, threeDrect28Y, threeDrect28W, threeDrect28H);
  //第二行四个
  threeDrectb(threeDrect29X, threeDrect29Y, threeDrect29W, threeDrect29H);
  threeDrectb(threeDrect30X, threeDrect30Y, threeDrect30W, threeDrect30H);
  threeDrectb(threeDrect31X, threeDrect31Y, threeDrect31W, threeDrect31H);
  threeDrectb(threeDrect32X, threeDrect32Y, threeDrect32W, threeDrect32H);
  //第三行四个
  threeDrectb(threeDrect33X, threeDrect33Y, threeDrect33W, threeDrect33H);
  threeDrectb(threeDrect34X, threeDrect34Y, threeDrect34W, threeDrect34H);
  threeDrectb(threeDrect35X, threeDrect35Y, threeDrect35W, threeDrect35H);
  threeDrectb(threeDrect36X, threeDrect36Y, threeDrect36W, threeDrect36H);

  //第四行两个
  threeDrectb(threeDrect37X, threeDrect37Y, threeDrect37W, threeDrect37H);
  threeDrectb(threeDrect38X, threeDrect38Y, threeDrect38W, threeDrect38H);

  //第五行三个
  threeDrectb(threeDrect39X, threeDrect39Y, threeDrect39W, threeDrect39H);
  threeDrectb(threeDrect40X, threeDrect40Y, threeDrect40W, threeDrect40H);
  threeDrectb(threeDrect41X, threeDrect41Y, threeDrect41W, threeDrect41H);

  //第六行两个
  threeDrectb(threeDrect42X, threeDrect42Y, threeDrect42W, threeDrect42H);
  threeDrectb(threeDrect43X, threeDrect43Y, threeDrect43W, threeDrect43H);

  //第八行一个
  threeDrectb(threeDrect44X, threeDrect44Y, threeDrect44W, threeDrect44H);

  //第十行一个
  threeDrectb(threeDrect45X, threeDrect45Y, threeDrect45W, threeDrect45H);

  //第十一行四个
  threeDrectb(threeDrect46X, threeDrect46Y, threeDrect46W, threeDrect46H);
  threeDrectb(threeDrect47X, threeDrect47Y, threeDrect47W, threeDrect47H);
  threeDrectb(threeDrect48X, threeDrect48Y, threeDrect48W, threeDrect48H);
  threeDrectb(threeDrect49X, threeDrect49Y, threeDrect49W, threeDrect49H);

  //第十三行三个
  threeDrectb(threeDrect50X, threeDrect50Y, threeDrect50W, threeDrect50H);
  threeDrectb(threeDrect51X, threeDrect51Y, threeDrect51W, threeDrect51H);
  threeDrectb(threeDrect52X, threeDrect52Y, threeDrect52W, threeDrect52H);

  //固定的蓝色矩形
  threeDrectb(threeDrect94X, threeDrect94Y, threeDrect94W, threeDrect94H);
  threeDrectb(threeDrect96X, threeDrect96Y, threeDrect96W, threeDrect96H);
  threeDrectb(threeDrect97X, threeDrect97Y, threeDrect97W, threeDrect97H);

  //移动的蓝色矩形
  threeDrectb(threeDrect111X, threeDrect111Y, threeDrect111W, threeDrect111H);
  
  //移动的蓝色小矩形
  for (let i = 0; i < 3; i++) {
    let randX = threeDrect1X
    let randY = threeDrect1Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectb(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect4X 
    let randY = threeDrect4Y
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectb(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect6X 
    let randY = threeDrect6Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectb(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect9X
    let randY = threeDrect9Y
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectb(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect19X 
    let randY = threeDrect19Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectb(randX, randY, randW, randH);
  }


  
  fill(173, 58, 47); // 红色，图层转换
  threeDrectr(threeDrect95X, threeDrect95Y, threeDrect95W, threeDrect95H);

  fill(219, 217, 213); // 灰色
  //第一行一个
  threeDrectg(threeDrect77X, threeDrect77Y, threeDrect77W, threeDrect77H);

  //第三行三个
  threeDrectg(threeDrect78X, threeDrect78Y, threeDrect78W, threeDrect78H);
  threeDrectg(threeDrect79X, threeDrect79Y, threeDrect79W, threeDrect79H);
  threeDrectg(threeDrect80X, threeDrect80Y, threeDrect80W, threeDrect80H);

  //第四行两个
  threeDrectg(threeDrect81X, threeDrect81Y, threeDrect81W, threeDrect81H);
  threeDrectg(threeDrect82X, threeDrect82Y, threeDrect82W, threeDrect82H);

  //第五行两个
  threeDrectg(threeDrect83X, threeDrect83Y, threeDrect83W, threeDrect83H);
  threeDrectg(threeDrect84X, threeDrect84Y, threeDrect84W, threeDrect84H);

  //第六行两个
  threeDrectg(threeDrect85X, threeDrect85Y, threeDrect85W, threeDrect85H);
  threeDrectg(threeDrect86X, threeDrect86Y, threeDrect86W, threeDrect86H);

  //第八行一个
  threeDrectg(threeDrect87X, threeDrect87Y, threeDrect87W, threeDrect87H);

  //第十三行两个
  threeDrectg(threeDrect88X, threeDrect88Y, threeDrect88W, threeDrect88H);
  threeDrectg(threeDrect89X, threeDrect89Y, threeDrect89W, threeDrect89H);
  
  //固定的灰色矩形
  threeDrectg(threeDrect106X, threeDrect106Y, threeDrect106W, threeDrect106H);
  threeDrectg(threeDrect107X, threeDrect107Y, threeDrect107W, threeDrect107H);
  threeDrectg(threeDrect108X, threeDrect108Y, threeDrect108W, threeDrect108H);

  //移动的灰色矩形
  threeDrectg(threeDrect115X, threeDrect115Y, threeDrect115W, threeDrect115H);
  threeDrectg(threeDrect116X, threeDrect116Y, threeDrect116W, threeDrect116H);
  threeDrectg(threeDrect118X, threeDrect118Y, threeDrect118W, threeDrect118H);
  threeDrectg(threeDrect119X, threeDrect119Y, threeDrect119W, threeDrect119H);
  
  //移动的灰色小正方形
  for (let i = 0; i < 3; i++) {
    let randX = threeDrect1X 
    let randY = threeDrect1Y
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectg(randX, randY, randW, randH);
  }

  for (let i = 0; i < 3; i++) {
    let randX = threeDrect2X
    let randY = threeDrect2Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectg(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect2X
    let randY = threeDrect2Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectg(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect3X 
    let randY = threeDrect3Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectg(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect9X 
    let randY = threeDrect9Y 
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectg(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect15X 
    let randY = threeDrect15Y
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectg(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = threeDrect18X 
    let randY = threeDrect18Y
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectg(randX, randY, randW, randH);
  }

  for (let i = 0; i < 1; i++) {
    let randX = threeDrect19X 
    let randY = threeDrect19Y
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    threeDrectg(randX, randY, randW, randH);
  }



  fill(230, 207, 48); // 黄色,图层转换
  //固定的黄色矩形
  threeDrect(threeDrect104X, threeDrect104Y, threeDrect104W, threeDrect104H);
  threeDrect(threeDrect105X, threeDrect105Y, threeDrect105W, threeDrect105H);

  //移动的黄色矩形
  threeDrect(threeDrect110X, threeDrect110Y, threeDrect110W, threeDrect110H);

  fill(75, 107, 186); // 蓝色，图层转换
  threeDrect(threeDrect114X, threeDrect114Y, threeDrect114W, threeDrect114H);

  
}



//========================================================================
// =========================================================================
// =========================================================================
// ===============================2D view========================================
// =========================================================================
// =========================================================================

function artwork() {


  noStroke(); 
  translate(-windowWidth/2, -windowHeight/2)

  // 计算相对位置和大小
  // Y轴开始从上到下的黄色线条矩形
  let rect1X = imgDrwPrps.xOffset;
  let rect1Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect1W = imgDrwPrps.width;
  let rect1H = imgDrwPrps.height * yellow_ratio;

  let rect2X = imgDrwPrps.xOffset;
  let rect2Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.16;
  let rect2W = imgDrwPrps.width;
  let rect2H = imgDrwPrps.height * yellow_ratio;

  let rect3X = imgDrwPrps.xOffset;
  let rect3Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.35;
  let rect3W = imgDrwPrps.width;
  let rect3H = imgDrwPrps.height * yellow_ratio;

  let rect4X = imgDrwPrps.xOffset;
  let rect4Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.43;
  let rect4W = imgDrwPrps.width;
  let rect4H = imgDrwPrps.height * yellow_ratio;

  let rect5X = imgDrwPrps.xOffset;
  let rect5Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.56;
  let rect5W = imgDrwPrps.width;
  let rect5H = imgDrwPrps.height * yellow_ratio;

  let rect6X = imgDrwPrps.xOffset;
  let rect6Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect6W = imgDrwPrps.width;
  let rect6H = imgDrwPrps.height * yellow_ratio;

  let rect7X = imgDrwPrps.xOffset;
  let rect7Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.685;
  let rect7W = imgDrwPrps.width * 0.06;
  let rect7H = imgDrwPrps.height * yellow_ratio;

  let rect8X = imgDrwPrps.xOffset;
  let rect8Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.775;
  let rect8W = imgDrwPrps.width * 0.06;
  let rect8H = imgDrwPrps.height * yellow_ratio;

  let rect9X = imgDrwPrps.xOffset;
  let rect9Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.85;
  let rect9W = imgDrwPrps.width;
  let rect9H = imgDrwPrps.height * yellow_ratio;

  let rect10X = imgDrwPrps.xOffset;
  let rect10Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.885;
  let rect10W = imgDrwPrps.width * 0.06;
  let rect10H = imgDrwPrps.height * yellow_ratio;

  let rect11X = imgDrwPrps.xOffset;
  let rect11Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect11W = imgDrwPrps.width;
  let rect11H = imgDrwPrps.height * yellow_ratio;

  let rect12X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.08;
  let rect12Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect12W = imgDrwPrps.width * 0.457;
  let rect12H = imgDrwPrps.height * yellow_ratio;

  let rect13X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect13Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.805;
  let rect13W = imgDrwPrps.width * 0.1;
  let rect13H = imgDrwPrps.height * yellow_ratio;

  

  // X轴上从左到右的黄色线条矩形
  let rect14X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let rect14Y = imgDrwPrps.yOffset;
  let rect14W = imgDrwPrps.width * yellow_ratio;
  let rect14H = imgDrwPrps.height * 0.35;

  let rect15X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect15Y = imgDrwPrps.yOffset;
  let rect15W = imgDrwPrps.width * yellow_ratio;
  let rect15H = imgDrwPrps.height;

  let rect16X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect16Y = imgDrwPrps.yOffset;
  let rect16W = imgDrwPrps.width * yellow_ratio;
  let rect16H = imgDrwPrps.height * 0.96;

  let rect17X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect17Y = imgDrwPrps.yOffset;
  let rect17W = imgDrwPrps.width * yellow_ratio;
  let rect17H = imgDrwPrps.height;

  let rect18X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect18Y = imgDrwPrps.yOffset;
  let rect18W = imgDrwPrps.width * yellow_ratio;
  let rect18H = imgDrwPrps.height;

  let rect19X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect19Y = imgDrwPrps.yOffset;
  let rect19W = imgDrwPrps.width * yellow_ratio;
  let rect19H = imgDrwPrps.height;

  let rect20X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect20Y = imgDrwPrps.yOffset;
  let rect20W = imgDrwPrps.width * yellow_ratio;
  let rect20H = imgDrwPrps.height;

  let rect21X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let rect21Y = imgDrwPrps.yOffset;
  let rect21W = imgDrwPrps.width * yellow_ratio;
  let rect21H = imgDrwPrps.height * 0.35;

  let rect22X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect22Y = imgDrwPrps.yOffset;
  let rect22W = imgDrwPrps.width * yellow_ratio;
  let rect22H = imgDrwPrps.height * 0.430;

  let rect23X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect23Y = imgDrwPrps.yOffset;
  let rect23W = imgDrwPrps.width * yellow_ratio;
  let rect23H = imgDrwPrps.height;

  let rect24X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.647;
  let rect24Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.450;
  let rect24W = imgDrwPrps.width * yellow_ratio;
  let rect24H = imgDrwPrps.height * 0.175;

  let rect25X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect25Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.645;
  let rect25W = imgDrwPrps.width * yellow_ratio;
  let rect25H = imgDrwPrps.height * 0.160;

  //固定的交叉处的正方形蓝色方块
  //第一行三个
  let rect26X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let rect26Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect26W = imgDrwPrps.width * yellow_ratio;
  let rect26H = imgDrwPrps.height * yellow_ratio;

  let rect27X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect27Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect27W = imgDrwPrps.width * yellow_ratio;
  let rect27H = imgDrwPrps.height * yellow_ratio;

  let rect28X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect28Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect28W = imgDrwPrps.width * yellow_ratio;
  let rect28H = imgDrwPrps.height * yellow_ratio;

  //第二行四个
  let rect29X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect29Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect29W = imgDrwPrps.width * yellow_ratio;
  let rect29H = imgDrwPrps.height * yellow_ratio;

  let rect30X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect30Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect30W = imgDrwPrps.width * yellow_ratio;
  let rect30H = imgDrwPrps.height * yellow_ratio;

  let rect31X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect31Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect31W = imgDrwPrps.width * yellow_ratio;
  let rect31H = imgDrwPrps.height * yellow_ratio;

  let rect32X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect32Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect32W = imgDrwPrps.width * yellow_ratio;
  let rect32H = imgDrwPrps.height * yellow_ratio;

  //第三行四个
  let rect33X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect33Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect33W = imgDrwPrps.width * yellow_ratio;
  let rect33H = imgDrwPrps.height * yellow_ratio;

  let rect34X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect34Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect34W = imgDrwPrps.width * yellow_ratio;
  let rect34H = imgDrwPrps.height * yellow_ratio;

  let rect35X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect35Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect35W = imgDrwPrps.width * yellow_ratio;
  let rect35H = imgDrwPrps.height * yellow_ratio;

  let rect36X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect36Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect36W = imgDrwPrps.width * yellow_ratio;
  let rect36H = imgDrwPrps.height * yellow_ratio;

  //第四行两个
  let rect37X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect37Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect37W = imgDrwPrps.width * yellow_ratio;
  let rect37H = imgDrwPrps.height * yellow_ratio;

  let rect38X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect38Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect38W = imgDrwPrps.width * yellow_ratio;
  let rect38H = imgDrwPrps.height * yellow_ratio;

  //第五行三个
  let rect39X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect39Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect39W = imgDrwPrps.width * yellow_ratio;
  let rect39H = imgDrwPrps.height * yellow_ratio;

  let rect40X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect40Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect40W = imgDrwPrps.width * yellow_ratio;
  let rect40H = imgDrwPrps.height * yellow_ratio;

  let rect41X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect41Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect41W = imgDrwPrps.width * yellow_ratio;
  let rect41H = imgDrwPrps.height * yellow_ratio;

  //第六行两个
  let rect42X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect42Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect42W = imgDrwPrps.width * yellow_ratio;
  let rect42H = imgDrwPrps.height * yellow_ratio;

  let rect43X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect43Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect43W = imgDrwPrps.width * yellow_ratio;
  let rect43H = imgDrwPrps.height * yellow_ratio;

  //第八行一个
  let rect44X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect44Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect44W = imgDrwPrps.width * yellow_ratio;
  let rect44H = imgDrwPrps.height * yellow_ratio;
  
  //第十行一个
  let rect45X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect45Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.805;
  let rect45W = imgDrwPrps.width * yellow_ratio;
  let rect45H = imgDrwPrps.height * yellow_ratio;

  //第十一行四个
  let rect46X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect46Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect46W = imgDrwPrps.width * yellow_ratio;
  let rect46H = imgDrwPrps.height * yellow_ratio;
  
  let rect47X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect47Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect47W = imgDrwPrps.width * yellow_ratio;
  let rect47H = imgDrwPrps.height * yellow_ratio;
  
  let rect48X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect48Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect48W = imgDrwPrps.width * yellow_ratio;
  let rect48H = imgDrwPrps.height * yellow_ratio;

  let rect49X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect49Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect49W = imgDrwPrps.width * yellow_ratio;
  let rect49H = imgDrwPrps.height * yellow_ratio;

  //第十三行三个
  let rect50X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect50Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect50W = imgDrwPrps.width * yellow_ratio;
  let rect50H = imgDrwPrps.height * yellow_ratio;
  
  let rect51X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect51Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect51W = imgDrwPrps.width * yellow_ratio;
  let rect51H = imgDrwPrps.height * yellow_ratio;

  let rect52X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect52Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect52W = imgDrwPrps.width * yellow_ratio;
  let rect52H = imgDrwPrps.height * yellow_ratio;


  //固定的交叉处的正方形红色方块
  //第二行两个个
  let rect53X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let rect53Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect53W = imgDrwPrps.width * yellow_ratio;
  let rect53H = imgDrwPrps.height * yellow_ratio;
  
  let rect54X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect54Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect54W = imgDrwPrps.width * yellow_ratio;
  let rect54H = imgDrwPrps.height * yellow_ratio;

  //第三行三个
  let rect55X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let rect55Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect55W = imgDrwPrps.width * yellow_ratio;
  let rect55H = imgDrwPrps.height * yellow_ratio;

  let rect56X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect56Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect56W = imgDrwPrps.width * yellow_ratio;
  let rect56H = imgDrwPrps.height * yellow_ratio;

  let rect57X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let rect57Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect57W = imgDrwPrps.width * yellow_ratio;
  let rect57H = imgDrwPrps.height * yellow_ratio;

  //第四行四个
  let rect58X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect58Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect58W = imgDrwPrps.width * yellow_ratio;
  let rect58H = imgDrwPrps.height * yellow_ratio;

  let rect59X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect59Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect59W = imgDrwPrps.width * yellow_ratio;
  let rect59H = imgDrwPrps.height * yellow_ratio;

  let rect60X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect60Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect60W = imgDrwPrps.width * yellow_ratio;
  let rect60H = imgDrwPrps.height * yellow_ratio;

  let rect61X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect61Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect61W = imgDrwPrps.width * yellow_ratio;
  let rect61H = imgDrwPrps.height * yellow_ratio;

  //第五行三个
  let rect62X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.647;
  let rect62Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect62W = imgDrwPrps.width * yellow_ratio;
  let rect62H = imgDrwPrps.height * yellow_ratio;
  
  let rect63X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect63Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect63W = imgDrwPrps.width * yellow_ratio;
  let rect63H = imgDrwPrps.height * yellow_ratio;
  
  let rect64X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect64Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect64W = imgDrwPrps.width * yellow_ratio;
  let rect64H = imgDrwPrps.height * yellow_ratio;

  //第六行三个
  let rect65X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect65Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect65W = imgDrwPrps.width * yellow_ratio;
  let rect65H = imgDrwPrps.height * yellow_ratio;
  
  let rect66X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect66Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect66W = imgDrwPrps.width * yellow_ratio;
  let rect66H = imgDrwPrps.height * yellow_ratio;
  
  let rect67X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect67Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect67W = imgDrwPrps.width * yellow_ratio;
  let rect67H = imgDrwPrps.height * yellow_ratio;

  //第七行一个
  let rect68X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect68Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.685;
  let rect68W = imgDrwPrps.width * yellow_ratio;
  let rect68H = imgDrwPrps.height * yellow_ratio;

  //第八行两个
  let rect69X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect69Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect69W = imgDrwPrps.width * yellow_ratio;
  let rect69H = imgDrwPrps.height * yellow_ratio;

  let rect70X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect70Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect70W = imgDrwPrps.width * yellow_ratio;
  let rect70H = imgDrwPrps.height * yellow_ratio;

  //第九行一个
  let rect71X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect71Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.775;
  let rect71W = imgDrwPrps.width * yellow_ratio;
  let rect71H = imgDrwPrps.height * yellow_ratio;

  //第十行三个
  let rect72X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect72Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect72W = imgDrwPrps.width * yellow_ratio;
  let rect72H = imgDrwPrps.height * yellow_ratio;
  
  let rect73X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect73Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect73W = imgDrwPrps.width * yellow_ratio;
  let rect73H = imgDrwPrps.height * yellow_ratio;

  let rect74X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect74Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect74W = imgDrwPrps.width * yellow_ratio;
  let rect74H = imgDrwPrps.height * yellow_ratio;

  //第十三行两个
  let rect75X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect75Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect75W = imgDrwPrps.width * yellow_ratio;
  let rect75H = imgDrwPrps.height * yellow_ratio;

  let rect76X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect76Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect76W = imgDrwPrps.width * yellow_ratio;
  let rect76H = imgDrwPrps.height * yellow_ratio;

  //固定的交叉处的正方形灰色方块
  //第一行一个
  let rect77X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let rect77Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect77W = imgDrwPrps.width * yellow_ratio;
  let rect77H = imgDrwPrps.height * yellow_ratio;

  //第三行三个
  let rect78X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect78Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect78W = imgDrwPrps.width * yellow_ratio;
  let rect78H = imgDrwPrps.height * yellow_ratio;

  let rect79X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect79Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect79W = imgDrwPrps.width * yellow_ratio;
  let rect79H = imgDrwPrps.height * yellow_ratio;

  let rect80X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect80Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect80W = imgDrwPrps.width * yellow_ratio;
  let rect80H = imgDrwPrps.height * yellow_ratio;
  
  //第四行两个
  let rect81X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect81Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect81W = imgDrwPrps.width * yellow_ratio;
  let rect81H = imgDrwPrps.height * yellow_ratio;

  let rect82X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect82Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect82W = imgDrwPrps.width * yellow_ratio;
  let rect82H = imgDrwPrps.height * yellow_ratio;

  //第五行两个
  let rect83X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect83Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect83W = imgDrwPrps.width * yellow_ratio;
  let rect83H = imgDrwPrps.height * yellow_ratio;

  let rect84X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect84Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect84W = imgDrwPrps.width * yellow_ratio;
  let rect84H = imgDrwPrps.height * yellow_ratio;

  //第六行两个
  let rect85X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect85Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect85W = imgDrwPrps.width * yellow_ratio;
  let rect85H = imgDrwPrps.height * yellow_ratio;

  let rect86X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect86Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect86W = imgDrwPrps.width * yellow_ratio;
  let rect86H = imgDrwPrps.height * yellow_ratio;

  //第七行一个
  let rect87X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect87Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect87W = imgDrwPrps.width * yellow_ratio;
  let rect87H = imgDrwPrps.height * yellow_ratio;

  //第十三行两个
  let rect88X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect88Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect88W = imgDrwPrps.width * yellow_ratio;
  let rect88H = imgDrwPrps.height * yellow_ratio;

  let rect89X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect89Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect89W = imgDrwPrps.width * yellow_ratio;
  let rect89H = imgDrwPrps.height * yellow_ratio;

  //固定的灰色矩形
  let rect106X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.165;
  let rect106Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.285;
  let rect106W = imgDrwPrps.width * 0.03;
  let rect106H = imgDrwPrps.height * 0.03;

  let rect107X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.17;
  let rect107Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.39;
  let rect107W = imgDrwPrps.width * 0.025;
  let rect107H = imgDrwPrps.height * 0.025;

  let rect108X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.170;
  let rect108Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.795;
  let rect108W = imgDrwPrps.width * 0.03;
  let rect108H = imgDrwPrps.height * 0.025;



  //移动的灰色矩形
  let rect115X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.407;
  let randomRect5 = random(0.37, 0.505);
  let rect115Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect5;
  let rect115W = imgDrwPrps.width * 0.07;
  let rect115H = imgDrwPrps.height * 0.055;

  let randomRect6 = random(0.71, 0.73);
  let rect116X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect6;
  let randomRect7 = random(0.48, 0.51);
  let rect116Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect7;
  let randomRect8 = random(0.025, 0.04);
  let rect116W = imgDrwPrps.width * randomRect8;
  let randomRect9 = random(0.025, 0.05);
  let rect116H = imgDrwPrps.height * randomRect9;

  //固定的红色矩形
  let rect90X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.155;
  let rect90Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.044;
  let rect90W = imgDrwPrps.width * 0.045;
  let rect90H = imgDrwPrps.height * 0.116;

  let rect91X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let rect91Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.495;
  let rect91W = imgDrwPrps.width * 0.09;
  let rect91H = imgDrwPrps.height * 0.065;

  let rect92X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect92Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.765;
  let rect92W = imgDrwPrps.width * 0.06;
  let rect92H = imgDrwPrps.height * 0.04;

  let rect93X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.697;
  let rect93Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.450;
  let rect93W = imgDrwPrps.width * 0.085;
  let rect93H = imgDrwPrps.height * 0.11;

  let rect95X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.652;
  let rect95Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.23;
  let rect95W = imgDrwPrps.width * 0.09;
  let rect95H = imgDrwPrps.height * 0.08;

  let rect109X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let rect109Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.780;
  let rect109W = imgDrwPrps.width * 0.09;
  let rect109H = imgDrwPrps.height * 0.07;

  //移动的红色矩形
  let rect120X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let randomRect11 = 0.28;
  let rect120Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect11;
  let rect120W = imgDrwPrps.width * 0.065;
  let rect120H = imgDrwPrps.height * 0.06;

  let randomRect12 = 0.4;
  let rect121X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect12;
  let rect121Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.94;
  let rect121W = imgDrwPrps.width * 0.065;
  let rect121H = imgDrwPrps.height * 0.06;

  //固定的蓝色矩形
  let rect94X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.652;
  let rect94Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.180;
  let rect94W = imgDrwPrps.width * 0.09;
  let rect94H = imgDrwPrps.height * 0.170;

  let rect96X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.285;
  let rect96Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.475;
  let rect96W = imgDrwPrps.width * 0.065;
  let rect96H = imgDrwPrps.height * 0.085;

  let rect97X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect97Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.665;
  let rect97W = imgDrwPrps.width * 0.06;
  let rect97H = imgDrwPrps.height * 0.065;

  //移动的蓝色矩形
  let rect111X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.08;
  let randomRect2 = 0;
  let rect111Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect2;
  let rect111W = imgDrwPrps.width * 0.055;
  let rect111H = imgDrwPrps.height * 0.055;

  let rect113X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.897;
  let randomRect3 = 0;
  let rect113Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect3;
  let rect113W = imgDrwPrps.width * 0.065;
  let rect113H = imgDrwPrps.height * 0.035;

  let randomRect4 = 0;
  let rect114X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect4;
  let rect114Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.67;
  let rect114W = imgDrwPrps.width * 0.055;
  let rect114H = imgDrwPrps.height * 0.055;

  //固定的黄色矩形
  let rect98X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let rect98Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.265;
  let rect98W = imgDrwPrps.width * 0.09;
  let rect98H = imgDrwPrps.height * 0.06;
  
  let rect99X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.155;
  let rect99Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.370;
  let rect99W = imgDrwPrps.width * 0.046;
  let rect99H = imgDrwPrps.height * 0.06;

  let rect100X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.285;
  let rect100Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.45;
  let rect100W = imgDrwPrps.width * 0.065;
  let rect100H = imgDrwPrps.height * 0.025;

  let rect101X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.407;
  let rect101Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.370;
  let rect101W = imgDrwPrps.width * 0.07;
  let rect101H = imgDrwPrps.height * 0.19;

  let rect102X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect102Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.48;
  let rect102W = imgDrwPrps.width * 0.1;
  let rect102H = imgDrwPrps.height * 0.05;

  let rect103X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect103Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.72;
  let rect103W = imgDrwPrps.width * 0.06;
  let rect103H = imgDrwPrps.height * 0.045;

  let rect104X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.682;
  let rect104Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.260;
  let rect104W = imgDrwPrps.width * 0.045;
  let rect104H = imgDrwPrps.height * 0.035;

  let rect105X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.295;
  let rect105Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.5;
  let rect105W = imgDrwPrps.width * 0.045;
  let rect105H = imgDrwPrps.height * 0.035;
  
  //移动的黄色矩形
  let rect110X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let randomRect1 = random(0.044, 0.13);
  let rect110Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect1;
  let rect110W = imgDrwPrps.width * 0.09;
  let rect110H = imgDrwPrps.height * 0.03;

  //组合矩形移动
  let randomRect10 = 0.36;
  let rect117X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect10;
  let rect117Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.044;
  let rect117W = imgDrwPrps.width * 0.07;
  let rect117H = imgDrwPrps.height * 0.085;

  let rect118X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect10;
  let rect118Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.129;
  let rect118W = imgDrwPrps.width * 0.07;
  let rect118H = imgDrwPrps.height * 0.031;

  let rect119X = imgDrwPrps.xOffset + imgDrwPrps.width * (randomRect10 + 0.015);
  let rect119Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.069;
  let rect119W = imgDrwPrps.width * 0.04;
  let rect119H = imgDrwPrps.height * 0.035;

  // 绘制色块
 
  fill(elementcolors[colorindex][0], elementcolors[colorindex][1], elementcolors[colorindex][2]); // first color- blue
  rect(rect113X, rect113Y, rect113W, rect113H);

 
  fill(elementcolors[colorindex+1][0], elementcolors[colorindex+1][1], elementcolors[colorindex+1][2]); // second color - yellow

  //横着的固定黄色矩形线条
  rect(rect1X, rect1Y, rect1W, rect1H);
  rect(rect2X, rect2Y, rect2W, rect2H);
  rect(rect3X, rect3Y, rect3W, rect3H);
  rect(rect4X, rect4Y, rect4W, rect4H);
  rect(rect5X, rect5Y, rect5W, rect5H);
  rect(rect6X, rect6Y, rect6W, rect6H);
  rect(rect7X, rect7Y, rect7W, rect7H);
  rect(rect8X, rect8Y, rect8W, rect8H);
  rect(rect9X, rect9Y, rect9W, rect9H);
  rect(rect10X, rect10Y, rect10W, rect10H);
  rect(rect11X, rect11Y, rect11W, rect11H);
  rect(rect12X, rect12Y, rect12W, rect12H);
  rect(rect13X, rect13Y, rect13W, rect13H);
  //竖着的固定黄色矩形线条
  rect(rect14X, rect14Y, rect14W, rect14H);
  rect(rect15X, rect15Y, rect15W, rect15H);
  rect(rect16X, rect16Y, rect16W, rect16H);
  rect(rect17X, rect17Y, rect17W, rect17H);
  rect(rect18X, rect18Y, rect18W, rect18H);
  rect(rect19X, rect19Y, rect19W, rect19H);
  rect(rect20X, rect20Y, rect20W, rect20H);
  rect(rect21X, rect21Y, rect21W, rect21H);
  rect(rect22X, rect22Y, rect22W, rect22H);
  rect(rect23X, rect23Y, rect23W, rect23H);
  rect(rect24X, rect24Y, rect24W, rect24H);
  rect(rect25X, rect25Y, rect25W, rect25H);

  //固定的黄色矩形
  rect(rect98X, rect98Y, rect98W, rect98H);
  rect(rect99X, rect99Y, rect99W, rect99H);
  rect(rect100X, rect100Y, rect100W, rect100H);
  rect(rect101X, rect101Y, rect101W, rect101H);
  rect(rect102X, rect102Y, rect102W, rect102H);
  rect(rect103X, rect103Y, rect103W, rect103H);

 
  fill(elementcolors[colorindex+2][0], elementcolors[colorindex+2][1], elementcolors[colorindex+2][2]); // third color - red

  //第二行两个个
  rect(rect53X, rect53Y, rect53W, rect53H);
  rect(rect54X, rect54Y, rect54W, rect54H);

  //第三行三个
  rect(rect55X, rect55Y, rect55W, rect55H);
  rect(rect56X, rect56Y, rect56W, rect56H);
  rect(rect57X, rect57Y, rect57W, rect57H);

  //第四行四个
  rect(rect58X, rect58Y, rect58W, rect58H);
  rect(rect59X, rect59Y, rect59W, rect59H);
  rect(rect60X, rect60Y, rect60W, rect60H);
  rect(rect61X, rect61Y, rect61W, rect61H);

  //第五行三个
  rect(rect62X, rect62Y, rect62W, rect62H);
  rect(rect63X, rect63Y, rect63W, rect63H);
  rect(rect64X, rect64Y, rect64W, rect64H);

  //第六行三个
  rect(rect65X, rect65Y, rect65W, rect65H);
  rect(rect66X, rect66Y, rect66W, rect66H);
  rect(rect67X, rect67Y, rect67W, rect67H);

  //第六行三个
  rect(rect68X, rect68Y, rect68W, rect68H);

  //第七行两个
  rect(rect69X, rect69Y, rect69W, rect69H);
  rect(rect70X, rect70Y, rect70W, rect70H);

  //第七行一个
  rect(rect71X, rect71Y, rect71W, rect71H);

  //第十行三个
  rect(rect72X, rect72Y, rect72W, rect72H);
  rect(rect73X, rect73Y, rect73W, rect73H);
  rect(rect74X, rect74Y, rect74W, rect74H);

  //第十三行两个
  rect(rect75X, rect75Y, rect75W, rect75H);
  rect(rect76X, rect76Y, rect76W, rect76H);

  //固定的红色矩形
  rect(rect90X, rect90Y, rect90W, rect90H);
  rect(rect91X, rect91Y, rect91W, rect91H);
  rect(rect92X, rect92Y, rect92W, rect92H);
  rect(rect93X, rect93Y, rect93W, rect93H);
  rect(rect109X, rect109Y, rect109W, rect109H);

  //移动的红色矩形
  rect(rect117X, rect117Y, rect117W, rect117H);
  rect(rect120X, rect120Y, rect120W, rect120H);
  rect(rect121X, rect121Y, rect121W, rect121H);

  //移动的红色小矩形
  for (let i = 0; i < 2; i++) {
    let randX = rect1X + random(imgDrwPrps.width * 0.045, imgDrwPrps.width * 0.822);
    let randY = rect1Y + random(0, rect1H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect2X + random(imgDrwPrps.width * 0.135, imgDrwPrps.width * 0.517);
    let randY = rect2Y + random(0, rect2H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect3X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = rect3Y + random(0, rect3H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect4X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.387);
    let randY = rect4Y + random(0, rect4H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect5X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.517);
    let randY = rect5Y + random(0, rect5H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect6X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = rect6Y + random(0, rect6H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect12X + random(imgDrwPrps.width * 0.165, imgDrwPrps.width * 0.437);
    let randY = rect12Y + random(0, rect12H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect11X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = rect11Y + random(0, rect11H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect17X +random(0, rect17W - (imgDrwPrps.width * 0.02));
    let randY = rect17Y + random(imgDrwPrps.width * 0.18, imgDrwPrps.width * 0.33);
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

 
  fill(elementcolors[colorindex][0], elementcolors[colorindex][1], elementcolors[colorindex][2]); // first color - blue
  //第一行三个
  rect(rect26X, rect26Y, rect26W, rect26H);
  rect(rect27X, rect27Y, rect27W, rect27H);
  rect(rect28X, rect28Y, rect28W, rect28H);
  //第二行四个
  rect(rect29X, rect29Y, rect29W, rect29H);
  rect(rect30X, rect30Y, rect30W, rect30H);
  rect(rect31X, rect31Y, rect31W, rect31H);
  rect(rect32X, rect32Y, rect32W, rect32H);
  //第三行四个
  rect(rect33X, rect33Y, rect33W, rect33H);
  rect(rect34X, rect34Y, rect34W, rect34H);
  rect(rect35X, rect35Y, rect35W, rect35H);
  rect(rect36X, rect36Y, rect36W, rect36H);

  //第四行两个
  rect(rect37X, rect37Y, rect37W, rect37H);
  rect(rect38X, rect38Y, rect38W, rect38H);

  //第五行三个
  rect(rect39X, rect39Y, rect39W, rect39H);
  rect(rect40X, rect40Y, rect40W, rect40H);
  rect(rect41X, rect41Y, rect41W, rect41H);

  //第六行两个
  rect(rect42X, rect42Y, rect42W, rect42H);
  rect(rect43X, rect43Y, rect43W, rect43H);

  //第八行一个
  rect(rect44X, rect44Y, rect44W, rect44H);

  //第十行一个
  rect(rect45X, rect45Y, rect45W, rect45H);

  //第十一行四个
  rect(rect46X, rect46Y, rect46W, rect46H);
  rect(rect47X, rect47Y, rect47W, rect47H);
  rect(rect48X, rect48Y, rect48W, rect48H);
  rect(rect49X, rect49Y, rect49W, rect49H);

  //第十三行三个
  rect(rect50X, rect50Y, rect50W, rect50H);
  rect(rect51X, rect51Y, rect51W, rect51H);
  rect(rect52X, rect52Y, rect52W, rect52H);

  //固定的蓝色矩形
  rect(rect94X, rect94Y, rect94W, rect94H);
  rect(rect96X, rect96Y, rect96W, rect96H);
  rect(rect97X, rect97Y, rect97W, rect97H);

  //移动的蓝色矩形
  rect(rect111X, rect111Y, rect111W, rect111H);
  
  //移动的蓝色小矩形
  for (let i = 0; i < 3; i++) {
    let randX = rect1X + random(imgDrwPrps.width * 0.045, imgDrwPrps.width * 0.822);
    let randY = rect1Y + random(0, rect1H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect4X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = rect4Y + random(0, rect4H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect6X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.517);
    let randY = rect6Y + random(0, rect6H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect9X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = rect9Y + random(0, rect9H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect19X +random(0, rect17W - (imgDrwPrps.width * 0.02));
    let randY = rect19Y + random(imgDrwPrps.width * 0.645, imgDrwPrps.width * 0.83);
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }


  
 
  fill(elementcolors[colorindex+2][0], elementcolors[colorindex+2][1], elementcolors[colorindex+2][2]); // third color - red
  rect(rect95X, rect95Y, rect95W, rect95H);

 
  fill(elementcolors[colorindex+3][0], elementcolors[colorindex+3][1], elementcolors[colorindex+3][2]); // 4th color - grey
  //第一行一个
  rect(rect77X, rect77Y, rect77W, rect77H);

  //第三行三个
  rect(rect78X, rect78Y, rect78W, rect78H);
  rect(rect79X, rect79Y, rect79W, rect79H);
  rect(rect80X, rect80Y, rect80W, rect80H);

  //第四行两个
  rect(rect81X, rect81Y, rect81W, rect81H);
  rect(rect82X, rect82Y, rect82W, rect82H);

  //第五行两个
  rect(rect83X, rect83Y, rect83W, rect83H);
  rect(rect84X, rect84Y, rect84W, rect84H);

  //第六行两个
  rect(rect85X, rect85Y, rect85W, rect85H);
  rect(rect86X, rect86Y, rect86W, rect86H);

  //第八行一个
  rect(rect87X, rect87Y, rect87W, rect87H);

  //第十三行两个
  rect(rect88X, rect88Y, rect88W, rect88H);
  rect(rect89X, rect89Y, rect89W, rect89H);
  
  //固定的灰色矩形
  rect(rect106X, rect106Y, rect106W, rect106H);
  rect(rect107X, rect107Y, rect107W, rect107H);
  rect(rect108X, rect108Y, rect108W, rect108H);

  //移动的灰色矩形
  rect(rect115X, rect115Y, rect115W, rect115H);
  rect(rect116X, rect116Y, rect116W, rect116H);
  rect(rect118X, rect118Y, rect118W, rect118H);
  rect(rect119X, rect119Y, rect119W, rect119H);
  
  //移动的灰色小正方形
  for (let i = 0; i < 3; i++) {
    let randX = rect1X + random(imgDrwPrps.width * 0.045, imgDrwPrps.width * 0.822);
    let randY = rect1Y + random(0, rect1H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 3; i++) {
    let randX = rect2X + random(imgDrwPrps.width * 0.135, imgDrwPrps.width * 0.517);
    let randY = rect2Y + random(0, rect2H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect2X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = rect2Y + random(0, rect2H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect3X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.517);
    let randY = rect3Y + random(0, rect3H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect9X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.517);
    let randY = rect9Y + random(0, rect9H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect15X +random(0, rect15W - (imgDrwPrps.width * 0.02));
    let randY = rect15Y + random(imgDrwPrps.width * 0.044, imgDrwPrps.width * 0.33);
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect18X +random(0, rect18W - (imgDrwPrps.width * 0.02));
    let randY = rect18Y + random(imgDrwPrps.width * 0.18, imgDrwPrps.width * 0.33);
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 1; i++) {
    let randX = rect19X +random(0, rect17W - (imgDrwPrps.width * 0.02));
    let randY = rect19Y + random(imgDrwPrps.width * 0.18, imgDrwPrps.width * 0.33);
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }



 
  fill(elementcolors[colorindex+1][0], elementcolors[colorindex+1][1], elementcolors[colorindex+1][2]); // second color - yellow
  //固定的黄色矩形
  rect(rect104X, rect104Y, rect104W, rect104H);
  rect(rect105X, rect105Y, rect105W, rect105H);

  //移动的黄色矩形
  rect(rect110X, rect110Y, rect110W, rect110H);

 
  fill(elementcolors[colorindex][0], elementcolors[colorindex][1], elementcolors[colorindex][2]); // first color - blue
  rect(rect114X, rect114Y, rect114W, rect114H);

  
  
}



//========================================================================
// =========================================================================
// =========================================================================
// ===============================sin and cos vortex========================================
// =========================================================================
// =========================================================================

function clearartwork() {

  noStroke(); 
  translate(-windowWidth/2, -windowHeight/2)

  // 计算相对位置和大小
  // Y轴开始从上到下的黄色线条矩形
  let rect1X = imgDrwPrps.xOffset;
  let rect1Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect1W = imgDrwPrps.width;
  let rect1H = imgDrwPrps.height * yellow_ratio;

  let rect2X = imgDrwPrps.xOffset;
  let rect2Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.16;
  let rect2W = imgDrwPrps.width;
  let rect2H = imgDrwPrps.height * yellow_ratio;

  let rect3X = imgDrwPrps.xOffset;
  let rect3Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.35;
  let rect3W = imgDrwPrps.width;
  let rect3H = imgDrwPrps.height * yellow_ratio;

  let rect4X = imgDrwPrps.xOffset;
  let rect4Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.43;
  let rect4W = imgDrwPrps.width;
  let rect4H = imgDrwPrps.height * yellow_ratio;

  let rect5X = imgDrwPrps.xOffset;
  let rect5Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.56;
  let rect5W = imgDrwPrps.width;
  let rect5H = imgDrwPrps.height * yellow_ratio;

  let rect6X = imgDrwPrps.xOffset;
  let rect6Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect6W = imgDrwPrps.width;
  let rect6H = imgDrwPrps.height * yellow_ratio;

  let rect7X = imgDrwPrps.xOffset;
  let rect7Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.685;
  let rect7W = imgDrwPrps.width * 0.06;
  let rect7H = imgDrwPrps.height * yellow_ratio;

  let rect8X = imgDrwPrps.xOffset;
  let rect8Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.775;
  let rect8W = imgDrwPrps.width * 0.06;
  let rect8H = imgDrwPrps.height * yellow_ratio;

  let rect9X = imgDrwPrps.xOffset;
  let rect9Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.85;
  let rect9W = imgDrwPrps.width;
  let rect9H = imgDrwPrps.height * yellow_ratio;

  let rect10X = imgDrwPrps.xOffset;
  let rect10Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.885;
  let rect10W = imgDrwPrps.width * 0.06;
  let rect10H = imgDrwPrps.height * yellow_ratio;

  let rect11X = imgDrwPrps.xOffset;
  let rect11Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect11W = imgDrwPrps.width;
  let rect11H = imgDrwPrps.height * yellow_ratio;

  let rect12X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.08;
  let rect12Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect12W = imgDrwPrps.width * 0.457;
  let rect12H = imgDrwPrps.height * yellow_ratio;

  let rect13X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect13Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.805;
  let rect13W = imgDrwPrps.width * 0.1;
  let rect13H = imgDrwPrps.height * yellow_ratio;

  

  // X轴上从左到右的黄色线条矩形
  let rect14X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let rect14Y = imgDrwPrps.yOffset;
  let rect14W = imgDrwPrps.width * yellow_ratio;
  let rect14H = imgDrwPrps.height * 0.35;

  let rect15X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect15Y = imgDrwPrps.yOffset;
  let rect15W = imgDrwPrps.width * yellow_ratio;
  let rect15H = imgDrwPrps.height;

  let rect16X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect16Y = imgDrwPrps.yOffset;
  let rect16W = imgDrwPrps.width * yellow_ratio;
  let rect16H = imgDrwPrps.height * 0.96;

  let rect17X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect17Y = imgDrwPrps.yOffset;
  let rect17W = imgDrwPrps.width * yellow_ratio;
  let rect17H = imgDrwPrps.height;

  let rect18X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect18Y = imgDrwPrps.yOffset;
  let rect18W = imgDrwPrps.width * yellow_ratio;
  let rect18H = imgDrwPrps.height;

  let rect19X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect19Y = imgDrwPrps.yOffset;
  let rect19W = imgDrwPrps.width * yellow_ratio;
  let rect19H = imgDrwPrps.height;

  let rect20X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect20Y = imgDrwPrps.yOffset;
  let rect20W = imgDrwPrps.width * yellow_ratio;
  let rect20H = imgDrwPrps.height;

  let rect21X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let rect21Y = imgDrwPrps.yOffset;
  let rect21W = imgDrwPrps.width * yellow_ratio;
  let rect21H = imgDrwPrps.height * 0.35;

  let rect22X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect22Y = imgDrwPrps.yOffset;
  let rect22W = imgDrwPrps.width * yellow_ratio;
  let rect22H = imgDrwPrps.height * 0.430;

  let rect23X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect23Y = imgDrwPrps.yOffset;
  let rect23W = imgDrwPrps.width * yellow_ratio;
  let rect23H = imgDrwPrps.height;

  let rect24X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.647;
  let rect24Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.450;
  let rect24W = imgDrwPrps.width * yellow_ratio;
  let rect24H = imgDrwPrps.height * 0.175;

  let rect25X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect25Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.645;
  let rect25W = imgDrwPrps.width * yellow_ratio;
  let rect25H = imgDrwPrps.height * 0.160;

  //固定的交叉处的正方形蓝色方块
  //第一行三个
  let rect26X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let rect26Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect26W = imgDrwPrps.width * yellow_ratio;
  let rect26H = imgDrwPrps.height * yellow_ratio;

  let rect27X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect27Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect27W = imgDrwPrps.width * yellow_ratio;
  let rect27H = imgDrwPrps.height * yellow_ratio;

  let rect28X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect28Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect28W = imgDrwPrps.width * yellow_ratio;
  let rect28H = imgDrwPrps.height * yellow_ratio;

  //第二行四个
  let rect29X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect29Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect29W = imgDrwPrps.width * yellow_ratio;
  let rect29H = imgDrwPrps.height * yellow_ratio;

  let rect30X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect30Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect30W = imgDrwPrps.width * yellow_ratio;
  let rect30H = imgDrwPrps.height * yellow_ratio;

  let rect31X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect31Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect31W = imgDrwPrps.width * yellow_ratio;
  let rect31H = imgDrwPrps.height * yellow_ratio;

  let rect32X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect32Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect32W = imgDrwPrps.width * yellow_ratio;
  let rect32H = imgDrwPrps.height * yellow_ratio;

  //第三行四个
  let rect33X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect33Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect33W = imgDrwPrps.width * yellow_ratio;
  let rect33H = imgDrwPrps.height * yellow_ratio;

  let rect34X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect34Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect34W = imgDrwPrps.width * yellow_ratio;
  let rect34H = imgDrwPrps.height * yellow_ratio;

  let rect35X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect35Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect35W = imgDrwPrps.width * yellow_ratio;
  let rect35H = imgDrwPrps.height * yellow_ratio;

  let rect36X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect36Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect36W = imgDrwPrps.width * yellow_ratio;
  let rect36H = imgDrwPrps.height * yellow_ratio;

  //第四行两个
  let rect37X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect37Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect37W = imgDrwPrps.width * yellow_ratio;
  let rect37H = imgDrwPrps.height * yellow_ratio;

  let rect38X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect38Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect38W = imgDrwPrps.width * yellow_ratio;
  let rect38H = imgDrwPrps.height * yellow_ratio;

  //第五行三个
  let rect39X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect39Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect39W = imgDrwPrps.width * yellow_ratio;
  let rect39H = imgDrwPrps.height * yellow_ratio;

  let rect40X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect40Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect40W = imgDrwPrps.width * yellow_ratio;
  let rect40H = imgDrwPrps.height * yellow_ratio;

  let rect41X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect41Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect41W = imgDrwPrps.width * yellow_ratio;
  let rect41H = imgDrwPrps.height * yellow_ratio;

  //第六行两个
  let rect42X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect42Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect42W = imgDrwPrps.width * yellow_ratio;
  let rect42H = imgDrwPrps.height * yellow_ratio;

  let rect43X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect43Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect43W = imgDrwPrps.width * yellow_ratio;
  let rect43H = imgDrwPrps.height * yellow_ratio;

  //第八行一个
  let rect44X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect44Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect44W = imgDrwPrps.width * yellow_ratio;
  let rect44H = imgDrwPrps.height * yellow_ratio;
  
  //第十行一个
  let rect45X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect45Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.805;
  let rect45W = imgDrwPrps.width * yellow_ratio;
  let rect45H = imgDrwPrps.height * yellow_ratio;

  //第十一行四个
  let rect46X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect46Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect46W = imgDrwPrps.width * yellow_ratio;
  let rect46H = imgDrwPrps.height * yellow_ratio;
  
  let rect47X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect47Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect47W = imgDrwPrps.width * yellow_ratio;
  let rect47H = imgDrwPrps.height * yellow_ratio;
  
  let rect48X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect48Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect48W = imgDrwPrps.width * yellow_ratio;
  let rect48H = imgDrwPrps.height * yellow_ratio;

  let rect49X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect49Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect49W = imgDrwPrps.width * yellow_ratio;
  let rect49H = imgDrwPrps.height * yellow_ratio;

  //第十三行三个
  let rect50X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect50Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect50W = imgDrwPrps.width * yellow_ratio;
  let rect50H = imgDrwPrps.height * yellow_ratio;
  
  let rect51X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect51Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect51W = imgDrwPrps.width * yellow_ratio;
  let rect51H = imgDrwPrps.height * yellow_ratio;

  let rect52X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect52Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect52W = imgDrwPrps.width * yellow_ratio;
  let rect52H = imgDrwPrps.height * yellow_ratio;


  //固定的交叉处的正方形红色方块
  //第二行两个个
  let rect53X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let rect53Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect53W = imgDrwPrps.width * yellow_ratio;
  let rect53H = imgDrwPrps.height * yellow_ratio;
  
  let rect54X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect54Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let rect54W = imgDrwPrps.width * yellow_ratio;
  let rect54H = imgDrwPrps.height * yellow_ratio;

  //第三行三个
  let rect55X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let rect55Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect55W = imgDrwPrps.width * yellow_ratio;
  let rect55H = imgDrwPrps.height * yellow_ratio;

  let rect56X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect56Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect56W = imgDrwPrps.width * yellow_ratio;
  let rect56H = imgDrwPrps.height * yellow_ratio;

  let rect57X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let rect57Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect57W = imgDrwPrps.width * yellow_ratio;
  let rect57H = imgDrwPrps.height * yellow_ratio;

  //第四行四个
  let rect58X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect58Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect58W = imgDrwPrps.width * yellow_ratio;
  let rect58H = imgDrwPrps.height * yellow_ratio;

  let rect59X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect59Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect59W = imgDrwPrps.width * yellow_ratio;
  let rect59H = imgDrwPrps.height * yellow_ratio;

  let rect60X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect60Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect60W = imgDrwPrps.width * yellow_ratio;
  let rect60H = imgDrwPrps.height * yellow_ratio;

  let rect61X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect61Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect61W = imgDrwPrps.width * yellow_ratio;
  let rect61H = imgDrwPrps.height * yellow_ratio;

  //第五行三个
  let rect62X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.647;
  let rect62Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect62W = imgDrwPrps.width * yellow_ratio;
  let rect62H = imgDrwPrps.height * yellow_ratio;
  
  let rect63X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect63Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect63W = imgDrwPrps.width * yellow_ratio;
  let rect63H = imgDrwPrps.height * yellow_ratio;
  
  let rect64X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect64Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect64W = imgDrwPrps.width * yellow_ratio;
  let rect64H = imgDrwPrps.height * yellow_ratio;

  //第六行三个
  let rect65X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect65Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect65W = imgDrwPrps.width * yellow_ratio;
  let rect65H = imgDrwPrps.height * yellow_ratio;
  
  let rect66X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let rect66Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect66W = imgDrwPrps.width * yellow_ratio;
  let rect66H = imgDrwPrps.height * yellow_ratio;
  
  let rect67X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect67Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect67W = imgDrwPrps.width * yellow_ratio;
  let rect67H = imgDrwPrps.height * yellow_ratio;

  //第七行一个
  let rect68X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect68Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.685;
  let rect68W = imgDrwPrps.width * yellow_ratio;
  let rect68H = imgDrwPrps.height * yellow_ratio;

  //第八行两个
  let rect69X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect69Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect69W = imgDrwPrps.width * yellow_ratio;
  let rect69H = imgDrwPrps.height * yellow_ratio;

  let rect70X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect70Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect70W = imgDrwPrps.width * yellow_ratio;
  let rect70H = imgDrwPrps.height * yellow_ratio;

  //第九行一个
  let rect71X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect71Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.775;
  let rect71W = imgDrwPrps.width * yellow_ratio;
  let rect71H = imgDrwPrps.height * yellow_ratio;

  //第十行三个
  let rect72X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect72Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect72W = imgDrwPrps.width * yellow_ratio;
  let rect72H = imgDrwPrps.height * yellow_ratio;
  
  let rect73X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let rect73Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect73W = imgDrwPrps.width * yellow_ratio;
  let rect73H = imgDrwPrps.height * yellow_ratio;

  let rect74X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect74Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let rect74W = imgDrwPrps.width * yellow_ratio;
  let rect74H = imgDrwPrps.height * yellow_ratio;

  //第十三行两个
  let rect75X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let rect75Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect75W = imgDrwPrps.width * yellow_ratio;
  let rect75H = imgDrwPrps.height * yellow_ratio;

  let rect76X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect76Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect76W = imgDrwPrps.width * yellow_ratio;
  let rect76H = imgDrwPrps.height * yellow_ratio;

  //固定的交叉处的正方形灰色方块
  //第一行一个
  let rect77X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let rect77Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let rect77W = imgDrwPrps.width * yellow_ratio;
  let rect77H = imgDrwPrps.height * yellow_ratio;

  //第三行三个
  let rect78X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let rect78Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect78W = imgDrwPrps.width * yellow_ratio;
  let rect78H = imgDrwPrps.height * yellow_ratio;

  let rect79X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let rect79Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect79W = imgDrwPrps.width * yellow_ratio;
  let rect79H = imgDrwPrps.height * yellow_ratio;

  let rect80X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let rect80Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let rect80W = imgDrwPrps.width * yellow_ratio;
  let rect80H = imgDrwPrps.height * yellow_ratio;
  
  //第四行两个
  let rect81X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect81Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect81W = imgDrwPrps.width * yellow_ratio;
  let rect81H = imgDrwPrps.height * yellow_ratio;

  let rect82X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect82Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let rect82W = imgDrwPrps.width * yellow_ratio;
  let rect82H = imgDrwPrps.height * yellow_ratio;

  //第五行两个
  let rect83X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect83Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect83W = imgDrwPrps.width * yellow_ratio;
  let rect83H = imgDrwPrps.height * yellow_ratio;

  let rect84X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect84Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let rect84W = imgDrwPrps.width * yellow_ratio;
  let rect84H = imgDrwPrps.height * yellow_ratio;

  //第六行两个
  let rect85X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect85Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect85W = imgDrwPrps.width * yellow_ratio;
  let rect85H = imgDrwPrps.height * yellow_ratio;

  let rect86X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect86Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let rect86W = imgDrwPrps.width * yellow_ratio;
  let rect86H = imgDrwPrps.height * yellow_ratio;

  //第七行一个
  let rect87X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect87Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let rect87W = imgDrwPrps.width * yellow_ratio;
  let rect87H = imgDrwPrps.height * yellow_ratio;

  //第十三行两个
  let rect88X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let rect88Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect88W = imgDrwPrps.width * yellow_ratio;
  let rect88H = imgDrwPrps.height * yellow_ratio;

  let rect89X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let rect89Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let rect89W = imgDrwPrps.width * yellow_ratio;
  let rect89H = imgDrwPrps.height * yellow_ratio;

  //固定的灰色矩形
  let rect106X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.165;
  let rect106Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.285;
  let rect106W = imgDrwPrps.width * 0.03;
  let rect106H = imgDrwPrps.height * 0.03;

  let rect107X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.17;
  let rect107Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.39;
  let rect107W = imgDrwPrps.width * 0.025;
  let rect107H = imgDrwPrps.height * 0.025;

  let rect108X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.170;
  let rect108Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.795;
  let rect108W = imgDrwPrps.width * 0.03;
  let rect108H = imgDrwPrps.height * 0.025;



  //移动的灰色矩形
  let rect115X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.407;
  let randomRect5 = 0;
  let rect115Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect5;
  let rect115W = imgDrwPrps.width * 0.07;
  let rect115H = imgDrwPrps.height * 0.055;

  let randomRect6 = 0;
  let rect116X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect6;
  let randomRect7 = 0;
  let rect116Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect7;
  let randomRect8 = 0;
  let rect116W = imgDrwPrps.width * randomRect8;
  let randomRect9 = 0;
  let rect116H = imgDrwPrps.height * randomRect9;

  //固定的红色矩形
  let rect90X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.155;
  let rect90Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.044;
  let rect90W = imgDrwPrps.width * 0.045;
  let rect90H = imgDrwPrps.height * 0.116;

  let rect91X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let rect91Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.495;
  let rect91W = imgDrwPrps.width * 0.09;
  let rect91H = imgDrwPrps.height * 0.065;

  let rect92X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect92Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.765;
  let rect92W = imgDrwPrps.width * 0.06;
  let rect92H = imgDrwPrps.height * 0.04;

  let rect93X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.697;
  let rect93Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.450;
  let rect93W = imgDrwPrps.width * 0.085;
  let rect93H = imgDrwPrps.height * 0.11;

  let rect95X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.652;
  let rect95Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.23;
  let rect95W = imgDrwPrps.width * 0.09;
  let rect95H = imgDrwPrps.height * 0.08;

  let rect109X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let rect109Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.780;
  let rect109W = imgDrwPrps.width * 0.09;
  let rect109H = imgDrwPrps.height * 0.07;

  //移动的红色矩形
  let rect120X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let randomRect11 = 0;
  let rect120Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect11;
  let rect120W = imgDrwPrps.width * 0.065;
  let rect120H = imgDrwPrps.height * 0.06;

  let randomRect12 = 0;
  let rect121X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect12;
  let rect121Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.94;
  let rect121W = imgDrwPrps.width * 0.065;
  let rect121H = imgDrwPrps.height * 0.06;

  //固定的蓝色矩形
  let rect94X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.652;
  let rect94Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.180;
  let rect94W = imgDrwPrps.width * 0.09;
  let rect94H = imgDrwPrps.height * 0.170;

  let rect96X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.285;
  let rect96Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.475;
  let rect96W = imgDrwPrps.width * 0.065;
  let rect96H = imgDrwPrps.height * 0.085;

  let rect97X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect97Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.665;
  let rect97W = imgDrwPrps.width * 0.06;
  let rect97H = imgDrwPrps.height * 0.065;

  //移动的蓝色矩形
  let rect111X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.08;
  let randomRect2 = 0;
  let rect111Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect2;
  let rect111W = imgDrwPrps.width * 0.055;
  let rect111H = imgDrwPrps.height * 0.055;

  let rect113X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.897;
  let randomRect3 = 0;
  let rect113Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect3;
  let rect113W = imgDrwPrps.width * 0.065;
  let rect113H = imgDrwPrps.height * 0.035;

  let randomRect4 = 0;
  let rect114X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect4;
  let rect114Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.67;
  let rect114W = imgDrwPrps.width * 0.055;
  let rect114H = imgDrwPrps.height * 0.055;

  //固定的黄色矩形
  let rect98X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let rect98Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.265;
  let rect98W = imgDrwPrps.width * 0.09;
  let rect98H = imgDrwPrps.height * 0.06;
  
  let rect99X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.155;
  let rect99Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.370;
  let rect99W = imgDrwPrps.width * 0.046;
  let rect99H = imgDrwPrps.height * 0.06;

  let rect100X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.285;
  let rect100Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.45;
  let rect100W = imgDrwPrps.width * 0.065;
  let rect100H = imgDrwPrps.height * 0.025;

  let rect101X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.407;
  let rect101Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.370;
  let rect101W = imgDrwPrps.width * 0.07;
  let rect101H = imgDrwPrps.height * 0.19;

  let rect102X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect102Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.48;
  let rect102W = imgDrwPrps.width * 0.1;
  let rect102H = imgDrwPrps.height * 0.05;

  let rect103X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let rect103Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.72;
  let rect103W = imgDrwPrps.width * 0.06;
  let rect103H = imgDrwPrps.height * 0.045;

  let rect104X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.682;
  let rect104Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.260;
  let rect104W = imgDrwPrps.width * 0.045;
  let rect104H = imgDrwPrps.height * 0.035;

  let rect105X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.295;
  let rect105Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.5;
  let rect105W = imgDrwPrps.width * 0.045;
  let rect105H = imgDrwPrps.height * 0.035;
  
  //移动的黄色矩形
  let rect110X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let randomRect1 = 0;
  let rect110Y = imgDrwPrps.yOffset + imgDrwPrps.height * randomRect1;
  let rect110W = imgDrwPrps.width * 0.09;
  let rect110H = imgDrwPrps.height * 0.03;

  //组合矩形移动
  let randomRect10 = 0;
  let rect117X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect10;
  let rect117Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.044;
  let rect117W = imgDrwPrps.width * 0.07;
  let rect117H = imgDrwPrps.height * 0.085;

  let rect118X = imgDrwPrps.xOffset + imgDrwPrps.width * randomRect10;
  let rect118Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.129;
  let rect118W = imgDrwPrps.width * 0.07;
  let rect118H = imgDrwPrps.height * 0.031;

  let rect119X = imgDrwPrps.xOffset + imgDrwPrps.width * (randomRect10 + 0.015);
  let rect119Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.069;
  let rect119W = imgDrwPrps.width * 0.04;
  let rect119H = imgDrwPrps.height * 0.035;

  // 绘制色块
  fill(75, 107, 186); // 蓝色，图层
  rect(rect113X, rect113Y, rect113W, rect113H);

  fill(230, 207, 48); // 黄色
  //横着的固定黄色矩形线条
  rect(rect1X, rect1Y, rect1W, rect1H);
  rect(rect2X, rect2Y, rect2W, rect2H);
  rect(rect3X, rect3Y, rect3W, rect3H);
  rect(rect4X, rect4Y, rect4W, rect4H);
  rect(rect5X, rect5Y, rect5W, rect5H);
  rect(rect6X, rect6Y, rect6W, rect6H);
  rect(rect7X, rect7Y, rect7W, rect7H);
  rect(rect8X, rect8Y, rect8W, rect8H);
  rect(rect9X, rect9Y, rect9W, rect9H);
  rect(rect10X, rect10Y, rect10W, rect10H);
  rect(rect11X, rect11Y, rect11W, rect11H);
  rect(rect12X, rect12Y, rect12W, rect12H);
  rect(rect13X, rect13Y, rect13W, rect13H);
  //竖着的固定黄色矩形线条
  rect(rect14X, rect14Y, rect14W, rect14H);
  rect(rect15X, rect15Y, rect15W, rect15H);
  rect(rect16X, rect16Y, rect16W, rect16H);
  rect(rect17X, rect17Y, rect17W, rect17H);
  rect(rect18X, rect18Y, rect18W, rect18H);
  rect(rect19X, rect19Y, rect19W, rect19H);
  rect(rect20X, rect20Y, rect20W, rect20H);
  rect(rect21X, rect21Y, rect21W, rect21H);
  rect(rect22X, rect22Y, rect22W, rect22H);
  rect(rect23X, rect23Y, rect23W, rect23H);
  rect(rect24X, rect24Y, rect24W, rect24H);
  rect(rect25X, rect25Y, rect25W, rect25H);

  //固定的黄色矩形
  rect(rect98X, rect98Y, rect98W, rect98H);
  rect(rect99X, rect99Y, rect99W, rect99H);
  rect(rect100X, rect100Y, rect100W, rect100H);
  rect(rect101X, rect101Y, rect101W, rect101H);
  rect(rect102X, rect102Y, rect102W, rect102H);
  rect(rect103X, rect103Y, rect103W, rect103H);

  fill(173, 58, 47); // 红色
  //第二行两个个
  rect(rect53X, rect53Y, rect53W, rect53H);
  rect(rect54X, rect54Y, rect54W, rect54H);

  //第三行三个
  rect(rect55X, rect55Y, rect55W, rect55H);
  rect(rect56X, rect56Y, rect56W, rect56H);
  rect(rect57X, rect57Y, rect57W, rect57H);

  //第四行四个
  rect(rect58X, rect58Y, rect58W, rect58H);
  rect(rect59X, rect59Y, rect59W, rect59H);
  rect(rect60X, rect60Y, rect60W, rect60H);
  rect(rect61X, rect61Y, rect61W, rect61H);

  //第五行三个
  rect(rect62X, rect62Y, rect62W, rect62H);
  rect(rect63X, rect63Y, rect63W, rect63H);
  rect(rect64X, rect64Y, rect64W, rect64H);

  //第六行三个
  rect(rect65X, rect65Y, rect65W, rect65H);
  rect(rect66X, rect66Y, rect66W, rect66H);
  rect(rect67X, rect67Y, rect67W, rect67H);

  //第六行三个
  rect(rect68X, rect68Y, rect68W, rect68H);

  //第七行两个
  rect(rect69X, rect69Y, rect69W, rect69H);
  rect(rect70X, rect70Y, rect70W, rect70H);

  //第七行一个
  rect(rect71X, rect71Y, rect71W, rect71H);

  //第十行三个
  rect(rect72X, rect72Y, rect72W, rect72H);
  rect(rect73X, rect73Y, rect73W, rect73H);
  rect(rect74X, rect74Y, rect74W, rect74H);

  //第十三行两个
  rect(rect75X, rect75Y, rect75W, rect75H);
  rect(rect76X, rect76Y, rect76W, rect76H);

  //固定的红色矩形
  rect(rect90X, rect90Y, rect90W, rect90H);
  rect(rect91X, rect91Y, rect91W, rect91H);
  rect(rect92X, rect92Y, rect92W, rect92H);
  rect(rect93X, rect93Y, rect93W, rect93H);
  rect(rect109X, rect109Y, rect109W, rect109H);

  //移动的红色矩形
  rect(rect117X, rect117Y, rect117W, rect117H);
  rect(rect120X, rect120Y, rect120W, rect120H);
  rect(rect121X, rect121Y, rect121W, rect121H);

  //移动的红色小矩形
  for (let i = 0; i < 2; i++) {
    let randX = rect1X + 0;
    let randY = rect1Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect2X + 0;
    let randY = rect2Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect3X + 0;
    let randY = rect3Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect4X + 0;
    let randY = rect4Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect5X + 0;
    let randY = rect5Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect6X + 0;
    let randY = rect6Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect12X + 0;
    let randY = rect12Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect11X + 0;
    let randY = rect11Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect17X +0;
    let randY = rect17Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  fill(75, 107, 186); // 蓝色
  //第一行三个
  rect(rect26X, rect26Y, rect26W, rect26H);
  rect(rect27X, rect27Y, rect27W, rect27H);
  rect(rect28X, rect28Y, rect28W, rect28H);
  //第二行四个
  rect(rect29X, rect29Y, rect29W, rect29H);
  rect(rect30X, rect30Y, rect30W, rect30H);
  rect(rect31X, rect31Y, rect31W, rect31H);
  rect(rect32X, rect32Y, rect32W, rect32H);
  //第三行四个
  rect(rect33X, rect33Y, rect33W, rect33H);
  rect(rect34X, rect34Y, rect34W, rect34H);
  rect(rect35X, rect35Y, rect35W, rect35H);
  rect(rect36X, rect36Y, rect36W, rect36H);

  //第四行两个
  rect(rect37X, rect37Y, rect37W, rect37H);
  rect(rect38X, rect38Y, rect38W, rect38H);

  //第五行三个
  rect(rect39X, rect39Y, rect39W, rect39H);
  rect(rect40X, rect40Y, rect40W, rect40H);
  rect(rect41X, rect41Y, rect41W, rect41H);

  //第六行两个
  rect(rect42X, rect42Y, rect42W, rect42H);
  rect(rect43X, rect43Y, rect43W, rect43H);

  //第八行一个
  rect(rect44X, rect44Y, rect44W, rect44H);

  //第十行一个
  rect(rect45X, rect45Y, rect45W, rect45H);

  //第十一行四个
  rect(rect46X, rect46Y, rect46W, rect46H);
  rect(rect47X, rect47Y, rect47W, rect47H);
  rect(rect48X, rect48Y, rect48W, rect48H);
  rect(rect49X, rect49Y, rect49W, rect49H);

  //第十三行三个
  rect(rect50X, rect50Y, rect50W, rect50H);
  rect(rect51X, rect51Y, rect51W, rect51H);
  rect(rect52X, rect52Y, rect52W, rect52H);

  //固定的蓝色矩形
  rect(rect94X, rect94Y, rect94W, rect94H);
  rect(rect96X, rect96Y, rect96W, rect96H);
  rect(rect97X, rect97Y, rect97W, rect97H);

  //移动的蓝色矩形
  rect(rect111X, rect111Y, rect111W, rect111H);
  
  //移动的蓝色小矩形
  for (let i = 0; i < 3; i++) {
    let randX = rect1X + 0;
    let randY = rect1Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect4X + 0;
    let randY = rect4Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect6X + 0;
    let randY = rect6Y +0
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect9X + 0;
    let randY = rect9Y +0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect19X +0;
    let randY = rect19Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }


  
  fill(173, 58, 47); // 红色，图层转换
  rect(rect95X, rect95Y, rect95W, rect95H);

  fill(219, 217, 213); // 灰色
  //第一行一个
  rect(rect77X, rect77Y, rect77W, rect77H);

  //第三行三个
  rect(rect78X, rect78Y, rect78W, rect78H);
  rect(rect79X, rect79Y, rect79W, rect79H);
  rect(rect80X, rect80Y, rect80W, rect80H);

  //第四行两个
  rect(rect81X, rect81Y, rect81W, rect81H);
  rect(rect82X, rect82Y, rect82W, rect82H);

  //第五行两个
  rect(rect83X, rect83Y, rect83W, rect83H);
  rect(rect84X, rect84Y, rect84W, rect84H);

  //第六行两个
  rect(rect85X, rect85Y, rect85W, rect85H);
  rect(rect86X, rect86Y, rect86W, rect86H);

  //第八行一个
  rect(rect87X, rect87Y, rect87W, rect87H);

  //第十三行两个
  rect(rect88X, rect88Y, rect88W, rect88H);
  rect(rect89X, rect89Y, rect89W, rect89H);
  
  //固定的灰色矩形
  rect(rect106X, rect106Y, rect106W, rect106H);
  rect(rect107X, rect107Y, rect107W, rect107H);
  rect(rect108X, rect108Y, rect108W, rect108H);

  //移动的灰色矩形
  rect(rect115X, rect115Y, rect115W, rect115H);
  rect(rect116X, rect116Y, rect116W, rect116H);
  rect(rect118X, rect118Y, rect118W, rect118H);
  rect(rect119X, rect119Y, rect119W, rect119H);
  
  //移动的灰色小正方形
  for (let i = 0; i < 3; i++) {
    let randX = rect1X + 0;
    let randY = rect1Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 3; i++) {
    let randX = rect2X + 0;
    let randY = rect2Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect2X + 0;
    let randY = rect2Y +0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect3X + 0;
    let randY = rect3Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect9X + 0;
    let randY = rect9Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect15X +0;
    let randY = rect15Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = rect18X +0;
    let randY = rect18Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 1; i++) {
    let randX = rect19X +0;
    let randY = rect19Y + 0;
    let randW = imgDrwPrps.width * yellow_ratio;
    let randH = imgDrwPrps.height * yellow_ratio;
    rect(randX, randY, randW, randH);
  }



  fill(230, 207, 48); // 黄色,图层转换
  //固定的黄色矩形
  rect(rect104X, rect104Y, rect104W, rect104H);
  rect(rect105X, rect105Y, rect105W, rect105H);

  //移动的黄色矩形
  rect(rect110X, rect110Y, rect110W, rect110H);

  fill(75, 107, 186); // 蓝色，图层转换
  rect(rect114X, rect114Y, rect114W, rect114H);

 

}