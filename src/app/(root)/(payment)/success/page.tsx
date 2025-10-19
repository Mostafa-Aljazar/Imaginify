import SuccessPage from "@/components/pages/success/success-component";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
