import * as React from "react";
import { withRouter } from "react-router-dom";

import ThemeProvider from "./ThemeProvider";

export default function Provider(props: { children: React.ReactNode }) {
  return <ThemeProvider>{props.children}</ThemeProvider>;
}

export function withProvider(WrappedComponent: any) {
  return withRouter(WrappedComponent);
}
