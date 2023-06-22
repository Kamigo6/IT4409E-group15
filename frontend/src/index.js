import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";
const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState(store);
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorker.register();
