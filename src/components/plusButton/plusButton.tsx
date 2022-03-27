import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ChangeEvent, useCallback, useRef } from "react"
import { MdAdd, MdSearch } from "react-icons/md"


type Props = {
}

export const PlusButton: React.FC<Props> = ({
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  
  const handleSelectImage = useCallback(() => {
    router.push("/select")
  }, [router])

  // 画像のアップロード機能がなくなったのでこれはもう使わない
  const handleAddImage = useCallback(() => {
    inputRef.current?.click()
  }, [])
  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    router.push("/create")
  }, [router])

  return (
    <Box position="fixed" right={4} bottom={4}>
      {/* <Menu placement="left-end">
        <MenuButton as={IconButton} icon={<MdAdd/>} size="lg" rounded="full" boxShadow="md" colorScheme="primary" aria-label="create"/>
        <MenuList>
          <MenuItem icon={<Box color="primary.main"><MdAdd/></Box>} onClick={handleAddImage}>
            Add an image
          </MenuItem>
          <MenuItem icon={<Box color="primary.main"><MdSearch/></Box>} onClick={handleSelectImage}>
            Select an image
          </MenuItem>
        </MenuList>
      </Menu>
      <input type="file" accept="image/*" ref={inputRef} style={{display: "none"}} onChange={handleFileChange}/> */}
      <IconButton icon={<MdAdd/>} size="lg" rounded="full" boxShadow="md" colorScheme="primary" aria-label="create" onClick={handleSelectImage}/>
    </Box>
  )
}
