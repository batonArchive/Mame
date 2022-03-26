import React, { useEffect, useRef } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { AspectRatio, Avatar, Box, Button, Editable, EditablePreview, EditableTextarea, Flex, IconButton, SimpleGrid, Text, Textarea } from "@chakra-ui/react"
import { MdCheck, MdClose, MdFormatAlignCenter, MdKeyboard, MdVerticalAlignCenter } from "react-icons/md"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"
import { CreateHeader } from "../components/header"


type Props = {}

const CreateMemePage: NextPage<Props> = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  return (
    <AppContainer>
      <AspectRatio ratio={1}>
        <Box rounded="xl" backgroundImage="url('https://source.unsplash.com/random')" backgroundSize="cover">
          <Flex w="full" h="full" direction="column" align="stretch" justify="flex-end">
            <Editable
              p={4} h="30%"
              fontSize="calc((100vw - 2rem) * 0.08)"
              defaultValue="Type your text"
            >
              <EditablePreview/>
              <EditableTextarea h="full" ref={inputRef}/>
            </Editable>
          </Flex>
        </Box>
      </AspectRatio>
      <Flex mx={-4} mt={4} px={4} py={2} background="background.pale" justify="space-between">
        <Box>
          <IconButton icon={<MdClose/>} size="sm" variant="ghost" aria-label="back" onClick={() => router.push("/")}/>
        </Box>
        <Flex gap={2}>
          <IconButton icon={<MdKeyboard/>} size="sm" variant="ghost" aria-label="input" onClick={() => inputRef?.current?.focus()}/>
          <IconButton icon={<></>} size="sm" variant="ghost" aria-label="input"/>
          <IconButton icon={<MdFormatAlignCenter/>} size="sm" variant="ghost" aria-label="input"/>
          <IconButton icon={<MdVerticalAlignCenter/>} size="sm" variant="ghost" aria-label="input"/>
        </Flex>
        <Box>
          <IconButton icon={<MdCheck/>} size="sm" variant="ghost" aria-label="confirm"/>
        </Box>
      </Flex>
    </AppContainer>
  )
}

export default CreateMemePage
