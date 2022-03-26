import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { Avatar, Box, Button, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react"
import { FaChevronLeft, FaCog } from "react-icons/fa"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"


type Props = {}

const SelectPage: NextPage<Props> = () => {

  return (
    <AppContainer>
      <SimpleGrid gap={2} templateColumns="repeat(3, 1fr)">

      </SimpleGrid>
    </AppContainer>
  )
}

export default SelectPage
