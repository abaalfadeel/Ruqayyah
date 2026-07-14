import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import IntroScene from './pages/IntroScene.jsx';
import GiftBoxScene from './pages/GiftBoxScene.jsx';
import TableScene from './pages/TableScene.jsx';
import JourneyMap from './pages/JourneyMap.jsx';
import CameraScene from './pages/CameraScene.jsx';
import WishesScene from './pages/WishesScene.jsx';
import LettersScene from './pages/LettersScene.jsx';
import GameScene from './pages/GameScene.jsx';
import PhotoBoxScene from './pages/PhotoBoxScene.jsx';
import FinalGiftScene from './pages/FinalGiftScene.jsx';
import AchievementToast from './components/AchievementToast.jsx';
import MuteToggle from './components/MuteToggle.jsx';

export default function App() {
  return (
    <>
      <AchievementToast />
      <MuteToggle />
      <Routes>
        <Route path="/" element={<IntroScene />} />
        <Route path="/gift" element={<GiftBoxScene />} />
        <Route path="/table" element={<TableScene />} />
        <Route path="/map" element={<JourneyMap />} />
        <Route path="/camera" element={<CameraScene />} />
        <Route path="/wishes" element={<WishesScene />} />
        <Route path="/letters" element={<LettersScene />} />
        <Route path="/game" element={<GameScene />} />
        <Route path="/photos" element={<PhotoBoxScene />} />
        <Route path="/final-gift" element={<FinalGiftScene />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
