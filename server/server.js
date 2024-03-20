const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const pokedexData = require('./pokedex.json');

const app = express();

// Define your GraphQL schema
const typeDefs = gql`
  type Pokedex {
    id: String
    name: Name
    type: [String]
    base: BaseStats
  }

  type Name {
    english: String
    japanese: String
    chinese: String
    french: String
  }

  type BaseStats {
    HP: Int
    Attack: Int
    Defense: Int
    SpAttack: Int
    SpDefense: Int
    Speed: Int
  }

  type Query {
    types: [String]
    getAllPokemon: [Pokedex]
    getPokemonByName(name: String!): Pokedex
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    types: () => {
      const typesSet = new Set();
      pokedexData.forEach(pokemon => {
        pokemon.type.forEach(type => typesSet.add(type));
      });
      return Array.from(typesSet);
    },
    getAllPokemon: () => {
      return pokedexData;
    },
    getPokemonByName: (_, { name }) => {
      return pokedexData.find(pokemon => pokemon.name.english.toLowerCase() === name.toLowerCase());
    },
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
