import { BarChart } from '@mui/x-charts'

export const BarChartSkeleton = () => {
  return (
    <BarChart
      sx={{
        mt: 1,
        minWidth: '100%',
        border: 1,
        borderRadius: 5
      }}
      margin={{ top: 100 }}
      layout='horizontal'
      height={700}
      series={[
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Full Combo',
          id: 'fc',
          color: '#fde1f5'
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Hard Clear',
          id: 'hard',
          color: '#dd3959'
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Groove Clear',
          id: 'groove',
          color: '#5e99ff'
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Easy Clear',
          id: 'easy',
          color: '#79e158'
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Failed',
          id: 'failed',
          color: '#525252'
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'No Play',
          id: 'noplay',
          color: '#00000000'
        }
      ]}
      yAxis={[
        {
          data: [
            '⑤ 1',
            '⑤ 2',
            '⑤ 3',
            '⑤ 4',
            '⑤ 5',
            '⑤ 6',
            '⑤ 7',
            '⑤ 8',
            '⑤ 9',
            '⑤ 10',
            '⑤ 11',
            '⑤ 12',
            '⑤ 13',
            '⑤ 14',
            '⑤ 15',
            '⑤ 16',
            '⑤ 17',
            '⑤ 18',
            '⑤ 19',
            '⑤ 20'
          ],
          scaleType: 'band'
        }
      ]}
      bottomAxis={null}
    ></BarChart>
  )
}
