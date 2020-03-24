/* eslint-env node, mocha */
/* eslint-disable no-new */
/* eslint-disable prefer-arrow-callback */
import {strictEqual} from "assert";
import {ScalarInterpolator} from "../src/interpolators";

describe("ScalarInterpolator", function () {
	it("Fractions", function () {
		const interp: ScalarInterpolator = new ScalarInterpolator([0, 0.5, 1], [1, 2, 3]);
		strictEqual(interp.getFraction(), 0);
		strictEqual(interp.getValue(), 1);

		interp.setFraction(0);
		strictEqual(interp.getFraction(), 0);
		strictEqual(interp.getValue(), 1);

		interp.setFraction(0.25);
		strictEqual(interp.getFraction(), 0.25);
		strictEqual(interp.getValue(), 1.5);

		interp.setFraction(0.5);
		strictEqual(interp.getFraction(), 0.5);
		strictEqual(interp.getValue(), 2);

		interp.setFraction(0.75);
		strictEqual(interp.getFraction(), 0.75);
		strictEqual(interp.getValue(), 2.5);

		interp.setFraction(1);
		strictEqual(interp.getFraction(), 1);
		strictEqual(interp.getValue(), 3);

		interp.setFraction(1.5);
		strictEqual(interp.getFraction(), 1);
		strictEqual(interp.getValue(), 3);

		interp.setFraction(-1);
		strictEqual(interp.getFraction(), 0);
		strictEqual(interp.getValue(), 1);
	});

	it("Length 0", function () {
		let throws = false;
		try {
			new ScalarInterpolator([], []);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Length 1", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0], [1]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Too many keyValue", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0, 1], [1, 2, 3]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Too few keyValue", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0, 0.5, 1], [1, 2]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("First key not 0", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0.5, 1], [1, 2]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Last key not 1", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0, 0.7], [1, 2]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("key out of order", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0, 0.7, 0.2, 1], [1, 2, 3, 4]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("key out of range", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0, 2, 1], [1, 2, 3]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Infinite in key", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0, Infinity, 1], [1, 2, 3]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("NaN in key", function () {
		let throws = false;
		try {
			new ScalarInterpolator([0, NaN, 1], [1, 2, 3]);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
	});

	it("Infinite in keyValue", function () {
		const interp = new ScalarInterpolator([0, 0.25, 0.5, 0.75, 1], [1, 2, Infinity, 4, 5]);
		strictEqual(interp.getValue(), 1);

		interp.setFraction(0.25);
		strictEqual(interp.getValue(), 2);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
		strictEqual(interp.getFraction(), 0.25);
		strictEqual(interp.getValue(), 2);
	});

	it("NaN in keyValue", function () {
		const interp = new ScalarInterpolator([0, 0.25, 0.5, 0.75, 1], [1, 2, NaN, 4, 5]);
		strictEqual(interp.getValue(), 1);

		interp.setFraction(0.25);
		strictEqual(interp.getValue(), 2);

		let throws = false;
		try {
			interp.setFraction(0.5);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, true, "No error thrown");
		strictEqual(interp.getFraction(), 0.25);
		strictEqual(interp.getValue(), 2);
	});
});
