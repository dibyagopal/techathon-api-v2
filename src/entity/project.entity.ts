import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ProjectMaster')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_name: string;
}
