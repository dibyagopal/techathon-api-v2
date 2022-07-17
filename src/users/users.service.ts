import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entity/project.entity';
import { Skill } from 'src/entity/skill.entity';
import { SkillLevel } from 'src/entity/skillLevel.entity';
import { TrainingRequest } from 'src/entity/trainingRequest.entity';
import { TrainingRequestTrainer } from 'src/entity/trainingRequestTrainer.entity';
import { TrainingAnnouncement } from 'src/entity/traningAnnouncement.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { EmailDto, RequestForTrainingDto, TrainingAnnouncementDto } from './users.dto';
//import SendGrid from "@sendgrid/mail";
const SendGrid = require('@sendgrid/mail');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(SkillLevel) private skillLevelRepository: Repository<SkillLevel>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(TrainingRequest) private trainingRequestRepository: Repository<TrainingRequest>,
    @InjectRepository(TrainingRequestTrainer) private trainingRequestTrainerRepository: Repository<TrainingRequestTrainer>,
    @InjectRepository(TrainingAnnouncement) private trainingAnnouncementRepository: Repository<TrainingAnnouncement>,
    
  ) {}

  findAllUser(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneUser(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findAllSkillLevel(): Promise<SkillLevel[]> {
    return this.skillLevelRepository.find();
  }

  findAllSkill(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  findOneSkill(id: number): Promise<Skill> {
    return this.skillRepository.findOneBy({ id });
  }

  findAllProject(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOneProject(id: number): Promise<Project> {
    return this.projectRepository.findOneBy({ id });
  }

  saveTrainingRequest(requestForTrainingDto:RequestForTrainingDto): Promise<TrainingRequest> {
    const insertData = this.trainingRequestRepository.save(requestForTrainingDto);
    return insertData;
  }

  saveTrainingAnnouncement(trainingAnnouncementDto:TrainingAnnouncementDto): Promise<TrainingAnnouncement> {
    const insertData = this.trainingAnnouncementRepository.save(trainingAnnouncementDto);
    return insertData;
  }

  findAllTrainingAnnouncement(): Promise<TrainingAnnouncement[]> {
    return this.trainingAnnouncementRepository.find({
      order: {
        // name: "ASC",
        // id: "DESC"
        id: 'DESC'
      }
    });
  }

  saveTrainingRequestTrainer(request_id: number, trainer_id: number): Promise<TrainingRequestTrainer> {
    const insertData = this.trainingRequestTrainerRepository.save({
      request_id,
      trainer_id,
    });
    return insertData;
  }

  async sendEmailForTrainingRequest(toEmail: string, toName: string, requestBy: string, topicType: string, projectName: string, skillName: string, requestNote: string){
    const response2 = await this.sendEmail({
      template_id: '',
      to: [toEmail],
      cc: [],
      bcc: [],
      subject: 'You have got a training request',
      substitutions: {
        toName,
        requestBy,
        topicType,
        skillName,
        projectName,
        requestNote,
        acceptUrl: ''
      },
    });
  }

  async sendEmailForTrainerAnnouncement(toEmail: string, toName: string, trainerName: string, trainerSkills: string, trainerProjects: string, availableDate: string, availableTimeFrom: string, availableTimeTo: string, notes: string){
    const response2 = await this.sendEmail({
      template_id: '',
      to: [toEmail],
      cc: [],
      bcc: [],
      subject: 'Trainer is available for training',
      substitutions: {
        toName,
        trainerName,
        trainerSkills,
        trainerProjects,
        availableDate,
        availableTimeFrom,
        availableTimeTo,
        notes,
        acceptUrl: ''
      },
    });
  }

  public sendEmail = async (emailDto: EmailDto) => {
    try {
        console.log(emailDto);
        
        
    } catch (err) {
        console.log(err)
    }
}

}
