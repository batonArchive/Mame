import { Box, Button, Flex, FlexProps, IconButton } from "@chakra-ui/react"
import { ReactNode } from "react"
import NextLink from "next/link"
import { FaUser } from "react-icons/fa"


type Props = {
  showHeader?: boolean
}

export const AppContainer: React.FC<Props> = ({
  showHeader = true,
  children,
}) => {
  return (
    <Box color="text.white">
      {showHeader && (
        <Flex h={12} px={4} background="background.header" align="center" justify="space-between">
          <Box fontFamily="title" fontSize="2xl" fontWeight="900">mame</Box>
          <Box>
            <NextLink href="/profile" passHref={true}>
              <IconButton size="sm" icon={<FaUser/>} aria-label="profile"/>
            </NextLink>
          </Box>
        </Flex>
      )}
      <Box px={4} pt={4} pb={6} minH="100vh" background="background.main">
        {children}
      </Box>
    </Box>
  )
}
