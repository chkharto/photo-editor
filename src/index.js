import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from "aws-amplify";
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

const authConfig = {
  Cognito: {
    userPoolId: 'eu-central-1_eTEPiOOm8',
    userPoolClientId: 'cvhjljm1vvsbst2efg6i0ua3q'
  }
};

Amplify.configure({
  Auth: authConfig
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
