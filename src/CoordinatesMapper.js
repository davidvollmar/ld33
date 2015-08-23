/**
 * Module for mapping canvas coordinates to model coordinates and vice versa.
 */


// setting up the required variables
var _canvas = document.getElementById('mycanvas');
var _gridWidth;
var _gridHeight;
var _factor;//for square

/**
 * Initializes the CoordinatesMapper
 * @param modelWidth  the weight of our model
 * @param modelHeight the height of our model
 * @param canvas the canvas where we will be drawing
 */
export function init(modelWidth, modelHeight, canvas) {
    _gridWidth = modelWidth;
    _gridHeight = modelHeight;
    _canvas = canvas;
    _factor = Math.min(canvas.width, canvas.height);
}

/**
 * Takes canvas coordinates and give the model coordinates of the cell where the canvas coordinates are found in.
 */
export function toModelCoordinates(x, y) {
    return [
      Math.floor(x / _factor * _gridWidth),
      Math.floor(y / _factor * _gridHeight)
    ];
}

export function toCanvasCoordinates(x, y) {
    return [
      x / _gridWidth * _factor,
      y / _gridHeight * _factor
    ];
}