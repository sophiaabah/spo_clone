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
import React, { useEffect, useState } from "react";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import Script from "next/dist/client/script";
import { BsFillPlayCircleFill, BsVolumeDownFill } from "react-icons/bs";
import { TiArrowShuffle } from "react-icons/ti";
import { TbMicrophone2, TbRepeat } from "react-icons/tb";
import { VscListFlat } from "react-icons/vsc";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

export default function Player() {
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

      // return (
      //   spotify_instance.removeListener()
      // );
    };
  }, []);

  return (
    <Stack
      justify="space-between"
      position="fixed"
      bottom={0}
      left={0}
      zIndex={2}
      width="100%"
      direction="row"
      justifyItems="center"
      py={4}
      bgColor="#181818"
    >
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="afterInteractive"
      ></Script>
      <Stack flex={1} px={5} spacing={4} alignItems="center" direction="row">
        <Image
          width="55px"
          src={current_track.album.images[0].url || ""}
          alt="album cover"
        />
        <Stack spacing="0.1rem">
          <Link fontSize="sm" fontWeight="600">
            {current_track.name || "dummy track"}
          </Link>
          <Link fontSize="xs" fontWeight="400" color="whiteAlpha.600">
            {current_track.artists[0].name || "dummy link"}
          </Link>
        </Stack>
        <IconButton
          _hover={{
            color: "hsla(0, 0%, 100%, 1)",
          }}
          variant="ghost"
          color="gray"
          icon={<FiHeart />}
        ></IconButton>
      </Stack>
      <Stack flex={1}>
        <Stack alignSelf="center" spacing={1} direction="row">
          <IconButton
            _hover={{
              color: "hsla(0, 0%, 100%, 1)",
            }}
            variant="ghost"
            color="whiteAlpha.600"
            fontSize="22px"
            icon={<TiArrowShuffle />}
          ></IconButton>
          <Stack direction="row" spacing={3}>
            <IconButton
              onClick={() => {
                player.previousTrack();
              }}
              _hover={{
                color: "hsla(0, 0%, 100%, 1)",
              }}
              variant="ghost"
              color="whiteAlpha.700"
              fontSize="25px"
              icon={<IoIosSkipBackward />}
            ></IconButton>
            <IconButton
              onClick={() => {
                player.togglePlay();
              }}
              _hover={{
                // fontSize: "42px",
                color: "hsla(0, 0%, 100%, 1)",
              }}
              variant="ghost"
              color="whiteAlpha.800"
              fontSize="40px"
              icon={<BsFillPlayCircleFill />}
            ></IconButton>
            <IconButton
              onClick={() => {
                player.nextTrack();
              }}
              _hover={{
                // fontSize: "42px",
                color: "hsla(0, 0%, 100%, 1)",
              }}
              variant="ghost"
              color="whiteAlpha.700"
              fontSize="25px"
              icon={<IoIosSkipForward />}
            ></IconButton>
          </Stack>
          <IconButton
            _hover={{
              // fontSize: "42px",
              color: "hsla(0, 0%, 100%, 1)",
            }}
            variant="ghost"
            color="whiteAlpha.600"
            fontSize="20px"
            icon={<TbRepeat />}
          ></IconButton>
        </Stack>
        <Stack alignItems="center" direction="row">
          <Text fontSize="xs" fontWeight="400" color="whiteAlpha.600">
            0:00
          </Text>

          <Progress w="100%" value={0} size="xs" color="grey" />
          <Text fontSize="xs" fontWeight="400" color="whiteAlpha.600">
            2:56
          </Text>
        </Stack>
      </Stack>

      <Stack
        pr={4}
        justify="flex-end"
        flex={1}
        alignItems="center"
        spacing={0}
        direction="row"
      >
        <IconButton
          _hover={{
            color: "hsla(0, 0%, 100%, 1)",
          }}
          variant="ghost"
          color="whiteAlpha.600"
          fontSize="18px"
          icon={<TbMicrophone2 />}
        ></IconButton>
        <IconButton
          _hover={{
            color: "hsla(0, 0%, 100%, 1)",
          }}
          variant="ghost"
          color="whiteAlpha.600"
          fontSize="20px"
          icon={<VscListFlat />}
        ></IconButton>
        <IconButton
          _hover={{
            color: "hsla(0, 0%, 100%, 1)",
          }}
          variant="ghost"
          color="whiteAlpha.600"
          fontSize="25px"
          icon={<BsVolumeDownFill />}
        ></IconButton>
        <Progress w="20%" value={0} size="xs" colorScheme="pink" />

        <IconButton
          _hover={{
            color: "hsla(0, 0%, 100%, 1)",
          }}
          variant="ghost"
          color="whiteAlpha.600"
          fontSize="20px"
          icon={<AiOutlineFullscreen />}
        ></IconButton>
      </Stack>
    </Stack>
  );
}
