/* eslint-disable graphql/template-strings */

import { gql } from "@apollo/client";

/* Make sure tthe field names match `LocalStateShape` in `@/cache` */
export default {
  Query: {
    IS_LOGGED_IN: gql`
      query IsLoggedIn {
        isLoggedIn @client
      }
    `,
  },
};
