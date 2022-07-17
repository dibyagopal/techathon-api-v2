import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entity/project.entity';
import { Skill } from 'src/entity/skill.entity';
import { SkillLevel } from 'src/entity/skillLevel.entity';
import { TrainingRequest } from 'src/entity/trainingRequest.entity';
import { TrainingRequestTrainer } from 'src/entity/trainingRequestTrainer.entity';
import { TrainingAnnouncement } from 'src/entity/traningAnnouncement.entity';
import { User } from 'src/entity/user.entity';
import { MailModule } from 'src/services/mail/mail.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, Skill, SkillLevel, TrainingRequest, TrainingRequestTrainer, TrainingAnnouncement]), MailModule],
  controllers: [UsersController],
  exports: [TypeOrmModule],
  providers: [UsersService],
})
export class UsersModule {}
