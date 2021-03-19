import { FieldResolver, Resolver, Root } from "type-graphql";
import { FileDocument } from "..";
import FileClass from "../class";

@Resolver(() => FileClass)
export default class FileResolver {
  @FieldResolver(() => String)
  async buffer(@Root() file: FileDocument) {
    return file.buffer.toString();
  }
}
