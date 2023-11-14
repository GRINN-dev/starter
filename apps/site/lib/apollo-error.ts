import { GraphQLError } from "graphql";

export class ApolloRequestError extends Error {
  constructor(public errors: readonly GraphQLError[]) {
    super();
  }

  get message(): string {
    return this.errors.map((e) => e.message).join("\n");
  }

  get graphQLErrors(): readonly GraphQLError[] {
    return this.errors;
  }

  get networkError(): Error | null {
    return null;
  }

  get extraInfo(): any {
    return null;
  }

  get response(): any {
    return null;
  }

}
