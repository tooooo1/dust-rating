import { Button } from '@chakra-ui/react';
import { MotionStyle, motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/utils/constants';

interface NaviButtonProps {
  sx?: MotionStyle;
}

export const NaviButton = ({ sx }: NaviButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
      style={{ ...sx }}
    >
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
            },
          },
          closed: {
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
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
        <motion.li variants={itemVariants}>
          <Button onClick={handleClickMainPage}>메인 화면</Button>
        </motion.li>
        <motion.li variants={itemVariants}>
          <Button onClick={handleClickSidoRankingPage}>전국 랭킹</Button>
        </motion.li>
        <motion.li variants={itemVariants}>
          <Button onClick={handleClickMapPage}>전국 지도</Button>
        </motion.li>
      </motion.ul>
      <motion.button whileTap={{ scale: 0.97 }} onClick={handleClick}>
        <motion.div
          variants={{
            open: { rotate: 0 },
            closed: { rotate: 180 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <AiOutlineMenuFold />
        </motion.div>
      </motion.button>
    </motion.nav>
  );
};

export default NaviButton;
