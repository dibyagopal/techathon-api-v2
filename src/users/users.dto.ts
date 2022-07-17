import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class RequestForTrainingDto {
    @ApiProperty()
    @IsNumber()
    user_id: number;

    @ApiProperty()
    @IsNumber()
    skill_id: number;

    @ApiProperty()
    @IsNumber()
    project_id: number;

    @ApiPropertyOptional()
    topic_type: string;
  
    @ApiPropertyOptional()
    notes: string;
}

export class TrainingAnnouncementDto {
    @ApiProperty()
    @IsNumber()
    user_id: number;

    @ApiProperty()
    @IsString()
    available_date: string;

    @ApiProperty()
    @IsString()
    available_time_from: string;

    @ApiProperty()
    @IsString()
    available_time_to: string;
  
    @ApiPropertyOptional()
    notes: string;
}

export class EmailDto {
	@ApiProperty({ type: [ String ], required: true })
	@IsArray()
	to: string[];

	@ApiProperty({ type: [ String ], required: false })
	@IsArray()
	cc: string[];

    @ApiProperty({ type: [ String ], required: false })
	@IsArray()
	bcc: string[];

	@ApiProperty({ type: String, required: true })
	@IsString()
	subject: string;

	// @ApiProperty({type:String,required:false})
	// @IsString()
	// text:string;

	// @ApiProperty({type:String,required:false})
	// @IsString()
	// html:string;

	@ApiProperty() substitutions: any;

	@ApiProperty({ type: String, required: true })
	@IsString()
	template_id: string;

}