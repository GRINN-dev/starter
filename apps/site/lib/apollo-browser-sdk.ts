import { getClient } from "./apollo-client"
import { getSdkApollo } from "./apollo-sdk"

export const sdk = () => getSdkApollo(getClient()())
