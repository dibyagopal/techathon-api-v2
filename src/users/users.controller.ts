import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbService } from 'src/db.service';
import { RequestForTrainingDto, TrainingAnnouncementDto } from './users.dto';
import { ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { MailService } from 'src/services/mail/mail.service';
import { TrainingAnnouncement } from 'src/entity/traningAnnouncement.entity';
const getDb = new DbService();

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService, private mailService: MailService) {}

  @Get('all')
  async findAllUser() {
    return await this.userService.findAllUser();
  }

  @Get('details/:user_id')
  async getUserDetails(
    @Param('user_id') user_id: number,
    @Res() response: Response
  ) {
    const currentUser = await this.userService.findOneUser(user_id);
    const userSkills = await getDb.query(`
      SELECT * FROM UserSkillAssociation as usa 
      join SkillMaster sm on sm.id=usa.skill_id 
      join SkillLevelMaster alm on alm.id = usa.skill_level_id WHERE usa.user_id=${user_id}
    `);
    const userProjects = await getDb.query(`
      SELECT * FROM ProjectMaster WHERE id in (SELECT project_id from ProjectUserAssociation WHERE user_id=${user_id})
    `);

    return response.status(HttpStatus.OK)
    .send({
      user: currentUser,
      skills: userSkills.data,
      projects: userProjects.data
    }); 

  }

  @Get('all-master-date')
  async findAllMasterData() {
    return {
      skillLevels: await this.userService.findAllSkillLevel(),
      skills: await this.userService.findAllSkill(),
      projects: await this.userService.findAllProject(),
    }
  }

  @ApiBody({ type: RequestForTrainingDto })
  @Post('request-for-training')
  async requestForTraining(@Body() params: RequestForTrainingDto, @Res() response: Response) {
    const addedData = await this.userService.saveTrainingRequest(params);

    const getRelatedTrainers = await getDb.query<{trainer_id: number, trainer_name: string, trainer_email: string}[]>(
      `SELECT UM.id as trainer_id, UM.user_name as trainer_name, UM.email_id as trainer_email FROM UsersMaster as UM
      JOIN UserSkillAssociation as USA ON UM.id=USA.user_id
      WHERE
        UM.id != ${params.user_id}
        AND USA.skill_id=${params.skill_id}
      GROUP by UM.id;`
    );

    const currentUser = await this.userService.findOneUser(params.user_id);
    const skill = await this.userService.findOneSkill(params.skill_id);
    const project = await this.userService.findOneProject(params.project_id);

    let trainers = getRelatedTrainers.data;

    trainers = [{
      trainer_id: 60,
      trainer_name: 'Dibyagopal Sau',
      trainer_email: 'dibyagopal.sau@digitalavenues.com'
    }]

    if(getRelatedTrainers && getRelatedTrainers.data && getRelatedTrainers.data.length){
      trainers.forEach(eachData => {
        this.userService.saveTrainingRequestTrainer(addedData.id,eachData.trainer_id);
        // this.userService.sendEmailForTrainingRequest(
        //   eachData.trainer_email,
        //   eachData.trainer_name,
        //   currentUser.user_name,
        //   params.topic_type,
        //   project.project_name,
        //   skill.skill_name,
        //   params.notes
        // );
      });
    }

    response.status(HttpStatus.OK)
    .send(addedData);
  }

  @Get('get-training-request/:user_id')
  async getAllRequest(
    @Param('user_id') user_id: number,
    @Res() response: Response
  ) {
    const getAllRequests = await getDb.query(
      `SELECT tr.id as request_id, tr.topic_type, tr.notes as request_note, pm.project_name, sm.skill_name, 
      um.id as request_by_id, 
      um.user_name as request_by_name, 
      um.user_image as request_by_image
      FROM TrainingRequest as tr
      join SkillMaster as sm on sm.id=tr.skill_id
      LEFT JOIN ProjectMaster pm on pm.id=tr.project_id
      join UsersMaster as um on um.id=tr.user_id 
      
      JOIN TrainingRequestTrainers as trm on trm.request_id=tr.id
      where trm.trainer_id=${user_id}
      GROUP by tr.id
      order by tr.id DESC`
    );

    response.status(HttpStatus.OK)
    .send(getAllRequests.data);
  }

  @ApiBody({ type: TrainingAnnouncementDto })
  @Post('training-announcement')
  async trainingAnnouncement(@Body() params: TrainingAnnouncementDto, @Res() response: Response) {

    const requestData = await this.userService.saveTrainingAnnouncement(params);

    return response.status(HttpStatus.OK).send(requestData);

    /*
    const currentUser = await this.userService.findOneUser(params.user_id);
    const userSkills = await getDb.query<{skill_name: string, proficiency_level_name: string}[]>(`
      SELECT * FROM UserSkillAssociation as usa 
      join SkillMaster sm on sm.id=usa.skill_id 
      join SkillLevelMaster alm on alm.id = usa.skill_level_id WHERE usa.user_id=${params.user_id}
    `);

    const userSkillsArray = userSkills.data.map(eachData=>{
      return `${eachData.skill_name} - ${eachData.proficiency_level_name}`
    });
    const userSkillsArrayString = userSkillsArray.join(', ');

    const userProjects = await getDb.query<{project_name: string}[]>(`
      SELECT * FROM ProjectMaster WHERE id in (SELECT project_id from ProjectUserAssociation WHERE user_id=${params.user_id})
    `);

    const userProjectsArray = userProjects.data.map(eachData=>{
      return `${eachData.project_name}`
    });

    const userProjectsArrayString = userProjectsArray.join(', ');


    const trainers = [
      {
        user_id: 60,
        user_name: 'Dibyagopal Sau',
        user_email: 'dibyagopal.sau@digitalavenues.com'
      },
      // {
      //   user_id: 32,
      //   user_name: 'Manoranjan Kumar',
      //   user_email: 'manoranjan.kumar@digitalavenues.com'
      // },
      // {
      //   user_id: 33,
      //   user_name: 'Soham Chakraborty',
      //   user_email: 'soham.chakraborty@digitalavenues.com'
      // },
      // {
      //   user_id: 15,
      //   user_name: 'Nabarun Mukherjee',
      //   user_email: 'nabarun.mukherjee@digitalavenues.com'
      // },
      // {
      //   user_id: 23,
      //   user_name: 'Sasanka Rakshit',
      //   user_email: 'sasanka.rakshit@digitalavenues.com'
      // }
    ];

      trainers.forEach(eachData => {
        //this.userService.saveTrainingRequestTrainer(addedData.id,eachData.trainer_id);
        // this.userService.sendEmailForTrainerAnnouncement(
        //   eachData.user_email,
        //   eachData.user_name,
        //   currentUser.user_name,
        //   userSkillsArrayString,
        //   userProjectsArrayString,
        //   params.available_date,
        //   params.available_time_from,
        //   params.available_time_to,
        //   params.notes
        // );
      });
    

    response.status(HttpStatus.OK)
    .send(true);
    */
  }

  @Get('get-all-announcement')
  async findAllAnnouncement(@Res() response: Response) {
    const asyncForEach = async (array: any, callback: Function) => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    };

    const findAllAnnouncement = await this.userService.findAllTrainingAnnouncement();
    const data:any = [];

    await asyncForEach(findAllAnnouncement, async (eachChunk: TrainingAnnouncement) => {
      const currentUser = await this.userService.findOneUser(eachChunk.user_id);
      const userSkills = await getDb.query<{skill_name: string, proficiency_level_name: string}[]>(`
        SELECT * FROM UserSkillAssociation as usa 
        join SkillMaster sm on sm.id=usa.skill_id 
        join SkillLevelMaster alm on alm.id = usa.skill_level_id WHERE usa.user_id=${eachChunk.user_id}
      `);

      const userSkillsArray = userSkills.data.map(eachData=>{
        return `${eachData.skill_name} - ${eachData.proficiency_level_name}`
      });
      const userSkillsArrayString = userSkillsArray.join(', ');

      const userProjects = await getDb.query<{project_name: string}[]>(`
        SELECT * FROM ProjectMaster WHERE id in (SELECT project_id from ProjectUserAssociation WHERE user_id=${eachChunk.user_id})
      `);

      const userProjectsArray = userProjects.data.map(eachData=>{
        return `${eachData.project_name}`
      });

      const userProjectsArrayString = userProjectsArray.join(', ');
      data.push({
        ...eachChunk,
        ...currentUser,
        //skills: userSkills.data,
        skillsString: userSkillsArrayString,
        //projects: userProjects.data,
        projectsString: userProjectsArrayString
      })
    });

    return response.status(HttpStatus.OK).send(data);
  }
}
