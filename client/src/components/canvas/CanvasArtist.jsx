import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'
import { CirclePicker } from 'react-color'
import { connect } from 'react-redux'


class CanvasArtist extends PureComponent {

    state = {
        color: "",
        background: '#fff',
        drawing: "",
        ref: ""
    }

    handleChangeColor = (color) => {
        this.setState({ color : color.hex })
    }

    updateDrawing = () => {
        console.log('hoi', this.state.ref)
        if(this.state.ref !== "") return this.setState({ref: "canvasDraw"})
        // const {ref} = this.state
        // const data = ref.getSaveData()
        // console.log('update artist data', data)
    }



    render() {
        console.log('canvasArtist State',this.state)
        console.log('canvasArtist Props',this.props)
    
        return (
            <div id='colors' onClick={this.updateDrawing}>
                <CirclePicker   onChangeComplete={this.handleChangeColor}
                                style={{ display: 'flex', border:'1px solid' ,margin: '0 auto' }} />
                <CanvasDraw 
                    id='canvasdraw'
                    style={{ display: 'flex', border:'1px solid' ,margin: '0 auto' }} 
                    ref={canvasDraw => {
                        // if(this.state.ref !== null) return
                        // this.setState({ ref: canvasDraw })
                    }}
                    canvasWidth={200}
                    canvasHeight={200}
                    brushColor={this.state.color}
                    brushRadius={6}
                    lazyRadius={0}
                    />
                    
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    games: state.games 
})

export default connect(mapStateToProps)(CanvasArtist)