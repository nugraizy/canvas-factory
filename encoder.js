const LZWEncoder = require('./LZWEncoder');
const NeuQuant = require('./NeuQuant');
const GIFEncoder = require('./GIFEncoder');

const createEncoder = () => {
	const gifEncoder = new GIFEncoder();

	const getGIFData = () => {
		return gifEncoder.stream().getData();
	}

	const start = () => {
		gifEncoder.start();
	}

	const finish = () => {
		gifEncoder.finish();
	}

	const setRepeat = (repeat) => {
		gifEncoder.setRepeat(repeat);
	}

	const setDelay = (delay) => {
		gifEncoder.setDelay(delay);
	}

	const addFrame = (frame) => {
		gifEncoder.addFrame(frame);
	}

	return {
		start,
		finish,
		setRepeat,
		setDelay,
		addFrame,
		getGIFData
	}
}

module.exports = {
  createEncoder
};
