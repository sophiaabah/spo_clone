import {
  Box,
  Flex,
  Image,
  Center,
  Spacer,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
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
  Skeleton,
  WrapItem,
  chakra,
  FormControl,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import Script from "next/dist/client/script";
import { BsFillPlayCircleFill, BsVolumeDownFill } from "react-icons/bs";
import { TiArrowShuffle } from "react-icons/ti";
import { TbMicrophone2, TbRepeat } from "react-icons/tb";
import { VscListFlat } from "react-icons/vsc";
import { MdPauseCircleFilled } from "react-icons/md";
import { timeToString } from "../lib/helpers";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

export default function Player() {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [playbackState, setPlaybackState] = useState({});

  const router = useRouter();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = localStorage.getItem("token");

      const spotifyInstance = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(spotifyInstance);

      spotifyInstance.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      spotifyInstance.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      spotifyInstance.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      spotifyInstance.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      spotifyInstance.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      spotifyInstance.addListener("player_state_changed", (state) => {
        if (!state) {
          console.log(state);
          return;
        }
        console.log(state);
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setPlaybackState({
          context: state.context,
          duration: state.duration,
          position: state.position,
          repeatMode: state.repeat_mode,
          shuffle: state.shuffle,
          timestap: state.timestamp,
        });
      });

      spotifyInstance.connect();

      return () => {
        spotifyInstance.removeListener("ready");
        spotifyInstance.removeListener("not_ready");
        spotifyInstance.removeListener("initialization_error");
        spotifyInstance.removeListener("account_error");
        spotifyInstance.removeListener("player_state_changed");
      };
    };
  }, []);

  // function timeToString(time) {
  //   let diffInMin = time / 60000;
  //   let mm = Math.floor(diffInMin);

  //   let diffInSec = (diffInMin - mm) * 60;
  //   let ss = Math.floor(diffInSec);
  //   let formattedSS = ss.toString().padStart(2, "0");
  //   return `${mm}:${formattedSS}`;
  // }

  useEffect(() => {
    if (is_paused === false) {
      const interval = setInterval(() => {
        setPlaybackState((prev) => ({
          ...prev,
          position: prev.position + 1000,
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [player, is_paused]);

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
      {/* <Skeleton isLoaded={!current_track}> */}
      <Stack flex={1} px={5} spacing={4} alignItems="center" direction="row">
        <Skeleton height="55px" isLoaded={current_track.album.images[0].url}>
          <Image
            width="55px"
            src={current_track.album.images[0].url || ""}
            alt="album cover"
          />
        </Skeleton>
        <Stack spacing="0.5rem">
          <Skeleton height="12px" isLoaded={current_track.name}>
            <Link fontSize="sm" fontWeight="600">
              {current_track.name || "dummy track"}
            </Link>
          </Skeleton>
          <Skeleton height="12px" isLoaded={current_track.artists[0].name}>
            <Link
              // pt="20px"
              fontSize="xs"
              fontWeight="400"
              color="whiteAlpha.600"
            >
              {current_track.artists[0].name || "dummy link"}
            </Link>
          </Skeleton>
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
      {/* </Skeleton> */}
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
              icon={
                is_paused ? <BsFillPlayCircleFill /> : <MdPauseCircleFilled />
              }
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
        <Stack width="" alignItems="center" direction="row">
          <Text fontSize="xs" fontWeight="400" color="whiteAlpha.600">
            {/* 0:00 */}
            {playbackState.position
              ? timeToString(playbackState?.position)
              : "0:00"}
          </Text>

          <Slider
            value={
              (playbackState?.position / playbackState.duration) * 100 || 0
            }
            min={0}
            // max={playbackState?.duration || 0}
            onChange={(value) => {
              console.log("value", value);
              // console.log("argument", playbackState.duration * (value / 100));
              player.seek(playbackState.duration * (value / 100));
            }}
          >
            <SliderTrack bg="gray">
              <SliderFilledTrack bg="white" />
            </SliderTrack>
            <SliderThumb boxSize={2}></SliderThumb>
          </Slider>
          <Text fontSize="xs" fontWeight="400" color="whiteAlpha.600">
            {/* 2:56 */}
            {playbackState.position
              ? timeToString(playbackState?.duration)
              : "0:00"}
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
