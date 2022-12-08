import { QuestionAnswerDto } from "./question-answer.dto";
import { IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class QuestionDto {
  @ValidateNested({ each: true })
  @Type(() => QuestionAnswerDto)
  answers: QuestionAnswerDto[];

  @IsNumber({}, {
    message: "relative_id must be INT"
  })
  relative_id: number;

  @IsNumber({}, {
    message: "coins must be INT"
  })
  coins: number;

  @IsNumber({}, {
    message: "title must be STRING"
  })
  title: string;

  @IsNumber({}, {
    message: "picture must be STRING"
  })
  picture: string;
}
