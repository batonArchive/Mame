import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { Avatar, Box, Button, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"
import { createPost } from "../repositories/post"
import { getPublications } from "../repositories/get-publications"
import { createProfile } from "../repositories/create-profile"
import { timeline } from "../repositories/user-timeline"
import { search } from "../repositories/search-profiles-or-publications"
import { PlusButton } from "../components/plusButton"
import { Header } from "../components/header"
import { MemePane } from "../components/memePane"
import { MEME_ALIGNS, MEME_COLORS, MEME_FONTS, MEME_POSITIONS } from "../models/meme"


type Props = {}

const HomePage: NextPage<Props> = () => {
  // TODO: APIと接続
  const memes = Array.from({length: 20}).map((dummy, index) => ({
    image: `https://source.unsplash.com/random?sig=${index}`,
    text: "This is an awesome meme!\nDon't you think so?\nSay YES!!!",
    color: MEME_COLORS[Math.floor(Math.random() * MEME_COLORS.length)],
    font: MEME_FONTS[Math.floor(Math.random() * MEME_FONTS.length)],
    size: Math.floor(Math.random() * 60) + 40,
    align: MEME_ALIGNS[Math.floor(Math.random() * MEME_ALIGNS.length)],
    position: MEME_POSITIONS[Math.floor(Math.random() * MEME_POSITIONS.length)],
    badges: [],
  }))

  return (
    <AppContainer headerNode={<Header/>}>
      <SimpleGrid gap={2} templateColumns="repeat(2, 1fr)">
        {memes.map((meme, index) => (
          <MemePane key={index} meme={meme}/>
        ))}
      </SimpleGrid>
      <PlusButton/>
    </AppContainer>
  )
}

export default HomePage
