import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export const DesktopRoute = ({ pages }: IMenuProps) => {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={() => {
            router.push(`/${page.link}`);
          }}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
};
