import React, { useEffect } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { AspectRatio, Avatar, Box, Button, Editable, EditablePreview, EditableTextarea, Flex, IconButton, SimpleGrid, Text, Textarea } from "@chakra-ui/react"
import { FaChevronLeft, FaCog } from "react-icons/fa"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"
import { CreateHeader } from "../components/header"


type Props = {}

const CreateMemePage: NextPage<Props> = () => {
  return (
    <AppContainer headerNode={<CreateHeader/>}>
      <AspectRatio ratio={1}>
        <Flex direction="column" rounded="xl" background="background.black">
          <Box w="full" flexBasis={0} flexGrow={98} backgroundImage="url('https://source.unsplash.com/random')" backgroundSize="cover"/>
          <Box w="full" flexBasis={0} flexGrow={22}>
            <Textarea w="full" h="full" variant="unstyled"/>
          </Box>
        </Flex>
      </AspectRatio>
    </AppContainer>
  )
}

export default CreateMemePage
