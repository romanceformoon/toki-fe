import { BarChart } from '@mui/x-charts'

interface IGraphProps {
  graphData: IGraph
  category: string
}

export const ClearGraph = ({ graphData, category }: IGraphProps) => {
  let yLabels: string[] = []

  if (category === 'aery') {
    yLabels = [
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
      '⑤ 20',
      '⑤ 20+'
    ]
  } else if (category === 'insane') {
    yLabels = [
      '★1',
      '★2',
      '★3',
      '★4',
      '★5',
      '★6',
      '★7',
      '★8',
      '★9',
      '★10',
      '★11',
      '★12',
      '★13',
      '★14',
      '★15',
      '★16',
      '★17',
      '★18',
      '★19',
      '★20',
      '★21',
      '★22',
      '★23',
      '★24',
      '★25'
    ]
  } else if (category === 'sl') {
    yLabels = [
      'sl0',
      'sl1',
      'sl2',
      'sl3',
      'sl4',
      'sl5',
      'sl6',
      'sl7',
      'sl8',
      'sl9',
      'sl10',
      'sl11',
      'sl12'
    ]
  } else if (category === 'st') {
    yLabels = [
      'st0',
      'st1',
      'st2',
      'st3',
      'st4',
      'st5',
      'st6',
      'st7',
      'st8',
      'st9',
      'st10',
      'st11',
      'st12'
    ]
  }

  return (
    <BarChart
      sx={{
        minWidth: '100%',
        border: 1,
        borderRadius: 5
      }}
      margin={{ top: 100 }}
      layout='horizontal'
      height={700}
      series={[
        {
          data: Object.values(graphData['FC_COUNT']),
          label: 'Full Combo',
          id: 'fc',
          stack: 'total',
          color: '#fde1f5',
          stackOffset: 'expand'
        },
        {
          data: Object.values(graphData['HARD_COUNT']),
          label: 'Hard Clear',
          id: 'hard',
          stack: 'total',
          color: '#dd3959',
          stackOffset: 'expand'
        },
        {
          data: Object.values(graphData['GROOVE_COUNT']),
          label: 'Groove Clear',
          id: 'groove',
          stack: 'total',
          color: '#5e99ff',
          stackOffset: 'expand'
        },
        {
          data: Object.values(graphData['EASY_COUNT']),
          label: 'Easy Clear',
          id: 'easy',
          stack: 'total',
          color: '#79e158',
          stackOffset: 'expand'
        },
        {
          data: Object.values(graphData['FAILED_COUNT']),
          label: 'Failed',
          id: 'failed',
          stack: 'total',
          color: '#333333',
          stackOffset: 'expand'
        },
        {
          data: Object.values(graphData['NOPLAY_COUNT']),
          label: 'No Play',
          id: 'noplay',
          stack: 'total',
          color: '#00000000',
          stackOffset: 'expand'
        }
      ]}
      yAxis={[
        {
          data: yLabels,
          scaleType: 'band'
        }
      ]}
      bottomAxis={null}
    />
  )
}
