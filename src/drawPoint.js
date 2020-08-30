/**
 * Draw a single point on a canvas
 * @param {Canvas} canvas canvas element
 * @param {Point} point  {x: y:}
 * @returns {void}
 */
export default (canvas, point) => {
    const ctx = canvas.getContext("2d")
    ctx.strokeStyle = "red"
    ctx.beginPath()
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2)
    ctx.stroke()
}

/**
 *
 * @param {Canvas} canvas canvas element
 * @param {Event} event canvas event
 * @returns {Point} {x: y: }
 */
export const createPoint = (canvas, event) => {
    const { clientX, clientY } = event

    const px = clientX - canvas.offsetLeft
    const py = clientY - canvas.offsetTop

    // eslint-disable-next-line id-length
    return { x: px, y: py }
}

export const clearCanvas = (canvas) => {
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
