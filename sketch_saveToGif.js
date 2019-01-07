var rate = 10;
var capturer = new CCapture( { format: 'gif', workersPath: './src/', name:'animation', framerate: rate} );

var patternArray = [
  [18,,,,18,,,0,,,,0],
  [,16,,16,,,,,2,,2,],
  [,,14,,,,,,,4,,],
  [,12,,12,,,,,6,,6,],
  [10,,,,10,,,8,,,,8],
  [,,,,,18,18,,,,,],
  [,,,,,18,18,,,,,],
  [9,,,,9,,,11,,,,11],
  [,7,,7,,,,,13,,13,],
  [,,5,,,,,,,15,,],
  [,3,,3,,,,,17,,17,],
  [1,,,,1,,,19,,,,19]];

//color of arrays
let vegBGColors=[[232,231,236],
               [134,49,70],
               [194,54,29],
               [27,32,25],
               [247,218,62],
               [232,231,236],
               [232,231,236],
               [23,39,91],
               [232,231,236],
               [110,85,104],
               [13,59,48],
               [27,32,25],];

let BGColors=[[232,231,236],
              [194,54,29],
              [27,32,25],
              [247,218,62]];

//canvas setup
var canvasW=336*2.5;
var canvasH=451*2.5;

//grid set up
//number of rows and columns
var rows = patternArray.length;
var cols = patternArray[0].length;
//cell width and height
var cellW= canvasW/cols;
var cellH= canvasH/rows
//cell center and upper left corner
let cellC= [cellW/2, cellH/2];
let cellULCorner = [0,0];

let fontsize = cellH*.25;

let i=0;
let l=0;
let layer = 0;

function drawGrid(){
  strokeWeight(1);
  stroke(0,255,255);
  for(var v=1; v<cols; v++){
    line(cellW*v,0,cellW*v,canvasH);
  }
  for(var v=1; v<rows; v++){
    line(0,cellH*v,canvasW,cellH*v);
  }
}
function drawNumber(r,c){
  textAlign(CENTER);
  textSize(fontsize)
  if(patternArray[r][c] != undefined){
    text(str(patternArray[r][c]), cellULCorner[0], cellC[1]+5, cellW);
  }
}


function drawZero(x,y,w,h){
  //draw zero symbol with center at coordinates (x,y)
  //and in bounding box of w x h (width x height)

  //height of zero symbol
  const zeroH = h*0.8

  noFill();
  strokeWeight(7);
  stroke(0);

  ellipse(x,y,w*0.8,zeroH);
  line(x,y-zeroH/2,x,y+zeroH/2-3)
}

function drawVegesimal(num, x, y, w, h){
  //draw symbol for number, num with bounding box
  //of w x h (width x height) upper left corner
  //at coordinates (x,y)



  if(num==0){
      //draw special zero symbol
      drawZero(x+w/2, y+h/2,w,h);
  }
  else{
    //number of lines and circles in vigesimal, to be calculated later
    let numRect = 0;
    let numCirc = 0;
    //total symbol width, to be calculated later
    let symbW = 0;
    //0 or 1 depending on whether the symbol has circles or not
    let symbC = 0;

    //rectangle dimensions
    let rectHeight = h*0.65;
    let rectThickness = 0.12*w;
    let rectSpacing=rectThickness*0.5;
    let totalRectW = 0;

    //circle dimensions
    let circD= rectHeight*0.15;
    let circSpacing = 0.25*circD;

    //overall vertical shift of the circle pattern
    let offsetY = 0;
    //coordinates for where to draw the first circle
    let circleStartX = 0;
    let circleStartY = 0;

    noStroke();
    //divide number by 5
    //for every multiple of 5, draw a rectangle
    numRect = floor(num/5);

    //remainder is circles
    numCirc = num%5;

    //determine if the symbol has circles or not
    if (numCirc>0){
      symbC = 1;
    }
    else{
      symbC = 0;
    }

    //width of total number of rectangles
    totalRectW = numRect*rectThickness+(numRect-1)*rectSpacing;

    //calculate the width of the entire symbol, for centering calculations
    symbW = totalRectW + symbC * (circD + circSpacing);

    //calculate where to start drawing the circles, offset from lines, centered vertically
    circleStartX = x + ((w-symbW)/2) + circD/2;
    //center vertically
    offsetY = (h - (numCirc * circD) - (numCirc-1)*circSpacing)/2;
    circleStartY = y + offsetY + (circD/2);

    //draw circles
    for(k = 0; k<numCirc; k++){
      ellipse(circleStartX, circleStartY + ((circD+circSpacing)*k),circD,circD);
    }

    //draw rectangles
    for(j = 0; j<numRect; j++){
      rect(x+((w-symbW)/2)+symbC*(circD+circSpacing)+(rectThickness+rectSpacing)*j ,y+((h-rectHeight)/2),rectThickness,rectHeight);
    }
  }
}

