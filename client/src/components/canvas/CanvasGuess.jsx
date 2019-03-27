import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'

export default class CanvasGuess extends PureComponent {

    render() {
        return (
            <CanvasDraw style={{ margin: '0 auto' }} 
                        disabled
                        immediateLoading={true}
                        hideGrid
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        saveData={this.props.canvasDisplay}/>
        )
    }
}