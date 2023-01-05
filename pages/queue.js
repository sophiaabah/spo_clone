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
  propNames,
} from "@chakra-ui/react";
import { BiCategory } from "react-icons/bi";
import { FiSearch, FiHeart } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  BsFillPlayCircleFill,
  BsVolumeDownFill,
  BsThreeDots,
} from "react-icons/bs";
import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import shuffle from "lodash.shuffle";
import Layout from "../components/layout";
import NavButtons from "../components/navButtons";
import AlbumCard from "../components/albumCard";
import {
  getTopTracks,
  getLikedAlbums,
  getRelatedArtists,
  getUsersQueue,
} from "../lib/api";
import { timeToString } from "../lib/helpers";
import { colorPicker } from "../lib/color";

export default function QueuePage() {
  const [queue, setQueue] = useState({});
  const [player, setPlayer] = useState({});

  useEffect(() => {
    async function loadUsersQueue() {
      setPlayer(JSON.parse(sessionStorage.getItem("player")));
      if (player.length < 1) return;
      const fetchedQueue = await getUsersQueue();
      setQueue(fetchedQueue);
      console.log("my queue", fetchedQueue);
    }

    loadUsersQueue();
  }, [player]);
  return (
    <Layout>
      <Stack px={10} pb={6} spacing={3}>
        <NavButtons />
        <Heading pt={10} pb={4} fontSize="24px">
          Queue
        </Heading>
        <Text color="#A7A7A7" fontSize="16px" fontWeight={700}>
          Now Playing
        </Text>
        <Stack pb={4}>
          <Stack
            borderRadius="md"
            p={2}
            // bgColor="hsla(0, 0%, 35%, .1)"
            _hover={{
              textDecoration: "none",
              bgColor: "hsla(0, 0%, 45%, .14)",
            }}
            width="100%"
            justify="space-between"
            alignItems="center"
            direction="row"
          >
            <Stack alignItems="center" spacing={5} direction="row">
              <Text>1</Text>
              <Image
                alt="track"
                src={queue?.currently_playing?.album?.images[0]?.url}
                boxSize="40px"
              />
              <Stack spacing={0}>
                <Text fontWeight={500}>{queue?.currently_playing?.name}</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  {queue?.currently_playing?.artists[0]?.name}
                </Link>
              </Stack>
            </Stack>
            <Stack width="45%" justify="space-between" direction="row">
              <Stack alignSelf="center">
                <Text color="whiteAlpha.700" fontSize="14px">
                  Bad blood
                </Text>
              </Stack>
              <Stack spacing={4} alignItems="center" direction="row">
                <IconButton
                  fontSize="18px"
                  visibility="hidden"
                  _hover={{
                    color: "hsla(0, 0%, 100%, 1)",
                    visibility: "visible",
                  }}
                  variant="ghost"
                  color="whiteAlpha.700"
                  icon={<FiHeart />}
                ></IconButton>
                <Text fontSize="sm" color="whiteAlpha.700">
                  {timeToString(queue?.currently_playing?.duration_ms)}
                </Text>
                <IconButton
                  fontSize="18px"
                  visibility="hidden"
                  _hover={{
                    color: "hsla(0, 0%, 100%, 1)",
                    visibility: "visible",
                  }}
                  variant="ghost"
                  color="whiteAlpha.700"
                  icon={<BsThreeDots />}
                ></IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Text color="#A7A7A7" fontSize="16px" fontWeight={700}>
          Up Next:
        </Text>
        <Stack>
          {queue?.queue?.map((track, index) => {
            return (
              <Stack
                key={index}
                borderRadius="md"
                p={2}
                // bgColor="hsla(0, 0%, 35%, .1)"
                _hover={{
                  textDecoration: "none",
                  bgColor: "hsla(0, 0%, 45%, .14)",
                }}
                width="100%"
                justify="space-between"
                alignItems="center"
                direction="row"
              >
                <Stack alignItems="center" spacing={5} direction="row">
                  <Text>{index + 2}</Text>
                  <Image
                    alt="track"
                    src={track?.album?.images[0]?.url}
                    boxSize="40px"
                  />
                  <Stack spacing={0}>
                    <Text fontWeight={500}>{track?.name}</Text>
                    <Link color="whiteAlpha.700" fontSize="sm">
                      {track?.artists[0]?.name}
                    </Link>
                  </Stack>
                </Stack>
                <Stack width="45%" justify="space-between" direction="row">
                  <Stack alignSelf="center">
                    <Text color="whiteAlpha.700" fontSize="14px">
                      {track?.album?.name}
                    </Text>
                  </Stack>
                  <Stack spacing={4} alignItems="center" direction="row">
                    <IconButton
                      fontSize="18px"
                      visibility="hidden"
                      _hover={{
                        color: "hsla(0, 0%, 100%, 1)",
                        visibility: "visible",
                      }}
                      variant="ghost"
                      color="whiteAlpha.700"
                      icon={<FiHeart />}
                    ></IconButton>
                    <Text fontSize="sm" color="whiteAlpha.700">
                      {timeToString(track?.duration_ms)}
                    </Text>
                    <IconButton
                      fontSize="18px"
                      visibility="hidden"
                      _hover={{
                        color: "hsla(0, 0%, 100%, 1)",
                        visibility: "visible",
                      }}
                      variant="ghost"
                      color="whiteAlpha.700"
                      icon={<BsThreeDots />}
                    ></IconButton>
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Layout>
  );
}
