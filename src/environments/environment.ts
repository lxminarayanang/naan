// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  encryptedReq: false,
  secretKey: 'track#0071#',
  //domain: 'https://vazhikaatti.tnschools.gov.in/api/',
  //domain: 'http://43.204.33.103/api',
  //domain: 'http://naanmudhalvantest.com/api',
  //domain: 'http://ec2-3-90-213-241.compute-1.amazonaws.com/api/api',
  //domain: 'http://15.207.33.115:8080/api',

  //Local Node Environement
    domain:'http://localhost:8080/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
