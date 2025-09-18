import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData, fetchBackednData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      //const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      const bodyPartsData = await fetchBackednData('http://localhost:8088/api/bodyPart');

      //setBodyParts(['all', ...bodyPartsData]);
      const names = bodyPartsData.map(bp => bp.name);
      console.log('name',bodyPartsData);
      setBodyParts(['all', ...names]);
      console.log(bodyPartsData);
    };

    fetchExercisesData();
  }, []);

  // const handleSearch = async () => {
  //   if (search) {
  //     //const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
  //     const exercisesData = await fetchBackednData('http://localhost:8088/api/exercises');

  //     console.log('handleSearch', exercisesData);
  //     const searchedExercises = exercisesData.filter(
  //       (item) => item.name.toLowerCase().includes(search)
  //              || item.targetMuscles.toLowerCase().includes(search)
  //              || item.equipments.toLowerCase().includes(search)
  //              || item.bodyParts.toLowerCase().includes(search),
  //     );


  //     window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

  //     setSearch('');
  //     setExercises(searchedExercises);
  //     console.log('searchedExercises', searchedExercises);
  //   }
  // };


  const handleSearch = async () => {
  if (search) {
    console.log('🔎 Searching for:', search);

    const exercisesData = await fetchBackednData('http://localhost:8088/api/exercises');
    console.log('📦 Fetched exercises from backend:', exercisesData);

    const searchedExercises = exercisesData.filter((item, index) => {
      console.log(`\n➡️ Checking exercise [${index}] ->`, item);

      const nameMatch = item.name?.toLowerCase().includes(search);
      console.log(`   🏷️ nameMatch: ${nameMatch} (${item.name})`);

      const targetMatch = Array.isArray(item.targetMuscles)
        ? item.targetMuscles.some((muscle) => {
            const match = muscle.toLowerCase().includes(search);
            console.log(`   🎯 targetMuscle check: ${muscle} => ${match}`);
            return match;
          })
        : false;
      console.log(`   🎯 targetMatch result: ${targetMatch}`);

      const equipmentMatch = Array.isArray(item.equipments)
        ? item.equipments.some((eq) => {
            const match = eq.toLowerCase().includes(search);
            console.log(`   🏋️ equipment check: ${eq} => ${match}`);
            return match;
          })
        : false;
      console.log(`   🏋️ equipmentMatch result: ${equipmentMatch}`);

      const bodyPartMatch = Array.isArray(item.bodyParts)
        ? item.bodyParts.some((bp) => {
            const match = bp.toLowerCase().includes(search);
            console.log(`   🦾 bodyPart check: ${bp} => ${match}`);
            return match;
          })
        : false;
      console.log(`   🦾 bodyPartMatch result: ${bodyPartMatch}`);

      const finalMatch = nameMatch || targetMatch || equipmentMatch || bodyPartMatch;
      console.log(`✅ Final Match for "${item.name}": ${finalMatch}`);

      return finalMatch;
    });

    console.log('🎯 Final searched exercises:', searchedExercises);

    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

    setSearch('');
    setExercises(searchedExercises);
    console.log(`📊 Total results found: ${searchedExercises.length}`);
  }
};


  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} 
        onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
