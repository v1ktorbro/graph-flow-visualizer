import "./styles/index.scss";
import "@xyflow/react/dist/style.css";

import scss from "./app.module.scss";

import { Provider } from "react-redux";

import { store } from "../redux/store";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Flow from "../components/Flow/Flow";

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <main className={scss.root}>
          <Flow />
        </main>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
