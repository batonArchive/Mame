import { AspectRatio, Avatar, Box, Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"
import { MdApps, MdEdit, MdFavoriteBorder } from "react-icons/md"
import { Meme } from "../../models/meme"
import { DetailedMemePane } from "./detailedMemePane"


type Props = {
  meme: Meme
}

export const MemePane: React.FC<Props> = ({
  meme
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <AspectRatio ratio={1} onClick={() => setIsModalOpen(true)}>
        <Box rounded="lg" backgroundImage={`url('${meme.image}')`} backgroundSize="cover" position="relative">
          <Flex
            left={2} top={2} gap={1}
            position="absolute"
          >
            {meme.badges.map((badge) => (
              <Image width={24} height={24} key={badge} src={`/badge/${badge}.svg`} alt={`badge ${badge}`}/>
            ))}
          </Flex>
          <Text
            left={2} bottom={2}
            fontSize="sm" lineHeight="shorter"
            textShadow="borderText"
            whiteSpace="pre-wrap"
            noOfLines={4}
            position="absolute"
          >
            {meme.text}
          </Text>
        </Box>
      </AspectRatio>
      <Modal size="fullWidth" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered={true}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
            <Flex w="full" justify="space-between">
              <Flex align="center">
                <Avatar mr={2} size="sm"/>
                <Text fontSize="md">{meme.authorName}</Text>
              </Flex>
              <Flex align="center">
                <Text fontSize="md" fontWeight="normal">1982</Text>
                <Icon ml={2} w={6} h={6} as={MdFavoriteBorder}/>
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <DetailedMemePane meme={meme}/>
          </ModalBody>
          <ModalFooter>
            <Flex w="full" gap={4} justify="stretch">
              <Button flexGrow="1" leftIcon={<MdApps/>}>History</Button>
              <Button flexGrow="1" leftIcon={<MdEdit/>}>Quote</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
