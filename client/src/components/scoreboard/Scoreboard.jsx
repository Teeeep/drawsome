import React, {Component} from "react"



export default class Scoreboard extends Component {
    state = {
        players: []
    }

    addPlayer = (name) => {
        const player = {
            //user.id of player who joined,
            //user.name ,
            score: 0 // ??
        }
        this.setState({
            players: this.state.players.concat(player)
        })
    }

    updatePlayerScore = (id, score) => {
        const updatedPlayers = this.state.players.map(
            player => {
                if (player.id === id) {
                    return {
                        ...player,
                        score
                    }
                }
                else {
                    return player
                }
            }
        )
        this.setState({players: updatedPlayers})
    }

    // renderPlayer = (player) => {
    //     return <Player 
    //                 id={player.id}
    //                 key={player.id}
    //                 name={player.name}
    //                 score={player.score}
    //                 updatePlayerScore={this.updatePlayerScore}
    //                 removePlayer={this.removePlayer}
    //             />
    // }

    render() {
        return(
            <div className="scoreboard">
                <h1>Scoreboard</h1>
                {/* <ul>
                    { this.state.players
                        .sort((a,b) => b.score - a.score)
                        .map(this.renderPlayer)
                    }
                </ul> */}
            </div>    
        )
    }
}