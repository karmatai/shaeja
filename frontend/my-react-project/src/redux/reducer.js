import { LOG_IN, LOG_OUT, IS_RECORDING, DONE_RECORDING,RESULT_DATA  } from "./action";

const initialState = {
    isLogedIn: false,
    isRecording: false,
    doneRecording: false,
    userData: {},
    resultdata: null,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLogedIn: true,
                userData: action.payload,
            };
        }
        case LOG_OUT: {
            return { ...state, isLogedIn: false }
        }
        case IS_RECORDING: {
            return { ...state, isRecording: action.payload }
        }
        case DONE_RECORDING: {
            return { ...state, doneRecording: action.payload }
        }
        case RESULT_DATA: {
            return  {
                ...state, resultdata: action.payload
            }
        }
        default:
            return state;
    }
};
export default appReducer;