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

  const { isOpen, onToggle } = useDisclosure();

  const router = useRouter();
  const player = usePlayer();

  const RepeatComponent = {
    0: <TbRepeatOff />,
    1: <TbRepeat />,
    2: <TbRepeatOnce />,
  };

  useEffect(() => {
    if (!player) return;

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
    if (!playbackState) return;
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
    await toggleShuffle(!isShuffled);
    setShuffled((prev) => !prev);
  }

  return (
    <Slide
      direction="bottom"
      in={playbackState.context ? isOpen : ""}
      style={{ zIndex: 10 }}
    >
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
          <Stack pb={2} spacing="0.5rem">
            <Skeleton height="12px" isLoaded={current_track.name}>
              <Link color="white" fontSize="14px" fontWeight="600">
                {current_track.name || "dummy track"}
              </Link>
            </Skeleton>
            <Skeleton height="12px" isLoaded={current_track.artists[0].name}>
              <Link
                // pt="20px"
                fontSize="11px"
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
              onClick={() => {
                toggleShuffleHandler();
              }}
              _hover={{
                color: "hsla(0, 0%, 100%, 1)",
              }}
              variant="ghost"
              color={isShuffled ? "green.500" : "whiteAlpha.600"}
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
              onClick={() => {
                repeatModeHandler();
              }}
              _hover={{
                // fontSize: "42px",
                color: "hsla(0, 0%, 100%, 1)",
              }}
              variant="ghost"
              color={repeatMode ? "green.500" : "whiteAlpha.600"}
              fontSize="19px"
              icon={RepeatComponent[repeatMode]}
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
          <NextLink href="/queue">
            <IconButton
              _hover={{
                color: "hsla(0, 0%, 100%, 1)",
              }}
              as="a"
              variant="ghost"
              color="whiteAlpha.600"
              fontSize="20px"
              icon={<VscListFlat />}
            ></IconButton>
          </NextLink>
          <IconButton
            _hover={{
              color: "hsla(0, 0%, 100%, 1)",
            }}
            variant="ghost"
            color="whiteAlpha.600"
            fontSize="25px"
            icon={<BsVolumeDownFill />}
          ></IconButton>
          <Slider
            // value={player.volume}
            min={0}
            // max={playbackState?.duration || 0}
            onChange={(value) => {
              console.log("value", value);
              // console.log("argument", playbackState.duration * (value / 100));
              player.setVolume(value / 100);
            }}
            width="30%"
          >
            <SliderTrack bg="gray">
              <SliderFilledTrack bg="white" />
            </SliderTrack>
            <SliderThumb boxSize={2}></SliderThumb>
          </Slider>

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
    </Slide>
  );
}
