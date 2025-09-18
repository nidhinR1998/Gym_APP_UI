import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions, fetchBackednData } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.group("🔍 ExerciseDetail Debug Logs");
    console.log("📌 useParams.id:", id);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      try {
        const exerciseDbUrl = 'http://localhost:8088/api/exercises';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        console.log("🌐 Fetching exercise details from:", `${exerciseDbUrl}/${id}`);
        const exerciseDetailData = await fetchBackednData(`${exerciseDbUrl}/${id}`);
        console.log("✅ ExerciseDetail API Response:", exerciseDetailData);

        setExerciseDetail(exerciseDetailData);
        console.log("📥 exerciseDetail state updated:", exerciseDetailData);

        console.log("🌐 Fetching YouTube videos for:", exerciseDetailData?.name);
        const exerciseVideosData = await fetchData(
          `${youtubeSearchUrl}/search?query=${exerciseDetailData?.name || ''} exercise`,
          youtubeOptions
        );
        console.log("✅ YouTube API Response:", exerciseVideosData);

        setExerciseVideos(exerciseVideosData.contents || []);
        console.log("📥 exerciseVideos state updated. Count:", exerciseVideosData.contents?.length || 0);

        console.log("🌐 Fetching target muscle exercises for:", exerciseDetailData?.targetMuscles);
        const targetMuscleExercisesData = await fetchData(
          `${exerciseDbUrl}/target/${exerciseDetailData?.targetMuscles}`,
          exerciseOptions
        );
        console.log("✅ Target Muscle API Response:", targetMuscleExercisesData);

        setTargetMuscleExercises(Array.isArray(targetMuscleExercisesData) ? targetMuscleExercisesData : []);
        console.log("📥 targetMuscleExercises state updated. Count:", targetMuscleExercisesData?.length || 0);

        console.log("🌐 Fetching equipment exercises for:", exerciseDetailData?.equipments);
        const equimentExercisesData = await fetchData(
          `${exerciseDbUrl}/equipment/${exerciseDetailData?.equipments}`,
          exerciseOptions
        );
        console.log("✅ Equipment API Response:", equimentExercisesData);

        setEquipmentExercises(Array.isArray(equimentExercisesData) ? equimentExercisesData : []);
        console.log("📥 equipmentExercises state updated. Count:", equimentExercisesData?.length || 0);

      } catch (error) {
        console.error("❌ Error fetching exercise details:", error);
      } finally {
        console.groupEnd();
      }
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail || Object.keys(exerciseDetail).length === 0) {
    console.warn("⚠️ No exerciseDetail found for id:", id);
    return <div style={{ textAlign: "center", color: "red" }}>No Data</div>;
  }

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
