import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { useMap } from "react-leaflet";
import {
  eventNamesMap,
  EditableMap,
  eventNames,
  LeafletEditableHandleProps,
  LeafletEditableProps,
} from "./types";
// 事件注册和卸载初始化
function useEventsInitial(map: EditableMap | null, props: LeafletEditableProps) {
  const effectEventHandlers = eventNames
    .filter((eventName) => props[eventName])
    .map((eventName) => props[eventName]);
  const registerListeners = useCallback(
    (map: EditableMap) => {
      eventNames.forEach((eventName) => {
        if (props[eventName]) {
          map.on(eventNamesMap[eventName], props[eventName]);
        }
      });
    },
    [map, ...effectEventHandlers],
  );
  const unRegisterListeners = useCallback(
    (map: EditableMap) => {
      eventNames.forEach((eventName) => {
        if (props[eventName]) {
          map.off(eventNamesMap[eventName], props[eventName]);
        }
      });
    },
    [map, ...effectEventHandlers],
  );
  useEffect(() => {
    if (map) {
      if (!map.editTools) {
        throw new Error(
          "Leaflet-Editable is not initialized on the map. Please make sure to include Leaflet-Editable plugin and initialize it properly.",
        );
      }
      registerListeners(map);
    }
    return () => {
      if (map) {
        unRegisterListeners(map);
      }
    };
  }, [map, registerListeners, unRegisterListeners]);
}
const LeafletEditable = forwardRef<LeafletEditableHandleProps, LeafletEditableProps>(
  (props: LeafletEditableProps, ref) => {
    const map = useMap() as EditableMap;
    console.log(map);
    const editTools = map.editTools;
    const proxyRef = useRef(
      new Proxy(editTools as LeafletEditableHandleProps, {
        get: (target, prop, receiver) => {
          return Reflect.get(target, prop, receiver);
        },
        set: (target, prop, value, receiver) => {
          return Reflect.set(target, prop, value, receiver);
        },
      }),
    );
    useEventsInitial(map, props);
    useImperativeHandle(ref, () => proxyRef.current);

    // useImperativeHandle<any, LeafletEditableHandleProps>(ref, () => {
    //   return {
    //     map,
    //     editTools,
    //     drawing: () => editTools.drawing(),
    //     stopDrawing: () => editTools.stopDrawing(),
    //     commitDrawing: (...args) => {
    //       editTools.commitDrawing(...args);
    //     },
    //     startPolygon: (...args) => editTools.startPolygon(...args),
    //     startPolyline: (...args) => editTools.startPolyline(...args),
    //     startRectangle: (...args) => editTools.startRectangle(...args),
    //     startCircle: (...args) => editTools.startCircle(...args),
    //     startMarker: (...args) => editTools.startMarker(...args),
    //     clearAll: () => editTools.featuresLayer.clearLayers(),
    //     startCircleMarker: (...args) => editTools.startCircleMarker(...args),
    //     // startHole: (editor, latlng) => {
    //     //   // map.editTools.startHole(editor, latlng);
    //     // },
    //   };
    // });
    return null;
  },
);
export { LeafletEditable };
