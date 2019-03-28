import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from '@material-ui/core/Paper'
import './GameDetails.css'
import CanvasArtist from '../canvas/CanvasArtist'
import CanvasGuess from '../canvas/CanvasGuess';
import Button from '@material-ui/core/Button'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  render() {
    console.log('gamedetails props', this.props)
    console.log('gamedetails state', this.state)

    const {game, users, authenticated, userId} = this.props

    // if not authenticated redirect to loginpage
    if (!authenticated) return (
			<Redirect to="/login" />
		)
    // if no game and no users display "loading" on screen
    if (game === null || users === null) return 'Loading...'

    // if no game display "not found" on screen
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    //change code to determine winner
    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (
      <Paper className="outer-paper">
        <h1>Game #{game.id}</h1>

        <p>Status: {game.status}</p>

        {
          game.status === 'started' &&
          player && player.symbol === game.turn
        }
          <ul>
            {game.players
              .map(player =>
                <li key={users[player.userId].id}>{users[player.userId].firstName}</li>)}
          </ul>
          <Button onClick={this.joinGame}
                  color="primary"
                  variant="contained"
                  className='join-game'        
                          >Join Game</Button>

        <hr />

        {/* {
          game.status !== 'pending' &&
          <CanvasArtist />
          
        } */}
        <CanvasArtist gameId={this.props.match.params.id}/>
        <CanvasGuess gameId={this.props.match.params.id} canvas={game.drawing} />
      </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
