import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ChangeEvent, useCallback, useRef } from "react"
import { FaPlus, FaSearch } from "react-icons/fa"


type Props = {
}

export const PlusButton: React.FC<Props> = ({
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleAddImage = useCallback(() => {
    inputRef.current?.click()
  }, [])
  
  const handleSelectImage = useCallback(() => {
    router.push("/select")
  }, [router])

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // TODO: 画像のアップロードをする
    router.push("/create")
  }, [router])

  return (
    <Box position="fixed" right={4} bottom={4}>
      <Menu>
        <MenuButton as={IconButton} icon={<FaPlus/>} size="lg" rounded="full" boxShadow="md" colorScheme="primary" aria-label="create"/>
        <MenuList>
          <MenuItem icon={<FaPlus/>} onClick={handleAddImage}>Add an image</MenuItem>
          <MenuItem icon={<FaSearch/>} onClick={handleSelectImage}>Select an image</MenuItem>
        </MenuList>
      </Menu>
      <input type="file" accept="image/*" ref={inputRef} style={{display: "none"}} onChange={handleFileChange}/>
    </Box>
  )
}
