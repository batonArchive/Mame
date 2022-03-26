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


type Props = {}

const HomePage: NextPage<Props> = () => {
  const router = useRouter()
  useEffect(() => {
    (async () => {
      await login()
      const profile = await getProfile()
      const profileId = profile == null ? await createProfile(new Date().getTime().toString()) : profile.id
      console.log({profileId})
    })()
  }, [])

  return (
    <AppContainer>
    </AppContainer>
  )
}

export default HomePage
