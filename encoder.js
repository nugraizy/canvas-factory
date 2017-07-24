const LZWEncoder = require('./LZWEncoder');
const NeuQuant = require('./NeuQuant');
const GIFEncoder = require('./GIFEncoder');

const createEncoder = ({ delay, width, height }) => {

	const gifEncoder = new GIFEncoder();

	const getGIFData = () => {
		gifEncoder.finish();
		return gifEncoder.stream().getData();
	}

	const getGIFByteArray = () => {
		gifEncoder.finish();
		return gifEncoder.stream().getByteArray();
	}

	const getWebMData = (fn) => {
		
	}

	const getMP4Data = () => {

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
		setRepeat,
		setDelay,
		addFrame,
		getGIFData,
		getGIFByteArray
		//getWebMData,
		//getMP4Data
	}
}

module.exports = {
  createEncoder
};
