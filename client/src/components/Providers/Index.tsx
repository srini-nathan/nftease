import * as React from "react";

import { withRouter } from "react-router-dom";
import MyApolloProvider from "./ApolloProvider";

export default function Provider(props: { children: React.ReactNode }) {
  return (
      <MyApolloProvider>{props.children}</MyApolloProvider>
  );
}

export function withProvider(WrappedComponent: any) {
  return withRouter(WrappedComponent);
}