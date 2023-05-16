import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AlertBox from '@/components/common/AlertBox';
import { ROUTE } from '@/utils/constants';

const ErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <AlertBox title="랭킹 먼지 정보를 불러오지 못했어요.">
      <Button onClick={() => navigate(ROUTE.HOME)} mt={4}>
        다시 시도하기
      </Button>
    </AlertBox>
  );
};

export default ErrorFallback;
