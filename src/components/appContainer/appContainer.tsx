import { Box, Flex, FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"


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
            {/* ボタン類を配置 */}
          </Box>
        </Flex>
      )}
      <Box px={4} pt={4} pb={6} minH="100vh" background="background.main">
        {children}
      </Box>
    </Box>
  )
}
