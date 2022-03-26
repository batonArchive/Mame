import { Box, Button, Flex, FlexProps, IconButton } from "@chakra-ui/react"
import { MouseEventHandler, ReactNode } from "react"
import NextLink from "next/link"
import { FaHome, FaUser } from "react-icons/fa"


type Props = {
  onPostClick?: MouseEventHandler<HTMLButtonElement>
}

export const CreateHeader: React.FC<Props> = ({
  onPostClick
}) => {
  return (
    <Flex h={12} px={4} background="background.header" align="center" justify="space-between">
      <Box>
        <NextLink href="/" passHref={true}>
          <IconButton size="sm" icon={<FaHome/>} variant="ghost" color="text.gray" aria-label="profile"/>
        </NextLink>
      </Box>
      <Box>
        <Button size="sm" colorScheme="white" onClick={onPostClick}>Post</Button>
      </Box>
    </Flex>
  )
}
