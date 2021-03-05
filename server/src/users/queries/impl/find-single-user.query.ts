import { IQuery } from "@nestjs/cqrs";

export class FindSingleUserQuery implements IQuery {
  constructor(public readonly id: string) {}
}
