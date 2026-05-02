import { useCallback, useEffect, useRef } from "react";
import "leaflet-editable";
import L, { LatLng, Polygon, Rectangle } from "leaflet";
import { TileLayer, MapContainer } from "react-leaflet";
import {
  LeafletEditable,
  type HookHoleEditor,
  type LeafletEditableHandleProps,
} from "react-leaflet-editable";
import "leaflet/dist/leaflet.css";
import "./styles.css";
type HookLayer = Polygon & {
  editor: HookHoleEditor;
};
export default function EditTest() {
  const mapRef = useRef<LeafletEditableHandleProps>(null);
  const redoArr = useRef<LatLng[]>([]);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  const editPolygon = useCallback(() => {
    console.log(mapRef.current);
    mapRef.current?.startPolygon();
  }, [mapRef]);
  const editPolyline = useCallback(() => {
    mapRef.current?.startPolyline();
  }, [mapRef]);
  const editCircle = useCallback(() => {
    mapRef.current?.startCircle();
  }, [mapRef]);
  const editCircleMarker = useCallback(() => {
    mapRef.current?.startCircleMarker();
  }, [mapRef]);
  const editMarker = useCallback(() => {
    mapRef.current?.startMarker();
  }, [mapRef]);
  const editRectangle = useCallback(() => {
    mapRef.current?.startRectangle();
  }, [mapRef]);
  const clearAll = useCallback(() => {
    mapRef.current?.clearAll();
  }, [mapRef]);
  // const editHole = useCallback(
  //   (editor) => {
  //     mapRef.current?.startHole(editor);
  //   },
  //   [mapRef],
  // );

  const layerListener = useCallback((layer) => {
    const isPolygon = layer instanceof Polygon && !(layer instanceof Rectangle);
    let tooltip: string = "<div>Shift+click delete layer</div>";
    if (isPolygon) tooltip += "<div>Ctrl+click hole layer</div>";

    layer.on("mouseover", function () {
      layer.bindTooltip(tooltip).openTooltip();
    });
    layer.on("click", L.DomEvent.stop).on(
      "click",
      function (e) {
        e.originalEvent.preventDefault();
        if (e.originalEvent.ctrlKey || e.originalEvent.metaKey) {
          // layer.toggleEdit();
          // if (isPolygon) (layer).editor.newHole(e.latlng);
          if (isPolygon) mapRef.current?.startHole((layer as HookLayer).editor, e.latlng);
        } else if (e.originalEvent.shiftKey) {
          layer.remove();
          // 该函数会触发onShapeDeleted,onShapeDelete 回调函数
          // layer.editor?.deleteShapeAt?.(e.latlng);
        }
      },
      layer,
    );
  }, []);
  const moveTooltip = useCallback((e) => {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.left = e.clientX + 20 + "px";
    tooltipRef.current.style.top = e.clientY - 10 + "px";
  }, []);
  const addTooltip = useCallback(() => {
    if (!tooltipRef.current) return;
    L.DomEvent.on(document.documentElement, "mousemove", moveTooltip);
    tooltipRef.current.innerHTML = `Ctrl+Z 回退 , Shift+Z 前进 `;
    tooltipRef.current.style.display = "block";
  }, []);
  const onDrawingStart = useCallback(() => {
    const container = document.querySelector(".leaflet-container");
    if (!container) return;
    tooltipRef.current = L.DomUtil.create("span", "tooltip-wrapper");
    tooltipRef.current.style.zIndex = "9999";
    tooltipRef.current.style.position = "absolute";
    container.appendChild(tooltipRef.current);
    addTooltip();
  }, []);
  const updateTooltip = useCallback((e) => {
    if (!tooltipRef.current || !e.layer.editor._drawnLatLngs) return;
    const coords = `${e.latlng.lat},${e.latlng.lng}`;
    tooltipRef.current.innerHTML = `Ctrl+Z 回退 , Shift+Z 前进.${coords}`;
  }, []);

  const onDrawingClick = useCallback((e) => {
    updateTooltip(e);
  }, []);

  const removeTooltip = useCallback(() => {
    if (!tooltipRef.current) return;
    tooltipRef.current.innerHTML = "";
    tooltipRef.current.style.display = "none";
    L.DomEvent.off(document.documentElement, "mousemove", moveTooltip);
    if (tooltipRef.current.parentNode) {
      tooltipRef.current.parentNode.removeChild(tooltipRef.current);
    }
    tooltipRef.current = null;
  }, []);

  // 后退：Ctrl+Z，前进：Shift+Z
  const redoListener = useCallback(() => {
    function keydownHandler(e) {
      if (!mapRef.current) return;
      const editTools = mapRef.current.editTools;
      console.log(editTools, mapRef.current);
      if (!mapRef.current._drawingEditor) return;
      if (e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          if (redoArr.current.length) mapRef.current._drawingEditor.push(redoArr.current.pop());
        } else if (e.ctrlKey || e.metaKey) {
          const latlng = mapRef.current._drawingEditor.pop();
          if (latlng) redoArr.current.push(latlng);
        }
      }
    }

    L.DomEvent.addListener(document.documentElement, "keydown", keydownHandler);
    return () => {
      L.DomEvent.removeListener(document.documentElement, "keydown", keydownHandler);
    };
  }, []);
  const onDrawingEnd = useCallback(
    (e) => {
      console.log("onDrawingEnd", mapRef.current, e);
      redoArr.current = [];
      removeTooltip();
      layerListener(e.layer);
      // editHole(e.layer.editor);
      console.log(e.layer instanceof Polygon);
    },
    [removeTooltip, layerListener],
  );

  useEffect(() => {
    const removeListener = redoListener();
    return () => {
      removeListener?.();
      if (tooltipRef.current && tooltipRef.current.parentNode) {
        tooltipRef.current.parentNode.removeChild(tooltipRef.current);
      }
    };
  }, [redoListener]);

  return (
    <MapContainer
      style={{
        height: "100%",
      }}
      editable={true}
      zoom={4}
      maxZoom={18}
      center={[35, 105]}
    >
      <LeafletEditable
        ref={mapRef}
        onDrawingStart={onDrawingStart}
        onDrawingClick={onDrawingClick}
        onDrawingEnd={onDrawingEnd}
        // onShapeDelete={() => {
        //   console.log("shape delete");
        // }}
        // onShapeDeleted={() => {
        //   console.log("shape deleted");
        // }}
        // onEditing={() => {
        //   console.log("onEditing");
        // }}
        // onEnable={() => {
        //   console.log("onEnable");
        // }}
        // onDisable={() => {
        //   console.log("onDisable");
        // }}
        // onDrawingCommit={(e) => {
        //   console.log("onDrawingCommit");
        // }}
        // onDrawingMouseDown={(e) => {
        //   console.log("onDrawingMouseDown");
        // }}
        // onDrawingMouseUp={(e) => {
        //   console.log("onDrawingMouseUp");
        // }}
        // onDrawingMove={(e) => {
        //   console.log("onDrawingMove",e);
        // }}
        // onDrawingCancel={(e) => {
        //   console.log("onCancelDrawing");
        // }}
        // onDragStart={(e) => {
        //   console.log("onDragStart");
        // }}
        // onDrag={(e) => {
        //   console.log("onDrag");
        // }}
        // onDragEnd={(e) => {
        //   console.log("onDragEnd");
        // }}
        // onVertexDrag={(e) => {
        //   console.log("onVertexDrag");
        // }}
        // onVertexDragStart={(e) => {
        //   console.log("onVertexDragStart");
        // }}
        // onVertexDragEnd={(e) => {
        //   console.log("onVertexDragEnd");
        // }}
        // onVertexNew={(e) => {
        //   console.log("onVertexNew");
        // }}
        // onVertexClick={(e) => {
        //   console.log("onVertexClick");
        // }}
        // onVertexRawClick={(e) => {
        //   console.log("onVertexRawClick");
        // }}
        // onVertexDeleted={(e) => {
        //   console.log("onVertexDeleted");
        // }}
        // onVertexCtrlClick={(e) => {
        //   console.log("onVertexCtrlClick");
        // }}
        // onVertexShiftClick={(e) => {
        //   console.log("onVertexShiftClick");
        // }}
        // onVertexMetaKeyClick={(e) => {
        //   console.log("onVertexMetaKeyClick");
        // }}
        // onVertexAltClick={(e) => {
        //   console.log("onVertexAltClick");
        // }}
        // onVertexContextMenu={(e) => {
        //   console.log("onVertexContextMenu");
        // }}
        // onVertexMouseDown={(e) => {
        //   console.log("onVertexMouseDown");
        // }}
        // onVertexMouseOver={(e) => {
        //   console.log("onVertexMouseOver");
        // }}
        // onVertexMouseOut={(e) => {
        //   console.log("onVertexMouseOut");
        // }}
        // onMiddleMarkerMouseDown={(e) => {
        //   console.log("onMiddleMarkerMouseDown");
        // }}
      ></LeafletEditable>
      <TileLayer url="https://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=b6afc1ba1ece9d7346c30ba57f8c7298" />
      <div className="btn-group">
        <button title="清除所有编辑图层" onClick={clearAll} className="editable-btn">
          <i className="iconfont iconqingchu"></i>
        </button>
        <button title="编辑多边形" onClick={editPolygon} className="editable-btn">
          <i className="iconfont iconduobianxing"></i>
        </button>
        <button title="编辑线段" onClick={editPolyline} className="editable-btn">
          <i className="iconfont iconpoly-line"></i>
        </button>
        <button title="编辑点" onClick={editMarker} className="editable-btn">
          <i className="iconfont iconcc-marker"></i>
        </button>
        <button title="编辑圆点" onClick={editCircleMarker} className="editable-btn">
          <i className="circle-marker"></i>
        </button>
        <button title="编辑矩形" onClick={editRectangle} className="editable-btn">
          <i className="iconfont iconjuxing"></i>
        </button>
        <button title="编辑圆" onClick={editCircle} className="editable-btn">
          <i className="iconfont iconcircle"></i>
        </button>
      </div>
    </MapContainer>
  );
}
