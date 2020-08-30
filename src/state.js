import { createStore } from "redux"

const initialState = {
    points: [],
    point: null,
}
// eslint-disable-next-line default-param-last
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_POINT":
            return {
                ...state,
                point: action.point,
                points: state.points.concat({
                    ...action.point,
                    time: new Date(),
                }),
            }
        case "UNDO":
            return {
                ...state,
                point: state.points[state.points.length - 1],
                points: state.points.slice(0, state.points.length - 1),
            }

        default:
            return state
    }
}

export default createStore(rootReducer)
