let imgDrwPrps = {aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0};
let canvasAspectRatio = 0;
let numRandommoverects; // 黄色线条上的矩形的数量




let allmoverectposi = [];




function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  calculateCanvasProps();
  artwork();
  // noLoop();
}

function moverect(xpos,ypos,wr,hr){
  rect(xpos,ypos,wr,hr);
  allmoverectposi.push({
    x: xpos,
    y: ypos,
    w: wr,
    h: hr,
    offsetX: 0,
    offsetY: 0,
    dragging: false});
}

function draw() {
  background(240, 240, 240); // 背景颜色
  // artwork();
  // Draw all rectangles
  for (let i = 0; i < allmoverectposi.length; i++) {
    let rectObj = allmoverectposi[i];
    // fill(200, 100, 100);
    rect(rectObj.x, rectObj.y, rectObj.w, rectObj.h);
  }
  
}





function mousePressed() {
  // Check if the mouse is pressed over any rectangle
  for (let i = rects.length - 1; i >= 0; i--) { // Iterate from top to bottom for correct layering
    let rectObj = rects[i];
    if (mouseX > rectObj.x && mouseX < rectObj.x + rectObj.w &&
        mouseY > rectObj.y && mouseY < rectObj.y + rectObj.h) {
      rectObj.dragging = true;
      rectObj.offsetX = mouseX - rectObj.x;
      rectObj.offsetY = mouseY - rectObj.y;
      // Move the selected rectangle to the end of the array to ensure it is drawn on top
      rects.push(rects.splice(i, 1)[0]);
      break;
    }
  }
}

function mouseDragged() {
  // Update the position of the dragged rectangle
  for (let i = 0; i < rects.length; i++) {
    let rectObj = rects[i];
    if (rectObj.dragging) {
      rectObj.x = mouseX - rectObj.offsetX;
      rectObj.y = mouseY - rectObj.offsetY;
    }
  }
}

function mouseReleased() {
  // Stop dragging when the mouse is released
  for (let i = 0; i < rects.length; i++) {
    rects[i].dragging = false;
  }
}








































