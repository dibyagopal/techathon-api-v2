import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SkillMaster')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skill_name: string;
}
