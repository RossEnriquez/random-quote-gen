import { Box , Button, Flex, Center, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {FiRefreshCcw} from "react-icons/Fi"
import {HiArrowNarrowRight} from "react-icons/Hi"

const IndexPage = () => {
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [currentGenre, setCurrentGenre] = useState("");
  const [showAuthorQuotes, setShowAuthorQuotes] = useState("none");
  const [showQuote, setShowQuote] = useState("flex");
  const [currentAuthorQuotes, setcurrentAuthorQuotes] = useState([]);

  const quoteProps={
    // bg: "green",
    borderLeft: "5px solid #f7df94",
    pl: "100px",
    w: "40vw",
    fontSize: "28px",
    m: "5% 0"
  }

  async function getCurrentAuthorQuotes(){
    try{
      const response = await fetch(
        `https://quote-garden.herokuapp.com/api/v3/quotes?author=${currentAuthor}`);
      if (response.ok == false)
        throw new Error("Could not get the author's quotes.");

      const responseData = await response.json();
      // console.log(responseData);
      setcurrentAuthorQuotes([...responseData.data]);
    }
    catch(Error){
      alert(Error);
    }
  }

  async function getRandomQuote(){
    try{
      const response = await fetch(
        "https://quote-garden.herokuapp.com/api/v3/quotes/random");
      if (response.ok == false)
        throw new Error("Could not get the author's quotes.");

      const responseData = await response.json();
      setCurrentAuthor(responseData.data[0].quoteAuthor);
      setCurrentGenre(responseData.data[0].quoteGenre);
      setCurrentQuote(responseData.data[0].quoteText);
    }
    catch(Error){
      alert(Error);
    }
  }

  return (
    <>
    <Flex p={10} mb="5%" justifyContent="flex-end">
      <Button rightIcon={<FiRefreshCcw/>} bg="transparent" onClick={()=>{
        getRandomQuote();
        setShowAuthorQuotes("none");
        setShowQuote("flex");
      }}>
        random
      </Button>
    </Flex>
    <Center flexDirection="column">
      <Box {...quoteProps} display={showQuote}>
        {`"${currentQuote}"`}
      </Box>
      <Button 
        display={showQuote} 
        p={7} 
        bg="transparent"
        // bg="blue" 
        w="35vw"
        h="20vh"
        justifyContent="space-between"
        onClick={() => {
        getCurrentAuthorQuotes();
        setShowAuthorQuotes("block");
        setShowQuote("none");
      }}>
        <Box display="block" textAlign="left" w="25vw">
          <Heading>{currentAuthor}</Heading>
          <Text>{currentGenre}</Text>
        </Box>
        <HiArrowNarrowRight/>
      </Button>
      <Heading display={showAuthorQuotes}>{currentAuthor}</Heading>
      {currentAuthorQuotes.map((quote, i)=>{
        return (
          <Box
            {...quoteProps}
            display={showAuthorQuotes}
            key={i}
          >
            {`"${quote.quoteText}"`}
          </Box>
        );
      })}
    </Center>
    </>
  );
}

export default IndexPage
