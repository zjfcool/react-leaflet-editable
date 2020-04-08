import React, { Component } from 'react';
import PropTypes from 'prop-types'

const eventHandlers = {
    onEditing: "editable:editing",
    onEnable: 'editable:enable',
    onDisable: 'editable:disable',

    onStartDrawing: 'editable:drawing:start',
    onDrawingClick: 'editable:drawing:click',
    onDrawingCommit: 'editable:drawing:commit',
    onDrawingMouseDown: 'editable:drawing:mousedown',
    onDrawingMouseUp: 'editable:drawing:mouseup',
    onDrawingMove: 'editable:drawing:move',
    onCancelDrawing: 'editable:drawing:cancel',
    onEndDrawing: "editable:drawing:end",

    // drag:Event
    onDragStart: 'editable:dragstart',
    onDrag: 'editable:drag',
    onDragEnd: 'editable:dragend',
    onVertexMarkerDrag: 'editable:vertex:drag',
    onVertexMarkerDragStart: 'editable:vertex:dragstart',
    onVertexMarkerDragEnd: 'editable:vertex:dragend',
    // VertexEvent
    onVertextCtrlClick: 'editable:vertex:ctrlclick',
    onNewVertex: 'editable:vertex:new',
    onVertexMarkerClick: 'editable:vertex:click',
    onVertexRawMarkerClick: 'editable:vertex:rawclick',
    onVertexDeleted: 'editable:vertex:deleted',
    onVertexMarkerCtrlClick: 'editable:vertex:ctrlclick',
    onVertexMarkerShiftClick: 'editable:vertex:shiftclick',
    onVertexMarkerMetaKeyClick: 'editable:vertex:metakeyclick',
    onVertexMarkerAltClick: 'editable:vertex:altclick',
    onVertexMarkerContextMenu: 'editable:vertex:contextmenu',
    onVertexMarkerMouseDown: 'editable:vertex:mousedown',
    onVertexMarkerMouseOver: 'editable:vertex:mouseover',
    onVertexMarkerMouseOut: 'editable:vertex:mouseout',
    onMiddleMarkerMouseDown: 'editable:middlemarker:mousedown',
    // ShapeEvent
    onShapeNew: 'editable:shape:new',
    onShapeDelete:'editable:shape:delete',//删除shape时
    onShapeDeleted: 'editable:shape:deleted',//shape 删除成功时
}
function registerDefaultProps(){
    const ret = {};
    Object.keys(eventHandlers).forEach(key=>{
        ret[key]=(e,map)=>{}
    })
    return ret
}
function registerPropTypes(){
    const ret = {}
    Object.keys(eventHandlers).forEach(key=>{
        ret[key] = PropTypes.func
    })
    return ret;
}
export default class ReactLeafletEditable extends Component {
    static defaultProps = registerDefaultProps();
    static propTypes = registerPropTypes();
    constructor() {
        super()
        this.state = {
            map: null
        }
    }
    _initMap = (map) => {
        this.setState({
            map
        }, () => {
            this._registerListeners()
        })
    }
    _isMapEditable(props) {
        return props.editable;
    }
    _registerListeners = () => {
        const {map} = this.state;
        Object.keys(eventHandlers).forEach(key => {
            map&&map.on(eventHandlers[key],(e)=>{
                this.props[key](e,map)
            })
        })
    }
    _unregisterListeners = () => {
        const { map } = this.state;
        if (!map) return;
        Object.keys(eventHandlers).forEach(key => {
            map.off(eventHandlers[key])
        })
    }
    startPolygon = () => {
        const { map } = this.state;
        if (!map) return;
        if(!map.editTools) return console.error('Warning please npm install leaflet-editable and import ')
        return map.editTools.startPolygon()
    }
    startPolyline = () => {
        const { map } = this.state;
        if (!map) return;
        if(!map.editTools) return console.error('Warning please npm install leaflet-editable and import ')
        return map.editTools.startPolyline()
    }
    startMarker = () => {
        const { map } = this.state;
        if (!map) return;
        if(!map.editTools) return console.error('Warning please npm install leaflet-editable and import ')
        return map.editTools.startMarker()
    }
    startRectangle = () => {
        const { map } = this.state;
        if (!map) return;
        if(!map.editTools) return console.error('Warning please npm install leaflet-editable and import ')
        return map.editTools.startRectangle()
    }
    startCircle = () => {
        const { map } = this.state;
        if (!map) return;
        if(!map.editTools) return console.error('Warning please npm install leaflet-editable and import ')
        return map.editTools.startCircle()
    }
    startHole = (editor,latlng) => {
        const { map } = this.state;
        if (!map) return;
        if(!map.editTools) return console.error('Warning please npm install leaflet-editable and import ')
        return map.editTools.startHole(editor,latlng)
    }
    clearAll = () => {
        const { map } = this.state;
        if (!map) return;
        if(!map.editTools) return console.error('Warning please npm install leaflet-editable and import ')
        map.editTools.featuresLayer.clearLayers()
    }
    childrenMap = (children, mapComponent = null) => {
        React.Children.map(children, (child) => {
            if (child.type && child.type.prototype && child.type.prototype.createLeafletElement) {
                mapComponent = child;
            }
        })
        if (mapComponent) return mapComponent;
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                return this.childrenMap(children[i], mapComponent)
            }
        }
        if(!children) return;
        if (!children.props) return;
        if (children.props.children) {
            return this.childrenMap(children.props.children, mapComponent)
        }
    }
    componentDidMount() {
        const { children } = this.props;
        const mapComponet = this.childrenMap(children)
        if (!mapComponet) return console.error('Warning: Must contain a react-leaflet Map component or similar Map component');
        if (!mapComponet.ref) return console.error('Warning: react-leaflet Map component must add ref attribute.')
        if (!this._isMapEditable(mapComponet.props)) return console.error('Warning: react-leaflet Map component must add editable={true} attribute')
        this._initMap(mapComponet.ref.current.leafletElement)
    }
    componentWillUnmount() {
        this._unregisterListeners()
    }
    render() {
        return (
            this.props.children ? this.props.children : null
        )
    }
}
