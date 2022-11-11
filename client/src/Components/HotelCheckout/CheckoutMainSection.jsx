import { Box, Flex, Icon, Text, FormControl, FormLabel, Input, Checkbox, Divider, Image, UnorderedList, ListItem, Button, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { AiFillCreditCard, AiFillLock } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import { useSelector } from "react-redux"

export const CheckoutMainSection = () => {
    const { rooms } = useSelector(store => store.singleHotel);
    const [user, setUser] = useState({ firstName: "", lastName: "", number: "" });
    const [card, setCard] = useState({ name: "", number: "", secret: "", zip: "" });
    const toast = useToast();
    const handleUser = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const handleCard = (e) => {
        const { name, value } = e.target;
        setCard({ ...card, [name]: value })
    }
    const handleSubmit = () => {
        const { firstName, lastName, number } = user;
        const { name, number: cardNumber, secret, zip } = card;
        if (firstName === '' || lastName === '' || number === '' || name === '' || cardNumber === '' || secret === '' || zip === '') {
            toast({
                title: 'Please enter the required fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        if(cardNumber.length!==16){
            toast({
                title: 'Enter valid card number.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return;
        }
        if(secret.length!==4){
            toast({
                title: 'Enter valid 4-digit Security code.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return;
        }
        if(zip.length!==6){
            toast({
                title: 'Enter valid ZIP code.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return;
        }
    }
    return (
        <Box flexGrow={1}>
            <Flex bg='white' p='20px' w='100%' gap='15px'>
                <Icon as={AiFillLock} fontSize='25px' />
                <Box>
                    <Text fontSize='14px' fontWeight={600}>
                        Signed In as
                    </Text>
                </Box>
            </Flex>
            <Flex bg='white' p='20px' w='100%' gap='15px' mt='30px'>
                <Icon as={BsFillPersonFill} fontSize='25px' />
                <Box>
                    <Text fontSize='15px' >
                        <b>Travelers:</b> {rooms.reduce((a, c) => a + c.adults, 0)} adults,
                        {rooms.reduce((a, c) => a + c.children, 0)} children
                    </Text>
                    <Text fontSize='14px' color='teal'>
                        Non-Smoking</Text>
                    <Text fontSize='14px' color='teal'>
                        Free Wifi
                    </Text>

                    <FormControl isRequired mt='15px'>
                        <FormLabel fontSize='14px' fontWeight={600} color='GrayText'>First Name</FormLabel>
                        <Input borderColor={'blackAlpha.700'} placeholder='First Name'
                            name='firstName' value={user.firstName} onChange={handleUser} />
                    </FormControl>
                    <FormControl isRequired mt='15px'>
                        <FormLabel fontSize='14px' fontWeight={600} color='GrayText'>Last Name</FormLabel>
                        <Input borderColor={'blackAlpha.700'} placeholder='Last Name'
                            name='lastName' value={user.lastName} onChange={handleUser} />
                    </FormControl>
                    <FormControl isRequired mt='15px'>
                        <FormLabel fontSize='14px' fontWeight={600} color='GrayText'>Mobile Phone Number</FormLabel>
                        <Input borderColor={'blackAlpha.700'} placeholder='Your Number'
                            name='number' value={user.number} onChange={handleUser} />
                    </FormControl>
                    <Checkbox mt='10px' color='blue' fontSize='13px'>
                        Receive text alerts about this trip. Message and data rates may apply.
                    </Checkbox>
                </Box>
            </Flex>
            <Flex bg='white' p='20px' w='100%' gap='15px' mt='30px'>
                <Icon as={AiFillCreditCard} fontSize='25px' />
                <Box>
                    <Flex gap='20px' wrap='wrap'>
                        <Flex color='teal' alignItems={'center'}>
                            <Icon as={TiTick} fontSize='20px' />
                            <Text fontSize='13px'>
                                We use secure transmission
                            </Text>
                        </Flex>
                        <Flex color='teal' alignItems={'center'}>
                            <Icon as={TiTick} fontSize='20px' />
                            <Text fontSize='13px'>
                                We protect your personal information
                            </Text>
                        </Flex>
                    </Flex>
                    <Text fontSize='14px' color='black' mt='15px'>
                        Debit/Credit Card
                    </Text>
                    <Divider borderColor='blackAlpha.700' />
                    <Image src='https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Fotter_payment_icn_2_900x_aff68517-98f4-4a82-9aee-2405cea66251_350x.png?v=1650262054' />
                    <FormControl isRequired mt='15px'>
                        <FormLabel fontSize='14px' fontWeight={600} color='GrayText'>
                            Name on Card
                        </FormLabel>
                        <Input borderColor={'blackAlpha.700'} placeholder='Name'
                            name='name' value={card.name} onChange={handleCard} />
                    </FormControl>
                    <FormControl isRequired mt='15px'>
                        <FormLabel fontSize='14px' fontWeight={600} color='GrayText'>
                            Debit/Credit Card Number
                        </FormLabel>
                        <Input borderColor={'blackAlpha.700'} placeholder='Card Number' type='number' name='number' value={card.number} onChange={handleCard} />
                    </FormControl>
                    <FormControl isRequired mt='15px'>
                        <FormLabel fontSize='14px' fontWeight={600} color='GrayText'>
                            Security Code
                        </FormLabel>
                        <Input borderColor={'blackAlpha.700'} placeholder='Code' type='number' name='secret' value={card.secret} onChange={handleCard}
                        />
                    </FormControl>
                    <FormControl isRequired mt='15px'>
                        <FormLabel fontSize='14px' fontWeight={600} color='GrayText'>
                            Billing ZIP Code
                        </FormLabel>
                        <Input borderColor={'blackAlpha.700'} placeholder='ZIP' type='number' name='zip' value={card.zip} onChange={handleCard}
                        />
                    </FormControl>
                    <Checkbox mt='10px' color='GrayText' fontSize='13px'>
                        Remember this card for future use
                    </Checkbox>
                </Box>
            </Flex>
            <Box bg='white' p='20px' w='100%' mt='30px'>
                <Text fontWeight={600} fontSize='15px'>
                    Important information about your booking
                </Text>
                <UnorderedList fontSize='13px' color='GrayText' mt='10px'>
                    <ListItem>
                        This rate is non-refundable. If you change or cancel your booking you will not get a refund or credit to use for a future stay. This policy will apply regardless of COVID-19, subject to any local consumer laws.
                    </ListItem>
                    <ListItem>
                        No refunds will be issued for late check-in or early check-out.
                    </ListItem>
                    <listItem>
                        Stay extensions require a new reservation.
                    </listItem>
                    <ListItem>
                        Front desk staff will greet guests on arrival.
                    </ListItem>
                </UnorderedList>
                <Text fontSize='13px' color='GrayText' mt='20px'>
                    By clicking on the button below, I acknowledge that I have reviewed the Privacy Statement Opens in a new window. and Government Travel Advice Opens in a new window. and have reviewed and accept the Rules & Restrictions Opens in a new window. and Terms of Use Opens in a new window..
                </Text>
                <Button colorScheme={'teal'} mt='20px' p='14px 20px' onClick={handleSubmit}>
                    Complete Booking
                </Button>
                <Text fontSize='13px' color='GrayText' mt='20px'>
                    We use secure transmission and encrypted storage to protect your personal information.
                </Text>
                <Text fontSize='13px' color='GrayText' mt='4px'>
                    This payment will be processed in the U.S. This does not apply when the travel provider (airline/hotel/rail, etc.) processes your payment.
                </Text>
            </Box>
        </Box>
    )
}