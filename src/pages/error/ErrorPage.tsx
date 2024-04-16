import { useCallback } from "react";

import scss from "./errorPage.module.scss";

const ErrorPage = () => {
  // const navigate = useNavigate();

  const reloadPage = useCallback(() => {
    location.reload();
  }, []);

  // const backToStartPage = useCallback(() => {
  //   navigate(`/`, { replace: true });
  //   location.reload();
  // }, [navigate]);

  return (
    <div className={scss.root}>
      <p> Opps! Please push the button below! </p>
      <button onClick={reloadPage}>Reload</button>
      {/* <Button onClick={backToStartPage}>Back to main page</Button> */}
    </div>
  );
};

export default ErrorPage;
