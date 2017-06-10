import {ScalarInterpolator} from '../src/interpolators';

describe('ScalarInterpolator', () => {
	it('Fractions', () => {
		const interp: ScalarInterpolator = new ScalarInterpolator([0, 0.5, 1], [1, 2, 3]);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual(1);

		interp.setFraction(0);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual(1);

		interp.setFraction(0.25);
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual(1.5);

		interp.setFraction(0.5);
		expect(interp.getFraction()).toEqual(0.5);
		expect(interp.getValue()).toEqual(2);

		interp.setFraction(0.75);
		expect(interp.getFraction()).toEqual(0.75);
		expect(interp.getValue()).toEqual(2.5);

		interp.setFraction(1);
		expect(interp.getFraction()).toEqual(1);
		expect(interp.getValue()).toEqual(3);

		interp.setFraction(1.5);
		expect(interp.getFraction()).toEqual(1);
		expect(interp.getValue()).toEqual(3);

		interp.setFraction(-1);
		expect(interp.getFraction()).toEqual(0);
		expect(interp.getValue()).toEqual(1);
	});

	it('Length 0', () => {
		let throws = false;
		try {
			new ScalarInterpolator([], []);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Length 1', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0], [1]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Too many keyValue', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0, 1], [1, 2, 3]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Too few keyValue', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0, 0.5, 1], [1, 2]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('First key not 0', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0.5, 1], [1, 2]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Last key not 1', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0, 0.7], [1, 2]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('key out of order', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0, 0.7, 0.2, 1], [1, 2, 3, 4]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('key out of range', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0, 2, 1], [1, 2, 3]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Infinite in key', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0, Infinity, 1], [1, 2, 3]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('NaN in key', () => {
		let throws = false;
		try {
			new ScalarInterpolator([0, NaN, 1], [1, 2, 3]);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
	});

	it('Infinite in keyValue', () => {
		const interp = new ScalarInterpolator([0, 0.25, 0.5, 0.75, 1], [1, 2, Infinity, 4, 5]);
		expect(interp.getValue()).toEqual(1);

		interp.setFraction(0.25);
		expect(interp.getValue()).toEqual(2);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual(2);
	});


	it('NaN in keyValue', () => {
		const interp = new ScalarInterpolator([0, 0.25, 0.5, 0.75, 1], [1, 2, NaN, 4, 5]);
		expect(interp.getValue()).toEqual(1);

		interp.setFraction(0.25);
		expect(interp.getValue()).toEqual(2);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e){
			throws = true;
		}
		expect(throws).toBe(true, 'No error thrown');
		expect(interp.getFraction()).toEqual(0.25);
		expect(interp.getValue()).toEqual(2);
	});
});
