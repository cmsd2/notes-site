
export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  apiBaseUrl: 'https://cdmddj1101.execute-api.us-east-1.amazonaws.com/dev',
  issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_binwYKTFK',
  loginUrl: 'https://cognito.octomonkey.cloud/login',
  logoutUrl: 'https://cognito.octomonkey.cloud/logout',
  registerUrl: 'https://cognito.octomonkey.cloud/register',
  authorizeUrl: 'https://cognito.octomonkey.cloud/oauth2/authorize',
  tokenUrl: 'https://cognito.octomonkey.cloud/oauth2/token',
  auth: {
    userPoolWebClientId: "219d9u26p5du1fia4tj4guvoq1",
    oauth: {
      domain: 'cognito.octomonkey.cloud',
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

