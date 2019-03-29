import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, JoinColumn, OneToOne } from 'typeorm'
import Player from './players'

// export type Symbol = 'x' | 'o'
// export type Row = [ Symbol | null, Symbol | null, Symbol | null ]
// export type Board = [ Row, Row, Row ]

type Status = 'waiting for players' | 'started' | 'finished'

// const emptyRow: Row = [null, null, null]
// const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  // @Column('json', {default: emptyBoard})
  // board: Board

  // @Column('char', {length:1, default: 'x'})
  // turn: Symbol

  // @Column('char', {length:1, nullable: true})
  // winner: Symbol

  @Column('text', {default: 'waiting for players'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]

  @OneToOne(_ => Player, { eager: true, nullable: true })
  @JoinColumn()
  artist: Player
}