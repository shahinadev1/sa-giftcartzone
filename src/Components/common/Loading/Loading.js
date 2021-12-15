import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Loading() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={250} height={370} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Stack>
  );
}
