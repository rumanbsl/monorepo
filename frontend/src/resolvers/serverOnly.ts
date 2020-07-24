import { gql } from "@apollo/client";

const Query = {
  USER_GET: gql`
    query UserGet{
      USER_GET {
        _id
        email
      }
    }
  `,
};

const Mutation = {
  USER_EMAIL_SIGN_IN: gql`
    mutation USER_EMAIL_SIGN_IN($email: String!, $password:String!) {
      USER_EMAIL_SIGN_IN(email: $email, password: $password)
    }
  `,
};

export default { Query, Mutation };
