// export const loadState = (name: string): any => {
//   try {
//     const serializedState = localStorage.getItem(name);
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return undefined;
//   }
// };

// export const saveState = (state: IGlobal) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("sign_in", serializedState);
//     window.dispatchEvent(new Event("sign_in"));
//   } catch (err) {
//     // Ignore write errors.
//   }
// };
