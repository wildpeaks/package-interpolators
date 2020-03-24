/* eslint-env node, mocha */
/* eslint-disable no-new */
/* eslint-disable prefer-arrow-callback */
import {strictEqual, deepStrictEqual} from "assert";
import {PositionInterpolator2D} from "../src/interpolators";

describe("PositionInterpolator2D", function () {
	it("Fractions", function () {
		const interp: PositionInterpolator2D = new PositionInterpolator2D(
			[0, 0.5, 1],
			[
				[1, 10],
				[2, 20],
				[3, 30]
			]
		);
		strictEqual(interp.getFraction(), 0);
		deepStrictEqual(interp.getValue(), [1, 10]);

		interp.setFraction(0);
		strictEqual(interp.getFraction(), 0);
		deepStrictEqual(interp.getValue(), [1, 10]);

		interp.setFraction(0.25);
		strictEqual(interp.getFraction(), 0.25);
		deepStrictEqual(interp.getValue(), [1.5, 15]);

		interp.setFraction(0.5);
		strictEqual(interp.getFraction(), 0.5);
		deepStrictEqual(interp.getValue(), [2, 20]);

		interp.setFraction(0.75);
		strictEqual(interp.getFraction(), 0.75);
		deepStrictEqual(interp.getValue(), [2.5, 25]);

		interp.setFraction(1);
		strictEqual(interp.getFraction(), 1);
		deepStrictEqual(interp.getValue(), [3, 30]);

		interp.setFraction(1.5);
		strictEqual(interp.getFraction(), 1);
		deepStrictEqual(interp.getValue(), [3, 30]);

		interp.setFraction(-1);
		strictEqual(interp.getFraction(), 0);
		deepStrictEqual(interp.getValue(), [1, 10]);
	});

	it("Length 0", function () {
		let throws = false;
		try {
			new PositionInterpolator2D([], []);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Length 1", function () {
		let throws = false;
		try {
			new PositionInterpolator2D([0], [[1, 10]]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Too many keyValue", function () {
		let throws = false;
		try {
			new PositionInterpolator2D(
				[0, 1],
				[
					[1, 10],
					[2, 20],
					[3, 30]
				]
			);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Too few keyValue", function () {
		let throws = false;
		try {
			new PositionInterpolator2D(
				[0, 0.5, 1],
				[
					[1, 10],
					[2, 20]
				]
			);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("First key not 0", function () {
		let throws = false;
		try {
			new PositionInterpolator2D(
				[0.5, 1],
				[
					[1, 10],
					[2, 20]
				]
			);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Last key not 1", function () {
		let throws = false;
		try {
			new PositionInterpolator2D(
				[0, 0.7],
				[
					[1, 10],
					[2, 20]
				]
			);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("key out of order", function () {
		let throws = false;
		try {
			new PositionInterpolator2D(
				[0, 0.7, 0.2, 1],
				[
					[1, 10],
					[2, 20],
					[3, 30],
					[4, 40]
				]
			);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("key out of range", function () {
		let throws = false;
		try {
			new PositionInterpolator2D(
				[0, 2, 1],
				[
					[1, 10],
					[2, 20],
					[3, 30]
				]
			);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Infinite in key", function () {
		let throws = false;
		try {
			new PositionInterpolator2D(
				[0, Infinity, 1],
				[
					[1, 10],
					[2, 20],
					[3, 30]
				]
			);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("NaN in key", function () {
		let throws = false;
		try {
			new PositionInterpolator2D(
				[0, NaN, 1],
				[
					[1, 10],
					[2, 20],
					[3, 30]
				]
			);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Infinite in keyValue", function () {
		const interp = new PositionInterpolator2D(
			[0, 0.25, 0.5, 0.75, 1],
			[
				[1, 10],
				[2, 20],
				[Infinity, Infinity],
				[4, 40],
				[5, 50]
			]
		);
		deepStrictEqual(interp.getValue(), [1, 10]);

		interp.setFraction(0.25);
		deepStrictEqual(interp.getValue(), [2, 20]);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
		strictEqual(interp.getFraction(), 0.25);
		deepStrictEqual(interp.getValue(), [2, 20]);
	});

	it("NaN in keyValue", function () {
		const interp = new PositionInterpolator2D(
			[0, 0.25, 0.5, 0.75, 1],
			[
				[1, 10],
				[2, 20],
				[NaN, NaN],
				[4, 40],
				[5, 50]
			]
		);
		deepStrictEqual(interp.getValue(), [1, 10]);

		interp.setFraction(0.25);
		deepStrictEqual(interp.getValue(), [2, 20]);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
		strictEqual(interp.getFraction(), 0.25);
		deepStrictEqual(interp.getValue(), [2, 20]);
	});
});
