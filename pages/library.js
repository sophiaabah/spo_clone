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
      
    };
  }, []);

  return (
    <Layout>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="afterInteractive"
      ></Script>
      <Stack spacing={12}>
        <Stack spacing={6}>
          <Heading fontSize="3xl">Good evening</Heading>
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
                  src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
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
                    Currents
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
                  src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
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
                    Currents
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
                  src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
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
                    Currents
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
            <Heading fontSize="xl">Recently played</Heading>
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
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
          </SimpleGrid>

          <SimpleGrid columns={6} spacing={8}>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
          </SimpleGrid>

          <SimpleGrid columns={6} spacing={8}>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
            <Link
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
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Link>
          </SimpleGrid>
        </Stack>
      </Stack>
      <Player player={player} current_track={current_track} />
    </Layout>
  );
}
