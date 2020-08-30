import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { Typography, Button } from "@material-ui/core"
import { Provider, useDispatch, useSelector } from "react-redux"
import state from "./src/state"
import drawPoint, { clearCanvas, createPoint } from "./src/drawPoint"

const styles = {
    canvas: {
        height: "500px",
        width: "660px",
        border: "1px solid black",
    },
}

const Canvas = (props) => {
    const dispatch = useDispatch()
    const points = useSelector((state) => state.points)
    const canvas = React.createRef()
    const baseImage =
        "https://www.html5rocks.com/static/images/tutorials/easy-hidpi/chrome1x.png"

    const onClick = (event) => {
        dispatch({
            type: "ADD_POINT",
            point: createPoint(canvas.current, event),
        })
    }
    React.useEffect(() => {
        clearCanvas(canvas.current)
        points.forEach((point) => {
            drawPoint(canvas.current, point)
        })
    }, [points])

    return (
        <canvas
            style={{
                background: `url('${baseImage}')`,
                backgroundRepeat: "no-repeat",
            }}
            onClick={onClick}
            height={props.height}
            width={props.width}
            ref={canvas}
        />
    )
}

Canvas.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
}
Canvas.defaultProps = {
    height: 500,
    width: 660,
}

const CanvasWrapper = () => {
    const dispatch = useDispatch()
    const points = useSelector((state) => state.points)

    return (
        <div>
            <Button onClick={() => dispatch({ type: "UNDO" })}>Undo</Button>
            <Typography variant="subtitle1">{points.length}</Typography>
            <div style={styles.canvas}>
                <Canvas />
            </div>
        </div>
    )
}

class Root extends React.Component {
    render() {
        return (
            <Provider store={state}>
                Hello planet earth
                <CanvasWrapper />
            </Provider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById("root"))
