import { FC } from "react";

type Props = {
  isLoading: boolean;
  error: any;
};

const Maybe: FC<Props> = ({ isLoading, error, children }) => {
  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;
  return <>{children}</>;
};

export default Maybe;
