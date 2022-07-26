import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { hashSync } from 'bcrypt'

@Entity({ name: 'users' })
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    idPost: string;

    @Column({ length: 255, name: 'post' })
    post: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    // @ManyToOne({ name: 'fkId' })
    // owner: string;


}