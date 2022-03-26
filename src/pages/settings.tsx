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
import { createProfile } from "../repositories/create-profile"
import { PlusButton } from "../components/plusButton"
import { Header } from "../components/header"


type Props = {}

const HomePage: NextPage<Props> = () => {
  return (
    <AppContainer headerNode={<Header/>}>
      Settings
    </AppContainer>
  )
}

export default HomePage
