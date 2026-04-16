import "./styles/index.scss";
import "@xyflow/react/dist/style.css";

import scss from "./app.module.scss";

import { Provider } from "react-redux";
import { ReactFlow, Background, Controls } from "@xyflow/react";

import { store } from "../redux/store";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Flow from "../components/Flow/Flow";

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <main className={scss.root}>
          <ReactFlow>
            <Background />
            <Controls />
            <Flow />
          </ReactFlow>
        </main>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
