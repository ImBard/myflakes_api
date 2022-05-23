import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { hashSync } from 'bcrypt'

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    hash: string;

    @Column({ length: 255, name: 'email_user' })
    email: string;

}