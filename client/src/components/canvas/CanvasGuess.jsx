import React, {PureComponent} from 'react'
import CanvasDraw from 'react-canvas-draw'
import { connect } from 'react-redux'
//import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'


class CanvasGuess extends PureComponent {
    

    render() {
        console.log('guess canvas props:', this.props)
        return (
            <div>
                <div>
                    <CanvasDraw style={{ display: 'flex', border:'1px solid' ,margin: '0 auto' }} 
                            immediateLoading={true}
                            disabled={true}
                            canvasWidth={500}
                            canvasHeight={300}
                            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                            saveData={JSON.stringify(this.props.canvas)}
                    />
                </div>
                <div>
                    <Button></Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    games: state.games
})

export default connect(mapStateToProps)(CanvasGuess)