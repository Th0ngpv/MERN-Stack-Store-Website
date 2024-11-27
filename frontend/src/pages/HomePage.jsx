import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { useProductStore } from "../store/product.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const {fetchProducts, products} =  useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        
        <Text 
          fontSize={{base:"22", sm:"28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          >
            Current Product
        </Text>

        <SimpleGrid
          column={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No products found 😢{" "}
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
              Create a product
            </Text>
          </Link>
        </Text>
        )}

      </VStack>
    </Container>
  )
}

export default HomePage