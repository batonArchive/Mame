import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { Avatar, Box, Button, Flex, IconButton, Text } from "@chakra-ui/react"
import { FaChevronLeft, FaCog } from "react-icons/fa"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"
import { createPost } from "../repositories/post"
import { getPublications } from "../repositories/get-publications"



type Props = {}

const HomePage: NextPage<Props> = () => {
  const router = useRouter()
  useEffect(() => {
    hoge()
  }, [])

  return (
    <AppContainer>
    </AppContainer>
  )
}

async function hoge() {
  const hoge = await createPost("")
  const hogehoge = await getPublications()
  console.log("hoge", hogehoge)
}

export default HomePage
