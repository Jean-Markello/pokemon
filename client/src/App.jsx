import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPokemon from './Components/ListPokemon';
import Pokemon from './Components/Pokemons';
import { Box, Heading } from '@chakra-ui/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Box maxW={1000} maxH="100%" mx="auto" px={10} pt={10} fontSize="sm" style={{ minHeight: '100vh' }}>
          <Heading mb={10}>Pokemon List</Heading>
          <Routes>
            <Route exact path="/" element={<ListPokemon />} />
            <Route path="/pokemon/:pokemonName" element={<Pokemon />} />
          </Routes>
        </Box>
      </Router>
    </ApolloProvider>
  );
}

export default App;
