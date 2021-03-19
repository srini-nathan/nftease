import * as React from "react";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function MyApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
