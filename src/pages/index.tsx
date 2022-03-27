import React, { useEffect, useMemo } from "react"
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
import { explore } from "../repositories/explore-publications"
import { PlusButton } from "../components/plusButton"
import { Header } from "../components/header"
import { MemePane } from "../components/memePane"
import { Meme, MEME_ALIGNS, MEME_COLORS, MEME_FONTS, MEME_POSITIONS } from "../models/meme"
import { useToast } from "@chakra-ui/react"
import useSWR from "swr"


type Props = {}

const HomePage: NextPage<Props> = () => {
  const router = useRouter()
  const {data: timeline} = useSWR("/search", (url) => search("#mame"))

  console.log(timeline)

  const memes = useMemo(() => {
    return timeline?.search?.items?.map((item: any) => {
      const image = item.metadata.media[0].original.url
      const text = item.metadata.description
      const rest = JSON.parse(item.metadata.attributes[0]?.value ?? "{}")
      return {
        image,
        text,
        color: rest.color ?? "#FFFFFF",
        font: rest.font ?? "Anton",
        size: rest.size ?? 70,
        align: rest.align ?? "center",
        position: rest.position ?? "flex-end",
        badges: rest.badges ?? [],
        authorName: item.profile.name
      } as Meme & {authorName: string}
    }).reverse() as Meme[] ?? []
  }, [timeline])

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
