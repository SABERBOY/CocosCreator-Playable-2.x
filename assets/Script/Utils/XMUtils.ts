/**
 * @ignore
 */
const _d2r = Math.PI / 180.0;
/**
 * @ignore
 */
const _r2d = 180.0 / Math.PI;

/**
 * @property {number} EPSILON
 */
export const EPSILON = 0.000001;

// Number of bits in an integer
export const INT_BITS = 32;
export const INT_MAX = 0x7fffffff;
export const INT_MIN = -1 << (INT_BITS - 1);

/**
 * Use single-precision floating point on native platforms to be compatible with native math libraries.
 * Double precision floating point is used on Web platforms and editors to reduce the overhead of type conversion.
 */
export const FLOAT_ARRAY_TYPE = (CC_JSB && CC_NATIVERENDERER) ? Float32Array : Float64Array;
export const FLOAT_BYTES = (CC_JSB && CC_NATIVERENDERER) ? 4 : 8;

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
export function equals(a, b) {
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

/**
 * Tests whether or not the arguments have approximately the same value by given maxDiff
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @param {Number} maxDiff Maximum difference.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
export function approx(a, b, maxDiff) {
    maxDiff = maxDiff || EPSILON;
    return Math.abs(a - b) <= maxDiff;
}

/**
 * Clamps a value between a minimum float and maximum float value.
 *
 * @method clamp
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function clamp(val, min, max) {
    return val < min ? min : val > max ? max : val;
}

/**
 * Clamps a value between 0 and 1.
 *
 * @method clamp01
 * @param {number} val
 * @return {number}
 */
export function clamp01(val) {
    return val < 0 ? 0 : val > 1 ? 1 : val;
}

/**
 * @method lerp
 * @param {number} from
 * @param {number} to
 * @param {number} ratio - the interpolation coefficient
 * @return {number}
 */
export function lerp(from, to, ratio) {
    return from + (to - from) * ratio;
}

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
export function toRadian(a) {
    return a * _d2r;
}

/**
 * Convert Radian To Degree
 *
 * @param {Number} a Angle in Radian
 */
export function toDegree(a) {
    return a * _r2d;
}

/**
 * @method random
 */
export const random = Math.random;

/**
 * Returns a floating-point random number between min (inclusive) and max (exclusive).
 *
 * @method randomRange
 * @param {number} min
 * @param {number} max
 * @return {number} the random number
 */
export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (exclusive).
 *
 * @method randomRangeInt
 * @param {number} min
 * @param {number} max
 * @return {number} the random integer
 */
export function randomRangeInt(min, max) {
    return Math.floor(randomRange(min, max));
}

/**
 * Linear congruential generator using Hull-Dobell Theorem.
 *
 * @method pseudoRandom
 * @param {number} seed the random seed
 * @return {number} the pseudo random
 */
export function pseudoRandom(seed) {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280.0;
}

/**
 * Returns a floating-point pseudo-random number between min (inclusive) and max (exclusive).
 *
 * @method pseudoRandomRange
 * @param {number} seed
 * @param {number} min
 * @param {number} max
 * @return {number} the random number
 */
export function pseudoRandomRange(seed, min, max) {
    return pseudoRandom(seed) * (max - min) + min;
}

/**
 * Returns a pseudo-random integer between min (inclusive) and max (exclusive).
 *
 * @method pseudoRandomRangeInt
 * @param {number} seed
 * @param {number} min
 * @param {number} max
 * @return {number} the random integer
 */
export function pseudoRandomRangeInt(seed, min, max) {
    return Math.floor(pseudoRandomRange(seed, min, max));
}

/**
 * Returns the next power of two for the value
 *
 * @method nextPow2
 * @param {number} val
 * @return {number} the the next power of two
 */
export function nextPow2(val) {
    --val;
    val = (val >> 1) | val;
    val = (val >> 2) | val;
    val = (val >> 4) | val;
    val = (val >> 8) | val;
    val = (val >> 16) | val;
    ++val;

    return val;
}

/**
 * Returns float remainder for t / length
 *
 * @method repeat
 * @param {number} t time start at 0
 * @param {number} length time of one cycle
 * @return {number} the time wrapped in the first cycle
 */
export function repeat(t, length) {
    return t - Math.floor(t / length) * length;
}

/**
 * Returns time wrapped in ping-pong mode
 *
 * @method repeat
 * @param {number} t time start at 0
 * @param {number} length time of one cycle
 * @return {number} the time wrapped in the first cycle
 */
export function pingPong(t, length) {
    t = repeat(t, length * 2);
    t = length - Math.abs(t - length);
    return t;
}

/**
 * Returns ratio of a value within a given range
 *
 * @method repeat
 * @param {number} from start value
 * @param {number} to end value
 * @param {number} value given value
 * @return {number} the ratio between [from,to]
 */
export function inverseLerp(from, to, value) {
    return (value - from) / (to - from);
}

/**
 * Returns -1, 0, +1 depending on sign of x.
 *
 * @method sign
 * @param {number} v
 */
export function sign(v) {
    return (v > 0) - (v < 0);
}

/**
 * 获取该节点在手机屏幕的坐标
 * @param target
 */
export const getScreenPosition: (target: cc.Node) => cc.Vec3 = (target: cc.Node): cc.Vec3 => {
    const pos = target.parent.convertToWorldSpaceAR(target.position)
    let outPos: cc.Vec3 = cc.Vec3.ZERO
    cc.Camera.main.getWorldToScreenPoint(pos, outPos)
    outPos.y = cc.view.getVisibleSizeInPixel().height - (outPos.y) / (cc.view.getVisibleSize().height / cc.view.getVisibleSizeInPixel().height)
    return outPos
}

class Base64Format {
    static encodedValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    static encode(inValue: number) {
        if (inValue < 64) {
            return Base64Format.encodedValues.charAt(inValue);
        }
        throw TypeError(inValue + ": not a 64 based value");
    }

    static decodeChar(inChar: string) {
        if (inChar.length === 1) {
            return Base64Format.encodedValues.indexOf(inChar);
        } else {
            throw TypeError('"' + inChar + '" must have length 1');
        }
    }
}


