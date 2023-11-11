import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

interface IMenuProps {
  pages: string[];
}

export const DesktopRoute = ({ pages }: IMenuProps) => {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => {
            router.push(`/${page}`);
          }}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};
