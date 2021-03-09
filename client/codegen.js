module.exports = {
  overwrite: true,
  schema: "http://localhost:8080/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql.tsx": [
      "typescript",
      "typescript-operations",
      "typescript-react-apollo",
    ],
  },
};