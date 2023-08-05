
//Adding userPoolId and userPoolWebClientId from Cognito User Pool
export const environment ={

        cognito: {
          userPoolId:'YOUR_USER_POOL_ID', //Replace with your Cognito User Pool ID
          userPoolWebClientId: 'YOUR_USER_POOL_CLIENT_ID' //Replace with your Cognito User Pool Client ID
        }
}
