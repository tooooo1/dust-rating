import { Box } from '@chakra-ui/react';
import { ErrorFallback } from '@/components/common';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Map from '@/components/Map';
import { fallbackSize } from '@/types/error';
import { ERROR_MESSAGE } from '@/utils/constants/message';

const DustMapPage = () => {
  return (
    <Box maxWidth="30rem" height="100vh" margin="0 auto">
      <ErrorBoundary
        rejectFallback={
          <ErrorFallback
            size={fallbackSize.FULL}
            errorMessage={ERROR_MESSAGE.NO_MAP_DATA}
          />
        }
      >
        <Map />
      </ErrorBoundary>
    </Box>
  );
};

export default DustMapPage;
