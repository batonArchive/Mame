import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { NextPage } from "next"
import { AppContainer } from "../components/appContainer"
import {
  AspectRatio,
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from "@chakra-ui/react"
import {
  MdCheck,
  MdClose,
  MdColorLens,
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatSize,
  MdKeyboard,
  MdVerticalAlignBottom,
  MdVerticalAlignCenter,
  MdVerticalAlignTop
} from "react-icons/md"
import { useRouter } from "next/router"
import {
  Meme,
  MemeAlign,
  MemeColor,
  MemeFont,
  MemePosition,
  MemeSize,
  MEME_ALIGNS,
  MEME_BADGES,
  MEME_COLORS,
  MEME_FONTS,
  MEME_POSITIONS
} from "../models/meme"
import { DetailedMemePane } from "../components/memePane/detailedMemePane"


type Props = {}

const MEME_ALIGN_ICONS = {"left": MdFormatAlignLeft, "center": MdFormatAlignCenter, "right": MdFormatAlignRight}
const MEME_POSITION_ICONS = {"flex-start": MdVerticalAlignTop, "center": MdVerticalAlignCenter, "flex-end": MdVerticalAlignBottom}
type CreateMemeMode = "color" | "font" | "align" | "position"

const CreateMemePage: NextPage<Props> = () => {
  const inputRef = useRef<HTMLSpanElement>(null)
  const router = useRouter()

  const image = useMemo(() => {
    return typeof router.query.image === "string" ? router.query.image : ""
  }, [router])

  const [mode, setMode] = useState<CreateMemeMode>("color")
  const [text, setText] = useState("Type your text")
  const [color, setColor] = useState<MemeColor>("#FFFFFF")
  const [font, setFont] = useState<MemeFont>("Anton")
  const [size, setSize] = useState<MemeSize>(70)
  const [align, setAlign] = useState<MemeAlign>("center")
  const [position, setPosition] = useState<MemePosition>("flex-end")
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createdMeme, setCreatedMeme] = useState<Meme | null>(null)

  const handleSubmit = useCallback(async () => {
    const badges = [...MEME_BADGES]
    const random = Math.random()
    if (random <= 1) {
      badges.splice(Math.floor(Math.random() * badges.length), 1)
      badges.splice(Math.floor(Math.random() * badges.length), 1)
    }
    if (random <= 0.99) {
      badges.splice(Math.floor(Math.random() * badges.length), 1)
    }
    if (random <= 0.95) {
      badges.splice(Math.floor(Math.random() * badges.length), 1)
    }
    if (random <= 0.85) {
      badges.splice(Math.floor(Math.random() * badges.length), 1)
    }
    if (random < 0.6) {
      badges.splice(Math.floor(Math.random() * badges.length), 1)
    }

    const meme = {image, text, color, font, size, align, position, badges} as Meme
    if (confirm("Are you sure to submit this meme?")) {
      // TODO: ポスト処理
      console.log(meme)
      setCreatedMeme(meme)
      setIsModalOpen(true)
    }
  }, [image, text, color, font, size, align, position])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
    router.push("/")
  }, [router])

  return (
    <AppContainer>
      <AspectRatio ratio={1}>
        <Box rounded="xl" backgroundImage="url('https://source.unsplash.com/random')" backgroundSize="cover">
          <Flex w="full" h="full" direction="column" align="stretch" justify={position}>
            <Editable
              p={4}
              fontSize={`calc((100vw - 2rem) * ${size} / 1000)`}
              fontWeight="bold"
              fontFamily={font}
              color={color}
              textAlign={align}
              textShadow={color === "#000000" ? "borderBlackText" : "borderText"}
              lineHeight="shorter" whiteSpace="pre-wrap"
              value={text} onChange={setText}
            >
              <EditablePreview w="full" h="full" ref={inputRef}/>
              <EditableTextarea lineHeight="inherit" textShadow="inherit" minW="full" minH="full" resize="none"/>
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
          <IconButton icon={<MdCheck/>} size="sm" variant="ghost" aria-label="confirm" onClick={handleSubmit}/>
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
          <Box>
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
            <Flex mt={4} mx={6}>
              <Icon mr={4} as={MdFormatSize}/>
              <Slider min={40} max={100} value={size} onChange={setSize}>
                <SliderTrack>
                  <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb/>
              </Slider>
            </Flex>
          </Box>
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
            {MEME_POSITIONS.map((candPosition) => (
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
      <Modal isOpen={isModalOpen} onClose={handleModalClose} isCentered={true}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Submission completed</ModalHeader>
          <ModalBody>
            {createdMeme && <DetailedMemePane meme={createdMeme}/>}
          </ModalBody>
          <ModalFooter>
            <Button w="full" onClick={handleModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AppContainer>
  )
}

export default CreateMemePage
