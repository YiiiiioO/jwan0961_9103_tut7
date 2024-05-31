let cubes = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  // Generate 100 random cubes
  for (let i = 0; i < 100; i++) {
    let cube = {
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      size: random(20, 50)
    };
    cubes.push(cube);
  }
}

function draw() {
  background(200);
  orbitControl(); // Allows you to orbit around the cubes with the mouse
  
  for (let cube of cubes) {
    push();
    translate(cube.x, cube.y, cube.z);
    fill(random(255), random(255), random(255));
    box(cube.size);
    pop();
  }
}
