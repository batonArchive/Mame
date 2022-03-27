import React, { useEffect, useMemo } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { AppContainer } from "../components/appContainer"
import { AspectRatio, Avatar, Box, Button, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react"
import { MdArrowBack, MdSettings } from "react-icons/md"
import NextLink from "next/link"
import { PlusButton } from "../components/plusButton"
import { updateProfile } from "../repositories/update-profile"
import { Header } from "../components/header"
import { MemePane } from "../components/memePane"
import useSWR from "swr"
import { getProfile } from "../repositories/get-profiles"
import { timeline as getTimeline } from "../repositories/user-timeline"
import { Meme } from "../models/meme"


type Props = {}

const ProfilePage: NextPage<Props> = () => {
  const {data: profile} = useSWR("/profile", (url) => getProfile())
  const {data: timeline} = useSWR("/timeline", (url) => getTimeline())

  const memes = useMemo(() => {
    return timeline?.items?.map((item) => {
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
        badges: rest.badges ?? []
      } as Meme
    }) ?? []
  }, [timeline])

  return (
    <AppContainer headerNode={<Header/>}>
      <Flex mb={-2} justify="space-between">
        <NextLink href="/" passHref={true}>
          <IconButton icon={<MdArrowBack/>} size="sm" variant="ghost" aria-label="back"/>
        </NextLink>
        <NextLink href="/settings" passHref={true}>
          <IconButton icon={<MdSettings/>} size="sm" variant="ghost" aria-label="settings"/>
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
         {profile?.name ?? ""}
      </Box>
      <SimpleGrid mt={4} gap={2} templateColumns="repeat(2, 1fr)">
        {memes.map((meme, index) => (
          <MemePane key={index} meme={meme}/>
        ))}
      </SimpleGrid>
      <PlusButton/>
    </AppContainer>
  )
}

export default ProfilePage
