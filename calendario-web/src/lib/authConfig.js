export const msalConfig = {
  auth: {
    clientId: 'aa458398-315d-4452-9f32-c68969cc8390',
    authority: 'https://login.microsoftonline.com/dc9309c7-f405-4b26-a9fa-87e9b6aff3d3',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

export const loginRequest = {
  scopes: ['User.Read'],
}
