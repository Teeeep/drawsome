import React, { PureComponent } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { GithubPicker } from 'react-color'
import { connect } from 'react-redux'
import { updateGame } from '../../actions/games'
import Button from '@material-ui/core/Button'

class CanvasArtist extends PureComponent {

    state = {
        color: '',
        background: '#fff',
        brushRadius: 6,
        lazyRadius: 0
    }

    handleChangeColor = (color) => {
        this.setState({ color : color.hex })
    }

    updateDrawing = () => {
        //console.log('props update drawing', this.props.gameId)
        //console.log('state update drawing', this.state)
        const { updateGame } = this.props //games,
        localStorage.setItem(
            "savedDrawing", this.saveableCanvas.getSaveData()
        )
        const drawing = localStorage.getItem("savedDrawing")
        updateGame(this.props.gameId, drawing)

        //console.log('drawing updatedrawing', drawing)
        //console.log('this.props.gameId',this.props.gameId)
    }

    render() {
        //console.log('canvasArtist State',this.state)
        //console.log('canvasArtist Props',this.props)
        
        return (
            <div id='canvas' onClick={this.updateDrawing}>

                <div>
                <CanvasDraw id='canvasdraw'
                            style={{ display: 'flex', border:'1px solid', margin: '0 auto' }} 
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            canvasWidth={500}
                            canvasHeight={300}
                            brushColor={this.state.color}
                            brushRadius={this.state.brushRadius}
                            lazyRadius={this.state.lazyRadius}
                    />
                </div>   

                <div>
                <GithubPicker onChangeComplete={this.handleChangeColor}
                                style={{    display: 'flex', 
                                            border:'1px solid' ,
                                            margin: '0 auto',
                                            height: 300,
                                            width: 500
                                            }} />    
                <Button color="primary"
                        variant="contained"
                        className="clear-canvas"
                        size="small"
                        onClick={() => { this.saveableCanvas.clear() }} >
                    Clear
                </Button><br/>
                
                <Button className="undo"
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={() => { this.saveableCanvas.undo() }} >
                    Undo
                </Button>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    games: state.games,
    
})

const mapDispatchToProps ={
    updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasArtist)

