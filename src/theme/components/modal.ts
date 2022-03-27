import { ComponentStyleConfig } from "@chakra-ui/react"


const modal: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      mx: 4,
      color: "text.white",
      background: "background.main",
      rounded: "2xl",
    },
    header: {
      px: 4,
      pt: 4, pb: 4,
      justifyContent: "center",
      textAlign: "center",
    },
    footer: {
      px: 4,
      pt: 4, pb: 4,
      justifyContent: "center",
    },
    body: {
      px: 4, py: 0,
    }
  },

  sizes: {
    fullWidth: {
      maxW: "100vw"
    }
  }
}

export default modal
