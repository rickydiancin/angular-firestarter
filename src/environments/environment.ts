// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // ===================== gentec-admin-development =============================
  // firebase: {
  //   apiKey: "AIzaSyCgI7hHCfe_dOeWfbENdf0TdiWz7sSTyfQ",
  //   authDomain: "gentec-admin-development.firebaseapp.com",
  //   databaseURL: "https://gentec-admin-development.firebaseio.com",
  //   projectId: "gentec-admin-development",
  //   storageBucket: "gentec-admin-development.appspot.com",
  //   messagingSenderId: "101340459147"
  // }

  firebase: {
    apiKey: "AIzaSyDbkwnutDsJ-Glqi3KpwYvC4rTcqjpXKX8",
    authDomain: "gentec-admin.firebaseapp.com",
    databaseURL: "https://gentec-admin.firebaseio.com",
    projectId: "gentec-admin",
    storageBucket: "gentec-admin.appspot.com",
    messagingSenderId: "188938269212"
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
