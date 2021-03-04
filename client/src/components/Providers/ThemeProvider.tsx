import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
