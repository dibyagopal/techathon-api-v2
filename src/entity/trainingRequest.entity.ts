import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TrainingRequest')
export class TrainingRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  skill_id: number;

  @Column()
  topic_type: string;

  @Column()
  project_id: number;

  @Column()
  notes?: string;
}
