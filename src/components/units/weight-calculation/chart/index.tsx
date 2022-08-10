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
  Typography,
} from '@mui/material';
import { red, blue, green } from '@mui/material/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  bmi: string
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
  scales: {
    y: {
      min: 0,
      max: 120,
    },
  },
};

const labels = [
  '現在の体重',
  '適正体重',
  '美容体重',
  'シンデレラ体重',
];

const Chart: FC<Props> = ({
  bmi,
  currentWeight,
  appropriateWeight,
  cosmeticWeight,
  cinderellaWeight
}) => {
  const bmiMessage = useMemo(() => {
    const parseBmi = parseFloat(bmi);
    const unhealthyWeightLoss: boolean = parseBmi < 18.50;
    const normalWeight: boolean = 18.50 <= parseBmi && parseBmi < 25.00;
    const obeseLevel1: boolean = 25.00 <= parseBmi && parseBmi < 30.00;
    const obeseLevel2: boolean = 30.00 <= parseBmi && parseBmi < 35.00;
    const obeseLevel3: boolean = 35.00 <= parseBmi && parseBmi < 40.00;
    const obeseLevel4: boolean = 40.00 <= parseBmi;

    if (unhealthyWeightLoss) return '太りましょう！';
    if (normalWeight) return '素晴らしい！';
    if (obeseLevel1) return '幸せが詰まってる！';
    if (obeseLevel2) return 'いまならまだ間に合う！';
    if (obeseLevel3) return 'マズイかも、、、';
    if (obeseLevel4) return '改善が必要です。。。';
    return '素晴らしい！';
  }, [bmi]);

  const data = useMemo(() => {
    const bodyInfoData = [currentWeight, appropriateWeight, cosmeticWeight, cinderellaWeight];
    return {
      labels,
      datasets: [
        {
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
      <CardHeader title="理想の体重" />
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
        <Typography
          variant="body1"
        >
          現在のBMI：
        </Typography>
        <Typography
          variant="body1"
        >
          {bmi} {bmi ? bmiMessage : ''}
        </Typography>
      </Box>
    </Card>
  );
};

export default Chart;
