// Mismo tenant y app registration que dashboard-web: el login queda restringido al directorio
// de Azure AD de Guandy, así que solo cuentas @guandy.com pueden autenticarse aquí.
export const msalConfig = {
  auth: {
    clientId: 'cf019ff8-c08f-47af-a232-ac25d1439c76',
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
