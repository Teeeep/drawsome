import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'
import { connect } from 'react-redux'

class CanvasGuess extends PureComponent {
    

    render() {
        console.log('C_Guess this', this)
        console.log('C_canvas', this.props.canvasDisplay)
        return (
            <CanvasDraw style={{ display: 'flex', border:'1px solid' ,margin: '0 auto' }} 
                        immediateLoading={true}
                        disabled={true}
                        canvasWidth={200}
                        canvasHeight={200}
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        // saveData={this.loadableCanvas.loadSaveData(
                        //     localStorage.getItem("savedDrawing"))}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    games: state.games
})

export default connect(mapStateToProps)(CanvasGuess)