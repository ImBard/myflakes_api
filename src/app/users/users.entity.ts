import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { hashSync } from 'bcrypt'

@Entity({ name: 'users' })
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    idUser: string;

    @Column({ length: 20, name: 'first_name' })
    firstName: string;

    @Column({ length: 60, name: 'last_name' })
    lastName: string;

    @Column({ length: 255, name: 'email_user' })
    email: string;

    @Column({ length: 255, name: 'passwor_user' })
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }
}