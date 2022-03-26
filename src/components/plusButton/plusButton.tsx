import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { FaPlus, FaSearch } from "react-icons/fa"


type Props = {
}

export const PlusButton: React.FC<Props> = ({
}) => {  
  const router = useRouter()

  const handleAddImage = useCallback(() => {
    // TODO: 端末内の画像選択
  }, [])
  
  const handleSelectImage = useCallback(() => {
    router.push("/select")
  }, [])

  return (
    <Box position="fixed" right={4} bottom={4}>
      <Menu>
        <MenuButton as={IconButton} icon={<FaPlus/>} size="lg" rounded="full" boxShadow="md" colorScheme="primary" aria-label="create"/>
        <MenuList>
          <MenuItem icon={<FaPlus/>} onClick={handleAddImage}>Add an image</MenuItem>
          <MenuItem icon={<FaSearch/>} onClick={handleSelectImage}>Select an image</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}
