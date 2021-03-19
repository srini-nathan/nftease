import { GraphQLScalarType } from "graphql";

export const BufferScalar = new GraphQLScalarType({
  name: "Buffer",
  description: "File buffer data",
  serialize(value: unknown): Buffer {
    if (!(value instanceof Buffer)) {
      throw new Error("BufferScalar can only serialize Buffer values");
    }
    return value;
  },
  parseValue(value: unknown): Buffer {
    if (typeof value !== "object") {
      throw new Error("BufferScalar can only parse string values");
    }
    return Buffer.from(value!);
  },
  parseLiteral(ast): Buffer {
    return Buffer.from(ast!);
  },
});
