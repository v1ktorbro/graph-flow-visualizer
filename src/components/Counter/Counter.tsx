import scss from "./counter.module.scss";

import { useCallback, useState, ChangeEvent } from "react";

import { useAppDispatch } from "../../redux/hooks";
import { useGetDefaultState } from "../../redux/reducers/default/selectors/getDefaultState/getDefaultState";
import { setCounterValue } from "../../redux/reducers/default/slice/defaultSlice";

const Counter = () => {
  const dispatch = useAppDispatch();
  const { counterValue } = useGetDefaultState();

  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(counterValue);

  const increment = useCallback(() => setCount(count + 1), [count]);
  const decrement = useCallback(() => setCount(count - 1), [count]);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(+value);
  }, []);

  const inputIncrement = useCallback(() => {
    dispatch(setCounterValue(counterValue + inputValue));
  }, [counterValue, dispatch, inputValue]);

  const inputDecrement = useCallback(() => {
    dispatch(setCounterValue(counterValue - inputValue));
  }, [counterValue, dispatch, inputValue]);

  return (
    <div className={scss.root}>
      <div className={scss.wrap}>
        <p>UseState </p>
        <h1>{`${count}`}</h1>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>

      <div className={scss.wrap}>
        <p>Redux Value </p>
        <h1>{`${counterValue}`}</h1>
        <input
          defaultValue={counterValue}
          type="number"
          onChange={onChangeInput}
        />
        <button onClick={inputIncrement}>Add ( + )</button>
        <button onClick={inputDecrement}>Turn it down ( - )</button>
      </div>
    </div>
  );
};

export default Counter;
