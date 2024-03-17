import Details from './Details';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Details />
      </div>
    </ChakraProvider>

  );
}

export default App;