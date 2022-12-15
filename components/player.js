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
  Slide,
  chakra,
  FormControl,
  useDisclosure,
  useToast,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import Script from "next/dist/client/script";
import { BsFillPlayCircleFill, BsVolumeDownFill } from "react-icons/bs";
import { TiArrowShuffle } from "react-icons/ti";
import {
  TbMicrophone2,
  TbRepeat,
  TbRepeatOff,
  TbRepeatOnce,
} from "react-icons/tb";
import { VscListFlat } from "react-icons/vsc";
import { MdPauseCircleFilled } from "react-icons/md";
import { timeToString } from "../lib/helpers";
import { changeRepeatMode, toggleShuffle } from "../lib/api";
import { usePlayer } from "../lib/hooks";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

export default function Player() {
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [playbackState, setPlaybackState] = useState({});
  const [repeatMode, setRepeatMode] = useState(0);
  const [isShuffled, setShuffled] = useState(undefined);

  const router = useRouter();
  const player = usePlayer();
  const toast = useToast();

  const RepeatComponent = {
    0: <TbRepeatOff />,
    1: <TbRepeat />,
    2: <TbRepeatOnce />,
  };

  useEffect(() => {
    if (!player) {
      // toast({
      //   title: "Player not yet connected.",
      //   description:
      //     "To play music, please connect this web app as a device in your spotify app.",
      //   status: "warning",
      //   duration: 9000,
      //   isClosable: true,
      // });
      return;
    }

    async function getPlayerState() {
      const state = await player.getCurrentState();
      console.log("player state", state);
    }
    getPlayerState();

    player.addListener("player_state_changed", (state) => {
      if (!state) {
        console.log("no state available", state);
        return;
      }

      console.log(state);
      setTrack(state.track_window.current_track);
      setPaused(state.paused);
      setRepeatMode(state.repeat_mode);
      setShuffled(state.shuffle);
      setPlaybackState({
        context: state.context,
        duration: state.duration,
        position: state.position,
        stateRepeatMode: state.repeat_mode,
        shuffle: state.shuffle,
        timestap: state.timestamp,
      });
    });

    return () => {
      player.removeListener("player_state_changed");
    };
  }, [player]);

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
  }, [player, is_paused, playbackState]);

  async function repeatModeHandler() {
    if (!playbackState.context) return;
    changeRepeatMode(repeatMode).finally(() => {
      switch (repeatMode) {
        case 0:
          setRepeatMode(1);
          break;
        case 1:
          setRepeatMode(2);
          break;
        case 2:
          setRepeatMode(0);
          break;
      }
    });
  }

  async function toggleShuffleHandler() {
    if (!playbackState.context) return;
    await toggleShuffle(!isShuffled);
    setShuffled((prev) => !prev);
  }

  return (
    <Slide
      style={{ zIndex: 10 }}
      direction="bottom"
      in={!!playbackState.context}
    >
      <Stack
        justify="space-between"
        bottom={0}
        left={0}
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
          <Stack pb={2} spacing="0.5rem">
            <Link color="white" fontSize="14px" fontWeight="600">
              {current_track.name || ""}
            </Link>
            <Link
              // pt="20px"
              fontSize="11px"
              fontWeight="400"
              color="whiteAlpha.600"
            >
              {current_track.artists[0].name || ""}
            </Link>
          </Stack>
        </Stack>
        <Stack flex={1}>
          <Stack alignSelf="center" spacing={1} direction="row">
            <IconButton
              onClick={() => {
                toggleShuffleHandler();
              }}
              _hover={{
                color: "hsla(0, 0%, 100%, 1)",
                bgColor: "transparent",
              }}
              bgColor="transparent"
              _active={{ bgColor: "transparent" }}
              color={isShuffled ? "green.500" : "whiteAlpha.600"}
              fontSize="22px"
              icon={<TiArrowShuffle />}
            ></IconButton>
            <Stack direction="row" spacing={3}>
              <IconButton
                onClick={() => {
                  if (playbackState.context) {
                    player.previousTrack();
                  }
                }}
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                  bgColor: "transparent",
                }}
                bgColor="transparent"
                _active={{ bgColor: "transparent" }}
                variant="ghost"
                color="whiteAlpha.700"
                fontSize="25px"
                icon={<IoIosSkipBackward />}
              ></IconButton>
              <IconButton
                onClick={() => {
                  if (playbackState.context) {
                    player.togglePlay();
                  }
                }}
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                  bgColor: "transparent",
                }}
                bgColor="transparent"
                _active={{ bgColor: "transparent" }}
                variant="ghost"
                color="whiteAlpha.800"
                fontSize="40px"
                icon={
                  is_paused ? <BsFillPlayCircleFill /> : <MdPauseCircleFilled />
                }
              ></IconButton>
              <IconButton
                onClick={() => {
                  if (playbackState.context) {
                    player.nextTrack();
                  }
                }}
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                  bgColor: "transparent",
                }}
                bgColor="transparent"
                _active={{ bgColor: "transparent" }}
                variant="ghost"
                color="whiteAlpha.700"
                fontSize="25px"
                icon={<IoIosSkipForward />}
              ></IconButton>
            </Stack>
            <IconButton
              onClick={() => {
                repeatModeHandler();
              }}
              _hover={{
                color: "hsla(0, 0%, 100%, 1)",
                bgColor: "transparent",
              }}
              variant="ghost"
              bgColor="transparent"
              _active={{ bgColor: "transparent" }}
              color={repeatMode ? "green.500" : "whiteAlpha.600"}
              fontSize="19px"
              icon={RepeatComponent[repeatMode]}
            ></IconButton>
          </Stack>
          <Stack width="" alignItems="center" direction="row">
            <Text fontSize="xs" fontWeight="400" color="whiteAlpha.600">
              {playbackState.position
                ? timeToString(playbackState?.position)
                : "0:00"}
            </Text>

            <Slider
              value={
                (playbackState?.position / playbackState.duration) * 100 || 0
              }
              min={0}
              onChange={(value) => {
                if (playbackState.duration) {
                  player.seek(playbackState.duration * (value / 100));
                }
              }}
            >
              <SliderTrack bg="gray">
                <SliderFilledTrack bg="white" />
              </SliderTrack>
              <SliderThumb boxSize={2}></SliderThumb>
            </Slider>
            <Text fontSize="xs" fontWeight="400" color="whiteAlpha.600">
              {playbackState.position
                ? timeToString(playbackState?.duration)
                : "0:00"}
            </Text>
          </Stack>
        </Stack>

        <Stack
          pr={8}
          justify="flex-end"
          flex={1}
          alignItems="center"
          spacing={0}
          direction="row"
        >
          <NextLink href={router.pathname === "/queue" ? "/library" : "/queue"}>
            <IconButton
              _hover={{
                color: "hsla(0, 0%, 100%, 1)",
              }}
              as="a"
              bgColor="transparent"
              _active={{ bgColor: "transparent" }}
              variant="ghost"
              color="whiteAlpha.600"
              fontSize="20px"
              icon={<VscListFlat />}
            ></IconButton>
          </NextLink>
          <Icon
            _hover={{
              color: "hsla(0, 0%, 100%, 1)",
            }}
            color="hsla(0, 0%, 100%, 1)"
            fontSize="25px"
            as={BsVolumeDownFill}
          />
          <Slider
            min={0}
            onChange={(value) => {
              if (playbackState.context) {
                player.setVolume(value / 100);
              }
            }}
            width="30%"
          >
            <SliderTrack bg="gray">
              <SliderFilledTrack bg="white" />
            </SliderTrack>
            <SliderThumb boxSize={2}></SliderThumb>
          </Slider>
        </Stack>
      </Stack>
    </Slide>
  );
}
