import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  // Log entire exercise object whenever it changes
  useEffect(() => {
    console.group("🟢 ExerciseCard Render");
    console.log("Full exercise object:", exercise);
    console.log("Exercise ID:", exercise?.id);
    console.log("Exercise Name:", exercise?.name);
    console.log("Exercise gifUrl:", exercise?.gifUrl);
    console.log("Body Parts:", exercise?.bodyParts);
    console.log("Target Muscles:", exercise?.targetMuscles);
    console.groupEnd();
  }, [exercise]);

  // Safely compute display values with logs
  const bodyPartsDisplay = Array.isArray(exercise.bodyParts) && exercise.bodyParts.length > 0
    ? exercise.bodyParts.join(', ')
    : 'N/A';

  console.log("🔎 bodyPartsDisplay:", bodyPartsDisplay);

  const targetMusclesDisplay = Array.isArray(exercise.targetMuscles) && exercise.targetMuscles.length > 0
    ? exercise.targetMuscles.join(', ')
    : 'N/A';

  console.log("🔎 targetMusclesDisplay:", targetMusclesDisplay);

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        onError={() => console.error("❌ Failed to load image:", exercise.gifUrl)}
        onLoad={() => console.log("✅ Image loaded successfully:", exercise.gifUrl)}
      />
      <Stack direction="row">
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#FFA9A9',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
          onClick={() => console.log("👆 Clicked BodyPart Button:", bodyPartsDisplay)}
        >
          {bodyPartsDisplay}
        </Button>

        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#FCC757',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
          onClick={() => console.log("👆 Clicked TargetMuscles Button:", targetMusclesDisplay)}
        >
          {targetMusclesDisplay}
        </Button>
      </Stack>

      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        sx={{ fontSize: { lg: '24px', xs: '20px' } }}
        mt="11px"
        pb="10px"
        textTransform="capitalize"
      >
        {exercise.name || 'Unnamed Exercise'}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
