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
import Timer from 'react-compound-timer'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/TableRow'


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

    return (
      <div>

        <div className="score-board">
        <Typography variant="h6" id="tableTitle" align="center">
            Gameboard Dr. Awesome # {game.id}
        </Typography>
        <Typography variant="body1" id="tableSubTitle" align="left">
          {game.status}
        </Typography>
        <Table >
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {game.players
                .map(player => (
                  <TableRow className={users[player.userId].firstName} key={users[player.userId].id}>
                    <TableCell component="th" scope="row">{users[player.userId].firstName}</TableCell>
                    <TableCell component="th" scope="row">{player.score}</TableCell>
                  </TableRow>))}  
        </TableBody>
        </Table>
        </div>

        <div><Paper className="outer-paper">
                
          {/* <h1>Game #{game.id}</h1>

          <p>Status: {game.status}</p> */}

          {/* <Timer  initialTime={60000}
                  direction="backward"
                  // startImmediately={false}
                  >
                  {() => (
                    <React.Fragment>
                        <Timer.Seconds /> seconds
                    </React.Fragment>
                )}
          </Timer> */}
            <Button onClick={this.joinGame}
                    color="primary"
                    variant="contained"
                    className='join-game'        
                            >Join Game</Button>
          <hr />
          <CanvasArtist gameId={this.props.match.params.id}/>
          <CanvasGuess gameId={this.props.match.params.id} canvas={game.drawing} />
        </Paper></div>
      </div>)
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


// <Card key={game.id} className="scoreboard-card">
//           <CardContent>
//             <Typography variant="headline" component="h2">
//               Scoreboard 
//               {/* Game #{game.id} */}
//             </Typography>
//             <Typography>
//               <Typography variant="body1" gutterBottom align="left">
//                 Player 
//                 {/* {game.status} */}
//               </Typography>
//               <Typography variant="body1" gutterBottom align="right">
//               {/* color="textPrimary" */}
//                 Score
//               </Typography>
//               </Typography>  
//           </CardContent>
//          </Card> 
