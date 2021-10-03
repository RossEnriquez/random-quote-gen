import { Box , Button, Flex, Center } from "@chakra-ui/react";
import {FiRefreshCcw} from "react-icons/Fi"

const IndexPage = () => {

  async function getQuotes(){
    try{
      const response = await fetch("./api/quotes");
      if (response.ok == false)
        throw new Error("Sorry, could not get the quotes.");

      const responseData = await response.json();
      console.log(responseData);
    }
    catch{Error}{
      alert(Error);
    }
  }

  return (
    <>
    <Flex bg="red" p={10} justifyContent="flex-end">
      <Button rightIcon={<FiRefreshCcw/>} bg="transparent">random</Button>
    </Flex>
    <Center bg="beige" h="87.5vh" flexDirection="column">
      <Box>quote</Box>
      <Button onClick={() => getQuotes()}>author</Button>
    </Center>
    </>
  );
}

export default IndexPage
