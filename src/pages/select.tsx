import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { AspectRatio, Avatar, Box, Button, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"
import { Header } from "../components/header"


type Props = {}

const SelectImagePage: NextPage<Props> = () => {
  const router = useRouter()

  // TODO: APIと接続
  const images = Array.from({length: 20}).map((dummy, index) => `https://source.unsplash.com/random?sig=${index}`)

  return (
    <AppContainer headerNode={<Header/>}>
      <Box mb={4} fontSize="xl" fontWeight="bold" textAlign="center">
        Select your image
      </Box>
      <SimpleGrid gap={2} templateColumns="repeat(3, 1fr)">
        {images.map((image, index) => (
          <AspectRatio ratio={120 / 98} key={index}>
            <Box
              rounded="lg"
              backgroundImage={`url('${image}')`} backgroundSize="cover"
              onClick={() => router.push("/create")}
            />
          </AspectRatio>
        ))}
      </SimpleGrid>
    </AppContainer>
  )
}

export default SelectImagePage
