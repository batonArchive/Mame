import { AspectRatio, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { useState } from "react"
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered={true}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>

          </ModalHeader>
          <ModalBody>
            <DetailedMemePane meme={meme}/>
          </ModalBody>
          <ModalFooter>
            <Flex w="full" gap={4} justify="stretch">
              <Button flexGrow="1">History</Button>
              <Button flexGrow="1">Quote</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
