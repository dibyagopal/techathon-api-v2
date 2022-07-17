import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TrainingRequestTrainers')
export class TrainingRequestTrainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request_id: number;

  @Column()
  trainer_id: number;

  @Column()
  status: number;

  @Column()
  accept_date?: Date;
}
