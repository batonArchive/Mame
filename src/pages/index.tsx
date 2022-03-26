import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { AppContainer } from "../components/appContainer"
import { Avatar, Box, Button, Flex, IconButton, Text } from "@chakra-ui/react"
import { FaChevronLeft, FaCog } from "react-icons/fa"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { profiles } from "../repositories/get-profiles"


type Props = {}

const HomePage: NextPage<Props> = () => {
  const router = useRouter()
  useEffect(() => {
  }, [])

  return (
    <AppContainer>
    </AppContainer>
  )
}

export default HomePage
