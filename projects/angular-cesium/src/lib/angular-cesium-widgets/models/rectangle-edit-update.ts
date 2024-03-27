import { EditPoint } from './edit-point';
import { Cartesian3 } from '../../angular-cesium/models/cartesian3';
import { BasicEditUpdate } from './basic-edit-update';
import { PolygonEditUpdate } from './polygon-edit-update';
import { RectangleEditOptions } from './rectangle-edit-options';

export interface RectangleEditUpdate extends BasicEditUpdate<PolygonEditUpdate> {
  positions?: Cartesian3[];
  updatedPosition?: Cartesian3;
  draggedPosition?: Cartesian3;
  points?: EditPoint[];
  updatedPoint?: EditPoint;
  rectangleOptions?: RectangleEditOptions;
}

