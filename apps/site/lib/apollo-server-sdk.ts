import { cookies } from "next/headers"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"

import { getClient } from "./apollo-client"
import { getSdkApollo } from "./apollo-sdk"

export const serverSdk = () => {
  let nextCookies = cookies()
    .getAll()
    .reduce((acc, cur) => {
      const { name, value } = cur
      acc += `${name}=${value};`
      return acc
    }, "")
  return getSdkApollo(
    registerApolloClient(
      getClient({
        cookies: nextCookies,
      })
    ).getClient()
  )
}
