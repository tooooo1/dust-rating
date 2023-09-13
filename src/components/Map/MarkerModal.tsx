import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import MarkerModalDustInfo from '@/components/Map/MarkerModalDustInfo';
import theme from '@/styles/theme';
import { DustFigures } from '@/types/dust';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

interface MarkerModalProps {
  city: string;
  dustInfo: DustFigures;
  handleClickForeCastButton: () => void;
  isOpen: boolean;
  handleClose: () => void;
}

const MarkerModal = ({
  city,
  dustInfo,
  handleClickForeCastButton,
  isOpen,
  handleClose,
}: MarkerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{city}</ModalHeader>
        <ModalCloseButton borderColor="white" />
        <ModalBody>
          <MarkerModalDustInfo
            kindOfDust={FINE_DUST}
            dustScale={dustInfo.fineDustScale}
            dustGrade={dustInfo.fineDustGrade}
          />
          <MarkerModalDustInfo
            kindOfDust={ULTRA_FINE_DUST}
            dustScale={dustInfo.ultraFineDustScale}
            dustGrade={dustInfo.ultraFineDustGrade}
          />
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-around">
          <Button
            colorScheme="blue"
            mr={3}
            backgroundColor={theme.backgroundColors.INIT}
            onClick={handleClickForeCastButton}
          >
            예보 페이지로 이동하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MarkerModal;
