import { gql } from "@apollo/client";

const Query = {
  USER_GET: gql`
    query UserGet{
      USER_GET {
        _id
        email
        profilePhoto
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
  USER_LOGOUT: gql`
    mutation USER_LOGOUT {
      USER_LOGOUT
    }
  `,
  USER_FB_CONNECT: gql`
    mutation USER_FB_CONNECT($name: String!,$email:String!,$fbid:String! ) {
      USER_FB_CONNECT(name:$name, email: $email, fbid: $fbid)
    }
  `,
};

export default { Query, Mutation };
