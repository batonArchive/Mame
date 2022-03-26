import { Box, Button, Flex, FlexProps, IconButton } from "@chakra-ui/react"
import { ReactNode } from "react"
import NextLink from "next/link"
import { FaUser } from "react-icons/fa"


type Props = {
  headerNode?: ReactNode
}

export const AppContainer: React.FC<Props> = ({
  headerNode,
  children,
}) => {
  return (
    <Box minH="100vh" color="text.white" background="background.main">
      {headerNode}
      <Box px={4} pt={4} pb={6}>
        {children}
      </Box>
    </Box>
  )
}
