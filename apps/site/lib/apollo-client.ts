import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import hashes from "@grinn/codegen/persisted-query-ids/client.json";
import { usePregeneratedHashes as withPregeneratedHashes } from "graphql-codegen-persisted-query-ids/lib/apollo";

export type Token = {
  sub: string;
  iss?: string;
  exp?: string;
  aud?: string;
};

const persistedLink = createPersistedQueryLink({
  useGETForHashedQueries: false,
  generateHash: withPregeneratedHashes(hashes),
  disable: () => false,
});

const httpLink = (input?: { cookies: any }) => {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_ENDPOINT;
  return new HttpLink({
    uri: API_URL + "/graphql",
    credentials: "include",
    headers: {
      cookie: input?.cookies,
      cache: "no-store",
    },
  });
};

export const getClient = (input?: { cookies: any }) => () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    credentials: "include",
    link: ApolloLink.from([
      // ...(process.env.NODE_ENV === "production" ? [persistedLink] : []),
      persistedLink,
      httpLink(input),
    ]),
  });
};
