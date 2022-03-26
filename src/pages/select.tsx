import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { AspectRatio, Avatar, Box, Button, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react"
import { FaChevronLeft, FaCog } from "react-icons/fa"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"
import { Header } from "../components/header"


type Props = {}

const SelectImagePage: NextPage<Props> = () => {
  const router = useRouter()

  return (
    <AppContainer headerNode={<Header/>}>
      <SimpleGrid gap={2} templateColumns="repeat(3, 1fr)">
        {Array.from({length: 20}).map((dummy, index) => (
          <AspectRatio ratio={120 / 98} key={index}>
            <Box rounded="lg" backgroundImage={`url('https://source.unsplash.com/random?sig=${index}')`} backgroundSize="cover" onClick={() => router.push("/create")}>              
            </Box>
          </AspectRatio>
        ))}
      </SimpleGrid>
    </AppContainer>
  )
}

export default SelectImagePage
