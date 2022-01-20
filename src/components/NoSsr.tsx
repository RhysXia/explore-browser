import React from 'react';

export type NoSsrProps = {
  children: React.ReactNode;
};

const NoSsr: React.FunctionComponent<NoSsrProps> = ({ children }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
  }, []);

  if (show) {
    return <>{children}</>;
  }

  return null;
};

export default NoSsr;
