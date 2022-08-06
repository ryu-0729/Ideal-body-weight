import { FC, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  currentWeight: string
  appropriateWeight: string
  cosmeticWeight: string
  cinderellaWeight: string
};

const options = {
  cornerRadius: 20,
  layout: { padding: 0 },
  legend: { display: false },
  maintainAspectRatio: false,
  responsive: true,
  xAxes: [
    {
      ticks: {
        fontColor: '#65748B',
      },
      gridLines: {
        display: false,
        drawBorder: false,
      },
    },
  ],
  // TODO: デフォルト値を設定したい
  yAxes: [
    {
      ticks: {
        fontColor: '#65748B',
        beginAtZero: true,
        min: 0,
      },
      gridLines: {
        borderDash: [2],
        borderDashOffset: [2],
        color: '#E6E8F0',
        drawBorder: false,
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: [2],
        zeroLineColor: '#E6E8F0',
      },
    },
  ],
  tooltips: {
    backgroundColor: '#FFFFFF',
    bodyFontColor: '#65748B',
    borderColor: '#E6E8F0',
    borderWidth: 1,
    enabled: true,
    footerFontColor: '#65748B',
    intersect: false,
    mode: 'index',
    titleFontColor: '#121828',
  },
};

const labels = [
  '現在の体重',
  '適正体重',
  '美容体重',
  'シンデレラ体重',
];

const Chart: FC<Props> = ({
  currentWeight,
  appropriateWeight,
  cosmeticWeight,
  cinderellaWeight
}) => {
  const data = useMemo(() => {
    const bodyInfoData = [currentWeight, appropriateWeight, cosmeticWeight, cinderellaWeight];
    return {
      labels,
      datasets: [
        {
          // TODO: bmiの度合いによって色を変更したい
          backgroundColor: '#3F51B5',
          barPercentage: 0.5,
          barThickness: 12,
          borderRadius: 4,
          categoryPercentage: 0.5,
          data: bodyInfoData,
          label: '体重',
          maxBarThickness: 10,
        },
      ],
    };
  }, [currentWeight, appropriateWeight, cosmeticWeight, cinderellaWeight]);

  return (
    <Card>
      <CardHeader title="戒めの体重表示" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        TODO: 結果によってのメッセージ変更
      </Box>
    </Card>
  );
};

export default Chart;
