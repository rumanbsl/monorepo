/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: USER_GET
// ====================================================

export interface USER_GET_USER_GET {
  __typename: "UserOutput";
  _id: string | null;
  email: string | null;
  profilePhoto: string | null;
  isDriving: boolean;
}

export interface USER_GET {
  USER_GET: USER_GET_USER_GET | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: USER_EMAIL_SIGN_IN
// ====================================================

export interface USER_EMAIL_SIGN_IN {
  USER_EMAIL_SIGN_IN: string;
}

export interface USER_EMAIL_SIGN_INVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: USER_LOGOUT
// ====================================================

export interface USER_LOGOUT {
  USER_LOGOUT: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: USER_FB_CONNECT
// ====================================================

export interface USER_FB_CONNECT {
  USER_FB_CONNECT: string;
}

export interface USER_FB_CONNECTVariables {
  name: string;
  email: string;
  fbid: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: USER_TOGGLE_DRIVING_MODE
// ====================================================

export interface USER_TOGGLE_DRIVING_MODE {
  USER_TOGGLE_DRIVING_MODE: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
