import { reactive, readonly } from "vue";

export type StoreState = {
  currentComponent: string;
  message: string;
  feedbackType: string;
  fingerPrint: string;
  apiKey: string;
  currentPage: string;
};

const initialState: StoreState = {
  currentComponent: "SelectFeedbackType",
  message: "",
  feedbackType: "",
  fingerPrint: "",
  apiKey: "",
  currentPage: "",
};

const state = reactive<StoreState>({ ...initialState });

export function setCurrentComponent(component: string): void {
  state.currentComponent = component;
}

export function setMessage(message: string): void {
  state.message = message;
}

export function setFeedbackType(type: string): void {
  state.feedbackType = type;
}

export function setCurrentPage(page: string): void {
  state.currentPage = page;
}

export function setApiKey(apiKey: string): void {
  state.apiKey = apiKey;
}

export function setFingerPrint(fingerPrint: string): void {
  state.fingerPrint = fingerPrint;
}

export function resetStore(): void {
  setCurrentComponent(initialState.currentComponent);
  setMessage(initialState.message);
  setFeedbackType(initialState.feedbackType);
  setCurrentPage(initialState.currentPage);
  setFingerPrint(initialState.fingerPrint);
}

export default readonly(state);
