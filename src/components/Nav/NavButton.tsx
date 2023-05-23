import { Flex, useMediaQuery } from '@chakra-ui/react';
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

interface NaviButtonProps {
  styleProps?: MotionStyle;
}

const ICON_SIZE = '2rem';

export const NavButton = ({ styleProps }: NaviButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickMainPage = () => {
    navigate(ROUTE.HOME);
  };

  const handleClickSidoRankingPage = () => {
    navigate(ROUTE.SIDO_RANKING);
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
        flexDirection="column"
        justifyContent="center"
        onClick={handleClickGoBack}
        cursor="pointer"
      >
        <AiOutlineArrowLeft className="nav-icon" size={ICON_SIZE} />
      </Flex>
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
          minWidth: '30%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <NavListItem variants={itemVariants} handleClick={handleClickMainPage}>
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
      <motion.button whileTap={{ scale: 0.97 }} onClick={handleClick}>
        <Flex>
          <AiOutlineMenuFold className="nav-icon" size={ICON_SIZE} />
        </Flex>
      </motion.button>
    </motion.nav>
  );
};

export default NavButton;
