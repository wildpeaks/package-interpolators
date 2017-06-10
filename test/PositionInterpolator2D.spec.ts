import {PositionInterpolator2D} from '../src/interpolators';

describe('PositionInterpolator', () => {
	it('Fractions', () => {
		const interp: PositionInterpolator2D = new PositionInterpolator2D([0, 0.5, 1], [[1, 10], [2, 20], [3, 30]]);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual([1, 10]);

		interp.setFraction(0);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual([1, 10]);

		interp.setFraction(0.25);
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual([1.5, 15]);

		interp.setFraction(0.5);
		expect(interp.getFraction()).toEqual(0.5);
		expect(interp.getValue()).toEqual([2, 20]);

		interp.setFraction(0.75);
		expect(interp.getFraction()).toEqual(0.75);
		expect(interp.getValue()).toEqual([2.5, 25]);

		interp.setFraction(1);
		expect(interp.getFraction()).toEqual(1);
		expect(interp.getValue()).toEqual([3, 30]);

		interp.setFraction(1.5);
		expect(interp.getFraction()).toEqual(1);
		expect(interp.getValue()).toEqual([3, 30]);

		interp.setFraction(-1);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual([1, 10]);
	});

	it('Length 0', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([], []);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Length 1', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0], [ [1, 10] ]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Too many keyValue', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0, 1], [[1, 10], [2, 20], [3, 30]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Too few keyValue', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0, 0.5, 1], [[1, 10], [2, 20]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('First key not 0', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0.5, 1], [[1, 10], [2, 20]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Last key not 1', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0, 0.7], [[1, 10], [2, 20]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('key out of order', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0, 0.7, 0.2, 1], [[1, 10], [2, 20], [3, 30], [4, 40]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('key out of range', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0, 2, 1], [[1, 10], [2, 20], [3, 30]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Infinite in key', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0, Infinity, 1], [[1, 10], [2, 20], [3, 30]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('NaN in key', () => {
		let throws = false;
		try {
			new PositionInterpolator2D([0, NaN, 1], [[1, 10], [2, 20], [3, 30]]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Infinite in keyValue', () => {
		const interp = new PositionInterpolator2D([0, 0.25, 0.5, 0.75, 1], [[1, 10], [2, 20], [Infinity, Infinity], [4, 40], [5, 50]]);
		expect(interp.getValue()).toEqual([1, 10]);

		interp.setFraction(0.25);
		expect(interp.getValue()).toEqual([2, 20]);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual([2, 20]);
	});


	it('NaN in keyValue', () => {
		const interp = new PositionInterpolator2D([0, 0.25, 0.5, 0.75, 1], [[1, 10], [2, 20], [NaN, NaN], [4, 40], [5, 50]]);
		expect(interp.getValue()).toEqual([1, 10]);

		interp.setFraction(0.25);
		expect(interp.getValue()).toEqual([2, 20]);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true);
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual([2, 20]);
	});
});
