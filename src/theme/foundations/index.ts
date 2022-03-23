import { ChakraTheme } from "@chakra-ui/react"
import { colors } from "./colors"
import { shadows } from "./shadows"
import { typography } from "./typography"


export const foundations: Partial<ChakraTheme> = {
  colors,
  shadows,
  ...typography,
}
