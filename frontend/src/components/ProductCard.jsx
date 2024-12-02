import { Box, Image, Heading, Text, VStack, HStack, IconButton, Input, useColorModeValue, useToast, 
    Modal, ModalContent, ModalBody, ModalHeader, ModalOverlay, ModalCloseButton, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("white","gray.800");

    const [updatedProduct, setupdatedProduct] = useState(product);
    

    const {deleteProduct} = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if (!success) {
            toast({
              title:"Error",
              description: message,
              status: "error",
              isClosable: true
            })
          } else {
            toast({
              title:"Success",
              description: message,
              status: "success",
              isClosable: true
            })
        }
    }

    return (
        <Box 
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"}objectFit={"cover"}/>
            <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
                {product.name}
            </Heading>
            
            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<MdEdit />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<MdDeleteOutline />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>
			</HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
                                value={updatedProduct.name}

							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
                                value={updatedProduct.price}

							/>
							<Input
								placeholder='Image URL'
								name='image'
                                value={updatedProduct.image}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

        </Box>
    )
}
  
export default ProductCard;

