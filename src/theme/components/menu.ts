import { ComponentStyleConfig } from "@chakra-ui/react"
import { transparentize } from "@chakra-ui/theme-tools"


const menu: ComponentStyleConfig = {
  baseStyle: {
    list: {
      py: 1,
      color: "text.black",
      background: "background.white",
    },
    item: {
      _focus: {
        bg: "primary.50",
      },
      _active: {
        bg: "primary.50",
      },
      _expanded: {
        bg: "transparent",
      },
    }
  }
}

export default menu
