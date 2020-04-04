import React, { Component,createRef } from 'react'
import ReactLeafletEditable from '../ReactLeafletEditable'
import 'leaflet/dist/leaflet.css'
import L, {Icon} from 'leaflet'
import {Map ,TileLayer} from 'react-leaflet'
import './styles.module.css'
import markerIcon from'leaflet/dist/images/marker-icon.png'
import markerShadowIcon from 'leaflet/dist/images/marker-shadow.png'
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png'

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadowIcon
});

export default class EditTest extends Component {
    constructor(){
        super()
        this.state={
            isShow:true
        }
        this.editRef = createRef();
        this.mapRef = createRef();
    }
    editPolygon=()=>{
        this.editRef.current.startPolygon()
    }
    editPolyline = ()=>{
        this.editRef.current.startPolyline()
    }
    editCircle = ()=>{
        this.editRef.current.startCircle()
    }
    editMarker = ()=>{
        this.editRef.current.startMarker()
    }
    editRectangle = ()=>{
        this.editRef.current.startRectangle()
    }
    refresh=()=>{
        console.log(this.editRef.current.state.map)
    }
    toggle = ()=>{
        const {isShow} = this.state;
        this.setState({
            isShow:!isShow
        })
    }
    clearAll =()=>{
        this.editRef.current.clearAll()
    }
    prev = ()=>{
        this.polyline.editor.continueBackward()
    }
    next = ()=>{
        this.polyline.editor.continueForward();
    }
    componentDidMount(){
        const map = this.mapRef.current.leafletElement;
        this.polyline = L.polyline([[43.1, 1.2], [43.2, 1.3],[43.3, 1.2]]).addTo(map);
        console.log(this.polyline)
        map.fitBounds(this.polyline.getBounds())
        // L.fitBounds(polyline.getBounds())
        this.polyline.enableEdit();
        // this.polyline.editor.continueForward();
        this.polyline.editor.continueBackward()
    }
    render() {
        const {
            isShow
        } = this.state;
        return (
            <div style={{height:"100%"}}>
                <button onClick={this.toggle}>toggle</button>
                {
                    isShow
                    ?
                    <ReactLeafletEditable
                        ref={this.editRef}
                        onEditing={1}
                        onEnable={(e,map)=>{console.log('onEnable')}}
                        onDisable={(e,map)=>{console.log('onDisable')}}
                        onStartDrawing={(e,map)=>{console.log('onStartDrawing')}}
                        onDrawingClick={(e,map)=>{console.log('onDrawingClick')}}
                        onDrawingCommit={(e,map)=>{console.log('onDrawingCommit')}}
                        onDrawingMouseDown={(e,map)=>{console.log('onDrawingMouseDown')}}
                        onDrawingMouseUp={(e,map)=>{console.log('onDrawingMouseUp')}}
                        onDrawingMove={(e,map)=>{console.log('onDrawingMove')}}
                        onCancelDrawing={(e,map)=>{console.log('onCancelDrawing')}}
                        onEndDrawing={(e,map)=>{console.log('onEndDrawing')}}
                        onDragStart={(e,map)=>{console.log('onDragStart')}}
                        onDrag={(e,map)=>{console.log('onDrag')}}
                        onDragEnd={(e,map)=>{console.log('onDragEnd')}}
                        onVertexMarkerDrag={(e,map)=>{console.log('onVertexMarkerDrag')}}
                        onVertexMarkerDragStart={(e,map)=>{console.log('onVertexMarkerDragStart')}}
                        onVertexMarkerDragEnd={(e,map)=>{console.log('onVertexMarkerDragEnd')}}
                        onVertextCtrlClick={(e,map)=>{console.log('onVertextCtrlClick')}}
                        onNewVertex={(e,map)=>{console.log('onNewVertex')}}
                        onVertexMarkerClick={(e,map)=>{console.log('onVertexMarkerClick')}}
                        onVertexRawMarkerClick={(e,map)=>{console.log('onVertexRawMarkerClick')}}
                        onVertexDeleted={(e,map)=>{console.log('onVertexDeleted')}}
                        onVertexMarkerCtrlClick={(e,map)=>{console.log('onVertexMarkerCtrlClick')}}
                        onVertexMarkerShiftClick={(e,map)=>{console.log('onVertexMarkerShiftClick')}}
                        onVertexMarkerMetaKeyClick={(e,map)=>{console.log('onVertexMarkerMetaKeyClick')}}
                        onVertexMarkerAltClick={(e,map)=>{console.log('onVertexMarkerAltClick')}}
                        onVertexMarkerContextMenu={(e,map)=>{console.log('onVertexMarkerContextMenu')}}
                        onVertexMarkerMouseDown={(e,map)=>{console.log('onVertexMarkerMouseDown')}}
                        onVertexMarkerMouseOver={(e,map)=>{console.log('onVertexMarkerMouseOver')}}
                        onVertexMarkerMouseOut={(e,map)=>{console.log('onVertexMarkerMouseOut')}}
                        onMiddleMarkerMouseDown={(e,map)=>{console.log('onMiddleMarkerMouseDown')}}
                    >
                        <div style={{width:'100%',height:'40%'}}>
                            <Map 
                                ref={this.mapRef}
                                style={{
                                    height:"100%",
                                }}
                                editable={true} 
                                zoom={4} 
                                maxZoom={18} 
                                center={[35,105]}
                            >
                                <div className="btn-group">
                                    <button 
                                        onClick={this.prev} 
                                        className="editable-btn" 
                                    >prev</button>
                                    <button 
                                        onClick={this.next} 
                                        className="editable-btn" 
                                    >next</button>
                                    <button 
                                        onClick={this.clearAll} 
                                        className="editable-btn" 
                                    >clearAll</button>
                                    <button 
                                        onClick={this.editPolygon} 
                                        className="editable-btn" 
                                    >polygon</button>
                                    <button 
                                        onClick={this.refresh} 
                                        className="editable-btn" 
                                    >refresh</button>
                                    <button 
                                        onClick={this.editPolyline} 
                                        className="editable-btn" 
                                    >polyline</button>
                                    <button 
                                        onClick={this.editMarker} 
                                        className="editable-btn" 
                                    >marker</button>
                                    <button 
                                        onClick={this.editRectangle} 
                                        className="editable-btn" 
                                    >rectangle</button>
                                    <button 
                                        onClick={this.editCircle} 
                                        className="editable-btn" 
                                    >circle</button>
                                    <button 
                                        onClick={this.editHole} 
                                        className="editable-btn" 
                                    >hole</button>
                                </div>
                                <TileLayer url="https://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=b6afc1ba1ece9d7346c30ba57f8c7298"/>
                            </Map>
                        </div>
                        <div style={{width:'100%',height:'50%'}}>
                            <Map 
                                ref={createRef()}
                                style={{
                                    height:"100%",
                                }}
                                editable={true} 
                                zoom={4} 
                                maxZoom={18} 
                                center={[35,105]}
                            >
                                <TileLayer url="https://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=b6afc1ba1ece9d7346c30ba57f8c7298"/>
                            </Map>
                        </div>
                    </ReactLeafletEditable>
                    :
                    null
                }
            </div>
        )
    }
}
