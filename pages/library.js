import {
  Box,
  Flex,
  Image,
  Center,
  Spacer,
  Link,
  List,
  ListItem,
  ListIcon,
  Divider,
  Progress,
  Input,
  HStack,
  Button,
  Text,
  Stack,
  Heading,
  VStack,
  SimpleGrid,
  Grid,
  GridItem,
  Checkbox,
  ButtonGroup,
  FormLabel,
  IconButton,
  Container,
  Wrap,
  WrapItem,
  chakra,
  FormControl,
  Icon,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpotify, FaHeart } from "react-icons/fa";
import Script from "next/dist/client/script";
import Layout from "../components/layout";
import Player from "../components/player";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

export default function App() {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const session_token = localStorage.getItem("session_token");

      const spotify_instance = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(session_token);
        },
        volume: 0.5,
      });

      setPlayer(spotify_instance);

      spotify_instance.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      spotify_instance.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      spotify_instance.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      spotify_instance.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      spotify_instance.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      spotify_instance.addListener("player_state_changed", (state) => {
        if (!state) {
          console.log(state);
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        spotify_instance.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      spotify_instance.connect();

      getUserPlaylists();
      getRecentlyPlayed();
      getRelatedArtists();
      getUsersAlbums();
    };
  }, []);

  async function getUserPlaylists() {
    const session_token = localStorage.getItem("session_token");

    let userPlaylists = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
    });
    let parsedUserPlaylists = await userPlaylists.json();
    if (parsedUserPlaylists.error) {
      throw Error("User authentication for Spotify failed");
    }

    // console.log("User playlists", parsedUserPlaylists);
    setPlaylists(parsedUserPlaylists.items);
  }

  async function getRecentlyPlayed() {
    const session_token = localStorage.getItem("session_token");

    let recentlyPlayed = await fetch(
      `https://api.spotify.com/v1/me/top/tracks`,
      {
        headers: {
          Authorization: `Bearer ${session_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    let parsedRecentlyPlayed = await recentlyPlayed.json();
    if (parsedRecentlyPlayed.error) {
      throw Error("User authentication for Spotify failed");
    }
    // console.log("recently played songs", parsedRecentlyPlayed);
    // console.log(
    //   "liked artist",
    //   parsedRecentlyPlayed.items[1].album.artists[0].id
    // );

    localStorage.setItem(
      "liked_artist",
      parsedRecentlyPlayed.items[1].album.artists[0].id
    );

    setRecentlyPlayedTracks(parsedRecentlyPlayed.items);
  }

  async function getRelatedArtists() {
    const session_token = localStorage.getItem("session_token");
    const likedArtistId = localStorage.getItem("liked_artist");
    console.log(likedArtistId);

    let relatedArtists = await fetch(
      `https://api.spotify.com/v1/artists/${likedArtistId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${session_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    let parsedRelatedArtists = await relatedArtists.json();
    if (parsedRelatedArtists.error) {
      throw Error("User authentication for Spotify failed");
    }
    console.log("related artists", parsedRelatedArtists.artists.slice(0, 6));
    setRelatedArtists(parsedRelatedArtists.artists.slice(0, 6));
  }

  async function getUsersAlbums() {
    const session_token = localStorage.getItem("session_token");

    let usersAlbums = await fetch(`https://api.spotify.com/v1/me/albums`, {
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
    });

    let parsedUsersAlbums = await usersAlbums.json();
    if (parsedUsersAlbums.error) {
      throw Error("User authentication for Spotify failed");
    }
    console.log("albums", parsedUsersAlbums.items.slice(0, 6));
    setAlbums(parsedUsersAlbums.items.slice(0, 6));
  }

  return (
    <Layout playlists={playlists}>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="afterInteractive"
      ></Script>
      <Stack spacing={12}>
        <Stack spacing={4}>
          <Heading pb={3} fontSize="3xl">
            Good evening
          </Heading>
          <SimpleGrid columns={3} spacing={6}>
            <Link
              borderRadius="lg"
              overflow="hidden"
              height="100%"
              bgColor="hsla(0, 0%, 35%, .1)"
              _hover={{
                textDecoration: "none",
                bgColor: "hsla(0, 0%, 45%, .14)",
              }}
            >
              <Stack spacing={0} alignItems="center" direction="row">
                <Image
                  boxSize="85px"
                  src={recentlyPlayedTracks[0]?.album.images[0]?.url}
                  alt="album cover"
                ></Image>
                <Stack
                  px={4}
                  width="100%"
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text fontSize="md" fontWeight="600">
                    {recentlyPlayedTracks[0]?.album.name}
                  </Text>
                </Stack>
              </Stack>
            </Link>

            <Link
              borderRadius="lg"
              overflow="hidden"
              height="100%"
              bgColor="hsla(0, 0%, 35%, .1)"
              _hover={{
                textDecoration: "none",
                bgColor: "hsla(0, 0%, 45%, .14)",
              }}
            >
              <Stack spacing={0} alignItems="center" direction="row">
                <Image
                  boxSize="85px"
                  src={recentlyPlayedTracks[4]?.album.images[0]?.url}
                  alt="album cover"
                ></Image>
                <Stack
                  px={4}
                  width="100%"
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text fontSize="md" fontWeight="600">
                    {recentlyPlayedTracks[4]?.album.name}
                  </Text>
                </Stack>
              </Stack>
            </Link>

            <Link
              borderRadius="lg"
              overflow="hidden"
              height="100%"
              bgColor="hsla(0, 0%, 35%, .1)"
              _hover={{
                textDecoration: "none",
                bgColor: "hsla(0, 0%, 45%, .14)",
              }}
            >
              <Stack spacing={0} alignItems="center" direction="row">
                <Image
                  boxSize="85px"
                  src={recentlyPlayedTracks[6]?.album.images[0]?.url}
                  alt="album cover"
                ></Image>
                <Stack
                  px={4}
                  width="100%"
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text fontSize="md" fontWeight="600">
                    {recentlyPlayedTracks[6]?.album.name}
                  </Text>
                </Stack>
              </Stack>
            </Link>
          </SimpleGrid>
          <SimpleGrid columns={3} spacing={6}>
            <Link
              borderRadius="lg"
              overflow="hidden"
              height="100%"
              bgColor="hsla(0, 0%, 35%, .1)"
              _hover={{
                textDecoration: "none",
                bgColor: "hsla(0, 0%, 45%, .14)",
              }}
            >
              <Stack spacing={0} alignItems="center" direction="row">
                <Image
                  boxSize="85px"
                  src={recentlyPlayedTracks[8]?.album.images[0]?.url}
                  alt="album cover"
                ></Image>
                <Stack
                  px={4}
                  width="100%"
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text fontSize="md" fontWeight="600">
                    {recentlyPlayedTracks[8]?.album.name}
                  </Text>
                  {/* <IconButton
                          variant="ghost"
                          colorScheme="grey"
                          fontSize="40px"
                          icon={<BsFillPlayCircleFill />}
                        ></IconButton> */}
                </Stack>
              </Stack>
            </Link>

            <Link
              borderRadius="lg"
              overflow="hidden"
              height="100%"
              bgColor="hsla(0, 0%, 35%, .1)"
              _hover={{
                textDecoration: "none",
                bgColor: "hsla(0, 0%, 45%, .14)",
              }}
            >
              <Stack spacing={0} alignItems="center" direction="row">
                <Image
                  boxSize="85px"
                  src={recentlyPlayedTracks[13]?.album.images[0]?.url}
                  alt="album cover"
                ></Image>
                <Stack
                  px={4}
                  width="100%"
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text fontSize="md" fontWeight="600">
                    {recentlyPlayedTracks[13]?.album.name}
                  </Text>
                  {/* <IconButton
                          variant="ghost"
                          colorScheme="grey"
                          fontSize="40px"
                          icon={<BsFillPlayCircleFill />}
                        ></IconButton> */}
                </Stack>
              </Stack>
            </Link>

            <Link
              borderRadius="lg"
              overflow="hidden"
              height="100%"
              bgColor="hsla(0, 0%, 35%, .1)"
              _hover={{
                textDecoration: "none",
                bgColor: "hsla(0, 0%, 45%, .14)",
              }}
            >
              <Stack
                spacing={0}
                alignItems="center"
                justify="center"
                direction="row"
              >
                <Center
                  borderRadius="sm"
                  bgColor="purple"
                  height="85px"
                  width="113px"
                >
                  <Icon fontSize="22px" as={FaHeart} color="white" />
                </Center>
                <Stack
                  px={4}
                  width="100%"
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text fontSize="md" fontWeight="600">
                    Liked Songs
                  </Text>
                  {/* <IconButton
                          variant="ghost"
                          colorScheme="grey"
                          fontSize="40px"
                          icon={<BsFillPlayCircleFill />}
                        ></IconButton> */}
                </Stack>
              </Stack>
            </Link>
          </SimpleGrid>
        </Stack>

        <Stack spacing={6}>
          <Stack alignItems="baseline" direction="row" justify="space-between">
            <Heading fontSize="xl">Jump back in</Heading>
            <Link
              fontSize="sm"
              color="whiteAlpha.700"
              fontWeight={500}
              textTransform="uppercase"
            >
              See All
            </Link>
          </Stack>

          <SimpleGrid columns={6} spacing={8}>
            {albums.map((item, index) => {
              return (
                <Link
                  key={index}
                  borderRadius="lg"
                  overflow="hidden"
                  height="100%"
                  width="11.25rem"
                  bgColor="hsla(0, 0%, 30%, .1)"
                  _hover={{
                    textDecoration: "none",
                    bgColor: "hsla(0, 0%, 43%, .14)",
                  }}
                >
                  <Stack p={4} pb={8} spacing={3} alignItems="center">
                    <Image
                      width="170px"
                      borderRadius="md"
                      src={item?.album.images[0].url}
                      alt="album cover"
                    />
                    <Stack
                      minWidth="0px"
                      overflow="hidden"
                      spacing={1}
                      alignSelf="start"
                    >
                      <Text
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        fontSize="md"
                        fontWeight="600"
                      >
                        {item?.album.name}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="400"
                        color="whiteAlpha.600"
                      >
                        {item?.album.artists[0]?.name}
                      </Text>
                    </Stack>
                  </Stack>
                </Link>
              );
            })}
          </SimpleGrid>
          <Heading pt={5} fontSize="xl">
            Recommended for you
          </Heading>
          <SimpleGrid columns={6} spacing={8}>
            {relatedArtists.map((item, index) => {
              return (
                <Link
                  key={index}
                  borderRadius="lg"
                  overflow="hidden"
                  height="100%"
                  width="11.25rem"
                  bgColor="hsla(0, 0%, 30%, .1)"
                  _hover={{
                    textDecoration: "none",
                    bgColor: "hsla(0, 0%, 43%, .14)",
                  }}
                >
                  <Stack p={4} pb={8} spacing={3} alignItems="center">
                    <Image
                      boxSize="148px"
                      borderRadius="md"
                      src={item?.images[0]?.url}
                      alt="album cover"
                    />
                    <Stack
                      minWidth="0px"
                      overflow="hidden"
                      spacing={1}
                      alignSelf="start"
                    >
                      <Text
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        fontSize="md"
                        fontWeight="600"
                      >
                        {item?.name}
                      </Text>
                      <Text
                        textTransform="capitalize"
                        fontSize="sm"
                        fontWeight="400"
                        color="whiteAlpha.600"
                      >
                        {item?.genres[0]}
                      </Text>
                    </Stack>
                  </Stack>
                </Link>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Stack>
      <Player player={player} current_track={current_track} />
    </Layout>
  );
}