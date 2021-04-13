import React, { Component } from "react";
import PropTypes from "prop-types";
const eventHandlers = {
  onEditing: "editable:editing",
  onEnable: "editable:enable",
  onDisable: "editable:disable",

  onStartDrawing: "editable:drawing:start",
  onDrawingClick: "editable:drawing:click",
  onDrawingCommit: "editable:drawing:commit",
  onDrawingMouseDown: "editable:drawing:mousedown",
  onDrawingMouseUp: "editable:drawing:mouseup",
  onDrawingMove: "editable:drawing:move",
  onCancelDrawing: "editable:drawing:cancel",
  onEndDrawing: "editable:drawing:end",

  // drag:Event
  onDragStart: "editable:dragstart",
  onDrag: "editable:drag",
  onDragEnd: "editable:dragend",
  onVertexMarkerDrag: "editable:vertex:drag",
  onVertexMarkerDragStart: "editable:vertex:dragstart",
  onVertexMarkerDragEnd: "editable:vertex:dragend",
  // VertexEvent
  onVertextCtrlClick: "editable:vertex:ctrlclick",
  onNewVertex: "editable:vertex:new",
  onVertexMarkerClick: "editable:vertex:click",
  onVertexRawMarkerClick: "editable:vertex:rawclick",
  onVertexDeleted: "editable:vertex:deleted",
  onVertexMarkerCtrlClick: "editable:vertex:ctrlclick",
  onVertexMarkerShiftClick: "editable:vertex:shiftclick",
  onVertexMarkerMetaKeyClick: "editable:vertex:metakeyclick",
  onVertexMarkerAltClick: "editable:vertex:altclick",
  onVertexMarkerContextMenu: "editable:vertex:contextmenu",
  onVertexMarkerMouseDown: "editable:vertex:mousedown",
  onVertexMarkerMouseOver: "editable:vertex:mouseover",
  onVertexMarkerMouseOut: "editable:vertex:mouseout",
  onMiddleMarkerMouseDown: "editable:middlemarker:mousedown",
  // ShapeEvent
  onShapeNew: "editable:shape:new",
  onShapeDelete: "editable:shape:delete", //删除shape时
  onShapeDeleted: "editable:shape:deleted", //shape 删除成功时
};
// function registerDefaultProps() {
//   const ret = {};
//   Object.keys(eventHandlers).forEach((key) => {
//     ret[key] = (e, map) => {};
//   });
//   return ret;
// }
function registerPropTypes() {
  const ret = {};
  Object.keys(eventHandlers).forEach((key) => {
    ret[key] = PropTypes.func;
  });
  return ret;
}
export default class ReactLeafletEditable extends Component {
  //   static defaultProps = registerDefaultProps();
  static propTypes = {
    ...registerPropTypes(),
    map: PropTypes.object.isRequired,
  };
  _registerListeners = () => {
    const { map } = this.props;
    Object.keys(eventHandlers).forEach((key) => {
      if (this.props[key]) {
        map &&
          map.on(eventHandlers[key], (e) => {
            this.props[key](e, map);
          });
      }
    });
  };
  _unregisterListeners = () => {
    const { map } = this.props;
    Object.keys(eventHandlers).forEach((key) => {
      if (this.props[key]) {
        map && map.off(eventHandlers[key]);
      }
    });
  };
  startPolygon = () => {
    const { map } = this.props;
    if (!map) return;
    if (!map.editTools)
      return console.error(
        "Warning please npm install leaflet-editable and import "
      );
    return map.editTools.startPolygon();
  };
  startPolyline = () => {
    const { map } = this.props;
    if (!map) return;
    if (!map.editTools)
      return console.error(
        "Warning please npm install leaflet-editable and import "
      );
    return map.editTools.startPolyline();
  };
  startMarker = () => {
    const { map } = this.props;
    if (!map) return;
    if (!map.editTools)
      return console.error(
        "Warning please npm install leaflet-editable and import "
      );
    return map.editTools.startMarker();
  };
  startRectangle = () => {
    const { map } = this.props;
    if (!map) return;
    if (!map.editTools)
      return console.error(
        "Warning please npm install leaflet-editable and import "
      );
    return map.editTools.startRectangle();
  };
  startCircle = () => {
    const { map } = this.props;
    if (!map) return;
    if (!map.editTools)
      return console.error(
        "Warning please npm install leaflet-editable and import "
      );
    return map.editTools.startCircle();
  };
  startHole = (editor, latlng) => {
    const { map } = this.props;
    if (!map) return;
    if (!map.editTools)
      return console.error(
        "Warning please npm install leaflet-editable and import "
      );
    return map.editTools.startHole(editor, latlng);
  };
  clearAll = () => {
    const { map } = this.props;
    if (!map) return;
    if (!map.editTools)
      return console.error(
        "Warning please npm install leaflet-editable and import "
      );
    map.editTools.featuresLayer.clearLayers();
  };
  componentDidUpdate() {
    if (this.props.map && !this.props.map.hasRegisterListener) {
      this._registerListeners();
      this.props.map.hasRegisterListener = true;
    }
  }
  componentWillUnmount() {
    this._unregisterListeners();
  }
  render() {
    return this.props.children || null;
  }
}
