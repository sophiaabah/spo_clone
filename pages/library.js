import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Player from "../components/player";
import RecommendedList from "../components/recommended";
import SongsFeed from "../components/songsFeed";

export default function App() {
  return (
    <Layout>
      <SongsFeed next={<RecommendedList />} />
      <Player />
    </Layout>
  );
}