function artwork() {

  noStroke(); // 禁用边框边线
  // translate(-windowWidth/2, -windowHeight/2)

  // 计算相对位置和大小
  // Y轴开始从上到下的黄色线条矩形
  let moverect1X = imgDrwPrps.xOffset;
  let moverect1Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let moverect1W = imgDrwPrps.width;
  let moverect1H = imgDrwPrps.height * 0.02;

  let moverect2X = imgDrwPrps.xOffset;
  let moverect2Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.16;
  let moverect2W = imgDrwPrps.width;
  let moverect2H = imgDrwPrps.height * 0.02;

  let moverect3X = imgDrwPrps.xOffset;
  let moverect3Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.35;
  let moverect3W = imgDrwPrps.width;
  let moverect3H = imgDrwPrps.height * 0.02;

  let moverect4X = imgDrwPrps.xOffset;
  let moverect4Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.43;
  let moverect4W = imgDrwPrps.width;
  let moverect4H = imgDrwPrps.height * 0.02;

  let moverect5X = imgDrwPrps.xOffset;
  let moverect5Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.56;
  let moverect5W = imgDrwPrps.width;
  let moverect5H = imgDrwPrps.height * 0.02;

  let moverect6X = imgDrwPrps.xOffset;
  let moverect6Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let moverect6W = imgDrwPrps.width;
  let moverect6H = imgDrwPrps.height * 0.02;

  let moverect7X = imgDrwPrps.xOffset;
  let moverect7Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.685;
  let moverect7W = imgDrwPrps.width * 0.06;
  let moverect7H = imgDrwPrps.height * 0.02;

  let moverect8X = imgDrwPrps.xOffset;
  let moverect8Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.775;
  let moverect8W = imgDrwPrps.width * 0.06;
  let moverect8H = imgDrwPrps.height * 0.02;

  let moverect9X = imgDrwPrps.xOffset;
  let moverect9Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.85;
  let moverect9W = imgDrwPrps.width;
  let moverect9H = imgDrwPrps.height * 0.02;

  let moverect10X = imgDrwPrps.xOffset;
  let moverect10Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.885;
  let moverect10W = imgDrwPrps.width * 0.06;
  let moverect10H = imgDrwPrps.height * 0.02;

  let moverect11X = imgDrwPrps.xOffset;
  let moverect11Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let moverect11W = imgDrwPrps.width;
  let moverect11H = imgDrwPrps.height * 0.02;

  let moverect12X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.08;
  let moverect12Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let moverect12W = imgDrwPrps.width * 0.457;
  let moverect12H = imgDrwPrps.height * 0.02;

  let moverect13X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let moverect13Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.805;
  let moverect13W = imgDrwPrps.width * 0.1;
  let moverect13H = imgDrwPrps.height * 0.02;

  

  // X轴上从左到右的黄色线条矩形
  let moverect14X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let moverect14Y = imgDrwPrps.yOffset;
  let moverect14W = imgDrwPrps.width * 0.02;
  let moverect14H = imgDrwPrps.height * 0.35;

  let moverect15X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect15Y = imgDrwPrps.yOffset;
  let moverect15W = imgDrwPrps.width * 0.02;
  let moverect15H = imgDrwPrps.height;

  let moverect16X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect16Y = imgDrwPrps.yOffset;
  let moverect16W = imgDrwPrps.width * 0.02;
  let moverect16H = imgDrwPrps.height * 0.96;

  let moverect17X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let moverect17Y = imgDrwPrps.yOffset;
  let moverect17W = imgDrwPrps.width * 0.02;
  let moverect17H = imgDrwPrps.height;

  let moverect18X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect18Y = imgDrwPrps.yOffset;
  let moverect18W = imgDrwPrps.width * 0.02;
  let moverect18H = imgDrwPrps.height;

  let moverect19X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let moverect19Y = imgDrwPrps.yOffset;
  let moverect19W = imgDrwPrps.width * 0.02;
  let moverect19H = imgDrwPrps.height;

  let moverect20X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect20Y = imgDrwPrps.yOffset;
  let moverect20W = imgDrwPrps.width * 0.02;
  let moverect20H = imgDrwPrps.height;

  let moverect21X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let moverect21Y = imgDrwPrps.yOffset;
  let moverect21W = imgDrwPrps.width * 0.02;
  let moverect21H = imgDrwPrps.height * 0.35;

  let moverect22X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let moverect22Y = imgDrwPrps.yOffset;
  let moverect22W = imgDrwPrps.width * 0.02;
  let moverect22H = imgDrwPrps.height * 0.430;

  let moverect23X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let moverect23Y = imgDrwPrps.yOffset;
  let moverect23W = imgDrwPrps.width * 0.02;
  let moverect23H = imgDrwPrps.height;

  let moverect24X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.647;
  let moverect24Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.450;
  let moverect24W = imgDrwPrps.width * 0.02;
  let moverect24H = imgDrwPrps.height * 0.175;

  let moverect25X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let moverect25Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.645;
  let moverect25W = imgDrwPrps.width * 0.02;
  let moverect25H = imgDrwPrps.height * 0.160;

  //固定的交叉处的正方形蓝色方块
  //第一行三个
  let moverect26X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let moverect26Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let moverect26W = imgDrwPrps.width * 0.02;
  let moverect26H = imgDrwPrps.height * 0.02;

  let moverect27X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect27Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let moverect27W = imgDrwPrps.width * 0.02;
  let moverect27H = imgDrwPrps.height * 0.02;

  let moverect28X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let moverect28Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let moverect28W = imgDrwPrps.width * 0.02;
  let moverect28H = imgDrwPrps.height * 0.02;

  //第二行四个
  let moverect29X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect29Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let moverect29W = imgDrwPrps.width * 0.02;
  let moverect29H = imgDrwPrps.height * 0.02;

  let moverect30X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect30Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let moverect30W = imgDrwPrps.width * 0.02;
  let moverect30H = imgDrwPrps.height * 0.02;

  let moverect31X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect31Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let moverect31W = imgDrwPrps.width * 0.02;
  let moverect31H = imgDrwPrps.height * 0.02;

  let moverect32X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let moverect32Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let moverect32W = imgDrwPrps.width * 0.02;
  let moverect32H = imgDrwPrps.height * 0.02;

  //第三行四个
  let moverect33X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect33Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect33W = imgDrwPrps.width * 0.02;
  let moverect33H = imgDrwPrps.height * 0.02;

  let moverect34X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let moverect34Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect34W = imgDrwPrps.width * 0.02;
  let moverect34H = imgDrwPrps.height * 0.02;

  let moverect35X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let moverect35Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect35W = imgDrwPrps.width * 0.02;
  let moverect35H = imgDrwPrps.height * 0.02;

  let moverect36X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect36Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect36W = imgDrwPrps.width * 0.02;
  let moverect36H = imgDrwPrps.height * 0.02;

  //第四行两个
  let moverect37X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect37Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let moverect37W = imgDrwPrps.width * 0.02;
  let moverect37H = imgDrwPrps.height * 0.02;

  let moverect38X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let moverect38Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let moverect38W = imgDrwPrps.width * 0.02;
  let moverect38H = imgDrwPrps.height * 0.02;

  //第五行三个
  let moverect39X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect39Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let moverect39W = imgDrwPrps.width * 0.02;
  let moverect39H = imgDrwPrps.height * 0.02;

  let moverect40X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect40Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let moverect40W = imgDrwPrps.width * 0.02;
  let moverect40H = imgDrwPrps.height * 0.02;

  let moverect41X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let moverect41Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let moverect41W = imgDrwPrps.width * 0.02;
  let moverect41H = imgDrwPrps.height * 0.02;

  //第六行两个
  let moverect42X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect42Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let moverect42W = imgDrwPrps.width * 0.02;
  let moverect42H = imgDrwPrps.height * 0.02;

  let moverect43X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect43Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let moverect43W = imgDrwPrps.width * 0.02;
  let moverect43H = imgDrwPrps.height * 0.02;

  //第八行一个
  let moverect44X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let moverect44Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let moverect44W = imgDrwPrps.width * 0.02;
  let moverect44H = imgDrwPrps.height * 0.02;
  
  //第十行一个
  let moverect45X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect45Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.805;
  let moverect45W = imgDrwPrps.width * 0.02;
  let moverect45H = imgDrwPrps.height * 0.02;

  //第十一行四个
  let moverect46X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect46Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let moverect46W = imgDrwPrps.width * 0.02;
  let moverect46H = imgDrwPrps.height * 0.02;
  
  let moverect47X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect47Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let moverect47W = imgDrwPrps.width * 0.02;
  let moverect47H = imgDrwPrps.height * 0.02;
  
  let moverect48X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let moverect48Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let moverect48W = imgDrwPrps.width * 0.02;
  let moverect48H = imgDrwPrps.height * 0.02;

  let moverect49X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect49Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let moverect49W = imgDrwPrps.width * 0.02;
  let moverect49H = imgDrwPrps.height * 0.02;

  //第十三行三个
  let moverect50X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect50Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let moverect50W = imgDrwPrps.width * 0.02;
  let moverect50H = imgDrwPrps.height * 0.02;
  
  let moverect51X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let moverect51Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let moverect51W = imgDrwPrps.width * 0.02;
  let moverect51H = imgDrwPrps.height * 0.02;

  let moverect52X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect52Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let moverect52W = imgDrwPrps.width * 0.02;
  let moverect52H = imgDrwPrps.height * 0.02;


  //固定的交叉处的正方形红色方块
  //第二行两个个
  let moverect53X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let moverect53Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let moverect53W = imgDrwPrps.width * 0.02;
  let moverect53H = imgDrwPrps.height * 0.02;
  
  let moverect54X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let moverect54Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.160;
  let moverect54W = imgDrwPrps.width * 0.02;
  let moverect54H = imgDrwPrps.height * 0.02;

  //第三行三个
  let moverect55X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.025;
  let moverect55Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect55W = imgDrwPrps.width * 0.02;
  let moverect55H = imgDrwPrps.height * 0.02;

  let moverect56X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect56Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect56W = imgDrwPrps.width * 0.02;
  let moverect56H = imgDrwPrps.height * 0.02;

  let moverect57X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let moverect57Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect57W = imgDrwPrps.width * 0.02;
  let moverect57H = imgDrwPrps.height * 0.02;

  //第四行四个
  let moverect58X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect58Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let moverect58W = imgDrwPrps.width * 0.02;
  let moverect58H = imgDrwPrps.height * 0.02;

  let moverect59X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect59Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let moverect59W = imgDrwPrps.width * 0.02;
  let moverect59H = imgDrwPrps.height * 0.02;

  let moverect60X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let moverect60Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let moverect60W = imgDrwPrps.width * 0.02;
  let moverect60H = imgDrwPrps.height * 0.02;

  let moverect61X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let moverect61Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let moverect61W = imgDrwPrps.width * 0.02;
  let moverect61H = imgDrwPrps.height * 0.02;

  //第五行三个
  let moverect62X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.647;
  let moverect62Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let moverect62W = imgDrwPrps.width * 0.02;
  let moverect62H = imgDrwPrps.height * 0.02;
  
  let moverect63X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect63Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let moverect63W = imgDrwPrps.width * 0.02;
  let moverect63H = imgDrwPrps.height * 0.02;
  
  let moverect64X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let moverect64Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let moverect64W = imgDrwPrps.width * 0.02;
  let moverect64H = imgDrwPrps.height * 0.02;

  //第六行三个
  let moverect65X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect65Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let moverect65W = imgDrwPrps.width * 0.02;
  let moverect65H = imgDrwPrps.height * 0.02;
  
  let moverect66X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.225;
  let moverect66Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let moverect66W = imgDrwPrps.width * 0.02;
  let moverect66H = imgDrwPrps.height * 0.02;
  
  let moverect67X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let moverect67Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let moverect67W = imgDrwPrps.width * 0.02;
  let moverect67H = imgDrwPrps.height * 0.02;

  //第七行一个
  let moverect68X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect68Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.685;
  let moverect68W = imgDrwPrps.width * 0.02;
  let moverect68H = imgDrwPrps.height * 0.02;

  //第八行两个
  let moverect69X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect69Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let moverect69W = imgDrwPrps.width * 0.02;
  let moverect69H = imgDrwPrps.height * 0.02;

  let moverect70X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect70Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let moverect70W = imgDrwPrps.width * 0.02;
  let moverect70H = imgDrwPrps.height * 0.02;

  //第九行一个
  let moverect71X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect71Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.775;
  let moverect71W = imgDrwPrps.width * 0.02;
  let moverect71H = imgDrwPrps.height * 0.02;

  //第十行三个
  let moverect72X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let moverect72Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let moverect72W = imgDrwPrps.width * 0.02;
  let moverect72H = imgDrwPrps.height * 0.02;
  
  let moverect73X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.842;
  let moverect73Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let moverect73W = imgDrwPrps.width * 0.02;
  let moverect73H = imgDrwPrps.height * 0.02;

  let moverect74X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let moverect74Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.850;
  let moverect74W = imgDrwPrps.width * 0.02;
  let moverect74H = imgDrwPrps.height * 0.02;

  //第十三行两个
  let moverect75X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.06;
  let moverect75Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let moverect75W = imgDrwPrps.width * 0.02;
  let moverect75H = imgDrwPrps.height * 0.02;

  let moverect76X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let moverect76Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let moverect76W = imgDrwPrps.width * 0.02;
  let moverect76H = imgDrwPrps.height * 0.02;

  //固定的交叉处的正方形灰色方块
  //第一行一个
  let moverect77X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let moverect77Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.024;
  let moverect77W = imgDrwPrps.width * 0.02;
  let moverect77H = imgDrwPrps.height * 0.02;

  //第三行三个
  let moverect78X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.115;
  let moverect78Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect78W = imgDrwPrps.width * 0.02;
  let moverect78H = imgDrwPrps.height * 0.02;

  let moverect79X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.922;
  let moverect79Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect79W = imgDrwPrps.width * 0.02;
  let moverect79H = imgDrwPrps.height * 0.02;

  let moverect80X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.962;
  let moverect80Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.350;
  let moverect80W = imgDrwPrps.width * 0.02;
  let moverect80H = imgDrwPrps.height * 0.02;
  
  //第四行两个
  let moverect81X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect81Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let moverect81W = imgDrwPrps.width * 0.02;
  let moverect81H = imgDrwPrps.height * 0.02;

  let moverect82X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let moverect82Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.430;
  let moverect82W = imgDrwPrps.width * 0.02;
  let moverect82H = imgDrwPrps.height * 0.02;

  //第五行两个
  let moverect83X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect83Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let moverect83W = imgDrwPrps.width * 0.02;
  let moverect83H = imgDrwPrps.height * 0.02;

  let moverect84X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let moverect84Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.560;
  let moverect84W = imgDrwPrps.width * 0.02;
  let moverect84H = imgDrwPrps.height * 0.02;

  //第六行两个
  let moverect85X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect85Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let moverect85W = imgDrwPrps.width * 0.02;
  let moverect85H = imgDrwPrps.height * 0.02;

  let moverect86X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let moverect86Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.625;
  let moverect86W = imgDrwPrps.width * 0.02;
  let moverect86H = imgDrwPrps.height * 0.02;

  //第七行一个
  let moverect87X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect87Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.725;
  let moverect87W = imgDrwPrps.width * 0.02;
  let moverect87H = imgDrwPrps.height * 0.02;

  //第十三行两个
  let moverect88X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.537;
  let moverect88Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let moverect88W = imgDrwPrps.width * 0.02;
  let moverect88H = imgDrwPrps.height * 0.02;

  let moverect89X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.577;
  let moverect89Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.940;
  let moverect89W = imgDrwPrps.width * 0.02;
  let moverect89H = imgDrwPrps.height * 0.02;

  //固定的灰色矩形
  let moverect106X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.165;
  let moverect106Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.285;
  let moverect106W = imgDrwPrps.width * 0.03;
  let moverect106H = imgDrwPrps.height * 0.03;

  let moverect107X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.17;
  let moverect107Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.39;
  let moverect107W = imgDrwPrps.width * 0.025;
  let moverect107H = imgDrwPrps.height * 0.025;

  let moverect108X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.170;
  let moverect108Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.795;
  let moverect108W = imgDrwPrps.width * 0.03;
  let moverect108H = imgDrwPrps.height * 0.025;



  //移动的灰色矩形
  let moverect115X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.407;
  let randommoverect5 = random(0.37, 0.505);
  let moverect115Y = imgDrwPrps.yOffset + imgDrwPrps.height * randommoverect5;
  let moverect115W = imgDrwPrps.width * 0.07;
  let moverect115H = imgDrwPrps.height * 0.055;

  let randommoverect6 = random(0.71, 0.73);
  let moverect116X = imgDrwPrps.xOffset + imgDrwPrps.width * randommoverect6;
  let randommoverect7 = random(0.48, 0.51);
  let moverect116Y = imgDrwPrps.yOffset + imgDrwPrps.height * randommoverect7;
  let randommoverect8 = random(0.025, 0.04);
  let moverect116W = imgDrwPrps.width * randommoverect8;
  let randommoverect9 = random(0.025, 0.05);
  let moverect116H = imgDrwPrps.height * randommoverect9;

  //固定的红色矩形
  let moverect90X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.155;
  let moverect90Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.044;
  let moverect90W = imgDrwPrps.width * 0.045;
  let moverect90H = imgDrwPrps.height * 0.116;

  let moverect91X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let moverect91Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.495;
  let moverect91W = imgDrwPrps.width * 0.09;
  let moverect91H = imgDrwPrps.height * 0.065;

  let moverect92X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let moverect92Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.765;
  let moverect92W = imgDrwPrps.width * 0.06;
  let moverect92H = imgDrwPrps.height * 0.04;

  let moverect93X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.697;
  let moverect93Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.450;
  let moverect93W = imgDrwPrps.width * 0.085;
  let moverect93H = imgDrwPrps.height * 0.11;

  let moverect95X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.652;
  let moverect95Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.23;
  let moverect95W = imgDrwPrps.width * 0.09;
  let moverect95H = imgDrwPrps.height * 0.08;

  let moverect109X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let moverect109Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.780;
  let moverect109W = imgDrwPrps.width * 0.09;
  let moverect109H = imgDrwPrps.height * 0.07;

  //移动的红色矩形
  let moverect120X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.877;
  let randommoverect11 = random(0.18, 0.29);
  let moverect120Y = imgDrwPrps.yOffset + imgDrwPrps.height * randommoverect11;
  let moverect120W = imgDrwPrps.width * 0.065;
  let moverect120H = imgDrwPrps.height * 0.06;

  let randommoverect12 = random(0.245, 0.472);
  let moverect121X = imgDrwPrps.xOffset + imgDrwPrps.width * randommoverect12;
  let moverect121Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.94;
  let moverect121W = imgDrwPrps.width * 0.065;
  let moverect121H = imgDrwPrps.height * 0.06;

  //固定的蓝色矩形
  let moverect94X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.652;
  let moverect94Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.180;
  let moverect94W = imgDrwPrps.width * 0.09;
  let moverect94H = imgDrwPrps.height * 0.170;

  let moverect96X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.285;
  let moverect96Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.475;
  let moverect96W = imgDrwPrps.width * 0.065;
  let moverect96H = imgDrwPrps.height * 0.085;

  let moverect97X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let moverect97Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.665;
  let moverect97W = imgDrwPrps.width * 0.06;
  let moverect97H = imgDrwPrps.height * 0.065;

  //移动的蓝色矩形
  let moverect111X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.08;
  let randommoverect2 = random(0.18, 0.295);
  let moverect111Y = imgDrwPrps.yOffset + imgDrwPrps.height * randommoverect2;
  let moverect111W = imgDrwPrps.width * 0.055;
  let moverect111H = imgDrwPrps.height * 0.055;

  let moverect113X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.897;
  let randommoverect3 = random(0.044, 0.125);
  let moverect113Y = imgDrwPrps.yOffset + imgDrwPrps.height * randommoverect3;
  let moverect113W = imgDrwPrps.width * 0.065;
  let moverect113H = imgDrwPrps.height * 0.035;

  let randommoverect4 = random(0.08, 0.482);
  let moverect114X = imgDrwPrps.xOffset + imgDrwPrps.width * randommoverect4;
  let moverect114Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.67;
  let moverect114W = imgDrwPrps.width * 0.055;
  let moverect114H = imgDrwPrps.height * 0.055;

  //固定的黄色矩形
  let moverect98X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let moverect98Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.265;
  let moverect98W = imgDrwPrps.width * 0.09;
  let moverect98H = imgDrwPrps.height * 0.06;
  
  let moverect99X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.155;
  let moverect99Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.370;
  let moverect99W = imgDrwPrps.width * 0.046;
  let moverect99H = imgDrwPrps.height * 0.06;

  let moverect100X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.285;
  let moverect100Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.45;
  let moverect100W = imgDrwPrps.width * 0.065;
  let moverect100H = imgDrwPrps.height * 0.025;

  let moverect101X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.407;
  let moverect101Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.370;
  let moverect101W = imgDrwPrps.width * 0.07;
  let moverect101H = imgDrwPrps.height * 0.19;

  let moverect102X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let moverect102Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.48;
  let moverect102W = imgDrwPrps.width * 0.1;
  let moverect102H = imgDrwPrps.height * 0.05;

  let moverect103X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.862;
  let moverect103Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.72;
  let moverect103W = imgDrwPrps.width * 0.06;
  let moverect103H = imgDrwPrps.height * 0.045;

  let moverect104X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.682;
  let moverect104Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.260;
  let moverect104W = imgDrwPrps.width * 0.045;
  let moverect104H = imgDrwPrps.height * 0.035;

  let moverect105X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.295;
  let moverect105Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.5;
  let moverect105W = imgDrwPrps.width * 0.045;
  let moverect105H = imgDrwPrps.height * 0.035;
  
  //移动的黄色矩形
  let moverect110X = imgDrwPrps.xOffset + imgDrwPrps.width * 0.135;
  let randommoverect1 = random(0.044, 0.13);
  let moverect110Y = imgDrwPrps.yOffset + imgDrwPrps.height * randommoverect1;
  let moverect110W = imgDrwPrps.width * 0.09;
  let moverect110H = imgDrwPrps.height * 0.03;

  //组合矩形移动
  let randommoverect10 = random(0.245, 0.467);
  let moverect117X = imgDrwPrps.xOffset + imgDrwPrps.width * randommoverect10;
  let moverect117Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.044;
  let moverect117W = imgDrwPrps.width * 0.07;
  let moverect117H = imgDrwPrps.height * 0.085;

  let moverect118X = imgDrwPrps.xOffset + imgDrwPrps.width * randommoverect10;
  let moverect118Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.129;
  let moverect118W = imgDrwPrps.width * 0.07;
  let moverect118H = imgDrwPrps.height * 0.031;

  let moverect119X = imgDrwPrps.xOffset + imgDrwPrps.width * (randommoverect10 + 0.015);
  let moverect119Y = imgDrwPrps.yOffset + imgDrwPrps.height * 0.069;
  let moverect119W = imgDrwPrps.width * 0.04;
  let moverect119H = imgDrwPrps.height * 0.035;

  // 绘制色块
  fill(75, 107, 186); // 蓝色，图层
  moverect(moverect113X, moverect113Y, moverect113W, moverect113H);

  fill(230, 207, 48); // 黄色
  //横着的固定黄色矩形线条
  moverect(moverect1X, moverect1Y, moverect1W, moverect1H);
  moverect(moverect2X, moverect2Y, moverect2W, moverect2H);
  moverect(moverect3X, moverect3Y, moverect3W, moverect3H);
  moverect(moverect4X, moverect4Y, moverect4W, moverect4H);
  moverect(moverect5X, moverect5Y, moverect5W, moverect5H);
  moverect(moverect6X, moverect6Y, moverect6W, moverect6H);
  moverect(moverect7X, moverect7Y, moverect7W, moverect7H);
  moverect(moverect8X, moverect8Y, moverect8W, moverect8H);
  moverect(moverect9X, moverect9Y, moverect9W, moverect9H);
  moverect(moverect10X, moverect10Y, moverect10W, moverect10H);
  moverect(moverect11X, moverect11Y, moverect11W, moverect11H);
  moverect(moverect12X, moverect12Y, moverect12W, moverect12H);
  moverect(moverect13X, moverect13Y, moverect13W, moverect13H);
  //竖着的固定黄色矩形线条
  moverect(moverect14X, moverect14Y, moverect14W, moverect14H);
  moverect(moverect15X, moverect15Y, moverect15W, moverect15H);
  moverect(moverect16X, moverect16Y, moverect16W, moverect16H);
  moverect(moverect17X, moverect17Y, moverect17W, moverect17H);
  moverect(moverect18X, moverect18Y, moverect18W, moverect18H);
  moverect(moverect19X, moverect19Y, moverect19W, moverect19H);
  moverect(moverect20X, moverect20Y, moverect20W, moverect20H);
  moverect(moverect21X, moverect21Y, moverect21W, moverect21H);
  moverect(moverect22X, moverect22Y, moverect22W, moverect22H);
  moverect(moverect23X, moverect23Y, moverect23W, moverect23H);
  moverect(moverect24X, moverect24Y, moverect24W, moverect24H);
  moverect(moverect25X, moverect25Y, moverect25W, moverect25H);

  //固定的黄色矩形
  moverect(moverect98X, moverect98Y, moverect98W, moverect98H);
  moverect(moverect99X, moverect99Y, moverect99W, moverect99H);
  moverect(moverect100X, moverect100Y, moverect100W, moverect100H);
  moverect(moverect101X, moverect101Y, moverect101W, moverect101H);
  moverect(moverect102X, moverect102Y, moverect102W, moverect102H);
  moverect(moverect103X, moverect103Y, moverect103W, moverect103H);

  fill(173, 58, 47); // 红色
  //第二行两个个
  moverect(moverect53X, moverect53Y, moverect53W, moverect53H);
  moverect(moverect54X, moverect54Y, moverect54W, moverect54H);

  //第三行三个
  moverect(moverect55X, moverect55Y, moverect55W, moverect55H);
  moverect(moverect56X, moverect56Y, moverect56W, moverect56H);
  moverect(moverect57X, moverect57Y, moverect57W, moverect57H);

  //第四行四个
  moverect(moverect58X, moverect58Y, moverect58W, moverect58H);
  moverect(moverect59X, moverect59Y, moverect59W, moverect59H);
  moverect(moverect60X, moverect60Y, moverect60W, moverect60H);
  moverect(moverect61X, moverect61Y, moverect61W, moverect61H);

  //第五行三个
  moverect(moverect62X, moverect62Y, moverect62W, moverect62H);
  moverect(moverect63X, moverect63Y, moverect63W, moverect63H);
  moverect(moverect64X, moverect64Y, moverect64W, moverect64H);

  //第六行三个
  moverect(moverect65X, moverect65Y, moverect65W, moverect65H);
  moverect(moverect66X, moverect66Y, moverect66W, moverect66H);
  moverect(moverect67X, moverect67Y, moverect67W, moverect67H);

  //第六行三个
  moverect(moverect68X, moverect68Y, moverect68W, moverect68H);

  //第七行两个
  moverect(moverect69X, moverect69Y, moverect69W, moverect69H);
  moverect(moverect70X, moverect70Y, moverect70W, moverect70H);

  //第七行一个
  moverect(moverect71X, moverect71Y, moverect71W, moverect71H);

  //第十行三个
  moverect(moverect72X, moverect72Y, moverect72W, moverect72H);
  moverect(moverect73X, moverect73Y, moverect73W, moverect73H);
  moverect(moverect74X, moverect74Y, moverect74W, moverect74H);

  //第十三行两个
  moverect(moverect75X, moverect75Y, moverect75W, moverect75H);
  moverect(moverect76X, moverect76Y, moverect76W, moverect76H);

  //固定的红色矩形
  moverect(moverect90X, moverect90Y, moverect90W, moverect90H);
  moverect(moverect91X, moverect91Y, moverect91W, moverect91H);
  moverect(moverect92X, moverect92Y, moverect92W, moverect92H);
  moverect(moverect93X, moverect93Y, moverect93W, moverect93H);
  moverect(moverect109X, moverect109Y, moverect109W, moverect109H);

  //移动的红色矩形
  moverect(moverect117X, moverect117Y, moverect117W, moverect117H);
  moverect(moverect120X, moverect120Y, moverect120W, moverect120H);
  moverect(moverect121X, moverect121Y, moverect121W, moverect121H);

  //移动的红色小矩形
  for (let i = 0; i < 2; i++) {
    let randX = moverect1X + random(imgDrwPrps.width * 0.045, imgDrwPrps.width * 0.822);
    let randY = moverect1Y + random(0, moverect1H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect2X + random(imgDrwPrps.width * 0.135, imgDrwPrps.width * 0.517);
    let randY = moverect2Y + random(0, moverect2H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect3X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = moverect3Y + random(0, moverect3H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect4X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.387);
    let randY = moverect4Y + random(0, moverect4H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect5X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.517);
    let randY = moverect5Y + random(0, moverect5H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect6X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = moverect6Y + random(0, moverect6H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect12X + random(imgDrwPrps.width * 0.165, imgDrwPrps.width * 0.437);
    let randY = moverect12Y + random(0, moverect12H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect11X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = moverect11Y + random(0, moverect11H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect17X +random(0, moverect17W - (imgDrwPrps.width * 0.02));
    let randY = moverect17Y + random(imgDrwPrps.width * 0.18, imgDrwPrps.width * 0.33);
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  fill(75, 107, 186); // 蓝色
  //第一行三个
  moverect(moverect26X, moverect26Y, moverect26W, moverect26H);
  moverect(moverect27X, moverect27Y, moverect27W, moverect27H);
  moverect(moverect28X, moverect28Y, moverect28W, moverect28H);
  //第二行四个
  moverect(moverect29X, moverect29Y, moverect29W, moverect29H);
  moverect(moverect30X, moverect30Y, moverect30W, moverect30H);
  moverect(moverect31X, moverect31Y, moverect31W, moverect31H);
  moverect(moverect32X, moverect32Y, moverect32W, moverect32H);
  //第三行四个
  moverect(moverect33X, moverect33Y, moverect33W, moverect33H);
  moverect(moverect34X, moverect34Y, moverect34W, moverect34H);
  moverect(moverect35X, moverect35Y, moverect35W, moverect35H);
  moverect(moverect36X, moverect36Y, moverect36W, moverect36H);

  //第四行两个
  moverect(moverect37X, moverect37Y, moverect37W, moverect37H);
  moverect(moverect38X, moverect38Y, moverect38W, moverect38H);

  //第五行三个
  moverect(moverect39X, moverect39Y, moverect39W, moverect39H);
  moverect(moverect40X, moverect40Y, moverect40W, moverect40H);
  moverect(moverect41X, moverect41Y, moverect41W, moverect41H);

  //第六行两个
  moverect(moverect42X, moverect42Y, moverect42W, moverect42H);
  moverect(moverect43X, moverect43Y, moverect43W, moverect43H);

  //第八行一个
  moverect(moverect44X, moverect44Y, moverect44W, moverect44H);

  //第十行一个
  moverect(moverect45X, moverect45Y, moverect45W, moverect45H);

  //第十一行四个
  moverect(moverect46X, moverect46Y, moverect46W, moverect46H);
  moverect(moverect47X, moverect47Y, moverect47W, moverect47H);
  moverect(moverect48X, moverect48Y, moverect48W, moverect48H);
  moverect(moverect49X, moverect49Y, moverect49W, moverect49H);

  //第十三行三个
  moverect(moverect50X, moverect50Y, moverect50W, moverect50H);
  moverect(moverect51X, moverect51Y, moverect51W, moverect51H);
  moverect(moverect52X, moverect52Y, moverect52W, moverect52H);

  //固定的蓝色矩形
  moverect(moverect94X, moverect94Y, moverect94W, moverect94H);
  moverect(moverect96X, moverect96Y, moverect96W, moverect96H);
  moverect(moverect97X, moverect97Y, moverect97W, moverect97H);

  //移动的蓝色矩形
  moverect(moverect111X, moverect111Y, moverect111W, moverect111H);
  
  //移动的蓝色小矩形
  for (let i = 0; i < 3; i++) {
    let randX = moverect1X + random(imgDrwPrps.width * 0.045, imgDrwPrps.width * 0.822);
    let randY = moverect1Y + random(0, moverect1H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect4X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = moverect4Y + random(0, moverect4H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect6X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.517);
    let randY = moverect6Y + random(0, moverect6H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect9X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = moverect9Y + random(0, moverect9H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect19X +random(0, moverect17W - (imgDrwPrps.width * 0.02));
    let randY = moverect19Y + random(imgDrwPrps.width * 0.645, imgDrwPrps.width * 0.83);
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }


  
  fill(173, 58, 47); // 红色，图层转换
  moverect(moverect95X, moverect95Y, moverect95W, moverect95H);

  fill(219, 217, 213); // 灰色
  //第一行一个
  moverect(moverect77X, moverect77Y, moverect77W, moverect77H);

  //第三行三个
  moverect(moverect78X, moverect78Y, moverect78W, moverect78H);
  moverect(moverect79X, moverect79Y, moverect79W, moverect79H);
  moverect(moverect80X, moverect80Y, moverect80W, moverect80H);

  //第四行两个
  moverect(moverect81X, moverect81Y, moverect81W, moverect81H);
  moverect(moverect82X, moverect82Y, moverect82W, moverect82H);

  //第五行两个
  moverect(moverect83X, moverect83Y, moverect83W, moverect83H);
  moverect(moverect84X, moverect84Y, moverect84W, moverect84H);

  //第六行两个
  moverect(moverect85X, moverect85Y, moverect85W, moverect85H);
  moverect(moverect86X, moverect86Y, moverect86W, moverect86H);

  //第八行一个
  moverect(moverect87X, moverect87Y, moverect87W, moverect87H);

  //第十三行两个
  moverect(moverect88X, moverect88Y, moverect88W, moverect88H);
  moverect(moverect89X, moverect89Y, moverect89W, moverect89H);
  
  //固定的灰色矩形
  moverect(moverect106X, moverect106Y, moverect106W, moverect106H);
  moverect(moverect107X, moverect107Y, moverect107W, moverect107H);
  moverect(moverect108X, moverect108Y, moverect108W, moverect108H);

  //移动的灰色矩形
  moverect(moverect115X, moverect115Y, moverect115W, moverect115H);
  moverect(moverect116X, moverect116Y, moverect116W, moverect116H);
  moverect(moverect118X, moverect118Y, moverect118W, moverect118H);
  moverect(moverect119X, moverect119Y, moverect119W, moverect119H);
  
  //移动的灰色小正方形
  for (let i = 0; i < 3; i++) {
    let randX = moverect1X + random(imgDrwPrps.width * 0.045, imgDrwPrps.width * 0.822);
    let randY = moverect1Y + random(0, moverect1H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 3; i++) {
    let randX = moverect2X + random(imgDrwPrps.width * 0.135, imgDrwPrps.width * 0.517);
    let randY = moverect2Y + random(0, moverect2H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect2X + random(imgDrwPrps.width * 0.597, imgDrwPrps.width * 0.822);
    let randY = moverect2Y + random(0, moverect2H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect3X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.517);
    let randY = moverect3Y + random(0, moverect3H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect9X + random(imgDrwPrps.width * 0.245, imgDrwPrps.width * 0.517);
    let randY = moverect9Y + random(0, moverect9H - (imgDrwPrps.height * 0.02));
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect15X +random(0, moverect15W - (imgDrwPrps.width * 0.02));
    let randY = moverect15Y + random(imgDrwPrps.width * 0.044, imgDrwPrps.width * 0.33);
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 2; i++) {
    let randX = moverect18X +random(0, moverect18W - (imgDrwPrps.width * 0.02));
    let randY = moverect18Y + random(imgDrwPrps.width * 0.18, imgDrwPrps.width * 0.33);
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }

  for (let i = 0; i < 1; i++) {
    let randX = moverect19X +random(0, moverect17W - (imgDrwPrps.width * 0.02));
    let randY = moverect19Y + random(imgDrwPrps.width * 0.18, imgDrwPrps.width * 0.33);
    let randW = imgDrwPrps.width * 0.02;
    let randH = imgDrwPrps.height * 0.02;
    moverect(randX, randY, randW, randH);
  }



  fill(230, 207, 48); // 黄色,图层转换
  //固定的黄色矩形
  moverect(moverect104X, moverect104Y, moverect104W, moverect104H);
  moverect(moverect105X, moverect105Y, moverect105W, moverect105H);

  //移动的黄色矩形
  moverect(moverect110X, moverect110Y, moverect110W, moverect110H);

  fill(75, 107, 186); // 蓝色，图层转换
  moverect(moverect114X, moverect114Y, moverect114W, moverect114H);

  
  /*// 设置描边 这个是给图画描边的方法
  stroke(0); // 黑色描边
  strokeWeight(2); // 描边宽度
  noFill();
  moverect(imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);*/

  //两侧填充黑色的方法
  fill(0, 0, 0);
  // moverect(0, 0, imgDrwPrps.xOffset, height); // 左侧黑色填充
  // moverect(imgDrwPrps.xOffset + imgDrwPrps.width, 0, width - (imgDrwPrps.xOffset + imgDrwPrps.width), height); // 右侧黑色填充
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateCanvasProps();
  redraw(); // 重新绘制画布
}

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