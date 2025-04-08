import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MembersService {
 
  constructor(private readonly prisma: PrismaService) {}
  create(createMemberDto: CreateMemberDto) {
    return this.prisma.members.create({
      data: {
        ...createMemberDto,
        created_at: new Date(),
      }
    });
  }

  findAll() {
    return this.prisma.members.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }
  
  async pay(member_id: number, amount: number) {


    const today = new Date();

 
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);


  const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);


  const existingPayment = await this.prisma.payment.findFirst({
    where: {
      member_id,
      paid_at: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
  });

  if (existingPayment) {
    throw new ConflictException('Member has already paid this month');
  }
    if (existingPayment) {
      throw new ConflictException('Member has already paid today');
    }
    return this.prisma.payment.create({
      data: {
        member_id,
        amount,
        paid_at: new Date(),
      },
    });
  }


  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
