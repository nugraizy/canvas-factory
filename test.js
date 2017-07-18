'use strict';

const fs = require('fs');
const { createFactory } = require('./index');
const { createCanvas, loadImage, Image } = require('canvas')
const factory = createFactory({ width : 100, height : 100  });
const canvas = factory.getCanvas();
const ctx = canvas.getContext('2d');


const d = 10;
ctx.fillStyle = 'red';
ctx.fillText("H",10,50);
ctx.fillText("e",10+d,50);
ctx.fillText(false)("l",10+d*2,50);
ctx.fillText("l",10+d*3,50);
ctx.fillText(false)("o",10+d*4,50);
ctx.fillText("!",10+d*5,50);



fs.writeFile( '123.png', canvas.toDataURL().replace(/^data:image\/\w+;base64,/, '') , 'base64', function(err){
  if (err) throw err;
});

factory
  .saveGIF()
  .then((data)=>{
    fs.writeFile( '123.gif', data , 'binary', function(err){
      if (err) throw err
    })
  })
  .catch((error)=>{
    console.log(error);
  })

// let timer ,
//   currentFrame,
//   totalFrame,
//   offset,
//   canvasWidth,
//   canvasHeight,
//   imgWidth ,
//   imgHeight ,
//   imgData,
//   data ,
//   userImg = new Image ,
//   effectInterval = null ,
//   encoder ;

// const init = () => {
//   timer = 0 ,
//   currentFrame = 0,
//   totalFrame = 10,
//   offset = .01,
//   canvasWidth = 320 ,
//   canvasHeight = 284 ;
// }

// const pixelFlick = function(i, d) {
//   d[i] = d[i+16];
// };

// const pixelCooler = function(i, d) {
//   d[i] = 1;
//   d[i+1] += randInt(2, 5);
//   d[i+2] *= randInt(1, 3) + 8;
// };

// const glitchBlock = function(i, x, y) {
//   if(i > 3) {
//     var spliceHeight = 1 + randInt(0, 10);
//     ctx.drawImage(canvas,x,y,x,spliceHeight,randInt(0, x),y,randInt(x, imgWidth),spliceHeight);
//   }
// };

// const glitchLine = function(i, x, y) {
//   var spliceHeight = 1 + randInt(1, 10);
//   //var spliceHeight = 1 + randInt(1, 50);
//   ctx.drawImage(canvas,offset, y, imgWidth - offset * 2,spliceHeight,1 + randInt(0, offset * 2),y + randInt(0, 10), imgWidth - offset, spliceHeight);
// };

// const pixelProcessor = function(imageData, step, callback) {
//   var data = imageData.data || [],
//   step = step * 4  || 4;
//   if(data.length) {
//     var rgb = [];
//     for(var i = 0; i < data.length; i+=step) {
//       callback && callback(i, data);
//     }
//     return imageData;
//   } else {
//     return imageData;
//   }
// };

// const drawGlitch = function(width, height, amount, callback) {
//   for ( var i = 0; i < (amount || 10); i++) {
//     var x = Math.random() * width + 1,
//     y = Math.random() * height + 1;
//     callback(i, x, y);
//   }
// };

// const randInt = function(a, b) {
//   return ~~(Math.random() * (b - a) + a);
// };

// const render = function(){
//   if(!(currentFrame % totalFrame) || currentFrame > totalFrame) {
//     ctx.drawImage(userImg,0,0,imgWidth,imgHeight,0,0,canvasWidth,canvasHeight);
//     imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
//     imgData = pixelProcessor(imgData, 4, pixelCooler);
//     ctx.putImageData(imgData, 0, 0);
//     currentFrame = 0;
//   }
//   if(currentFrame === randInt(0, totalFrame)) {
//     imgData = pixelProcessor(imgData, 1, pixelFlick);
//     ctx.putImageData(imgData, 0, 0);
//     drawGlitch(imgWidth, imgHeight, randInt(3, 10), glitchBlock);
//     drawGlitch(imgWidth, imgHeight, randInt(3, 30), glitchLine);
//   }
//   currentFrame++;
// }

// const imageComplete = function(){
//   canvasWidth = imgWidth = userImg.width ;
//   canvasHeight = imgHeight = userImg.height ;
//   offset = imgWidth * offset;
// };

// const addFrameToEncoder = (cb) => {
//   timer ++ ;
//   render();
//   encoder.addFrame(ctx);
//   if ( timer >= TOTAL_FRAME ){
//     console.log('begin make gif');
//     encoder.finish();
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
//   } else {
//     addFrameToEncoder(cb);
//   }
// }

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