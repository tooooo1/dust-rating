import { Flex, Text, Button } from '@chakra-ui/react';
import { AiFillAlert } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const ErrorBoundary = () => {
  const navigate = useNavigate();

  const handleClickHomeButton = () => {
    navigate('/');
  };

  const handleClickBackButton = () => {
    navigate('/');
  };

  return (
    <Flex
      w="30%"
      marginTop="10%"
      flexDirection="column"
      justify="center"
      align="center"
      bg="#ffffff"
      borderRadius="10"
    >
      <AiFillAlert />
      <Text as="b" margin="1rem">
        해당페이지를 찾을 수 없어요.
      </Text>
      <Text textAlign="center" margin="1rem" lineHeight="3rem">
        존재하지 않는 주소를 입력하셨거나 <br /> 요청하신 페이지의 주소가 변경,
        삭제되어 찾을 수 없습니다.
      </Text>
      <Flex color="#ffffff">
        <Button margin="1rem" bg="#53caf2" onClick={handleClickHomeButton}>
          홈으로
        </Button>
        <Button margin="1rem" bg="#53caf2" onClick={handleClickBackButton}>
          이전페이지
        </Button>
      </Flex>
    </Flex>
  );
};
export default ErrorBoundary;
