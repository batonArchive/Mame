import { ComponentStyleConfig } from "@chakra-ui/react"
import { transparentize } from "@chakra-ui/theme-tools"


const button: ComponentStyleConfig = {
  variants: {
    solid: (props) => ({
      color: "text.black",
      background: `${props.colorScheme}.500`,
      _hover: {
        background: `${props.colorScheme}.600`,
        _disabled: {
          background: `${props.colorScheme}.500`
        },
      },
      _active: {
        background: `${props.colorScheme}.700`,
      },
    }),
    ghost: (props) => ({
      color: "inherit",
      bg: "transparent",
      _hover: {
        bg: transparentize(`${props.colorScheme}.200`, 0.12)(props),
        _disabled: {
          background: "transparent",
        },
      },
      _active: {
        bg: transparentize(`${props.colorScheme}.200`, 0.25)(props),
      },
    }),
  },

  sizes: {
    sm: {
      fontSize: "md",
    },
  },
  defaultProps: {
    colorScheme: "gray"
  }
}

export default button
