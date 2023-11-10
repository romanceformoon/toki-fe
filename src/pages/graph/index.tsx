import { BarChart } from "@mui/x-charts";

const LampGraph = () => {
  const hard = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const groove = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const easy = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const noplay = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

  const yLabels = [
    "⑤ 1",
    "⑤ 2",
    "⑤ 3",
    "⑤ 4",
    "⑤ 5",
    "⑤ 6",
    "⑤ 7",
    "⑤ 8",
    "⑤ 9",
    "⑤ 10",
    "⑤ 11",
    "⑤ 12",
    "⑤ 13",
    "⑤ 14",
    "⑤ 15",
    "⑤ 16",
    "⑤ 17",
    "⑤ 18",
    "⑤ 19",
    "⑤ 20",
  ];

  return (
    <BarChart
      sx={{
        minWidth: "100%",
      }}
      layout="horizontal"
      height={800}
      series={[
        {
          data: hard,
          label: "Hard Clear",
          id: "hard",
          stack: "total",
          color: "#ff5b7b",
          stackOffset: "expand",
        },
        {
          data: groove,
          label: "Groove Clear",
          id: "groove",
          stack: "total",
          color: "#5e99ff",
          stackOffset: "expand",
        },
        {
          data: easy,
          label: "Easy Clear",
          id: "easy",
          stack: "total",
          color: "#4df5a4",
          stackOffset: "expand",
        },
        {
          data: noplay,
          label: "No Play",
          id: "noplay",
          stack: "total",
          color: "#8db6ac",
          stackOffset: "expand",
        },
      ]}
      yAxis={[
        {
          data: yLabels,
          scaleType: "band",
        },
      ]}
      bottomAxis={null}
    />
  );
};

export default LampGraph;
