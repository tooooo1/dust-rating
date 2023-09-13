import { Button } from '@chakra-ui/react';
import { Variants, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import theme from '@/styles/theme';

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
        _hover={{ bg: theme.backgroundColors.NONE }}
        onClick={handleClick}
      >
        {children}
      </Button>
    </motion.li>
  );
};

export default NavListItem;
