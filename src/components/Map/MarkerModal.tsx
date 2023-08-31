import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import MarkerModalButton from '@/components/Map/MarkerModalButton';
import MarkerModalDustInfo from '@/components/Map/MarkerModalDustInfo';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

interface MarkerModalProps {
  city: string;
  dustInfo: {
    fineDustScale: number;
    fineDustGrade: number;
    ultraFineDustScale: number;
    ultraFineDustGrade: number;
  };
  handleClickForeCastButton: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const MarkerModal = ({
  city,
  dustInfo,
  handleClickForeCastButton,
  isOpen,
  onClose,
}: MarkerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{city}</ModalHeader>
        <ModalCloseButton borderColor={'#ffffff'} />
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
          <MarkerModalButton handleClick={handleClickForeCastButton}>
            예보 페이지로 이동하기
          </MarkerModalButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MarkerModal;
