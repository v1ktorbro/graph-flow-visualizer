import "./styles/index.scss";

import { Provider } from "react-redux";

import { store } from "../redux/store";
import Counter from "../components/Counter/Counter";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div>
          <h1>Шаблон для разработки фронта</h1>
          <Counter />
        </div>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
