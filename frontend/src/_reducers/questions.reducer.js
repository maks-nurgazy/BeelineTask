import {AllConstants} from "../_constants";

export function testKit(state = {}, action) {
    switch (action.type) {
        case AllConstants.TESTKIT_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case AllConstants.TESTKIT_DETAIL_SUCCESS:
            return {
                testKitDetail: action.testKitDetail,
            };
        case AllConstants.TESTKIT_DETAIL_FAILURE:
            return {
                error: action.error,
            };
        case AllConstants.ANSWERS_SETALL_REQUEST:
            return {
                loading: true,
            };
        case AllConstants.ANSWERS_SETALL_SUCCESS:
            return {
                testResult: action.testResult,
            };
        case AllConstants.ANSWERS_SETALL_FAILURE:
            return {
                error: action.error,
            };
        default:
            return state;
    }
}
