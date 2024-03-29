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
  ModalOverlay,
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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import shuffle from "lodash.shuffle";
import Layout from "../components/layout";
import AlbumCard from "../components/albumCard";
import NavButtons from "../components/navButtons";
import {
  getTopTracks,
  getLikedAlbums,
  getRelatedArtists,
  handlePlay,
  playNewContext,
} from "../lib/api";
import { colorPicker } from "../lib/color";

export default function Library() {
  const [recentAlbums, setRecentAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [bgColor, setBgColor] = useState("#4c5441");
  const [currentUri, setCurrentUri] = useState("");
  const [isPlaying, setPlaying] = useState(true);

  const imgRef = useRef();
  const router = useRouter();

  useEffect(() => {
    async function fetchSongsFeed() {
      // fetching top tracks
      const fetchedTopTracks = await getTopTracks();
      const shuffledTopTracks = shuffle(fetchedTopTracks);
      console.log("shuffled top tracks", shuffledTopTracks);

      // shuffledTopTracks[0].artists[0].id , name -- artists id and name
      // shuffledTopTracks[0].id -- track id
      //
      const suggestedArtists = await getRelatedArtists(
        shuffledTopTracks[0].artists[0].id
      );
      console.log("related artists", suggestedArtists);
      setRelatedArtists(suggestedArtists.artists.slice(0, 6));

      // get album of top track, filter by album.id to get unique albums, then slice and add to recent albums state
      const albums = shuffledTopTracks.map(
        (shuffledTopTracks) => shuffledTopTracks.album
      );
      const uniqueAlbums = albums.filter((album, index) => {
        // get item - id = abo, index = 0
        const foundIndex = albums.findIndex((a) => {
          // find another item with id = abo
          return a.id === album.id;
        });

        // let´s say you find the item and the index is 4
        // we check if 0 === 4, since its not equal to 4, then we remove it from the array
        return index === foundIndex;
      });
      setRecentAlbums(uniqueAlbums.slice(0, 6));

      // fetching users liked albums and slicing the array

      const usersLikedAlbums = await getLikedAlbums();
      console.log("liked albums", usersLikedAlbums);
      setLikedAlbums(usersLikedAlbums.slice(0, 6));
    }

    fetchSongsFeed();
  }, []);

  function changeBgStyle() {
    imgRef.current.onload = () => {
      console.log("my ref", imgRef.current);

      const dominantColor = colorPicker(imgRef.current);
      setBgColor(dominantColor);
    };
  }

  async function handleContextPlay(uri) {
    if (currentUri !== uri) {
      playNewContext(uri);
      setCurrentUri(uri);
    }
    if (currentUri === uri && isPlaying) {
      await handlePlay("pause");
      setPlaying(false);
    }
    if (!isPlaying) {
      await handlePlay("play");
      setPlaying(true);
    }
  }

  return (
    <Layout>
      <Stack pb={6} spacing={12}>
        <Stack spacing={4}>
          <Stack
            px={10}
            background={`linear-gradient(180deg, rgba(69, 69, 69, 0.7) 0%, rgba(69, 69, 69, 0.5) 30.55%, rgba(69, 69, 69, 0.2) 50.8%, rgba(69, 69, 69, 0.03) 76.83%);`}
          >
            <NavButtons />

            <Heading pt={4} pb={3} fontSize="3xl">
              Hello there
            </Heading>

            {/* recent albums */}
            <SimpleGrid columns={3} rows={2} spacing={6}>
              {recentAlbums.map((album) => {
                return (
                  <NextLink key={album.id} href={`/album/${album.id}`}>
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
                        position="relative"
                        role="group"
                        spacing={0}
                        alignItems="center"
                        direction="row"
                      >
                        <Image
                          boxSize="85px"
                          src={album.images[0]?.url}
                          ref={imgRef}
                          crossOrigin="Anonymous"
                          alt={album.name}
                        ></Image>
                        <Stack
                          px={4}
                          width="100%"
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Text fontSize="md" fontWeight="600">
                            {album.name}
                          </Text>
                        </Stack>
                        <IconButton
                          bottom="22px"
                          right="21px"
                          position="absolute"
                          _hover={{
                            color: "#1ed760",
                            display: "block",
                            bgColor: "transparent",
                          }}
                          _groupHover={{ display: "block" }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleContextPlay(album.uri);
                          }}
                          variant="ghost"
                          display="none"
                          bgColor="transparent"
                          _active={{ bgColor: "transparent" }}
                          color="#1ed760"
                          fontSize="40px"
                          icon={<BsFillPlayCircleFill />}
                        ></IconButton>
                      </Stack>
                    </Link>
                  </NextLink>
                );
              })}
            </SimpleGrid>
          </Stack>

          <Stack px={10} pt={6} spacing={6}>
            <Heading pt={5} fontSize="xl">
              Recommended for you
            </Heading>
            <SimpleGrid columns={6} spacing={8}>
              {relatedArtists.map((artist) => {
                return (
                  <NextLink key={artist.id} href={`/artist/${artist.id}`}>
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
                      <Stack p="0.9rem" pb={8} spacing={3} alignItems="center">
                        <Image
                          boxSize="148px"
                          borderRadius="full"
                          src={artist?.images[0]?.url}
                          // src=""
                          alt="album cover"
                        />
                        <Stack
                          minWidth="0px"
                          maxW="95%"
                          overflow="hidden"
                          spacing="3px"
                          alignSelf="start"
                        >
                          <Text
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            fontSize="md"
                            fontWeight="600"
                          >
                            {artist?.name}
                            {/* Text */}
                          </Text>
                          <Text
                            textTransform="capitalize"
                            fontSize="sm"
                            fontWeight="400"
                            color="whiteAlpha.600"
                          >
                            {artist?.genres[0] || "Artist"}
                            {/* text */}
                          </Text>
                        </Stack>
                      </Stack>
                    </Link>
                  </NextLink>
                );
              })}
            </SimpleGrid>
            <Stack alignItems="baseline" direction="row">
              <Heading fontSize="xl">Jump back in</Heading>
            </Stack>
            <SimpleGrid columns={6} spacing={8}>
              {likedAlbums?.map((album) => {
                return (
                  <AlbumCard
                    key={album.album.id}
                    albumId={album.album.id}
                    src={album?.album.images[0].url}
                    albumTitle={album?.album.name}
                    artist={album?.album.artists[0]?.name}
                    artistId={album?.album.artists[0]?.id}
                    uri={album?.album.uri}
                  />
                );
              })}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
}
