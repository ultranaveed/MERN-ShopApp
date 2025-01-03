import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box , Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack} from '@chakra-ui/react'
import React from 'react'
import { useProductStore } from '../store/product';
import { useState } from 'react';

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct}= useProductStore()
    const toast = useToast()
    const { isOpen: isUpdateOpen , onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure()
    const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    

    const handleDeleteProduct = async (pid) => {
        const {success,message} = await deleteProduct(pid);
        onDeleteClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })  
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            }) 
        }
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message }= await updateProduct(pid, updatedProduct);
        onUpdateClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable:true,
            });
        }
        else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable:true,
            });
        }
    }

    return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform:"translateY(-5px)", shadow:"xl"}}
    bg={bg}
    >
        <Image src={product.img} alt={product.name} h={48} w='full' objectFit='cover' />

        <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
            {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
            ${product.price}
        </Text>

        <HStack spacing={2}>
        <IconButton icon={<EditIcon />} 
        onClick={onUpdateOpen}
        colorScheme='blue' aria-label={''}/>
        <IconButton icon={<DeleteIcon />} onClick={onDeleteOpen} colorScheme='red' aria-label={''}/>
        </HStack>
        
        </Box>
        <Modal isOpen={isUpdateOpen} onClose={onUpdateClose}>
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Product Name' name='name' value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
                        />
                        <Input placeholder='Price' name='price'type='number'value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
                        />
                        <Input placeholder='Image URL' name='image' value={updatedProduct.img}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, img: e.target.value})}
                        />

                    </VStack>
                </ModalBody>
                <ModalFooter>
                <Button colorScheme='blue' mr={3}
                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                >
                    Update
                </Button>
                <Button variant='ghost' onClick={onUpdateClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this product?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </Button>
            <Button variant='ghost' onClick={onDeleteClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </Box>
  )
}

export default ProductCard