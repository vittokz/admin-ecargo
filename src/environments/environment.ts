/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyDoH1yb5kzdSzB0P4iskpspk_MBKgMLWPg",
        authDomain: "logistic-solutions-e9aaf.firebaseapp.com",
        projectId: "logistic-solutions-e9aaf",
        storageBucket: "logistic-solutions-e9aaf.appspot.com",
        messagingSenderId: "699858240276",
        appId: "1:699858240276:web:7f048b8cac8dc221bb7801",
        measurementId: "G-HT9748HN1M"
      },
    mapBox: {
      tokenMapBox: 'pk.eyJ1Ijoidml0dG9yaW8xNSIsImEiOiJjbDhzem13ajMwMml4M3dxbXZxaWI0aTRzIn0.z4z_KAx4chBQzogbsU85LQ',
      api: 'https://api.mapbox.com/directions/v5/mapbox/driving',
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplifield',
        steps: false,
        access_token: 'pk.eyJ1Ijoidml0dG9yaW8xNSIsImEiOiJjbDhzem13ajMwMml4M3dxbXZxaWI0aTRzIn0.z4z_KAx4chBQzogbsU85LQ',
      }
    }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
