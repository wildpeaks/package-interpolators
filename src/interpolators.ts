type SFFloat = number;
type SFInt32 = number;
type MFFloat = Array<SFFloat>;
type SFVec2f = [number, number];
type SFVec3f = [number, number, number];


abstract class Interpolator<T> {
	protected _key: MFFloat;
	protected _keyValue: Array<T>;
	protected _length: SFInt32;
	protected _fraction: SFFloat;
	protected _value: T;

	constructor(key: MFFloat, keyValue: Array<T>){
		const lengthKey = key.length;
		const lengthKeyValue = keyValue.length;
		if (lengthKey !== lengthKeyValue){
			throw new Error(`Lengths don't match`);
		}
		if (lengthKey < 2){
			throw new Error(`Not enough key elements`);
		}
		if (lengthKeyValue < 2){
			throw new Error(`Not enough keyValue elements`);
		}
		if (key[0] !== 0){
			throw new Error(`First key is not 0`);
		}
		if (key[lengthKey - 1] !== 1){
			throw new Error(`Last key is not 1`);
		}

		let previousKey = 0;
		for (let i = 1; i < lengthKey; i++){
			const newKey = key[i];
			if (isNaN(newKey)){
				throw new Error('Invalid NaN key');
			}
			if (!isFinite(newKey)){
				throw new Error('Invalid Infinite key');
			}
			if ((newKey < 0) || (newKey > 1)){
				throw new Error('Out of range');
			}
			if (newKey <= previousKey){
				throw new Error('Not ascending order');
			}
			previousKey = newKey;
		}

		this._key = key;
		this._keyValue = keyValue;
		this._length = lengthKey;
		this._fraction = 0;
		this._value = keyValue[0];
	}

	getLerpParams(targetFraction: SFFloat): [T, T, SFFloat] {
		const _key = this._key;
		const _keyValue = this._keyValue;
		const _length = this._length;

		let indexBefore: SFInt32;
		let indexAfter: SFInt32;
		if (targetFraction === 0){
			indexBefore = 0;
			indexAfter = 1;
		} else {
			indexBefore = _length - 2;
			indexAfter = _length - 1;
			if (targetFraction < 1){
				for (let i = 1; i < _length; i++){
					const currentFraction = _key[i];
					if (currentFraction >= targetFraction){
						indexBefore = i - 1;
						indexAfter = i;
						break;
					}
				}
			}
		}
		const fractionBefore = _key[indexBefore];
		const fractionAfter = _key[indexAfter];
		const valueBefore = _keyValue[indexBefore];
		const valueAfter = _keyValue[indexAfter];
		const lerpFraction = (targetFraction - fractionBefore) / (fractionAfter - fractionBefore);
		return [valueBefore, valueAfter, lerpFraction];
	}

	public getFraction(): SFFloat {
		return this._fraction;
	};
	public getValue(): T {
		return this._value;
	};

	abstract setFraction(newFraction: SFFloat): void;
}


function lerp(fromValue: SFFloat, toValue: SFFloat, fraction: SFFloat): SFFloat {
	if (isNaN(fromValue) || isNaN(toValue) || !isFinite(toValue)){
		throw new Error('Invalid value');
	}
	return fromValue + fraction * (toValue - fromValue);
}


export class ScalarInterpolator extends Interpolator<SFFloat> {
	public setFraction(newFraction: SFFloat): void {
		const safeFraction: SFFloat = Math.max(0, Math.min(1, newFraction));
		if (safeFraction !== this._fraction){
			const [fromValue, toValue, lerpFraction] = this.getLerpParams(safeFraction);
			this._value = lerp(fromValue, toValue, lerpFraction);
			this._fraction = safeFraction;
		}
	}
}


export class PositionInterpolator2D extends Interpolator<SFVec2f> {
	public setFraction(newFraction: SFFloat): void {
		const safeFraction: SFFloat = Math.max(0, Math.min(1, newFraction));
		if (safeFraction !== this._fraction){
			const [fromValue, toValue, lerpFraction] = this.getLerpParams(safeFraction);
			this._value = [
				lerp(fromValue[0], toValue[0], lerpFraction),
				lerp(fromValue[1], toValue[1], lerpFraction)
			];
			this._fraction = safeFraction;
		}
	}
}


export class PositionInterpolator extends Interpolator<SFVec3f> {
	public setFraction(newFraction: SFFloat): void {
		const safeFraction: SFFloat = Math.max(0, Math.min(1, newFraction));
		if (safeFraction !== this._fraction){
			const [fromValue, toValue, lerpFraction] = this.getLerpParams(safeFraction);
			this._value = [
				lerp(fromValue[0], toValue[0], lerpFraction),
				lerp(fromValue[1], toValue[1], lerpFraction),
				lerp(fromValue[2], toValue[2], lerpFraction)
			];
			this._fraction = safeFraction;
		}
	}
}
