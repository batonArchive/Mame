import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { getTimeline } from "../repositories/get-timeline"
import { AppContainer } from "../components/appContainer"
import { AspectRatio, Avatar, Box, Button, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react"
import { FaChevronLeft, FaCog } from "react-icons/fa"
import NextLink from "next/link"
import { PlusButton } from "../components/plusButton"
import { updateProfile } from "../repositories/update-profile"


type Props = {}

const ProfilePage: NextPage<Props> = () => {
  useEffect(() => {

    console.log("try to login");

    (
   async () => {
    

    await updateProfile();

    const id = localStorage.getItem('profile_id');

    console.log(id);
    await getTimeline(id!);
   })();
    
  }, [])

  return (
    <AppContainer>
      <Flex mb={-2} justify="space-between">
        <NextLink href="/" passHref={true}>
          <IconButton icon={<FaChevronLeft/>} size="sm" variant="ghost" aria-label="back"/>
        </NextLink>
        <NextLink href="/settings" passHref={true}>
          <IconButton icon={<FaCog/>} size="sm" variant="ghost" aria-label="settings"/>
        </NextLink>
      </Flex>
      <Flex gap={6} align="center" justify="center">
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">341</Text>
          <Text mt={-1} fontSize="xs" color="text.gray">Following</Text>
        </Box>
        <Box>
          <Avatar size="xl" borderColor="primary.main" borderWidth={4}/>
        </Box>
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">900</Text>
          <Text mt={-1} fontSize="xs" color="text.gray">Followers</Text>
        </Box>
      </Flex>
      <Box mt={3} fontSize="xl" fontWeight="bold" textAlign="center">
        Michael Jackson
      </Box>
      <SimpleGrid mt={4} gap={2} templateColumns="repeat(2, 1fr)">
        {Array.from({length: 20}).map((dummy, index) => (
          <AspectRatio ratio={1} key={index}>
            <Box rounded="lg" backgroundImage={`url('https://source.unsplash.com/random?sig=${index}')`} backgroundSize="cover">              
            </Box>
          </AspectRatio>
        ))}
      </SimpleGrid>
      <PlusButton/>
    </AppContainer>
  )
}

export default ProfilePage
