import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { BaseResponseDto } from 'src/shared/utils/dto/base-response.dto';

export class UserResponseDto extends BaseResponseDto<UserEntity> {
  @ApiProperty({ type: () => UserEntity })
  data: UserEntity;
}
