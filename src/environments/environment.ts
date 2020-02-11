// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'Individual Trello Dev',
  apiUrl: 'https://api.trello.com/1/',
  apiKey: '786f5bf987110871a3a18ead22d89423',
  secretKey: 'a58ac3a07dad438b34c1809f2676a8a81deaeb14fde22ea54a2990b04cf808b7',
  redirect_url: 'https://individual-trello.azurewebsites.net/redirect',
  urlAuthorizeToken: 'https://trello.com/1/authorize',
  urlGetToken: 'https://trello.com/1/OAuthGetRequestToken',
  urlGetAccessToken: 'https://trello.com/1/OAuthGetAccessToken'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
