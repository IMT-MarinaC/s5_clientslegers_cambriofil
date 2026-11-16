import {Route, Routes} from 'react-router';
import Layout from './components/layout/Layout';
import ContractsPage from './pages/ContractsPage';
import MissionPage from './pages/MissionPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage.tsx';
import HideoutPage from './pages/HideoutPage';
import TrophyBoardPage from './pages/TrophyBoardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ContractsPage />} />
          <Route path="contrats/:contractId" element={<MissionPage />} />
          <Route path="oeuvre/:id" element={<ArtworkDetailPage />} />
          <Route path="planque" element={<HideoutPage />} />
          <Route path="tableau-de-chasse" element={<TrophyBoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
  );
}