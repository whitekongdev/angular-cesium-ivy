import { Injectable } from '@angular/core';
import { from, interval } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { CoordinateConverter } from 'angular-cesium';

const randomSign = () => Math.round(Math.random()) * 2 - 1;

@Injectable({
  providedIn: 'root'
})
export class MockDataProviderService {

  constructor() {
  }

  get$(amount = 5) {
    const staticEntities = this.initEntities(amount);
    return from(staticEntities);
  }

  getDataSteam$(amount = 50, intervalMs = 1000) {
    const staticEntities = this.initRandom(amount);

    return interval(intervalMs).pipe(
      map(intervalValue => {
        return staticEntities.map(entity => {
          const cartographic = Cesium.Cartographic.fromCartesian(entity.position);
          cartographic.longitude += Cesium.Math.toRadians(0.05 * intervalValue);
          cartographic.latitude += randomSign() * Cesium.Math.toRadians(0.05 * intervalValue);
          entity.position = Cesium.Cartographic.toCartesian(cartographic);
          entity.array = this.getArrayBySize(entity, 2);
          return entity;
        });
      }),
      flatMap(entity => entity));
  }

  private initEntities(amount) {
    const staticEntities = [];
    for (let i = 0; i < amount; i++) {
      staticEntities.push({
        id: i.toString(),
        position: Cesium.Cartesian3.fromDegrees(-100.0 + (i * 5), 40.0),
      });
    }
    return staticEntities;
  }

  private initRandom(amount) {
    const staticEntities = [];
    for (let i = 0; i < amount; i++) {
      const lat = 70 * Math.random() * randomSign();
      const long = 180 * Math.random() * randomSign();
      const altitude = 50000 * Math.random();
      staticEntities.push({
        id: i.toString(),
        position: Cesium.Cartesian3.fromDegrees(long, lat, altitude),
        color:  Cesium.Color.fromRandom({minimumAlpha: 1}),
      });
    }
    return staticEntities;
  }

  getArrayBySize(entity, size: number) {
    const location = CoordinateConverter.cartesian3ToLatLon(entity.position);
    const arr = [
      {
        pos: Cesium.Cartesian3.fromDegrees(location.lon + 1, location.lat + 1, location.height),
        innerArray: [
          {
            pos: Cesium.Cartesian3.fromDegrees(location.lon + 1.5, location.lat + 1.5, location.height),
            id: '0'
          },
        ],
        id: '0'
      },
      {
        pos: Cesium.Cartesian3.fromDegrees(location.lon + 1, location.lat - 1, location.height),
        innerArray: [
          {
            pos: Cesium.Cartesian3.fromDegrees(location.lon + 1.5, location.lat - 1.5, location.height),
            id: '0'
          },
        ],
        id: '1'
      },
      {
        pos: Cesium.Cartesian3.fromDegrees(location.lon - 1, location.lat + 1, location.height),
        innerArray: [
          {
            pos: Cesium.Cartesian3.fromDegrees(location.lon - 1.5, location.lat + 1.5, location.height),
            id: '0'
          },
        ],
        id: '2'
      },
      {
        pos: Cesium.Cartesian3.fromDegrees(location.lon - 1, location.lat - 1, location.height),
        innerArray: [
          {
            pos: Cesium.Cartesian3.fromDegrees(location.lon - 1.5, location.lat - 1.5, location.height),
            id: '0'
          },
        ],
        id: '3'
      },
    ];

    return arr.slice(0, size);
  }


}
