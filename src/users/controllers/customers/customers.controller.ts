import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from '../../services/customers/customers.service';
import { GenericController } from '../../../common/controllers/generic.controller';
import { Customer } from '../../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController extends GenericController<Customer> {
  constructor(private customersService: CustomersService) {
    super(customersService);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }
}
