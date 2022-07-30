import type { NextPage } from 'next'
import Head from 'next/head';
import { Box } from '@mui/material';

import StoreWeightCalculation from '@/components/forms/weight-calculation/store';

const Home: NextPage = () => (
  <>
    <Head>
      <title>
        理想の体重計算
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <StoreWeightCalculation />
    </Box>
  </>
);

export default Home
