import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData, fetchBackednData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      console.log(`[Exercises] Fetching exercises for bodyPart: ${bodyPart}`);
      let exercisesData = [];

      try {
        if (bodyPart === 'all') {
          console.log('[Exercises] Fetching ALL exercises from backend...');
          exercisesData = await fetchBackednData('http://localhost:8088/api/exercises');
        } else {
          console.log(`[Exercises] Fetching exercises for bodyPart: ${bodyPart} from backend...`);
          exercisesData = await fetchBackednData(`http://localhost:8088/api/exercises/bodyPart/${bodyPart}`);
        }

        console.log(`[Exercises] Data fetched successfully. Total records: ${exercisesData.length}`);
        setExercises(exercisesData);
      } catch (error) {
        console.error('[Exercises] Failed to fetch exercises:', error);
      }
    };

    fetchExercisesData();
  }, [bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  console.log(`[Exercises] Pagination Info -> Current Page: ${currentPage}, Index Range: ${indexOfFirstExercise}-${indexOfLastExercise}, Current Page Exercises: ${currentExercises.length}`);

  const paginate = (event, value) => {
    console.log(`[Exercises] Page changed from ${currentPage} to ${value}`);
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) {
    console.warn('[Exercises] No exercises to display. Showing Loader...');
    return <Loader />;
  }

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">
        Showing Results
      </Typography>

      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, idx) => {
          console.log(`[Exercises] Rendering Exercise Card #${idx + 1}:`, exercise);
          return <ExerciseCard key={idx} exercise={exercise} />;
        })}
      </Stack>

      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
