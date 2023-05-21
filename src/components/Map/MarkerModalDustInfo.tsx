import { Flex } from '@chakra-ui/react';
import DustState from '@/components/common/DustState';
import ProgressBar from '@/components/common/ProgressBar';

interface MarkerModalDustInfoProps {
  kindOfDust: string;
  dustGradeAVG: number;
  dustScale: number;
  dustGrade: number;
}

export const MarkerModalDustInfo = ({
  kindOfDust,
  dustGradeAVG,
  dustScale,
  dustGrade,
}: MarkerModalDustInfoProps) => {
  console.log(kindOfDust, dustGradeAVG, dustScale, dustGrade);

  return (
    <Flex flexDirection="column">
      <DustState dustGrade={dustGradeAVG} />
      <ProgressBar
        kindOfDust={kindOfDust}
        scale={dustScale}
        grade={dustGrade}
      />
    </Flex>
  );
};

export default MarkerModalDustInfo;
