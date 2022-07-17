import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UsersMaster')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  email_id: string;

  @Column()
  user_password: string;

  @Column()
  organization_code: string;
  
  @Column()
  user_image: string
}
