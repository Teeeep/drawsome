import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, ManyToOne } from 'typeorm'
import Game from './entities'
import User from '../users/entity'

@Entity()
@Index(['game', 'user'], { unique: true })
export default class Player extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(_ => User, user => user.players)
    user: User

    @ManyToOne(_ => Game, game => game.players)
    game: Game

    @Column('integer', { default: 0 })
    score: number

    @Column('integer', { name: 'user_id' })
    userId: number
}
