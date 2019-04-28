import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, OneToOne } from 'typeorm'
import Player from './players'


type Status = 'waiting for players' | 'started' | 'finished'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {default: 'waiting for players'})
  status: Status

  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]

  @OneToOne(_ => Player, { eager: true, nullable: true })
  @JoinColumn()
  artist: Player
}