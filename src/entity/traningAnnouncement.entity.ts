import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TrainingAnnouncement')
export class TrainingAnnouncement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  available_date: string;

  @Column()
  available_time_from: string;

  @Column()
  available_time_to: string;

  @Column()
  notes?: string;
}
