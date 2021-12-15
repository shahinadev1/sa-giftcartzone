import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Loading() {
  return (
    <Stack spacing={1} sx={{ marginBottom: { sm: "20px" } }}>
      <Skeleton variant="rectangular" fullWidth height={370} />
      <Skeleton variant="text" fullWidth />
      <Skeleton variant="text" fullWidth />
    </Stack>
  );
}
