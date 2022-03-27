import { AspectRatio, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { Meme } from "../../models/meme"


type Props = {
  meme: Meme
}

export const DetailedMemePane: React.FC<Props> = ({
  meme
}) => {

  return (
    <AspectRatio ratio={1}>
      <Box rounded="xl" backgroundImage={`url('${meme.image}')`} backgroundSize="cover">
        <Flex w="full" h="full" direction="column" align="stretch" justify={meme.position}>
          <Text
            p={4}
            fontSize={`calc((100vw - 2rem) * ${meme.size} / 1000)`}
            fontWeight="bold"
            fontFamily={meme.font}
            color={meme.color}
            textAlign={meme.align}
            textShadow={meme.color === "#000000" ? "borderBlackText" : "borderText"}
          >
            {meme.text}
          </Text>
        </Flex>
      </Box>
    </AspectRatio>
  )
}
