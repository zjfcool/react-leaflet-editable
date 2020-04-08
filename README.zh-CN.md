# react-leaflet-editable
[![](https://img.shields.io/npm/v/react-leaflet-editable.svg)](https://www.npmjs.com/package/react-leaflet-editable)

这是一个轻量的react组件，基于 [react-leaflet](https://github.com/PaulLeCam/react-leaflet) 和 [leaflet-editable](https://github.com/Leaflet/Leaflet.Editable/). 它仅仅提供了一些地图编辑的api，你可以随意的更改你的UI.
# Example
瞧一瞧 [DEMO](https://zjfcool.github.io/react-leaflet-editable/examples/dist)
# How to use
## Install
```javascript
npm install react-leaflet-editable -S
```
## Introducing dependency and import component
```Note: ```
- 在 import ```react-leaflet-editable```之前先 安装 ```react-leaflet``` and  ```leaflet-eidtable``` 
- Map组件```<Map />``` 必须包含 ```ref``` and ```editable = true``` 属性
- ReactLeafletEditable 的children属性可以任意嵌套，也可以有多个Map组件，不过只会第一个Map组件起作用，其他的会正常显示

```javascript
import React, { Component, createRef } from 'react'
import L, { Icon } from 'leaflet'
import 'leaflet-editable'
import ReactLeafletEditable from 'react-leaflet-editable';
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

class Demo extends Component {
    constructor(){
        super()
        this.editRef = createRef();
        this.mapRef = createRef();
    }
    // 编辑一个多边形
    editPolygon = () => {
        this.editRef.current.startPolygon()
    }
    render(){
        return(
             <ReactLeafletEditable
                ref={this.mapRef}
             >
                <Map
                    ref={this.mapRef}
                    editable={true}
                    zoom={4}
                    maxZoom={18}
                    center={[35, 105]}>
                    <button
                        onClick={this.editPolygon}
                        className="editable-btn"
                    >polygon</button>
                    <TileLayer url="xxx" />
                </Map>
            </ReactLeafletEditable>
        )
    }
}
```
# Component API
Props
-

| name       | type      | description     | params |
| ---------- | :-----------: | :-----------: | :-----------: |
|onEditing | function |hook to leaflet-editable ```editable:editing``` |(e,map)|
|onEnable | function |hook to leaflet-editable ```editable:enable``` |(e,map)|
|onDisable | function |hook to leaflet-editable ```editable:disable``` |(e,map)|
|onStartDrawing | function |hook to leaflet-editable ```editable:drawing:start``` |(e,map)|
|onDrawingClick | function |hook to leaflet-editable ```editable:drawing:click``` |(e,map)|
|onDrawingCommit | function |hook to leaflet-editable ```editable:drawing:commit``` |(e,map)|
|onDrawingMouseDown | function |hook to leaflet-editable ```editable:drawing:mousedown``` |(e,map)|
|onDrawingMouseUp | function |hook to leaflet-editable ```editable:drawing:mouseup``` |(e,map)|
|onDrawingMove | function |hook to leaflet-editable ```editable:drawing:move``` |(e,map)|
|onCancelDrawing | function |hook to leaflet-editable ```editable:drawing:cancel``` |(e,map)|
|onEndDrawing | function |hook to leaflet-editable ```editable:drawing:end``` |(e,map)|
|onDragStart | function |hook to leaflet-editable ```editable:dragstart``` |(e,map)|
|onDrag | function |hook to leaflet-editable ```editable:drag``` |(e,map)|
|onDragEnd | function |hook to leaflet-editable ```editable:dragend``` |(e,map)|
|onVertexMarkerDrag | function |hook to leaflet-editable ```editable:vertex:drag``` |(e,map)|
|onVertexMarkerDragStart | function |hook to leaflet-editable ```editable:vertex:dragstart``` |(e,map)|
|onVertexMarkerDragEnd | function |hook to leaflet-editable ```editable:vertex:dragend``` |(e,map)|
|onVertextCtrlClick | function |hook to leaflet-editable ```editable:vertex:ctrlclick``` |(e,map)|
|onNewVertex | function |hook to leaflet-editable ```editable:vertex:new``` |(e,map)|
|onVertexMarkerClick | function |hook to leaflet-editable ```editable:vertex:click``` |(e,map)|
|onVertexRawMarkerClick | function |hook to leaflet-editable ```editable:vertex:rawclick``` |(e,map)|
|onVertexDeleted | function |hook to leaflet-editable ```editable:vertex:deleted``` |(e,map)|
|onVertexMarkerCtrlClick | function |hook to leaflet-editable ```editable:vertex:ctrlclick``` |(e,map)|
|onVertexMarkerShiftClick | function |hook to leaflet-editable ```editable:vertex:shiftclick``` |(e,map)|
onVertexMarkerMetaKeyClick | function |hook to leaflet-editable ```editable:vertex:metakeyclick``` |(e,map)|
|onVertexMarkerAltClick | function |hook to leaflet-editable ```editable:vertex:altclick``` |(e,map)|
|onVertexMarkerContextMenu | function |hook to leaflet-editable ```editable:vertex:contextmenu``` |(e,map)|
|onVertexMarkerMouseDown | function |hook to leaflet-editable ```editable:vertex:mousedown``` |(e,map)|
|onVertexMarkerMouseOver | function |hook to leaflet-editable ```editable:vertex:mouseover``` |(e,map)|
|onVertexMarkerMouseOut | function |hook to leaflet-editable ```editable:vertex:mouseout``` |(e,map)|
|onMiddleMarkerMouseDown | function |hook to leaflet-editable ```editable:middlemarker:mousedown```|(e,map)|
|onShapeNew | function |hook to leaflet-editable ```editable:shape:new```|(e,map)|
|onShapeDelete | function |hook to leaflet-editable ```editable:shape:delete```|(e,map)|
|onShapeDeleted | function |hook to leaflet-editable ```editable:shape:deleted```|(e,map)|

Methods
-

| name       | type      | description     | params|
| ---------- | :-----------: | :-----------: | :-----------: |
| startPolygon | function | start edit a polygon layer ||
| startPolyline | function | start edit a polyline layer ||
| startMarker | function | start edit a marker layer ||
| startRectangle | function | start edit a rect layer ||
| startCircle | function | start edit a circle layer ||
| startHole | function | start edit a hole layer |(editor,latlng)|
| clearAll | function | clear all editing layers ||