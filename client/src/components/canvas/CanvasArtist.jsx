import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'
import { CirclePicker } from 'react-color'
import { connect } from 'react-redux'


class CanvasArtist extends PureComponent {

    state = {
        color: "",
        background: '#fff'
    }

    handleChangeComplete = (color) => {
        this.setState({ color : color.hex })
    }

    render() {
        console.log('canvasArtist State',this.state)
        console.log('canvasArtist Props',this.props)
        return (
            <div id='colors'>
                <CanvasDraw 
                    brushColor={this.state.color}
                    onChangeComplete={this.handleChangeComplete}/>
                <CirclePicker />
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    games: state.games 
})

export default connect(mapStateToProps)(CanvasArtist)