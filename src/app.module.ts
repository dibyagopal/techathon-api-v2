import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Project } from './entity/project.entity';
import { Skill } from './entity/skill.entity';
import { SkillLevel } from './entity/skillLevel.entity';
import { TrainingRequest } from './entity/trainingRequest.entity';
import { TrainingRequestTrainer } from './entity/trainingRequestTrainer.entity';
import { TrainingAnnouncement } from './entity/traningAnnouncement.entity';
import { User } from './entity/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'SG-crocus-cook-7607-52693.servers.mongodirector.com',
      port: 3306,
      username: 'tbdb',
      password: 'i9bf!j8NUqB7M6i',
      database: 'techathonDa',
      entities: [User, Project, Skill, SkillLevel, TrainingRequest, TrainingRequestTrainer, TrainingAnnouncement],
      synchronize: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
