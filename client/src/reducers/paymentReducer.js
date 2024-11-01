export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case "PAYMENT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PAYMENT_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        paymentInstance: action.payload,
      };
    case "PAYMENT_REQUEST_FAILED":
      return {
        ...state,
        loading: false,
        paymentInstance: undefined,
      };
    case "PAYMENT_REQUEST_COMPLETE":
      return {
        ...state,
        loading: false,
        paymentInstance: undefined,
      };
    case "PAYMENT_VERIFICATION_REQUEST":
      return {
        ...state,
        paymentInstance: undefined,
        loading: true,
      };
    case "PAYMENT_VERIFICATION_SUCCESS":
      return {
        ...state,
        loading: false,
        paymentInstance: undefined,
      };
    case "PAYMENT_VERIFICATION_FAILED":
      return {
        ...state,
        loading: false,
        paymentInstance: undefined,
      };
    default:
      return state;
  }
};
