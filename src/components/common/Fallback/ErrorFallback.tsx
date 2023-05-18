import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AlertBox from '@/components/common/AlertBox';
import { ROUTE } from '@/utils/constants';

interface ErrorFallbackProps {
  title: string;
  description?: string;
}

const ErrorFallback = ({ title, description }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  return (
    <AlertBox title={title} description={description}>
      <Button onClick={() => navigate(ROUTE.HOME)} mt={4}>
        메인으로 돌아가기
      </Button>
    </AlertBox>
  );
};

export default ErrorFallback;
