import {PositionInterpolator} from '../src/interpolators';

describe('PositionInterpolator', () => {
	it('Fractions', () => {
		const interp: PositionInterpolator = new PositionInterpolator([0, 0.5, 1], [[1, 10, 100], [2, 20, 200], [3, 30, 300]]);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual([1, 10, 100]);

		interp.setFraction(0);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual([1, 10, 100]);

		interp.setFraction(0.25);
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual([1.5, 15, 150]);

		interp.setFraction(0.5);
		expect(interp.getFraction()).toEqual(0.5);
		expect(interp.getValue()).toEqual([2, 20, 200]);

		interp.setFraction(0.75);
		expect(interp.getFraction()).toEqual(0.75);
		expect(interp.getValue()).toEqual([2.5, 25, 250]);

		interp.setFraction(1);
		expect(interp.getFraction()).toEqual(1);
		expect(interp.getValue()).toEqual([3, 30, 300]);

		interp.setFraction(1.5);
		expect(interp.getFraction()).toEqual(1);
		expect(interp.getValue()).toEqual([3, 30, 300]);

		interp.setFraction(-1);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual([1, 10, 100]);
	});

	it('Length 0', () => {
		let throws = false;
		try {
			new PositionInterpolator([], []);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Length 1', () => {
		let throws = false;
		try {
			new PositionInterpolator([0], [[1, 10, 100]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Too many keyValue', () => {
		let throws = false;
		try {
			new PositionInterpolator([0, 1], [[1, 10, 100], [2, 20, 200], [3, 30, 300]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Too few keyValue', () => {
		let throws = false;
		try {
			new PositionInterpolator([0, 0.5, 1], [[1, 10, 100], [2, 20, 200]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('First key not 0', () => {
		let throws = false;
		try {
			new PositionInterpolator([0.5, 1], [[1, 10, 100], [2, 20, 200]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Last key not 1', () => {
		let throws = false;
		try {
			new PositionInterpolator([0, 0.7], [[1, 10, 100], [2, 20, 200]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('key out of order', () => {
		let throws = false;
		try {
			new PositionInterpolator([0, 0.7, 0.2, 1], [[1, 10, 100], [2, 20, 200], [3, 30, 300], [4, 40, 400]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('key out of range', () => {
		let throws = false;
		try {
			new PositionInterpolator([0, 2, 1], [[1, 10, 100], [2, 20, 200], [3, 30, 300]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Infinite in key', () => {
		let throws = false;
		try {
			new PositionInterpolator([0, Infinity, 1], [[1, 10, 100], [2, 20, 200], [3, 30, 300]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('NaN in key', () => {
		let throws = false;
		try {
			new PositionInterpolator([0, NaN, 1], [[1, 10, 100], [2, 20, 200], [3, 30, 300]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Infinite in keyValue', () => {
		const interp = new PositionInterpolator([0, 0.25, 0.5, 0.75, 1], [[1, 10, 100], [2, 20, 200], [Infinity, Infinity, Infinity], [4, 40, 400], [5, 50, 500]]);
		expect(interp.getValue()).toEqual([1, 10, 100]);

		interp.setFraction(0.25);
		expect(interp.getValue()).toEqual([2, 20, 200]);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual([2, 20, 200]);
	});


	it('NaN in keyValue', () => {
		const interp = new PositionInterpolator([0, 0.25, 0.5, 0.75, 1], [[1, 10, 100], [2, 20, 200], [NaN, NaN, NaN], [4, 40, 400], [5, 50, 500]]);
		expect(interp.getValue()).toEqual([1, 10, 100]);

		interp.setFraction(0.25);
		expect(interp.getValue()).toEqual([2, 20, 200]);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true);
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual([2, 20, 200]);
	});
});
