import React, { useCallback, useEffect, useState } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { Avatar, Box, Button, Flex, IconButton, Input, SimpleGrid, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"
import { createProfile } from "../repositories/create-profile"
import { PlusButton } from "../components/plusButton"
import { Header } from "../components/header"
import { MdArrowBack } from "react-icons/md"
import useSWR from "swr"


type Props = {}

const HomePage: NextPage<Props> = () => {
  const router = useRouter()
  const {data: profile} = useSWR("/profile", (url) => getProfile())

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  const handleUpdate = useCallback(async () => {
    await updateProfile(name, bio)
    alert("Successfully updated")
    router.push("/profile")
  }, [name, bio, router])

  useEffect(() => {
    setName(profile?.name ?? "")
    setBio(profile?.bio ?? "")
  }, [profile])

  return (
    <AppContainer headerNode={<Header/>}>
      <Flex align="center" justify="space-between">
        <NextLink href="/profile" passHref={true}>
          <IconButton icon={<MdArrowBack/>} size="sm" variant="ghost" aria-label="back"/>
        </NextLink>
        <Box fontSize="lg" fontWeight="bold">
          Settings
        </Box>
        <Box visibility="hidden">
          <IconButton isDisabled={true} size="sm" variant="ghost" aria-label="settings"/>
        </Box>
      </Flex>
      <SimpleGrid mt={4} columnGap={4} rowGap={2} alignItems="baseline" templateColumns="max-content 1fr">
        <Box fontSize="sm" color="text.gray">Name</Box>
        <Box><Input textAlign="right" variant="flushed" value={name} onChange={(event) => setName(event.target.value)}/></Box>
        <Box fontSize="sm" color="text.gray">Bio</Box>
        <Box><Input textAlign="right" variant="flushed" value={bio} onChange={(event) => setBio(event.target.value)}/></Box>
      </SimpleGrid>
      <Box mt={6}>
        <Button w="full" colorScheme="primary" onClick={handleUpdate}>Update profile</Button>
      </Box>
    </AppContainer>
  )
}

export default HomePage
