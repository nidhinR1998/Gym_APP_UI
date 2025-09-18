import React, { useContext, useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  useEffect(() => {
    console.group("🔍 HorizontalScrollbar Debug");
    console.log("📦 Raw data received:", data);
    console.log("📏 Type:", typeof data);
    console.log("✅ Is Array?", Array.isArray(data));
    if (Array.isArray(data)) {
      console.log("🔢 Array length:", data.length);
      console.log("📝 First item sample:", data[0]);
    } else {
      console.warn("⚠️ data is NOT an array. This may break .map()");
    }
    console.groupEnd();
  }, [data]);

  if (!Array.isArray(data)) {
    console.error("❌ HorizontalScrollbar: data is not an array:", data);
    return (
      <Box sx={{ color: 'red', fontWeight: 'bold', textAlign: 'center', p: 2 }}>
        ⚠️ Invalid data format — expected an array but got {typeof data}.
      </Box>
    );
  }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item, idx) => (
        <Box
          key={item.id || item || idx}
          itemId={item.id || item || idx}
          title={item.id || item}
          m="0 40px"
        >
          {bodyParts
            ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
            : <ExerciseCard exercise={item} />}
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;
