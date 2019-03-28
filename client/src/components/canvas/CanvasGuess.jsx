import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'

export default class CanvasGuess extends PureComponent {



    render() {
        
        return (
            <CanvasDraw style={{ display: 'flex', border:'1px solid' ,margin: '0 auto' }} 
                        immediateLoading={true}
                        disabled={true}
                        canvasWidth={200}
                        canvasHeight={200}
                        // ref={ this.loadableCanvas.loadSaveData(
                        //       localStorage.getItem("savedDrawing")
                        //     )}
                        //saveData={this.props.canvasDisplay}
            />
        )
    }
}