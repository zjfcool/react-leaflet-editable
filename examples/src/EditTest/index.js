import React, { useRef, useState } from "react";
import ReactLeafletEditable from "../../../src/ReactLeafletEditable";
// import ReactLeafletEditable from "../../../dist/bundle";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";
import "leaflet-editable";
import { MapContainer, TileLayer } from "react-leaflet";
import "./styles.module.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadowIcon from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadowIcon,
});

export default function EditTest() {
  const [isContinueDisabled, setContinueDisabled] = useState(true);
  const [map, setMap] = useState();
  const editRef = useRef();
  let redoArr = [],
    editors = [],
    layers = [],
    tooltip;
  const editPolygon = () => {
    editRef.current.startPolygon();
  };
  const editPolyline = () => {
    editRef.current.startPolyline();
  };
  const editCircle = () => {
    editRef.current.startCircle();
  };
  const editMarker = () => {
    editRef.current.startMarker();
  };
  const editRectangle = () => {
    editRef.current.startRectangle();
  };
  const clearAll = () => {
    editRef.current.clearAll();
    editors = [];
  };
  const onEndDrawing = (e, map) => {
    redoArr = [];
    removeTooltip(e);
    editors.push(e.layer.editor);
    layers.push(e.layer);
    setContinueDisabled(
      !editors.some((editor) => {
        return editor.continueBackward;
      })
    );
    layerListeners();
  };
  const layerListeners = () => {
    layers.forEach((layer) => {
      layer.on("mouseover", (e) => {
        layer.bindTooltip("Ctrl+click delete layer").openTooltip();
      });
      layer.on("click", L.DomEvent.stop).on(
        "click",
        function (e) {
          console.log(this.editor.deleteShapeAt, this.editEnabled(), e);
          if (
            (e.originalEvent.ctrlKey || e.originalEvent.metaKey) &&
            this.editEnabled() &&
            this.editor.deleteShapeAt
          )
            this.editor.deleteShapeAt(e.latlng);
        },
        layer
      );
    });
  };
  const continueBackward = () => {
    editors.forEach((editor) => {
      console.log(editor.continueBackward);
      editor.continueBackward && editor.continueBackward();
    });
  };
  const continueForward = () => {
    editors.forEach((editor) => {
      editor.continueForward && editor.continueForward();
    });
  };
  const onStartDrawing = (e, map) => {
    const container = document.querySelector(".leaflet-container");
    tooltip = L.DomUtil.create("span", "tooltip-wrapper");
    tooltip.style.zIndex = "9999";
    tooltip.style.position = "absolute";
    container.appendChild(tooltip);
    addTooltip(e);
  };
  const onDrawingClick = (e, map) => {
    updateTooltip(e);
  };
  const addTooltip = (e) => {
    L.DomEvent.on(document, "mousemove", moveTooltip);
    tooltip.innerHTML = `Ctrl+Z 回退 , Shift+Z 前进 `;
    tooltip.style.display = "block";
  };
  const removeTooltip = (e) => {
    tooltip.innerHTML = "";
    tooltip.style.display = "none";
    L.DomEvent.off(document, "mousemove", moveTooltip);
  };
  const moveTooltip = (e) => {
    tooltip.style.left = e.clientX + 20 + "px";
    tooltip.style.top = e.clientY - 10 + "px";
  };
  const updateTooltip = (e) => {
    if (!e.layer.editor._drawnLatLngs) return;
    if (e.layer.editor._drawnLatLngs.length < e.layer.editor.MIN_VERTEX) {
      tooltip.innerHTML = `Ctrl+Z 回退 , Shift+Z 前进.${e.latlng.lat},${e.latlng.lng}`;
    } else {
      tooltip.innerHTML =
        "Ctrl+Z 回退 , Shift+Z 前进.${e.latlng.lat},${e.latlng.lng}";
    }
  };
  // 后退：Ctrl+Z，前进：Shift+Z
  const redoListener = function (map) {
    let latlng = null;
    L.DomEvent.addListener(
      document,
      "keydown",
      function (e) {
        if (e.keyCode == 90) {
          if (!this.editTools._drawingEditor) return;
          if (e.shiftKey) {
            if (redoArr.length)
              this.editTools._drawingEditor.push(redoArr.pop());
          } else {
            latlng = this.editTools._drawingEditor.pop();
            if (latlng) redoArr.push(latlng);
          }
        }
      },
      map
    );
  };
  const wenMapCreated = (map) => {
    setMap(map);
    redoListener(map);
  };
  return (
    <ReactLeafletEditable
      ref={editRef}
      map={map}
      // onShapeDelete={(e,map)=>{console.log('shape delete')}}
      // onShapeDeleted={(e,map)=>{console.log('shape deleted')}}
      // onEditing={(e, map) => { console.log('onEditing') }}
      // onEnable={(e, map) => { console.log('onEnable') }}
      // onDisable={(e, map) => { console.log('onDisable') }}
      onStartDrawing={onStartDrawing}
      onDrawingClick={onDrawingClick}
      onEndDrawing={onEndDrawing}
      // onDrawingCommit={(e, map) => { console.log('onDrawingCommit') }}
      // onDrawingMouseDown={(e, map) => { console.log('onDrawingMouseDown') }}
      // onDrawingMouseUp={(e, map) => { console.log('onDrawingMouseUp') }}
      // onDrawingMove={(e, map) => { console.log('onDrawingMove') }}
      // onCancelDrawing={(e, map) => { console.log('onCancelDrawing') }}
      // onDragStart={(e, map) => { console.log('onDragStart') }}
      // onDrag={(e, map) => { console.log('onDrag') }}
      // onDragEnd={(e, map) => { console.log('onDragEnd') }}
      // onVertexMarkerDrag={(e, map) => { console.log('onVertexMarkerDrag') }}
      // onVertexMarkerDragStart={(e, map) => { console.log('onVertexMarkerDragStart') }}
      // onVertexMarkerDragEnd={(e, map) => { console.log('onVertexMarkerDragEnd') }}
      // onVertextCtrlClick={(e, map) => { console.log('onVertextCtrlClick') }}
      // onNewVertex={(e, map) => { console.log('onNewVertex') }}
      // onVertexMarkerClick={(e, map) => { console.log('onVertexMarkerClick') }}
      // onVertexRawMarkerClick={(e, map) => { console.log('onVertexRawMarkerClick') }}
      // onVertexDeleted={(e, map) => { console.log('onVertexDeleted') }}
      // onVertexMarkerCtrlClick={(e, map) => { console.log('onVertexMarkerCtrlClick') }}
      // onVertexMarkerShiftClick={(e, map) => { console.log('onVertexMarkerShiftClick') }}
      // onVertexMarkerMetaKeyClick={(e, map) => { console.log('onVertexMarkerMetaKeyClick') }}
      // onVertexMarkerAltClick={(e, map) => { console.log('onVertexMarkerAltClick') }}
      // onVertexMarkerContextMenu={(e, map) => { console.log('onVertexMarkerContextMenu') }}
      // onVertexMarkerMouseDown={(e, map) => { console.log('onVertexMarkerMouseDown') }}
      // onVertexMarkerMouseOver={(e, map) => { console.log('onVertexMarkerMouseOver') }}
      // onVertexMarkerMouseOut={(e, map) => { console.log('onVertexMarkerMouseOut') }}
      // onMiddleMarkerMouseDown={(e, map) => { console.log('onMiddleMarkerMouseDown') }}
    >
      <MapContainer
        style={{
          height: "100%",
        }}
        editable={true}
        zoom={4}
        maxZoom={18}
        center={[35, 105]}
        whenCreated={wenMapCreated}
      >
        <TileLayer url="https://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=b6afc1ba1ece9d7346c30ba57f8c7298" />
        <div className="btn-group">
          <button
            disabled={isContinueDisabled}
            title="从开始位置继续编辑"
            onClick={continueBackward}
            className="editable-btn"
          >
            <i className="iconfont iconhoutui"></i>
          </button>
          <button
            disabled={isContinueDisabled}
            title="从结束位置继续编辑"
            onClick={continueForward}
            className="editable-btn"
          >
            <i className="iconfont iconqianjin"></i>
          </button>
          <button
            title="清除所有编辑图层"
            onClick={clearAll}
            className="editable-btn"
          >
            <i className="iconfont iconqingchu"></i>
          </button>
          <button
            title="编辑多边形"
            onClick={editPolygon}
            className="editable-btn"
          >
            <i className="iconfont iconduobianxing"></i>
          </button>
          <button
            title="编辑线段"
            onClick={editPolyline}
            className="editable-btn"
          >
            <i className="iconfont iconpoly-line"></i>
          </button>
          <button title="编辑点" onClick={editMarker} className="editable-btn">
            <i className="iconfont iconcc-marker"></i>
          </button>
          <button
            title="编辑矩形"
            onClick={editRectangle}
            className="editable-btn"
          >
            <i className="iconfont iconjuxing"></i>
          </button>
          <button title="编辑圆" onClick={editCircle} className="editable-btn">
            <i className="iconfont iconcircle"></i>
          </button>
        </div>
      </MapContainer>
    </ReactLeafletEditable>
  );
}
