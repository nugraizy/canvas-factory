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

const createFactory = ({ width, height }) => {

	let ctx;
	let isRecord = true;

	const FPS = 60 , TOTAL_FRAME = 100 ;
	const canvas = new Canvas(width, height);
	const encoder = new GIFEncoder();
	
	encoder.setRepeat(0); 
	encoder.setDelay(1000/FPS);
	if ( isRecord ){
		encoder.start();
	}
	
	let newCanvas = {};
	
	for ( let key in canvas ){
		if ( typeof canvas[key] === 'function' ){
			newCanvas[key] = canvas[key].bind(canvas);
		} else {
			newCanvas[key] = canvas[key];
		}
	}



	newCanvas.getContext = (type) => {
		ctx = canvas.getContext(type);
		ctx.fillStyle = 'red';
		let newCtx = {};
		for ( let key in ctx ){
			if ( typeof ctx[key] === 'function' ){
				const originFn = ctx[key];
				newCtx[key] = function(){
					originFn.apply(ctx,arguments);
					if ( isRecord ){
						encoder.addFrame(ctx);
					}
				}
			} else {
				newCtx[key] = ctx[key];
			}
		}
		
		return newCtx;
	}


	const getCanvas = () => {
		return newCanvas;
	}

	const saveGIF = () => {
		return new Promise((resolve,reject)=>{
			try {
				encoder.finish();
				resolve(encoder.stream().getData());
			} catch(e){
				reject(e);
			}
		})
	}

	const saveMP4 = () => {

	}

	const startRecord = () => {
		isRecord = true;
	}

	const stopRecord = () => {
		isRecord = false;
	}

	const clearRecord = () => {

	}

	return {
		getCanvas,
		saveGIF,
		saveMP4,
		startRecord,
		stopRecord,
		clearRecord
	};
}

module.exports = {
	createFactory
};
