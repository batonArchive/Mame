import { Box, IconButton, Text } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"


type Props = {
}

export const PlusButton: React.FC<Props> = ({
}) => {  
  return (
    <Box position="fixed" right={4} bottom={4}>
      <IconButton icon={<FaPlus/>} size="lg" rounded="full" boxShadow="md" colorScheme="primary" aria-label="create"/>
    </Box>
  )
}
