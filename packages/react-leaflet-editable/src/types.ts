import type {
  Map as LeafletMap,
  LayerGroup,
  LatLng,
  MarkerOptions,
  PolylineOptions,
  Rectangle,
  Circle,
  CircleMarkerOptions,
  Marker,
  Polygon,
  Polyline,
  LeafletMouseEvent,
  CircleMarker,
  Evented,
  Layer,
} from "leaflet";

const eventNamesMap = {
  onCreated: "editable:created",
  onEditing: "editable:editing",
  onEnable: "editable:enable",
  onDisable: "editable:disable",

  onDrawingStart: "editable:drawing:start",
  onDrawingClick: "editable:drawing:click",
  onDrawingClicked: "editable:drawing:clicked",
  onDrawingCommit: "editable:drawing:commit",
  onDrawingMouseDown: "editable:drawing:mousedown",
  onDrawingMouseUp: "editable:drawing:mouseup",
  onDrawingMove: "editable:drawing:move",
  onDrawingCancel: "editable:drawing:cancel",
  onDrawingEnd: "editable:drawing:end",

  // drag:Event
  onDragStart: "editable:dragstart",
  onDrag: "editable:drag",
  onDragEnd: "editable:dragend",
  onVertexDrag: "editable:vertex:drag",
  onVertexDragStart: "editable:vertex:dragstart",
  onVertexDragEnd: "editable:vertex:dragend",
  // VertexEvent
  onVertexCtrlClick: "editable:vertex:ctrlclick",
  onVertexNew: "editable:vertex:new",
  onVertexClick: "editable:vertex:click",
  onVertexClicked: "editable:vertex:clicked",
  onVertexRawClick: "editable:vertex:rawclick",
  onVertexDeleted: "editable:vertex:deleted",
  onVertexShiftClick: "editable:vertex:shiftclick",
  onVertexMetaKeyClick: "editable:vertex:metakeyclick",
  onVertexAltClick: "editable:vertex:altclick",
  onVertexContextMenu: "editable:vertex:contextmenu",
  onVertexMouseDown: "editable:vertex:mousedown",
  onVertexMouseOver: "editable:vertex:mouseover",
  onVertexMouseOut: "editable:vertex:mouseout",
  onMiddleMarkerMouseDown: "editable:middlemarker:mousedown",
  // ShapeEvent
  onShapeNew: "editable:shape:new",
  onShapeDelete: "editable:shape:delete", //删除shape时
  onShapeDeleted: "editable:shape:deleted", //shape 删除成功时
} as const;

type EventNames = keyof typeof eventNamesMap;

const eventNames = Object.keys(eventNamesMap) as EventNames[];

type LeafletEditableProps = {
  [key in EventNames]?: (...args: any[]) => void;
};
type HookHoleEditor = {
  newHole(latlng?: LatLng): void;
  [key: string]: any;
};
//  L.Editable Interface
interface Editable extends Evented {
  featuresLayer: LayerGroup;
  editLayer: LayerGroup;
  forwardLineGuide: Polyline;
  backwardLineGuide: Polyline;
  map: EditableMap;
  drawing(): boolean;
  anchorBackwardLineGuide(latlng: LatLng): void;
  anchorForwardLineGuide(latlng: LatLng): void;
  attachBackwardLineGuide(): void;
  attachForwardLineGuide(): void;
  blockEvents(): void;
  // callInHooks(): void;
  commitDrawing(event: LeafletMouseEvent): void;
  connectCreatedToMap(layer: Layer): void;
  createCircle(latlng: LatLng, options?: CircleMarkerOptions): Circle;
  createCircleMarker(latlng: LatLng, options?: CircleMarkerOptions): CircleMarker;
  createEditLayer(): LayerGroup;
  createFeaturesLayer(): LayerGroup;
  createLayer(klass: any, latlngs: any, options?: any): Layer;
  createLineGuide(): Polyline;
  createMarker(latlng: LatLng, options?: MarkerOptions): Marker;
  createPolygon(latlngs: LatLng[] | LatLng[][], options?: PolylineOptions): Polygon;
  createPolyline(latlngs: LatLng[] | LatLng[][], options?: PolylineOptions): Polyline;
  createRectangle(bounds: any, options?: PolylineOptions): Rectangle;
  createVertexIcon(options: any): HTMLElement;
  detachBackwardLineGuide(): void;
  detachForwardLineGuide(): void;
  fireAndForward(type: string, e: any): void;
  initialize(map: LeafletMap, options?: any): void;
  moveBackwardLineGuide(latlng: LatLng): void;
  moveForwardLineGuide(latlng: LatLng): void;
  onMousedown(e: LeafletMouseEvent): void;
  onMouseup(e: LeafletMouseEvent): void;
  options: any;
  registerForDrawing(editor: any): void;
  unregisterForDrawing(editor: any): void;
  unblockEvents(): void;
  stopDrawing(): void;
  startPolyline(latLng?: LatLng, options?: PolylineOptions): Polyline;
  startPolygon(latLng?: LatLng, options?: PolylineOptions): Polygon;
  startMarker(latLng?: LatLng, options?: MarkerOptions): Marker;
  startRectangle(latLng?: LatLng, options?: PolylineOptions): Rectangle;
  startCircle(latLng?: LatLng, options?: CircleMarkerOptions): Circle;
  startCircleMarker(latLng?: LatLng, options?: CircleMarkerOptions): CircleMarker;
  startHole(editor: HookHoleEditor, latlng?: LatLng): void;
  [key: string]: any;
}

type EditableMap = LeafletMap & {
  editTools: Editable;
};

type LeafletEditableHandleProps = Editable & {
  clearAll(): LayerGroup;
};

export type {
  HookHoleEditor,
  EventNames,
  EditableMap,
  LeafletEditableHandleProps,
  LeafletEditableProps,
};
export { eventNamesMap, eventNames };
