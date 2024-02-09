const AwsExport = {
  Auth: {
    // Amazon Cognito Region
    region: "eu-central-1",
    // Amazon Cognito User Pool ID
    userPoolId: "eu-central-1_eTEPiOOm8",
    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolClientId: "cvhjljm1vvsbst2efg6i0ua3q",
    authenticationFlowType: "USER_PASSWORD_AUTH",
    oauth: {
      domain: "http://localhost:3000/"  ,
      scope: ["email"],
      redirectSignIn: "http://localhost:3000/", // For Dev Env
      redirectSignOut: "http://localhost:3000/", // For Dev Env
      responseType: "code",
    },
  },
};

export default AwsExport;