'use strict';
const fs = require('fs');
const path = require('path');

const Canvas = require('canvas') ;
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const FfmpegCommand = require('fluent-ffmpeg');

const LZWEncoder = require('./LZWEncoder');
const NeuQuant = require('./NeuQuant');
const GIFEncoder = require('./GIFEncoder');
const { register } = require('./watch');

register();

const createFactory = ({ width, height, delay = 1000/60 }) => {

  let self = {};
  let queue = [];

  const canvas = new Canvas(width, height);
  const encoder = new GIFEncoder();

  let newCanvas = {};
  let ctx;

  let isRecord = true;
  let isPending = false;

  encoder.setRepeat(0); 
  encoder.setDelay(delay);
  if ( isRecord ){
    encoder.start();
  }
  
  for ( let key in canvas ){
    if ( typeof canvas[key] === 'function' ){
      newCanvas[key] = canvas[key].bind(canvas);
    } else {
      newCanvas[key] = canvas[key];
    }
  }

  newCanvas.getCanvas = () => {
    return canvas;
  }

  newCanvas.getContext = (type) => {
    ctx = canvas.getContext(type);
    let newCtx = {};
    for ( let key in ctx ){
      if ( typeof ctx[key] === 'function' ){
        if ( /^(get|is)/.test(key) === true ){
          newCtx[key] = ctx[key].bind(ctx);
        } else {
          const originFn = ctx[key];
          newCtx[key] = function(){
            if ( arguments.length === 1 && arguments[0] === false ){
              return originFn.bind(ctx);
            }
            const mapOriginCanvas = [].slice.call(arguments).map((el) => 
              ( typeof el.getCanvas === 'function' ) ? el.getCanvas() : el
            );
            originFn.apply(ctx,mapOriginCanvas);
            if ( isRecord ){
              encoder.addFrame(ctx);
            }
          }
        }
      } else {
        newCtx[key] = ctx[key];
        newCtx.watch(key, (el, oldVal, newVal) => {
          ctx[key] = newVal;
        });
      }
    }
    
    return newCtx;
  }

  const handle = (fn) => {
    queue.push(fn);
    return resolve();
  }

  const fulfill = () => {
    isPending = false;
    queue.shift();
    resolve();
  }

  const resolve = () => {
    if ( queue.length !== 0 && !isPending ){
      isPending = true;
      queue[0]();
    } 
    return self;
  }

  const getCanvas = () => {
    return newCanvas;
  }

  self.saveGIF = (fileName) => {
    encoder.finish();
    fs.writeFile(fileName, encoder.stream().getData(), 'binary', function(err){
      if (err) throw err;
      fulfill();
    })
  }

  self.saveMP4 = () => {
    fulfill();
  }

  self.startRecord = () => {
    isRecord = true;
    fulfill();
  }

  self.stopRecord = () => {
    isRecord = false;
    fulfill();
  }

  self.clearRecord = () => {
    fulfill();
  }

  for ( let key in self ){
    let originFn = self[key];
    self[key] = (...args) => {
      return handle(originFn.bind(this,...args));
    }
  }

  return Object.assign({},self,{
    getCanvas
  });
}

module.exports = {
  createFactory
};
