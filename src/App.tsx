import LoadingPage from "pages/LoadingPage/loading";
import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import "./global.scss";
import RootRouter from "./RootRouter";
import ClosedPage from "pages/ClosedPage";

const App: React.FC = () => {
  const [isClosed, setIsClosed] = useState<boolean>(
    process.env.REACT_APP_IS_CLOSED === "true"
  );

  return (
    <RecoilRoot>
      <Suspense fallback={<LoadingPage />}>
        {isClosed ? (
          <ClosedPage setIsClosed={setIsClosed} />
        ) : (
          <RouterProvider router={RootRouter} />
        )}
      </Suspense>
    </RecoilRoot>
  );
};
export default App;
