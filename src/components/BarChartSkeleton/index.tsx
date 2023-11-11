import { BarChart } from "@mui/x-charts";
import { yLabels } from "~/const/graphLabels";

export const BarChartSkeleton = () => {
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
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: "Full Combo",
          id: "fc",
          color: "#fde1f5",
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: "Hard Clear",
          id: "hard",
          color: "#dd3959",
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: "Groove Clear",
          id: "groove",
          color: "#5e99ff",
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: "Easy Clear",
          id: "easy",
          color: "#79e158",
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: "Failed",
          id: "failed",
          color: "#525252",
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: "No Play",
          id: "noplay",
          color: "#00000000",
        },
      ]}
      yAxis={[
        {
          data: yLabels,
          scaleType: "band",
        },
      ]}
      bottomAxis={null}
    ></BarChart>
  );
};
