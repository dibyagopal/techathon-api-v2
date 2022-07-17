

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SkillLevelMaster')
export class SkillLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proficiency_level_name: string;

  @Column()
  proficiency_level: string;
}
