import { IsString, IsNotEmpty } from 'class-validator';
export class GetAllProductsCategorizedDTO {
  categories?: string[];
  
  // @IsString({ message: 'Area must be a string' })
  // @IsNotEmpty({ message: 'Area cannot be empty' })
  area: string;
}
