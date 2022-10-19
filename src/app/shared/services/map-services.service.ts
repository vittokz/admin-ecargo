/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds } from 'mapbox-gl';
import { DirectionsResponse, Route } from '../models/directions.model';
import * as Mapboxgl from 'mapbox-gl';
@Injectable({
    providedIn: 'root',
})
export class MapServiciosService {
    constructor(private http: HttpClient) {}

    consultaApiMapa(url: string): any {
        return this.http.get<DirectionsResponse>(url);
    }

    pintarMapa(route: Route, mapa: Mapboxgl.Map): void {
        const coords = route.geometry.coordinates;
        const bounds = new LngLatBounds();
        coords.forEach(([lng, lat]) => {
            bounds.extend([lng, lat]);
        });
        //poliline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
              type:'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords,
                        },
                    },
                ],
            },
        };
        //TODO BORRAR PUNTOS ANTERIORES
        mapa.addSource('RouteString', sourceData);
        mapa.addLayer({
          id: 'RouteString',
          type: 'line',
          source:'RouteString',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-color': 'red',
            'line-width': 3
          }
        });
    }
}
