import React, { useEffect, useRef, useState } from "react"
import { NextPage } from "next"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { AppContainer } from "../components/appContainer"
import { AspectRatio, Avatar, Box, Button, Editable, EditablePreview, EditableTextarea, Flex, Icon, IconButton, SimpleGrid, Text, Textarea } from "@chakra-ui/react"
import { MdCheck, MdClose, MdColorLens, MdFormatAlignCenter, MdFormatAlignLeft, MdFormatAlignRight, MdKeyboard, MdVerticalAlignBottom, MdVerticalAlignCenter, MdVerticalAlignTop } from "react-icons/md"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { updateProfile } from "../repositories/update-profile"
import { getProfile } from "../repositories/get-profiles"
import { CreateHeader } from "../components/header"


type Props = {}

const MEME_ALIGN_ICONS = {"left": MdFormatAlignLeft, "center": MdFormatAlignCenter, "right": MdFormatAlignRight}
const MEME_POSITION_ICONS = {"flex-start": MdVerticalAlignTop, "center": MdVerticalAlignCenter, "flex-end": MdVerticalAlignBottom}

export const MEME_COLORS = ["#000000", "#EA414B", "#F19F37", "#FDFB53", "#68E144", "#73F7EC", "#367DF6", "#6639F6", "#EB54B1", "#FFFFFF"] as const
export const MEME_FONTS = ["Anton", "Inter", "Josefin Sans", "Merriweather", "Pacifico"] as const
export const MEME_ALIGNS = Object.keys(MEME_ALIGN_ICONS) as MemeAlign[]
export const POSITIONS = Object.keys(MEME_POSITION_ICONS) as MemePosition[]

export type MemeColor = (typeof MEME_COLORS)[number]
export type MemeFont = (typeof MEME_FONTS)[number]
export type MemeAlign = keyof typeof MEME_ALIGN_ICONS
export type MemePosition = keyof typeof MEME_POSITION_ICONS

type CreateMemeMode = "color" | "font" | "align" | "position"

const CreateMemePage: NextPage<Props> = () => {
  const inputRef = useRef<HTMLSpanElement>(null)
  const router = useRouter()

  const [mode, setMode] = useState<CreateMemeMode>("color")
  const [text, setText] = useState("Type your text")
  const [color, setColor] = useState<MemeColor>("#FFFFFF")
  const [font, setFont] = useState<MemeFont>("Anton")
  const [align, setAlign] = useState<MemeAlign>("center")
  const [position, setPosition] = useState<MemePosition>("flex-end")

  return (
    <AppContainer>
      <AspectRatio ratio={1}>
        <Box rounded="xl" backgroundImage="url('https://source.unsplash.com/random')" backgroundSize="cover">
          <Flex w="full" h="full" direction="column" align="stretch" justify={position}>
            <Editable
              p={4}
              fontSize="calc((100vw - 2rem) * 0.07)"
              fontWeight="bold"
              fontFamily={font}
              color={color}
              textAlign={align}
              textShadow={color === "#000000" ? "borderBlackText" : "borderText"}
              value={text} onChange={setText}
            >
              <EditablePreview w="full" h="full" lineHeight="shorter" whiteSpace="pre" ref={inputRef}/>
              <EditableTextarea lineHeight="shorter" textShadow="inherit" minW="full" minH="full" resize="none"/>
            </Editable>
          </Flex>
        </Box>
      </AspectRatio>
      <Flex mx={-4} mt={4} px={4} py={2} background="background.pale" justify="space-between">
        <Box>
          <IconButton icon={<MdClose/>} size="sm" variant="ghost" aria-label="back" onClick={() => router.push("/")}/>
        </Box>
        <Flex gap={2}>
          <IconButton
            icon={<MdKeyboard/>}
            size="sm" variant="ghost" aria-label="input"
            onClick={() => inputRef?.current?.focus()}
          />
          <IconButton 
            icon={<MdColorLens/>}
            size="sm" variant="ghost" aria-label="color"
            onClick={() => setMode("color")}
          />
          <IconButton 
            icon={<Text fontFamily={font} fontSize="sm">Aa</Text>}
            size="sm" variant="ghost" aria-label="font"
            onClick={() => setMode("font")}
          />
          <IconButton 
            icon={<MdFormatAlignCenter/>}
            size="sm" variant="ghost" aria-label="align"
            onClick={() => setMode("align")}
          />
          <IconButton 
            icon={<MdVerticalAlignCenter/>}
            size="sm" variant="ghost" aria-label="position"
            onClick={() => setMode("position")}
          />
        </Flex>
        <Box>
          <IconButton icon={<MdCheck/>} size="sm" variant="ghost" aria-label="confirm"/>
        </Box>
      </Flex>
      <Box mt={4}>
        {(mode === "color") ? (
          <Flex gap={1} justify="center">
            {MEME_COLORS.map((candColor) => (
              <Flex key={candColor} direction="column" align="center">
                <Box w={1} h={1} mb={1} background={candColor === color ? "background.white" : undefined} rounded="full"/>
                <Box
                  w={7} h={7}
                  background={candColor}
                  borderColor={candColor === color ? "background.white" : "background.pale"}
                  borderWidth={2}
                  rounded="full"
                  as="button"
                  onClick={() => setColor(candColor)}
                />
              </Flex>
            ))}
          </Flex>
        ) : (mode === "font") ? (
          <Flex gap={3} justify="center">
            {MEME_FONTS.map((candFont) => (
              <Flex key={candFont} direction="column" align="center">
                <Box w={1} h={1} mb={1} background={candFont === font ? "background.white" : undefined} rounded="full"/>
                <Box
                  w={9} h={9}
                  color={candFont === font ? "text.black" : "text.white"}
                  background={candFont === font ? "background.white" : "background.pale"}
                  fontFamily={candFont}
                  rounded="full"
                  as="button"
                  onClick={() => setFont(candFont)} 
                >
                  Aa
                </Box>
              </Flex>
            ))}
          </Flex>
        ) : (mode === "align") ? (
          <Flex gap={3} justify="center">
            {MEME_ALIGNS.map((candAlign) => (
              <Flex key={candAlign} direction="column" align="center">
                <Box w={1} h={1} mb={1} background={candAlign === align ? "background.white" : undefined} rounded="full"/>
                <Icon
                  w={7} h={7}
                  color={candAlign === align ? "text.white" : "text.gray"}
                  as={MEME_ALIGN_ICONS[candAlign]}
                  onClick={() => setAlign(candAlign)}
                />
              </Flex>
            ))}
          </Flex>
        ) : (mode === "position") ? (
          <Flex gap={3} justify="center">
            {POSITIONS.map((candPosition) => (
              <Flex key={candPosition} direction="column" align="center">
                <Box w={1} h={1} mb={1} background={candPosition === position ? "background.white" : undefined} rounded="full"/>
                <Icon
                  w={7} h={7}
                  color={candPosition === position ? "text.white" : "text.gray"}
                  as={MEME_POSITION_ICONS[candPosition]}
                  onClick={() => setPosition(candPosition)}
                />
              </Flex>
            ))}
          </Flex>
        ) : (
          <></>
        )}
      </Box>
    </AppContainer>
  )
}

export default CreateMemePage
