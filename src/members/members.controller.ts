import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('api/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }
  @Post(':id/pay')
  async pay(@Param('id') id: string) {
    const member_id = parseInt(id);
    if (isNaN(member_id)) {
      throw new Error('Invalid member id');
    }
  
    const member = await this.membersService.findOne(member_id);
    if (!member) {
      throw new Error('Member not found');
    }
  
  
    const result = await this.membersService.pay(member_id, 5000);
  
   return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
