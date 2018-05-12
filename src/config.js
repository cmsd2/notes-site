
export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  apiBaseUrl: 'https://cdmddj1101.execute-api.us-east-1.amazonaws.com/dev',
  issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_binwYKTFK',
  loginUrl: 'https://octomonkey.auth.us-east-1.amazoncognito.com/login',
  logoutUrl: 'https://octomonkey.auth.us-east-1.amazoncognito.com/logout',
  registerUrl: 'https://octomonkey.auth.us-east-1.amazoncognito.com/register',
  authorizeUrl: 'https://octomonkey.auth.us-east-1.amazoncognito.com/oauth2/authorize',
  tokenUrl: 'https://octomonkey.auth.us-east-1.amazoncognito.com/oauth2/token',
  auth: {
    userPoolWebClientId: "219d9u26p5du1fia4tj4guvoq1",
    oauth: {
      domain: 'octomonkey.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: '/signin',
      redirectSignOut: '/signout',
      responseType: 'token',
      options: {
        AdvancedSecurityDataCollectionFlag: true
      }
    }
  }
};

