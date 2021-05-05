import { AllConstants } from "../_constants";
import { testKitDetailService } from "../_services";

export const testKitActions = {
  getTestKitDetail,
  setAllAnswers,
};

function getTestKitDetail(name_url) {
  return (dispatch) => {
    dispatch(request());
    testKitDetailService.getTestKitDetail(name_url).then(
      (testKitDetail) => dispatch(success(testKitDetail)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: AllConstants.TESTKIT_DETAIL_REQUEST };
  }
  function success(testKitDetail) {
    return { type: AllConstants.TESTKIT_DETAIL_SUCCESS, testKitDetail };
  }
  function failure(error) {
    return { type: AllConstants.TESTKIT_DETAIL_FAILURE, error };
  }
}

function setAllAnswers(name_url, answers) {
  return (dispatch) => {
    dispatch(request());
    testKitDetailService.setAllAnswers(name_url, answers).then(
      (testResult) => dispatch(success(testResult)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: AllConstants.ANSWERS_SETALL_REQUEST };
  }
  function success(testResult) {
    return { type: AllConstants.ANSWERS_SETALL_SUCCESS, testResult };
  }
  function failure(error) {
    return { type: AllConstants.ANSWERS_SETALL_FAILURE, error };
  }
}
