import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'

export default class CanvasGuess extends PureComponent {

    updateDrawing = () => {
        console.log('hello')
        const {ref} = this.state
        const data = ref.loadSaveData()
        console.log(data)
    }

    render() {
        return (
            <CanvasDraw style={{ display: 'flex', border:'1px solid' ,margin: '0 auto' }} 
                        immediateLoading={true}
                        disabled={true}
                        canvasWidth={200}
                        canvasHeight={200}
                        ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                        saveData={this.props.canvasDisplay}/>
        )
    }
}