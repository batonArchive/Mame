import { ComponentStyleConfig } from "@chakra-ui/react"
import { transparentize } from "@chakra-ui/theme-tools"


const button: ComponentStyleConfig = {
  variants: {
    solid: (props) => {
      const {colorScheme} = props
      if (colorScheme === "white") {
        return {
          color: "text.black",
          background: `gray.50`,
          _hover: {
            background: `gray.100`,
            _disabled: {
              background: `gray.50`
            },
          },
          _active: {
            background: `gray.200`,
          },
        }
      } else {
        return {
          color: "text.black",
          background: `${props.colorScheme}.500`,
          _hover: {
            background: `${props.colorScheme}.400`,
            _disabled: {
              background: `${props.colorScheme}.500`
            },
          },
          _active: {
            background: `${props.colorScheme}.300`,
          },
        }
      }
    },
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
