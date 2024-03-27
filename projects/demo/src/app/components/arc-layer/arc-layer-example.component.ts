import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { AcLayerComponent, AcNotification, ActionType } from 'angular-cesium';

@Component({
  selector: 'arc-layer-example',
  templateUrl: 'arc-layer-example.component.html'
})

export class ArcLayerExampleComponent implements OnInit, AfterViewInit {
  arcs$: Observable<AcNotification>;
  show = true;
  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  constructor() {
    const colorMaterial = Cesium.Material.fromType('Color');
    colorMaterial.uniforms.color = Cesium.Color.YELLOW;

    const arcArray: any[] = [];
    for (let i = 0; i < 1000; i++) {
      const randCenter = Cesium.Cartesian3.fromDegrees(Math.random() * 90 - 40, Math.random() * 90 - 40);
      const randomDelta = Math.PI;
      const randomRadius = Math.random() * 1000000;
      const randomAngle = Math.random() * 3 - 1;

      arcArray.push({
        id: i,
        actionType: ActionType.ADD_UPDATE,
        entity: {
          angle: randomAngle,
          delta: randomDelta,
          radius: randomRadius,
          center: randCenter,
          appearance: new Cesium.PolylineMaterialAppearance({
            material: colorMaterial
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom())
          },
        }
      });
    }

    this.arcs$ = Observable.create(function (observable: Subscriber<any>) {
      arcArray.forEach(function (arc) {
        observable.next(arc);
      });

      setTimeout(function () {
        const newColorMaterial = Cesium.Material.fromType('Color');
        newColorMaterial.uniforms.color = Cesium.Color.RED;

        arcArray.forEach(function (arc) {
          const newArc = Object.assign({}, arc);

          newArc.entity = {};

          newArc.entity.appearance = new Cesium.PolylineMaterialAppearance({
            material: newColorMaterial
          });

          observable.next(newArc);
        });
      }, 2000);
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  removeAll() {
  }

  setShow($event: boolean) {
    this.show = $event;
  }
}
