import { extendTheme } from "@chakra-ui/react"
import { components } from "./components"
import { foundations } from "./foundations"


const theme = extendTheme({
  ...foundations,
  components,
})

export default theme
