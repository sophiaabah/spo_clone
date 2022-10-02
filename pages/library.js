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
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getTopTracks, getLikedAlbums, getRelatedArtists } from "../lib/api";
import Layout from "../components/layout";
import shuffle from "lodash.shuffle";
import axios from "axios";
import { BiCategory } from "react-icons/bi";
import { useRouter } from "next/router";

export default function Library() {
  const [recentAlbums, setRecentAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const router = useRouter();

  function handleRouting(objectId) {
    console.log("object id", objectId);
    router.push({
      pathname: `/album`,
      query: { id: objectId },
    });
  }

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
      setLikedAlbums(usersLikedAlbums.slice(0, 6)); // put this at the bottom
    }

    fetchSongsFeed();
  }, []);

  return (
    <Layout>
      <Stack spacing={12}>
        <Stack spacing={4}>
          <Heading pb={3} fontSize="3xl">
            Good evening
          </Heading>

          {/* recent albums */}
          <SimpleGrid columns={3} rows={2} spacing={6}>
            {recentAlbums.map((album) => {
              return (
                <Link
                  key={album.id}
                  borderRadius="lg"
                  // href router: /{album.type}
                  onClick={() => handleRouting(album.id)}
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
                      src={album.images[0]?.url}
                      // src=""
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
                        {/* Text */}
                      </Text>
                    </Stack>
                  </Stack>
                </Link>
              );
            })}
          </SimpleGrid>

          <Stack pt={6} spacing={6}>
            <Heading pt={5} fontSize="xl">
              Recommended for you
            </Heading>
            <SimpleGrid columns={6} spacing={8}>
              {relatedArtists.map((artist, index) => {
                return (
                  <Link
                    key={index}
                    borderRadius="lg"
                    // href router: /{artist.type}

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
                        overflow="hidden"
                        spacing="3px"
                        alignSelf="start"
                      >
                        <Text
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
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
                          {artist?.genres[0]}
                          {/* text */}
                        </Text>
                      </Stack>
                    </Stack>
                  </Link>
                );
              })}
            </SimpleGrid>
            <Stack
              alignItems="baseline"
              direction="row"
              justify="space-between"
            >
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
              {likedAlbums.map((album, index) => {
                return (
                  <Link
                    // href router: /{album.album.type}
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
                        src={album?.album.images[0].url}
                        // src=""
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
                          {album?.album.name}
                          {/* text */}
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="400"
                          color="whiteAlpha.600"
                        >
                          {album?.album.artists[0]?.name}
                          {/* Text */}
                        </Text>
                      </Stack>
                    </Stack>
                  </Link>
                );
              })}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
}
