import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'
import { CirclePicker } from 'react-color'
import { connect } from 'react-redux'


class CanvasArtist extends PureComponent {

    state = {
        color: "",
        background: '#fff'
    }

    handleChangeColor = (color) => {
        this.setState({ color : color.hex })
    }

    render() {
        console.log('canvasArtist State',this.state)
        console.log('canvasArtist Props',this.props)
        return (
            <div id='colors'>
                <CanvasDraw 
                    canvasWidth={400}
                    canvasHeight={400}
                    brushColor={this.state.color}
                    brushRadius={6}
                    lazyRadius={0}
                    />
                <CirclePicker onChangeComplete={this.handleChangeColor}/>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    games: state.games 
})

export default connect(mapStateToProps)(CanvasArtist)