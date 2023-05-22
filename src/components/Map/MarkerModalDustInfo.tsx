import { Flex } from '@chakra-ui/react';
import { DustFigureBar } from '@/components/common';
import DustState from '@/components/common/DustState';
import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

interface MarkerModalDustInfoProps {
  kindOfDust: typeof FINE_DUST | typeof ULTRA_FINE_DUST;
  dustScale: number;
  dustGrade: number;
}

export const MarkerModalDustInfo = ({
  kindOfDust,
  dustScale,
  dustGrade,
}: MarkerModalDustInfoProps) => {
  return (
    <Flex flexDirection="column">
      <DustState dustGrade={dustGrade} />
      <DustFigureBar
        kindOfDust={kindOfDust}
        scale={dustScale}
        grade={dustGrade}
      />
    </Flex>
  );
};

export default MarkerModalDustInfo;
