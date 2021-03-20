module.exports = {
  client: {
    service: {
      name : "ruman-monorepo",
      url  : "http://localhost/graphql",
    },
    includes: ["frontend/src/resolvers/clientOnly.ts"],
  },
};
