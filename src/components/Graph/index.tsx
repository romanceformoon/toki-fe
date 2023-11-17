import { BarChart } from "@mui/x-charts";
import { yLabels } from "~/const/graphLabels";

interface IGraphProps {
  graphData: IGraph;
}

export const Graph = ({ graphData }: IGraphProps) => {
  
  return (
    <BarChart
      sx={{
        mt: 1,
        minWidth: "100%",
        border: 1,
        borderRadius: 5,
      }}
      margin={{ top: 100 }}
      layout="horizontal"
      height={700}
      series={[
        {
          data: Object.values(graphData["FC_COUNT"]),
          label: "Full Combo",
          id: "fc",
          stack: "total",
          color: "#fde1f5",
          stackOffset: "expand",
        },
        {
          data: Object.values(graphData["HARD_COUNT"]),
          label: "Hard Clear",
          id: "hard",
          stack: "total",
          color: "#dd3959",
          stackOffset: "expand",
        },
        {
          data: Object.values(graphData["GROOVE_COUNT"]),
          label: "Groove Clear",
          id: "groove",
          stack: "total",
          color: "#5e99ff",
          stackOffset: "expand",
        },
        {
          data: Object.values(graphData["EASY_COUNT"]),
          label: "Easy Clear",
          id: "easy",
          stack: "total",
          color: "#79e158",
          stackOffset: "expand",
        },
        {
          data: Object.values(graphData["FAILED_COUNT"]),
          label: "Failed",
          id: "failed",
          stack: "total",
          color: "#333333",
          stackOffset: "expand",
        },
        {
          data: Object.values(graphData["NOPLAY_COUNT"]),
          label: "No Play",
          id: "noplay",
          stack: "total",
          color: "#00000000",
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
