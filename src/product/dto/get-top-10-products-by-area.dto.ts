import { IsString, IsNotEmpty } from 'class-validator';

export class GetTop10ProductsDTO {
    @IsString({ message: 'Area must be a string' })
    @IsNotEmpty({ message: 'Area cannot be empty' })
    area: string;
}
