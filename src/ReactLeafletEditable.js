import React, { Component } from 'react';
import './Leaflet.Editable';
const eventHandlers = {
    onEditing:"editable:editing",
    onEnable:'editable:enable',
    onDisable:'editable:disable',

    onStartDrawing:'editable:drawing:start',
    onDrawingClick:'editable:drawing:click',
    onDrawingCommit:'editable:drawing:commit',
    onDrawingMouseDown:'editable:drawing:mousedown',
    onDrawingMouseUp:'editable:drawing:mouseup',
    onDrawingMove:'editable:drawing:move',
    onCancelDrawing:'editable:drawing:cancel',
    onEndDrawing:"editable:drawing:end",
    
    // drag:Event
    onDragStart:'editable:dragstart',
    onDrag:'editable:drag',
    onDragEnd:'editable:dragend',
    onVertexMarkerDrag:'editable:vertex:drag',
    onVertexMarkerDragStart:'editable:vertex:dragstart',
    onVertexMarkerDragEnd:'editable:vertex:dragend',
    // VertexEvent
    onVertextCtrlClick:'editable:vertex:ctrlclick',
    onNewVertex:'editable:vertex:new',
    onVertexMarkerClick:'editable:vertex:click',
    onVertexRawMarkerClick:'editable:vertex:rawclick',
    onVertexDeleted:'editable:vertex:deleted',
    onVertexMarkerCtrlClick:'editable:vertex:ctrlclick',
    onVertexMarkerShiftClick:'editable:vertex:shiftclick',
    onVertexMarkerMetaKeyClick:'editable:vertex:metakeyclick',
    onVertexMarkerAltClick:'editable:vertex:altclick',
    onVertexMarkerContextMenu:'editable:vertex:contextmenu',
    onVertexMarkerMouseDown:'editable:vertex:mousedown',
    onVertexMarkerMouseOver:'editable:vertex:mouseover',
    onVertexMarkerMouseOut:'editable:vertex:mouseout',
    onMiddleMarkerMouseDown:'editable:middlemarker:mousedown'
}
export default class ReactLeafletEditable extends Component {
    static defaultProps = {
        onEditing:(e,map)=>{},
        onEnable:(e,map)=>{},
        onDisable:(e,map)=>{},
        onStartDrawing:(e,map)=>{},
        onDrawingClick:(e,map)=>{},
        onDrawingCommit:(e,map)=>{},
        onDrawingMouseDown:(e,map)=>{},
        onDrawingMouseUp:(e,map)=>{},
        onDrawingMove:(e,map)=>{},
        onCancelDrawing:(e,map)=>{},
        onEndDrawing:(e,map)=>{},
        onDragStart:(e,map)=>{},
        onDrag:(e,map)=>{},
        onDragEnd:(e,map)=>{},
        onVertexMarkerDrag:(e,map)=>{},
        onVertexMarkerDragStart:(e,map)=>{},
        onVertexMarkerDragEnd:(e,map)=>{},
        onVertextCtrlClick:(e,map)=>{},
        onNewVertex:(e,map)=>{},
        onVertexMarkerClick:(e,map)=>{},
        onVertexRawMarkerClick:(e,map)=>{},
        onVertexDeleted:(e,map)=>{},
        onVertexMarkerCtrlClick:(e,map)=>{},
        onVertexMarkerShiftClick:(e,map)=>{},
        onVertexMarkerMetaKeyClick:(e,map)=>{},
        onVertexMarkerAltClick:(e,map)=>{},
        onVertexMarkerContextMenu:(e,map)=>{},
        onVertexMarkerMouseDown:(e,map)=>{},
        onVertexMarkerMouseOver:(e,map)=>{},
        onVertexMarkerMouseOut:(e,map)=>{},
        onMiddleMarkerMouseDown:(e,map)=>{},
    }
    constructor(){
        super()
        this.state={
            map:null
        }
    }
    _initMap = (map)=>{
        this.setState({
            map
        },()=>{
            this._registerListeners()
        })
    }
    _isMapEditable(props){
        return props.editable;
    }
    _registerListeners = ()=>{
        Object.keys(eventHandlers).forEach(key=>{
            this[key]()
        })
    }
    _unregisterListeners = ()=>{
        const {map} = this.state;
        Object.keys(eventHandlers).forEach(key=>{
            map.off(eventHandlers[key])
        })
    }
    _offListeners = ()=>{

    }
    onEditing = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onEditing,(e)=>{
            this.props.onEditing(e,map)
        })
    }
    onEnable = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onEnable,(e)=>{
            this.props.onEnable(e,map)
        })
    }
    onDisable = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDisable,(e)=>{
            this.props.onDisable(e,map)
        })
    }
    onStartDrawing = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onStartDrawing,(e)=>{
            this.props.onStartDrawing(e,map)
        })
    }
    onDrawingClick = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDrawingClick,(e)=>{
            this.props.onDrawingClick(e,map)
        })
    }
    onDrawingCommit = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDrawingCommit,(e)=>{
            this.props.onDrawingCommit(e,map)
        })
    }
    onDrawingMouseDown = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDrawingMouseDown,(e)=>{
            this.props.onDrawingMouseDown(e,map)
        })
    }
    onDrawingMouseUp = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDrawingMouseUp,(e)=>{
            this.props.onDrawingMouseUp(e,map)
        })
    }
    onDrawingMove = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDrawingMove,(e)=>{
            this.props.onDrawingMove(e,map)
        })
    }
    onCancelDrawing = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onCancelDrawing,(e)=>{
            this.props.onCancelDrawing(e,map)
        })
    }
    onEndDrawing = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onEndDrawing,(e)=>{
            this.props.onEndDrawing(e,map)
        })
    }
    onDragStart = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDragStart,(e)=>{
            this.props.onDragStart(e,map)
        })
    }
    onDrag = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDrag,(e)=>{
            this.props.onDrag(e,map)
        })
    }
    onDragEnd = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onDragEnd,(e)=>{
            this.props.onDragEnd(e,map)
        })
    }
    onVertexMarkerDrag = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerDrag,(e)=>{
            this.props.onVertexMarkerDrag(e,map)
        })
    }
    onVertexMarkerDragStart = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerDragStart,(e)=>{
            this.props.onVertexMarkerDragStart(e,map)
        })
    }
    onVertexMarkerDragEnd = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerDragEnd,(e)=>{
            this.props.onVertexMarkerDragEnd(e,map)
        })
    }
    onVertextCtrlClick = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertextCtrlClick,(e)=>{
            this.props.onVertextCtrlClick(e,map)
        })
    }
    onNewVertex = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onNewVertex,(e)=>{
            this.props.onNewVertex(e,map)
        })
    }
    onVertexMarkerClick = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerClick,(e)=>{
            this.props.onVertexMarkerClick(e,map)
        })
    }
    onVertexRawMarkerClick = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexRawMarkerClick,(e)=>{
            this.props.onVertexRawMarkerClick(e,map)
        })
    }
    onVertexDeleted = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexDeleted,(e)=>{
            this.props.onVertexDeleted(e,map)
        })
    }
    onVertexMarkerCtrlClick = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerCtrlClick,(e)=>{
            this.props.onVertexMarkerCtrlClick(e,map)
        })
    }
    onVertexMarkerShiftClick = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerShiftClick,(e)=>{
            this.props.onVertexMarkerShiftClick(e,map)
        })
    }
    onVertexMarkerMetaKeyClick = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerMetaKeyClick,(e)=>{
            this.props.onVertexMarkerMetaKeyClick(e,map)
        })
    }
    onVertexMarkerAltClick = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerAltClick,(e)=>{
            this.props.onVertexMarkerAltClick(e,map)
        })
    }
    onVertexMarkerContextMenu = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerContextMenu,(e)=>{
            this.props.onVertexMarkerContextMenu(e,map)
        })
    }
    onVertexMarkerMouseDown = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerMouseDown,(e)=>{
            this.props.onVertexMarkerMouseDown(e,map)
        })
    }
    onVertexMarkerMouseOver = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerMouseOver,(e)=>{
            this.props.onVertexMarkerMouseOver(e,map)
        })
    }
    onVertexMarkerMouseOut = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onVertexMarkerMouseOut,(e)=>{
            this.props.onVertexMarkerMouseOut(e,map)
        })
    }
    onMiddleMarkerMouseDown = ()=>{
        const {map} = this.state;
        map.on(eventHandlers.onMiddleMarkerMouseDown,(e)=>{
            this.props.onMiddleMarkerMouseDown(e,map)
        })
    }
    startPolygon = ()=>{
        const {map} = this.state;
        return map.editTools.startPolygon()
    }
    startPolyline = ()=>{
        const {map} = this.state;
        return map.editTools.startPolyline()
    }
    startMarker = ()=>{
        const {map} = this.state;
        return map.editTools.startMarker()
    }
    startRectangle = ()=>{
        const {map} = this.state;
        return map.editTools.startRectangle()
    }
    startCircle = ()=>{
        const {map} = this.state;
        return map.editTools.startCircle()
    }
    startHole = ()=>{
        const {map} = this.state;
        return map.editTools.startHole()
    }
    clearAll = ()=>{
        const {map} = this.state;
        map.editTools.featuresLayer.clearLayers() 
    }
    childrenMap = (children, mapComponent = null)=>{
        React.Children.map(children,(child)=>{
            if(child.type&&child.type.name==='Map') {
                mapComponent = child;
            }
        })
        if(mapComponent) return mapComponent;
        if(Array.isArray(children)){
            for(let i=0;i<children.length;i++){
                return this.childrenMap(children[i],mapComponent)
            }
        }
        if(!children.props) return ;
        if(children.props.children){
            return this.childrenMap(children.props.children,mapComponent)
        }
    }
    componentDidMount(){
        const {children} = this.props;
        const mapComponet = this.childrenMap(children)
        if(!mapComponet) return console.error('Must contain a react-leaflet Map component');
        if(!mapComponet.ref) return console.error('react-leaflet Map component must add ref attribute')
        if(!this._isMapEditable(mapComponet.props)) return console.error('react-leaflet Map component must add editable={true} attribute') 
        this._initMap(mapComponet.ref.current.leafletElement)
    }
    componentWillUnmount(){
        this._unregisterListeners()
    }
    render() {
        return (
            this.props.children
        )
    }
}
