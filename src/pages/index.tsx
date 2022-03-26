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
import { PlusButton } from "../components/plusButton"
import { Header } from "../components/header"
import { MemePane } from "../components/memePane"


type Props = {}

// TODO: あとやること
// - 投稿画面
// - 一覧の詳細
// - プロフィール編集
const HomePage: NextPage<Props> = () => {
  const router = useRouter()
  useEffect(() => {
    hoge()
  }, [])

  return (
    <AppContainer headerNode={<Header/>}>
      <SimpleGrid gap={2} templateColumns="repeat(2, 1fr)">
        {Array.from({length: 20}).map((dummy, index) => (
          <MemePane key={index} imageUrl={`https://source.unsplash.com/random?sig=${index}`} text={"Hello!\nHello, hello, hello!\nVery much hello!\nHello!\nFifth"}/>
        ))}
      </SimpleGrid>
      <PlusButton/>
    </AppContainer>
  )
}

async function hoge() {
  const hoge = await createPost("")
  const hogehoge = await getPublications()
  console.log("hoge", hogehoge)
}

export default HomePage
