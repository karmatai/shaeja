export const RESULT_DATA = "RESULT_DATA";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const IS_RECORDING = "IS_RECORDING";
export const DONE_RECORDING = "DONE_RECORDING";

export const setIsRecording = (isRecording) => {
    return {
        type: IS_RECORDING,
        payload: isRecording,
    };
}

export const setDoneRecording = (isDone) => {
    return {
        type: DONE_RECORDING,
        payload: isDone,
    };
}


export const setResultData = (data) => {
    console.log("re,",data);
    return {

        type: RESULT_DATA,
        payload: data,
    };
}