# Interpolators

[![Greenkeeper badge](https://badges.greenkeeper.io/wildpeaks/package-interpolators.svg)](https://greenkeeper.io/)

**Typescript classes to interpolate keyframes** in the style of [VRML interpolators](http://www.web3d.org/documents/specifications/14772/V2.0/part1/nodesRef.html#ScalarInterpolator).

Install using:

	npm install @wildpeaks/interpolators


-------------------------------------------------------------------------------

## ScalarInterpolator

**ScalarInterpolator** interpolates `number` values.

Example:

````ts
import {ScalarInterpolator} from '@wildpeaks/interpolators';

const interp = new ScalarInterpolator([0, 0.5, 1], [1, 2, 3]);

// First keyframe
interp.setFraction(0);
console.log(interp.getValue()); // 1

// Second keyframe
interp.setFraction(0.5);
console.log(interp.getValue()); // 2

// Interpolated keyframe
interp.setFraction(0.25);
console.log(interp.getValue()); // 1.5

````

-------------------------------------------------------------------------------

## PositionInterpolator2D

**PositionInterpolator2D** interpolates `[number, number]` values.

Example:

````ts
import {PositionInterpolator2D} from '@wildpeaks/interpolators';

const interp = new PositionInterpolator2D([0, 0.5, 1], [ [1,10], [2,20], [3,30] ]);

// First keyframe
interp.setFraction(0);
console.log(interp.getValue()); // [1, 10]

// Second keyframe
interp.setFraction(0.5);
console.log(interp.getValue()); // [2, 20]

// Interpolated keyframe
interp.setFraction(0.25);
console.log(interp.getValue()); // [1.5, 15]

````

-------------------------------------------------------------------------------

## PositionInterpolator

**PositionInterpolator** interpolates `[number, number, number]` values.

Example:

````ts
import {PositionInterpolator} from '@wildpeaks/interpolators';

const interp = new PositionInterpolator([0, 0.5, 1], [ [1,10,100], [2,20,200], [3,30,300] ]);

// First keyframe
interp.setFraction(0);
console.log(interp.getValue()); // [1, 10, 100]

// Second keyframe
interp.setFraction(0.5);
console.log(interp.getValue()); // [2, 20, 200]

// Interpolated keyframe
interp.setFraction(0.25);
console.log(interp.getValue()); // [1.5, 15, 150]

````


-------------------------------------------------------------------------------

