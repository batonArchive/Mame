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

  const images = [
    // "https://gateway.pinata.cloud/ipfs/QmRP3vYet19XAphJ5NmExeHqfryhUog497YdgWS8hLwAmG?filename=theme1.jpg",
    // "https://gateway.pinata.cloud/ipfs/QmRP3vYet19XAphJ5NmExeHqfryhUog497YdgWS8hLwAmG?filename=theme2.jpg",
    // "https://gateway.pinata.cloud/ipfs/QmRP3vYet19XAphJ5NmExeHqfryhUog497YdgWS8hLwAmG?filename=theme3.jpg",
    // "https://gateway.pinata.cloud/ipfs/QmRP3vYet19XAphJ5NmExeHqfryhUog497YdgWS8hLwAmG?filename=theme4.jpg",
    // "https://gateway.pinata.cloud/ipfs/QmRP3vYet19XAphJ5NmExeHqfryhUog497YdgWS8hLwAmG?filename=theme5.jpg",
    // "https://gateway.pinata.cloud/ipfs/QmRP3vYet19XAphJ5NmExeHqfryhUog497YdgWS8hLwAmG?filename=theme6.jpg",
    // "https://gateway.pinata.cloud/ipfs/QmRP3vYet19XAphJ5NmExeHqfryhUog497YdgWS8hLwAmG?filename=theme7.jpg",
    "https://source.unsplash.com/2qOTf5qx2_4",
    "https://source.unsplash.com/lh8ixHx94YQ",
    "https://source.unsplash.com/s2MjR3xoJkE",
    "https://source.unsplash.com/iCzxZ4dPz_0",
    "https://source.unsplash.com/7rE4GFo0E9A",
    "https://source.unsplash.com/1hdCX6QqGPo",
    "https://source.unsplash.com/FtL07GM9Q7Y",
    "https://source.unsplash.com/CVS4kWJaYLs",
    "https://source.unsplash.com/_la-c2zrDlg",
    "https://source.unsplash.com/02F5JVpW2Es",
  ]

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
              onClick={() => router.push({pathname: "/create", query: {image}})}
            />
          </AspectRatio>
        ))}
      </SimpleGrid>
    </AppContainer>
  )
}

export default SelectImagePage
