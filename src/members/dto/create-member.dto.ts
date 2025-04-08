import { members_gender } from "@prisma/client";
import { IsDateString, IsEmpty, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsOptional()
    @IsString()
    @IsIn(['F','M'])
    gender?: members_gender
    
    @IsNotEmpty()
    @IsDateString()
    birth_date:Date;


}
