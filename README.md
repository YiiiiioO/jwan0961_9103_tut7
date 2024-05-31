# Creative coding major project

## interactive Description
This code is based on the group work, but adding extra functions on it. There are three main pages over here. To switch among three page, you can simply press key '2', '3', and 'c'. 

On page '2', you can increase, decrease the width and hight of the artwork by press keys 'up', 'down', 'left', 'right'. On page '3', mouse actions are available. Keep pressing the left key of mouse to rotate and pressing right key to transform it. Zoom in and out are also available if you scroll your roller. 

## individual approach
Based on the group project, I developed 3D dynamic effects. If you press key 2, it will switch to a 2D plane state where squares and small squares simulate the fast flow and jitter of vehicles. In this state, pressing the up or down arrow keys will increase or decrease the height of the shapes, while pressing the left and right arrow keys will increase or decrease their width. If you press key 3, you will get a 3D shape. By pressing the left mouse button, you can freely rotate the shape to view its details; by holding the right mouse button, you can pan the shape; and by scrolling the mouse wheel, you can zoom in or out. Pressing key C will return you to the initial page.

## inspiration
My inspiration comes from the evolution of Pokemon and the movie "Maze Runner". I feel that the fragmented sense of Pokemon's evolution is exactly what I expect from this artwork. I think that by using a spiral-upward style and feeling, I can enhance the three-dimensional aspect of this artwork. Additionally, because this artwork is based on a basic square or pixel style, it also corresponds well to the feeling of the digital world depicted in the Digimon series. The theme I want to convey is the sensation of traversing spatial dimensions, from a 2D plane to a three-dimensional space.

![Evolution of Caterpie](image.png)
Evolution of Caterpie

![Poster of The Maze Runner](image-1.png)
Poster of The Maze Runner

## technical explanation
The spiral upward movement on the initial page is inspired by the ["Sine Cosine in 3D"](https://p5js.org/examples/3d-sine-cosine-in-3d.html) page in ['P5.js'](https://p5js.org/). The background is adapted based on my team member's work. The fading effect is achieved by overlaying a layer with gradually decreasing opacity. As the frame count increases, the opacity decreases, eventually covering the entire base to create a sense of gradual disappearance. 

The zoom in and zoom out techniques on the page '2' are derived from previous class learnings, and the 3D effect on the page '3' is based on an equation called ["box"](https://p5js.org/reference/#/p5/box) in P5.js.
