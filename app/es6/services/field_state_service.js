export default class fieldStateService {
  hasError(inputField) {
    return inputField && inputField.$dirty && inputField.$invalid;
  }
}
