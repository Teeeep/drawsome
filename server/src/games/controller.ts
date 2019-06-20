import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch 
} from 'routing-controllers'
import User from '../users/entity'
<<<<<<< HEAD
import { Game, Player } from './entities'
=======
import Game from './entities' //, Board
import Player from './players'
//import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
//import { Validate } from 'class-validator'
>>>>>>> master
import {io} from '../index'

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    await Player.create({
      game: entity, 
      user,
      score: 0
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'waiting for players') throw new BadRequestError(`Game is already started`)

    game.status = 'waiting for players'
    await game.save()

    const player = await Player.create({
      game, 
      user,
      score:0
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: any
  ) {
    console.log('update test:', update)
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    let payload: any = game

    if (!player) throw new ForbiddenError(`You are not part of this game`)
<<<<<<< HEAD
  
    console.log('hello', update)
    await Game.merge(game, update).save()
=======


    let newGame: any = game
    if (game.status == 'waiting for players') {
      console.log('hello', update)
      await Game.merge(game, update)

      const randomNumber = Math.floor(Math.random () * game.players.length)
      console.log('randomNumber test:', randomNumber)
      const artistId = game.players[randomNumber].id
      console.log('aristId test:', artistId)

      const artist = await Player.findOneById(artistId)
      console.log('artist test:', artist)
      if (artist) {
        game.artist = artist
        console.log('game test:', game)
        
        await game.save()
      }

      newGame = await Game.findOneById(gameId)
      console.log('newGame test:', newGame)

      payload = newGame
    }

    if (update.drawing) {
      const drawing = JSON.parse(update.drawing)

      payload = { ...newGame, drawing }
    }

>>>>>>> master
    
    console.log('payload test:', payload)

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload // start game --> clients
    })

    return payload

  }
  
  // get A game based on ID 
  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  //get all games
  @Authorized()
  @Get('/games')
  async getGames() {
    try {
      console.log('get games!')
      const games = await Game.find()

      console.log('games test:', games)
      
      return games
    } catch (error) {
      console.log('error:', error)
    }
  }
}

