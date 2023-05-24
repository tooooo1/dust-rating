import { Button } from '@chakra-ui/react';
import { Variants, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface NavListItemProps {
  variants: Variants;
  handleClick: () => void;
}

export const NavListItem = ({
  variants,
  handleClick,
  children,
}: PropsWithChildren<NavListItemProps>) => {
  return (
    <motion.li variants={variants}>
      <Button
        fontSize={14}
        height={9}
        _hover={{ bg: '#ffffff8f' }}
        onClick={handleClick}
      >
        {children}
      </Button>
    </motion.li>
  );
};

export default NavListItem;
