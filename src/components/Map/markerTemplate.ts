import theme from '@/styles/theme';
import type { SidoDustInfo } from '@/types/dust';
import { DUST_GRADE } from '@/utils/constants';

export const MarkerTemplate = ({
  location,
  fineDustScale,
  fineDustGrade,
  ultraFineDustScale,
  ultraFineDustGrade,
}: SidoDustInfo) => {
  const backgroundColor = theme.colors[DUST_GRADE[fineDustGrade]];

  return `
        <div class="dust-info-marker" id="${location}" data-finedustscale="${fineDustScale} "data-finedustgrade="${fineDustGrade}" data-ultrafinedustscale="${ultraFineDustScale}" data-ultrafinedustgrade="${ultraFineDustGrade}" style="background-color: ${backgroundColor};">
          <p class="city-name">${location}</p>
          <div class="dust-info">
            <div>${fineDustScale}</div>
            <span class="divider">/</span>
            <div>${ultraFineDustScale}</div>  
          </div>
        </div>
  `;
};

export default MarkerTemplate;
