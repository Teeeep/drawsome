import React, {PureComponent} from 'react'
import {getGames, createGame, joinGame } from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'; 
import Typography from '@material-ui/core/Typography'
import './GamesList.css'

class GamesList extends PureComponent {
  componentWillMount() {
    console.log('GameListprops: ',this.props)
    if (this.props.authenticated) {
      if (this.props.games === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderGame = (game) => {
    const {users, history} = this.props

    return (<Card key={game.id} className="game-card">
      <CardContent>
        <Typography variant="headline" component="h2">
          Game #{game.id}
        </Typography>
        <Typography color="textSecondary">
          Status: {game.status}
        </Typography>
        <Typography color="textPrimary">
          <h2>Players:</h2>
          <ul>
            {game && game.players && game.players
              .map(player => 
                <li key={users[player.userId].id}>{users[player.userId].email}</li>)}
              
          </ul>
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button
          size="small"
          // onClick={joinGame(game.id)}
          onClick={() => history.push(`/games/${game.id}`)}>
          Enter game lobby 
        </Button>
      </CardActions>
    </Card>)
  }

  render() {
    const {games, users, authenticated, createGame} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (games === null || users === null) return null

    return (<Paper className="outer-paper">
      <Button
        color="primary"
        variant="contained"
        onClick={createGame}
        className="create-game"
      >
        Create Game
      </Button>

      <div>
        {games.map(game => this.renderGame(game))}
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games: state.games === null ?
    null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getGames, getUsers, createGame, joinGame})(GamesList)