function drawCell(r,c){
  if(patternArray[r][c] != undefined){

        if(r==5 && c==5){
          //at the center rectangle, draw double the cell height and width
        	//draw BG rectangle
        	rect(cellULCorner[0], cellULCorner[1],cellW*2,cellH*2);
          push();
          fill(27,32,25);
          drawVegesimal(patternArray[r][c],cellULCorner[0], cellULCorner[1],cellW*2, cellH*2);
          pop();
          cellC[0]=cellC[0]+cellW;
        	cellULCorner[0] = cellULCorner[0]+ cellW;
        }
        else{
          //draw BG rectangle
        	rect(cellULCorner[0], cellULCorner[1],cellW,cellH);
          push();
          //draw the vigesimal black or white depending on the background color
          if(vegBGColors[r][0]<160){
            fill(232,231,236);
          }
          else{
            fill(27,32,25);
          }

          drawVegesimal(patternArray[r][c],cellULCorner[0], cellULCorner[1],cellW, cellH);
          pop();
        }
      }
      else{
        push();
        if(r<6){
          if(c<6){
            fill(color(BGColors[0][0],BGColors[0][1],BGColors[0][2]));
          }
          else{
            fill(color(BGColors[1][0],BGColors[1][1],BGColors[1][2]));
          }
        }
        else{
          if(c<6){
            fill(color(BGColors[2][0],BGColors[2][1],BGColors[2][2]));
          }
          else{
            fill(color(BGColors[3][0],BGColors[3][1],BGColors[3][2]));
          }
        }
        rect(cellULCorner[0], cellULCorner[1],cellW,cellH);
        pop();
      }
}


function setup() {

  createCanvas(canvasW, canvasH);
  background(255);
  drawGrid();

  fill(0);
  strokeWeight(0);
  for(let x=0;x<rows; x++){
    for(let y=0;y<cols; y++){
      // console.log(x,y)
      drawNumber(x,y);
      cellC[0]=cellC[0]+cellW;
      cellULCorner[0] = cellULCorner[0]+ cellW;
    }
    //shift one row down to the left most cell
    cellC=[cellW/2,cellC[1]+cellH];
    cellULCorner = [0,cellULCorner[1]+cellH];

  }
  cellC= [cellW/2, cellH/2];
  cellULCorner = [0,0];



  layer= layer +1;
  frameRate(rate);
  capturer.start();

  // noLoop();
}

function draw() {
  console.log(layer)
  if (layer==1){
    //set fill color to symbol color
    fill(color(vegBGColors[i][0],vegBGColors[i][1],vegBGColors[i][2]));

    if(i==5 && l==5){
      drawCell(i,l);
      l=l+1;
    }
    else if(i==6 && l==5){
        //skip cells for the large center cell to show correctly
        cellC[0]=cellC[0]+cellW;
        cellULCorner[0] = cellULCorner[0]+ cellW;
        l=l+1;
    }
    else{
      drawCell(i,l);
    }

    if(l<cols){
      //shift to the next cell on the right in the same row
      cellC[0]=cellC[0]+cellW;
      cellULCorner[0] = cellULCorner[0]+ cellW;
      l++;
    }
    else{
      //shift one row down to the left most cell
      cellC=[cellW/2,cellC[1]+cellH];
      cellULCorner = [0,cellULCorner[1]+cellH];
      l=0;
      i++;
      if(i>=rows){
        i=0;
        layer= layer +1;
        cellC= [cellW/2, cellH/2];
        cellULCorner = [0,0];
      }
    }
    capturer.capture( canvas );
  }
  else{
    noLoop();
    capturer.stop();

    // default save, will download automatically a file called {name}.extension (webm/gif/tar)
    capturer.save();
    i=0;
    l=0;
    layer = 0;
    background(255);

    drawGrid();
    fill(0);
    strokeWeight(0);
    for(let x=0;x<rows; x++){
      for(let y=0;y<cols; y++){
        // console.log(x,y)
        drawNumber(x,y);
        cellC[0]=cellC[0]+cellW;
        cellULCorner[0] = cellULCorner[0]+ cellW;
      }
      //shift one row down to the left most cell
      cellC=[cellW/2,cellC[1]+cellH];
      cellULCorner = [0,cellULCorner[1]+cellH];

    }
    cellC= [cellW/2, cellH/2];
    cellULCorner = [0,0];

    layer= layer +1;
  }

}
