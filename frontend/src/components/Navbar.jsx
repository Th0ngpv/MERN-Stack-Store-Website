import { Container, Flex, Text, HStack, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom";

import { GoMoon } from "react-icons/go";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex 
        h={16} 
        alignItems={"center"} 
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
        >
          <Text 
          fontSize={{base:"22", sm:"28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          >
            <Link to={"/"}>Product Store</Link>
          </Text>

          <HStack spacing={2} alignItems={"center"} >
            <Link to={"/create"} >
              <Button title="create new product page" bg={useColorModeValue("white","gray.700")}>
                {colorMode === "light" ? <FaRegSquarePlus fontSize={20} color="blue" /> : <FaRegSquarePlus fontSize={20} color="cyan" />}
              </Button>
            </Link>
            <Button title="theme toggle" onClick={toggleColorMode} bg={useColorModeValue("white","gray.700")}>
              {colorMode === "light" ? <GoMoon fontSize={20} color="blue" /> : <FaRegLightbulb fontSize={20} color="cyan" />}
            </Button>
          </HStack>

      </Flex>
    </Container>
  )
}

export default Navbar