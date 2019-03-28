import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'
import { connect } from 'react-redux'

class CanvasGuess extends PureComponent {
    

    render() {
<<<<<<< HEAD
        console.log('C_Guess this', this)
        console.log('C_canvas', this.props.canvasDisplay)
=======
        console.log('guess canvas props:', this.props)
>>>>>>> de7bc25e96925197ba08eab9a622c7a07a48ae1f
        return (
            <CanvasDraw style={{ display: 'flex', border:'1px solid' ,margin: '0 auto' }} 
                        immediateLoading={true}
                        disabled={true}
                        canvasWidth={200}
                        canvasHeight={200}
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
<<<<<<< HEAD
                        // saveData={this.loadableCanvas.loadSaveData(
                        //     localStorage.getItem("savedDrawing"))}
=======
                        saveData={JSON.stringify(this.props.canvas)}
>>>>>>> de7bc25e96925197ba08eab9a622c7a07a48ae1f
            />
        )
    }
}

const mapStateToProps = (state) => ({
    games: state.games
})

export default connect(mapStateToProps)(CanvasGuess)