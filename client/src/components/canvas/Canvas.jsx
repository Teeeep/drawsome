import * as React from 'react'

export default function Canvas(){
    return (<div>
                <canvas width="640" 
                        height="480" 
                        ref={this.display} 
                        onMouseMove={this.handleDisplayMouseMove} 
                        onMouseDown={this.handleDisplayMouseDown}>
                </canvas>
                <Tool   name="Eraser" 
                        toolId="eraser" 
                        onSelect={this.handleToolClick}/>
                <Tool   name="Pen" 
                        toolId="pen" 
                        onSelect={this.handleToolClick}/>
                <div class="color-picker">
                    <HuePicker onChangeComplete={this.handleColorChange}>
                    </HuePicker>
                </div>
            </div>
    )
}