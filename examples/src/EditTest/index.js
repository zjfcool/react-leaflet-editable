import React, { Component, createRef } from 'react'
import ReactLeafletEditable from '../../../src/ReactLeafletEditable'
import 'leaflet/dist/leaflet.css'
import L, { Icon } from 'leaflet'
import 'leaflet-editable'
import { Map, TileLayer } from 'react-leaflet'
import './styles.module.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadowIcon from 'leaflet/dist/images/marker-shadow.png'
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png'

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: markerRetina,
    iconUrl: markerIcon,
    shadowUrl: markerShadowIcon
});

export default class EditTest extends Component {
    constructor() {
        super()
        this.editRef = createRef();
        this.mapRef = createRef();
        this.redoArr = [];
    }
    
    editPolygon = () => {
        this.editRef.current.startPolygon()
    }
    editPolyline = () => {
        this.editRef.current.startPolyline()
    }
    editCircle = () => {
        this.editRef.current.startCircle()
    }
    editMarker = () => {
        this.editRef.current.startMarker()
    }
    editRectangle = () => {
        this.editRef.current.startRectangle()
    }
    refresh = () => {
        console.log(this.editRef.current.state.map)
    }
    clearAll = () => {
        this.editRef.current.clearAll()
    }
    prev = () => {
        this.polyline.editor.continueBackward()
    }
    next = () => {
        this.polyline.editor.continueForward();
    }
    onEndDrawing = (e,map)=>{
        this.redoArr = [];
        this.removeTooltip(e)
    }
    onStartDrawing = (e,map)=>{
        const container = document.querySelector('.leaflet-container');
        this.tooltip = L.DomUtil.create('span',"tooltip-wrapper");
        this.tooltip.style.zIndex='9999'
        this.tooltip.style.position='absolute';
        container.appendChild(this.tooltip)
        this.addTooltip(e);
    }
    onDrawingClick = (e,map)=>{
        this.updateTooltip(e)
    }
    addTooltip = (e)=>{
        L.DomEvent.on(document, 'mousemove', this.moveTooltip);
        this.tooltip.innerHTML = `Ctrl+Z 回退 , Shift+Z 前进 `;
        this.tooltip.style.display = 'block';
    }
    removeTooltip = (e) => {
        this.tooltip.innerHTML = '';
        this.tooltip.style.display = 'none';
        L.DomEvent.off(document, 'mousemove',this.moveTooltip);
    }
    moveTooltip = (e) => {
        this.tooltip.style.left = e.clientX + 20 + 'px';
        this.tooltip.style.top = e.clientY - 10 + 'px';
    }
    updateTooltip = (e) => {
        console.log(e)
        if(!e.layer.editor._drawnLatLngs) return
        if (e.layer.editor._drawnLatLngs.length < e.layer.editor.MIN_VERTEX) {
            this.tooltip.innerHTML = `Ctrl+Z 回退 , Shift+Z 前进.${e.latlng.lat},${e.latlng.lng}`;
        }
        else {
            this.tooltip.innerHTML = 'Ctrl+Z 回退 , Shift+Z 前进.${e.latlng.lat},${e.latlng.lng}';
        }
    }
    // 后退：Ctrl+Z，前进：Shift+Z
    redoListener = ()=>{
        let latlng=null;
        const that = this;
        L.DomEvent.addListener(document,'keydown',function(e){
            if(e.keyCode == 90){
                if (!this.editTools._drawingEditor) return;
                if (e.shiftKey) {
                    if (that.redoArr.length) this.editTools._drawingEditor.push(that.redoArr.pop());
                } else {
                    latlng = this.editTools._drawingEditor.pop();
                    if (latlng) that.redoArr.push(latlng);
                }
            }
        },this.mapRef.current.leafletElement)
    }
    componentDidMount() {
        // const map = this.mapRef.current.leafletElement;
        // this.polyline = L.polyline([[43.1, 1.2], [43.2, 1.3], [43.3, 1.2]]).addTo(map);
        // console.log(this.polyline)
        // map.fitBounds(this.polyline.getBounds())
        // console.log(this.polyline.enableEdit())
        // this.polyline.editor.continueForward();
        // this.polyline.editor.continueBackward()
        this.redoListener()
    }
    render() {
        return (
            <div style={{ height: "100%" }}>
                <ReactLeafletEditable
                    ref={this.editRef}
                    // onEditing={(e, map) => { console.log('onEditing') }}
                    // onEnable={(e, map) => { console.log('onEnable') }}
                    // onDisable={(e, map) => { console.log('onDisable') }}
                    onStartDrawing={this.onStartDrawing}
                    onDrawingClick={this.onDrawingClick}
                    // onDrawingCommit={(e, map) => { console.log('onDrawingCommit') }}
                    // onDrawingMouseDown={(e, map) => { console.log('onDrawingMouseDown') }}
                    // onDrawingMouseUp={(e, map) => { console.log('onDrawingMouseUp') }}
                    // onDrawingMove={(e, map) => { console.log('onDrawingMove') }}
                    // onCancelDrawing={(e, map) => { console.log('onCancelDrawing') }}
                    onEndDrawing={this.onEndDrawing}
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
                    <div style={{ width: '100%', height: '100%' }}>
                        <Map
                            ref={this.mapRef}
                            style={{
                                height: "100%",
                            }}
                            editable={true}
                            zoom={4}
                            maxZoom={18}
                            center={[35, 105]}
                        >
                            <div className="btn-group">
                                {/* <button
                                    onClick={this.prev}
                                    className="editable-btn"
                                ><i className="iconfont iconhoutui"></i></button>
                                <button
                                    onClick={this.next}
                                    className="editable-btn"
                                >
                                    <i className="iconfont iconqianjin"></i>
                                </button> */}
                                <button
                                    title="清除所有编辑图层"
                                    onClick={this.clearAll}
                                    className="editable-btn"
                                ><i className="iconfont iconqingchu"></i></button>
                                <button
                                    title="编辑多边形"
                                    onClick={this.editPolygon}
                                    className="editable-btn"
                                ><i className="iconfont iconduobianxing"></i></button>
                                {/* <button
                                    onClick={this.refresh}
                                    className="editable-btn"
                                ><i className="iconfont iconqianjin"></i></button> */}
                                <button
                                    title="编辑线段"
                                    onClick={this.editPolyline}
                                    className="editable-btn"
                                ><i className="iconfont iconpoly-line"></i></button>
                                <button
                                    title="编辑点"
                                    onClick={this.editMarker}
                                    className="editable-btn"
                                >
                                    <i className="iconfont iconcc-marker"></i>
                                </button>
                                <button
                                    title="编辑矩形"
                                    onClick={this.editRectangle}
                                    className="editable-btn"
                                ><i className="iconfont iconjuxing"></i></button>
                                <button
                                    title="编辑圆"
                                    onClick={this.editCircle}
                                    className="editable-btn"
                                ><i className="iconfont iconcircle"></i></button>
                                {/* <button
                                    onClick={this.editHole}
                                    className="editable-btn"
                                ><i className="iconfont iconkong"></i></button> */}
                            </div>
                            <TileLayer url="https://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=b6afc1ba1ece9d7346c30ba57f8c7298" />
                        </Map>
                    </div>
                </ReactLeafletEditable>
            </div>
        )
    }
}
