# react-leaflet-editable
This is a lightweight react component build on top of react-leaflet that integrate [leaflet-editable](https://github.com/Leaflet/Leaflet.Editable/)feature. It only provides map editing API, and you can easily organize your own UI.
# Example
See the [DEMO](https://zjfcool.github.io/react-leaflet-editable/examples/dist)
# How to use
## Install
```javascript
npm install react-leaflet-editable -S
```
## Introducing dependency and import component
```Note: ```
- Install ```react-leaflet``` and  ```leaflet-eidtable``` before import ```react-leaflet-editable```
- Map component must have ```ref``` and ```editable = true``` attribute

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

| name       | type      | description     |
| ---------- | :-----------: | :-----------: |
|onEditing | function |hook to leaflet-editable ```editable:editing``` |
|onEnable | function |hook to leaflet-editable ```editable:enable``` |
|onDisable | function |hook to leaflet-editable ```editable:disable``` |
|onStartDrawing | function |hook to leaflet-editable ```editable:drawing:start``` |
|onDrawingClick | function |hook to leaflet-editable ```editable:drawing:click``` |
|onDrawingCommit | function |hook to leaflet-editable ```editable:drawing:commit``` |
|onDrawingMouseDown | function |hook to leaflet-editable ```editable:drawing:mousedown``` |
|onDrawingMouseUp | function |hook to leaflet-editable ```editable:drawing:mouseup``` |
|onDrawingMove | function |hook to leaflet-editable ```editable:drawing:move``` |
|onCancelDrawing | function |hook to leaflet-editable ```editable:drawing:cancel``` |
|onEndDrawing | function |hook to leaflet-editable ```editable:drawing:end``` |
|onDragStart | function |hook to leaflet-editable ```editable:dragstart``` |
|onDrag | function |hook to leaflet-editable ```editable:drag``` |
|onDragEnd | function |hook to leaflet-editable ```editable:dragend``` |
|onVertexMarkerDrag | function |hook to leaflet-editable ```editable:vertex:drag``` |
|onVertexMarkerDragStart | function |hook to leaflet-editable ```editable:vertex:dragstart``` |
|onVertexMarkerDragEnd | function |hook to leaflet-editable ```editable:vertex:dragend``` |
|onVertextCtrlClick | function |hook to leaflet-editable ```editable:vertex:ctrlclick``` |
|onNewVertex | function |hook to leaflet-editable ```editable:vertex:new``` |
|onVertexMarkerClick | function |hook to leaflet-editable ```editable:vertex:click``` |
|onVertexRawMarkerClick | function |hook to leaflet-editable ```editable:vertex:rawclick``` |
|onVertexDeleted | function |hook to leaflet-editable ```editable:vertex:deleted``` |
|onVertexMarkerCtrlClick | function |hook to leaflet-editable ```editable:vertex:ctrlclick``` |
|onVertexMarkerShiftClick | function |hook to leaflet-editable ```editable:vertex:shiftclick``` |
onVertexMarkerMetaKeyClick | function |hook to leaflet-editable ```editable:vertex:metakeyclick``` |
|onVertexMarkerAltClick | function |hook to leaflet-editable ```editable:vertex:altclick``` |
|onVertexMarkerContextMenu | function |hook to leaflet-editable ```editable:vertex:contextmenu``` |
|onVertexMarkerMouseDown | function |hook to leaflet-editable ```editable:vertex:mousedown``` |
|onVertexMarkerMouseOver | function |hook to leaflet-editable ```editable:vertex:mouseover``` |
|onVertexMarkerMouseOut | function |hook to leaflet-editable ```editable:vertex:mouseout``` |
|onMiddleMarkerMouseDown | function |hook to leaflet-editable ```editable:middlemarker:mousedown```|

Methods
-

| name       | type      | description     |
| ---------- | :-----------: | :-----------: |
| startPolygon | function | start edit a polygon layer |
| startMarker | function | start edit a marker layer |
| startRectangle | function | start edit a rect layer |
| startCircle | function | start edit a circle layer |
| startHole | function | start edit a hole layer |
| clearAll | function | clear all editing layers |