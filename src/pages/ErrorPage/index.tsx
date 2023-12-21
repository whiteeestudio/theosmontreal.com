import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);
  return <div>Something went wrong...</div>;
};

export default ErrorPage;
