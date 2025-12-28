import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GDPortal from "./pages/GDPortal";
import WaitingRoom from "./pages/WaitingRoom";
import GDRoomAI from "./pages/GDRoomAI";
import GDRoom from "./pages/GDRoom";
import GDResult from "./pages/GDResult";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gd-portal" element={<GDPortal />} />
          <Route path="/waiting-room" element={<WaitingRoom />} />
          <Route path="/gd-room-ai" element={<GDRoomAI />} />
          <Route path="/gd-room" element={<GDRoom />} />
          <Route path="/gd-result" element={<GDResult />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
