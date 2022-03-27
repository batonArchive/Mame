import { RecursiveObject } from "@chakra-ui/theme"


export const shadows: RecursiveObject<string> = {
  outline: "0 0 0 3px #03C5B999",  // primary.main
  borderText: "1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black, 1px 0px 0px black, -1px 0px 0px black, 0px 1px 0px black, 0px -1px 0px black",
  borderBlackText: "1px 1px 0px white, 1px -1px 0px white, -1px 1px 0px white, -1px -1px 0px white, 1px 0px 0px white, -1px 0px 0px white, 0px 1px 0px white, 0px -1px 0px white"
}