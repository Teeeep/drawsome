import React, { Component } from 'react'
//import { connect } from 'react-redux'
import Canvas from './Canvas'
import { ChromePicker } from 'react-color'
//import Tool from './Tool'


class CanvasContainer extends Component {
    constructor(props) {
      super(props)
      this.display = React.createRef()
      this.socket = null
      this.state = {
        brushColor: {r:0, g: 0, b: 0, a: 255},
        brushSize: 3,
        toolId: 'pen',
        isPenDown: false,
        mouseX: 0,
        mouseY: 0,
        prevX: 0,
        prevY: 0,
        cursors: [],
        name: '',
        loaded: false
      }
    }
    componentDidMount() {
      this.socket = io(serverAddress);
      this.socket.on('line', data => {
        if(this.state.loaded) {
          const [x1,y1,x2,y2] = data.lineCoordinates;
          const displayCtx = this.display.current.getContext('2d');
          displayCtx.lineWidth = data.lineWidth;
          displayCtx.strokeStyle = `rgba(${data.lineColor.r},${data.lineColor.g},${data.lineColor.b},${data.lineColor.a})`;
          displayCtx.beginPath();
          displayCtx.moveTo(x1,y1);
          displayCtx.lineTo(x2,y2);
          displayCtx.stroke();
        }
      });
      this.socket.on('cursor', data => {
        if(this.state.loaded) {
          this.setState({cursors: data});
        }
      });
      setInterval(() => {
        if(this.state.loaded) {
          this.socket.emit('cursor', {
            name: this.state.name,
            x: this.state.mouseX,
            y: this.state.mouseY,
            sessionKey: window.localStorage.getItem('sessionKey')
          });
        }
      }, 3000);
      setInterval(() => {
      }, Math.round(1000/60));
    }
    handleNameInput(e) {
      this.setState({name: e.target.value});
    }
    handleJoin(e) {
      fetch(serverAddress + '/create_user', {
        body: JSON.stringify({
        name: this.state.name
        }),
        method: 'post',
        cache: 'no-cache',
        headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        if(json.success) {
        localStorage.sessionKey = json.sessionKey;
        this.setState({loaded: true});
        }
      });
    }
    handleToolClick(toolId) {
      this.setState({toolId});
    }
    handleColorChange(color) {
      this.setState({brushColor: color.rgb});
    }
    handleDisplayMouseMove(e) {
      this.setState({
        mouseX: e.clientX,
        mouseY: e.clientY
      });
        if(this.state.isPenDown) {
          this.display.current.getContext('2d').lineCap = 'round';
          const {top, left} = this.display.current.getBoundingClientRect();
          switch(this.state.toolId) {
            case 'pen':
              this.socket.emit('line',{
                lineWidth: this.state.brushSize,
                lineColor: this.state.brushColor,
                lineCoordinates: [this.state.prevX - left, this.state.prevY - top, this.state.mouseX - left, this.state.mouseY - top],
                sessionKey: window.localStorage.getItem('sessionKey')
              });
              break;
            case 'eraser':
              this.socket.emit('line',{
                lineWidth: this.state.brushSize,
                lineColor: {r: 255, g: 255, b: 255, a: this.state.brushColor.a},
                lineCoordinates: [this.state.prevX, this.state.prevY, this.state.mouseX, this.state.mouseY],
                sessionKey: window.localStorage.getItem('sessionKey')
              });
              break;
          }
        }
        this.setState({
          prevX: this.state.mouseX,
          prevY: this.state.mouseY
        });
        if(!this.state.isPenDown) {
          this.setState({
            prevX: e.clientX,
            prevY: e.clientY
          });
        }
        this.socket.emit('cursor', {
          x: this.state.mouseX,
          y: this.state.mouseY,
          sessionKey: window.localStorage.getItem('sessionKey')
        });
      }
      handleDisplayMouseDown(e) {
        this.setState({isPenDown: true});
      }
      handleDisplayMouseUp(e) {
        this.setState({isPenDown: false});
      }
      handleBrushResize(e) {
        this.setState({brushSize: e.target.value})
      }
    



    render() {
        return(
            <Canvas />
        )
    }
}

export default CanvasContainer