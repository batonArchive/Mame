import { AspectRatio, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ChangeEvent, useCallback, useRef } from "react"
import { FaPlus, FaSearch } from "react-icons/fa"


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
          textShadow="1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black, 1px 0px 0px black, -1px 0px 0px black, 0px 1px 0px black, 0px -1px 0px black"
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
