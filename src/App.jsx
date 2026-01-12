import AppRoutes from './routes/AppRoutes'
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(253,251,247,0.85)",
            backdropFilter: "blur(14px)",
            border: "1.5px dashed #C5A059",
            borderRadius: "18px",
            padding: "14px 18px",
            color: "#4A3C31",
            fontFamily: "Inter",
            fontWeight: 500,
            boxShadow: "0 18px 40px rgba(197,160,89,.35)",
            position: "relative"
          },
        }}
      />
    </>
  );
}
