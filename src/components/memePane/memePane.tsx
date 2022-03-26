import { AspectRatio, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"


type Props = {
  imageUrl: string,
  text: string
}

export const MemePane: React.FC<Props> = ({
  imageUrl,
  text
}) => {

  return (
    <AspectRatio ratio={1}>
      <Box rounded="lg" backgroundImage={`url('${imageUrl}')`} backgroundSize="cover" position="relative">
        <Text
          left={2} bottom={2}
          fontSize="sm" lineHeight="shorter"
          textShadow="borderText"
          whiteSpace="pre-wrap"
          noOfLines={4}
          position="absolute"
        >
          {text}
        </Text>
      </Box>
    </AspectRatio>
  )
}
