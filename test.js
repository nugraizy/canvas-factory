'use strict';

const fs = require('fs');
const { createFactory } = require('./index');
const { createCanvas, loadImage, Image } = require('canvas')

let timer = 0,
  currentFrame = 0,
  totalFrame = 10,
  offset = .01,
  imgWidth,
  imgHeight,
  imgData,
  canvasWidth = 320 ,
  canvasHeight = 284,
  canvas,
  factory,
  ctx,
  userImg = new Image;

const TOTAL_FRAME = 100;

const pixelFlick = function(i, d) {
  d[i] = d[i+16];
};

const pixelCooler = function(i, d) {
  d[i] = 1;
  d[i+1] += randInt(2, 5);
  d[i+2] *= randInt(1, 3) + 8;
};

const glitchBlock = function(i, x, y) {
  if(i > 3) {
    var spliceHeight = 1 + randInt(0, 10);
    //ctx.drawImage(canvas,x,y,x,spliceHeight,randInt(0, x),y,randInt(x, imgWidth),spliceHeight);
  }
};

const glitchLine = function(i, x, y) {
  var spliceHeight = 1 + randInt(1, 10);
  //var spliceHeight = 1 + randInt(1, 50);
  //ctx.drawImage(canvas,offset, y, imgWidth - offset * 2,spliceHeight,1 + randInt(0, offset * 2),y + randInt(0, 10), imgWidth - offset, spliceHeight);
};

const pixelProcessor = function(imageData, step, callback) {
  var data = imageData.data || [],
  step = step * 4  || 4;
  if(data.length) {
    var rgb = [];
    for(var i = 0; i < data.length; i+=step) {
      callback && callback(i, data);
    }
    return imageData;
  } else {
    return imageData;
  }
};

const drawGlitch = function(width, height, amount, callback) {
  for ( var i = 0; i < (amount || 10); i++) {
    var x = Math.random() * width + 1,
    y = Math.random() * height + 1;
    callback(i, x, y);
  }
};

const randInt = function(a, b) {
  return ~~(Math.random() * (b - a) + a);
};

const render = function(){
  if(!(currentFrame % totalFrame) || currentFrame > totalFrame) {
    ctx.drawImage(userImg,0,0,imgWidth,imgHeight,0,0,canvasWidth,canvasHeight);
    imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
    imgData = pixelProcessor(imgData, 4, pixelCooler);
    ctx.putImageData(imgData, 0, 0);
    currentFrame = 0;
  }
  if(currentFrame === randInt(0, totalFrame)) {
    imgData = pixelProcessor(imgData, 1, pixelFlick);
    ctx.putImageData(imgData, 0, 0);
    drawGlitch(imgWidth, imgHeight, randInt(3, 10), glitchBlock);
    drawGlitch(imgWidth, imgHeight, randInt(3, 30), glitchLine);
  }
  currentFrame++;
}

const imageComplete = function(){
  canvasWidth = imgWidth = userImg.width ;
  canvasHeight = imgHeight = userImg.height ;
  offset = imgWidth * offset;
};

const renderCanvas = (cb) => {
  timer ++ ;
  render();
  if ( timer >= TOTAL_FRAME ){
    fs.writeFile( '123.png', canvas.toDataURL().replace(/^data:image\/\w+;base64,/, '') , 'base64', function(err){
      if (err) throw err;
    });

    factory
      .stopRecord()
      .saveGIF()
      .then((data)=>{
        fs.writeFile( '123.gif', data , 'binary', function(err){
          if (err) throw err
        })
      })
      .catch((error)=>{
        console.log(error);
      })
    
//     fs.writeFile( path.join(__dirname,'media',fileName + '.gif'), encoder.stream().getData() , 'binary', function(err){
//       if (err) throw err
//       fs.chmod(path.join(__dirname,'media',fileName + '.gif'), 511 , function(err){
// //        if ( err ) throw err ;
// //        imagemin(['media/'+fileName + '-origin.gif'], 'media', {use: [imageminGifsicle({
// //          optimizationLevel : 3
// //        })]}).then(() => {
// //          fs.chmod(path.join(__dirname,'media',fileName + '.gif'), 511 , function(err){
// //            if ( err ) throw err ;
//             console.log('begin make mp4');
//             var command = new FfmpegCommand().addInput(path.join(__dirname,'media',fileName + '.gif')).save(path.join(__dirname,'media',fileName + '.mp4'));
//             cb();
// //          });
// //        });
//       })
//       //cmd.run('./gifsicle -O3 --lossy=80 -o test-compressed.gif test.gif');
//     })
  } else {
    renderCanvas(cb);
  }
}

// exports.makeFile = function(data,cb){
//   console.log('begin make file',data.fileName);
//   init();
//   fileName = data.fileName ; 
//   userImg.src = data.src ;
//   imageComplete();
//   canvas = new Canvas(canvasWidth, canvasHeight);
//   ctx = canvas.getContext("2d");
//   ctx.drawImage(userImg,0,0,imgWidth,imgHeight);  

//   encoder = new GIFEncoder();
//   encoder.setRepeat(0); 
//   encoder.start();
//   encoder.setDelay(1000/FPS);

//   addFrameToEncoder(cb);
// }

const init = () => {
  timer = 0 ,
  currentFrame = 0,
  totalFrame = 10,
  offset = .01,
  canvasWidth = imgWidth = 320 ,
  canvasHeight = imgHeight = 284,
  factory = createFactory({ width : canvasWidth, height : canvasHeight });
  canvas = factory.getCanvas();
  ctx = canvas.getContext('2d');
  userImg.src = 'data:image/png;base64,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';
  ctx.drawImage(userImg,0,0);
}

init();
renderCanvas();