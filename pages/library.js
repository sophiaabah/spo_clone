import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import Player from "../components/player";
import SongsFeed from "../components/songsFeed";

export default function App() {
  return (
    <Layout>
      <SongsFeed />
      <Player />
    </Layout>
  );
}
