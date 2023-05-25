import { Flex, Box, useMediaQuery } from '@chakra-ui/react';
import { MotionStyle, motion } from 'framer-motion';
import { useState } from 'react';
import {
  AiOutlineMenuFold,
  AiOutlineArrowLeft,
  AiOutlineHome,
} from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { NavListItem } from '@/components/Nav';
import { ROUTE } from '@/utils/constants';

interface NavButtonProps {
  styleProps?: MotionStyle;
}

export const NavButton = ({ styleProps }: NavButtonProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickMainPage = () => {
    navigate(ROUTE.HOME);
  };

  const handleClickSidoRankingPage = () => {
    navigate(ROUTE.RANKING);
  };

  const handleClickMapPage = () => {
    navigate(ROUTE.DUST_MAP);
  };

  const handleClickGoBack = () => {
    navigate(-1);
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="menu"
      style={{ ...styleProps }}
    >
      <Flex
        maxWidth="30rem"
        width={{ base: '60%', sm: '60%', md: '100%' }}
        justifyContent="space-between"
        mt={2}
      >
        <Box onClick={handleClickGoBack} cursor="pointer" mt={1}>
          <AiOutlineArrowLeft className="nav-icon" fontSize={24} />
        </Box>
        <motion.ul
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1,
              },
            },
            closed: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
                delayChildren: 0.3,
                staggerChildren: 0.05,
                staggerDirection: 1,
              },
            },
          }}
          style={{
            pointerEvents: isOpen ? 'auto' : 'none',
            display: 'flex',
            gap: '0.4rem',
          }}
        >
          <NavListItem
            variants={itemVariants}
            handleClick={handleClickMainPage}
          >
            {isLargerThan480 ? '메인 화면' : <AiOutlineHome />}
          </NavListItem>
          <NavListItem
            variants={itemVariants}
            handleClick={handleClickSidoRankingPage}
          >
            {isLargerThan480 ? '전국 랭킹' : '전국'}
          </NavListItem>
          <NavListItem variants={itemVariants} handleClick={handleClickMapPage}>
            {isLargerThan480 ? '전국 지도' : <BiMap />}
          </NavListItem>
        </motion.ul>
        <Box onClick={handleClick} cursor="pointer" mt={1}>
          <AiOutlineMenuFold className="nav-icon" fontSize={24} />
        </Box>
      </Flex>
    </motion.nav>
  );
};

export default NavButton;
