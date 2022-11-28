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
  LinkBox,
  LinkOverlay,
  propNames,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiCategory } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Head from "next/head";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDebounce } from "react-use";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import shuffle from "lodash.shuffle";
import Layout from "../components/layout";
import AlbumCard from "../components/albumCard";
import NavButtons from "../components/navButtons";
import {
  getSearchResults,
  getLikedAlbums,
  getRelatedArtists,
} from "../lib/api";
import { timeToString } from "../lib/helpers";

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const ResultsLayout = () => {
    return (
      <>
        <Stack width="100%" pt={2} direction="row" spacing={12}>
          <Stack width="100%" spacing={3} pr={10}>
            <Heading fontSize="24px">Songs</Heading>
            <Stack>
              {tracks.map((track) => {
                return (
                  <Stack
                    key={track.id}
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
                    <Stack
                      pl={2}
                      alignItems="center"
                      spacing={5}
                      direction="row"
                    >
                      <Image
                        boxSize="40px"
                        src={track?.album?.images[0]?.url}
                        alt="cover"
                      />
                      <Stack spacing={0}>
                        <Text fontSize="15.5px" fontWeight={500}>
                          {track?.name}
                        </Text>
                        <Stack spacing="1px" direction="row">
                          <NextLink
                            passHref
                            href={`/artist/${track?.artists[0]?.id}`}
                          >
                            <Link color="whiteAlpha.700" fontSize="sm">
                              {`${track?.artists[0]?.name}` || ""}
                            </Link>
                          </NextLink>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack spacing={4} alignItems="center" direction="row">
                      <IconButton
                        fontSize="18px"
                        // visibility="hidden"
                        _hover={{
                          color: "hsla(0, 0%, 100%, 1)",
                          visibility: "visible",
                        }}
                        variant="ghost"
                        color="whiteAlpha.700"
                        icon={<FiHeart />}
                      ></IconButton>
                      <Text fontSize="sm" color="whiteAlpha.700">
                        {timeToString(track.duration_ms)}
                      </Text>
                      <IconButton
                        fontSize="18px"
                        // visibility="hidden"
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
                );
              })}
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing={5} pt={10}>
          <Heading fontSize="24px">Artists</Heading>
          <SimpleGrid columns={6} spacing={8}>
            {artists.map((artist) => {
              return (
                <NextLink
                  passHref
                  key={artist.id}
                  href={`/artist/${artist.id}`}
                >
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
                        </Text>
                        <Text
                          textTransform="capitalize"
                          fontSize="sm"
                          fontWeight="400"
                          color="whiteAlpha.600"
                        >
                          {artist?.genres[0] || "Artist"}
                        </Text>
                      </Stack>
                    </Stack>
                  </Link>
                </NextLink>
              );
            })}
          </SimpleGrid>
        </Stack>

        <Stack spacing={5} pt={10}>
          <Heading fontSize="24px">Albums</Heading>
          <SimpleGrid columns={6} spacing={8}>
            {albums?.map((album) => {
              return (
                <AlbumCard
                  key={album?.id}
                  albumId={album?.id}
                  src={album?.images[0].url}
                  albumTitle={album?.name}
                  artist={album?.artists[0]?.name}
                  artistId={album?.artists[0]?.id}
                />
              );
            })}
          </SimpleGrid>
        </Stack>

        <Stack spacing={5} pt={10}>
          <Heading fontSize="24px">Playlists</Heading>
          <SimpleGrid columns={6} spacing={8}>
            {playlists?.map((playlist) => {
              return (
                <NextLink key={playlist?.id} href={`/playlist/${playlist?.id}`}>
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
                        // height="148px" | might need to give all image components fixed dimensions in case the pictures have different sizes and dont stretch properly                      borderRadius="md"
                        src={playlist?.images[0]?.url || ""}
                        alt="album cover"
                      />
                      <Stack
                        minWidth="0px"
                        maxW="95%"
                        overflow="hidden"
                        spacing={1}
                        alignSelf="start"
                      >
                        <Text
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          fontSize="md"
                          fontWeight="600"
                        >
                          {playlist?.name || ""}
                        </Text>
                        {/* <NextLink href={`/artist/${artistId}`}> */}
                        <Text
                          fontSize="sm"
                          fontWeight="400"
                          color="whiteAlpha.600"
                          textDecoration="none"
                        >
                          {`By ${playlist?.owner?.display_name}` || ""}
                        </Text>
                        {/* </NextLink> */}
                      </Stack>
                    </Stack>
                  </Link>
                </NextLink>
              );
            })}
          </SimpleGrid>
        </Stack>
      </>
    );
  };

  useEffect(() => {
    async function onSearch() {
      const searchResults = await getSearchResults(debouncedValue, "all");
      console.log("the search results", searchResults);
      setTracks(searchResults?.tracks?.items.slice(0, 4));
      setArtists(searchResults?.artists?.items.slice(0, 6));
      setAlbums(searchResults?.albums?.items.slice(0, 6));
      setPlaylists(searchResults?.playlists?.items.slice(0, 6));
    }
    if (debouncedValue) {
      onSearch();
    }
  }, [debouncedValue]);

  useDebounce(
    () => {
      setDebouncedValue(searchValue);
    },
    2000,
    [searchValue]
  );

  return (
    <Layout>
      <Stack pl={8} spacing={0} pb={6}>
        <Stack pt={2} spacing={5} direction="row">
          <NavButtons />
          <InputGroup alignSelf="end" borderRadius="full" width="364px">
            <InputLeftElement pl={2} pointerEvents="none">
              <FiSearch fontSize="22px" color="black" />
            </InputLeftElement>
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              fontSize="0.9rem"
              fontWeight={400}
              focusBorderColor="none"
              borderRadius="full"
              color="black"
              bgColor="white"
              placeholder="What do you want to listen to?"
            />
          </InputGroup>
        </Stack>
        <Stack spacing={2.5} pr={8} py={6} direction="row">
          <Button
            fontSize="14px"
            height="32px"
            fontWeight={400}
            px="16px"
            _hover={{ bgColor: "#FFFFFF12" }}
            _active={{ bgColor: "white", color: "black" }}
            bgColor="#FFFFFF12"
            borderRadius="full"
          >
            All
          </Button>
          <NextLink href="/search/playlist">
            <Button
              fontSize="14px"
              height="32px"
              fontWeight={400}
              px="16px"
              _hover={{ bgColor: "#FFFFFF12" }}
              bgColor="#FFFFFF12"
              borderRadius="full"
            >
              Playlists
            </Button>
          </NextLink>
          <NextLink href="/search/track">
            <Button
              fontSize="14px"
              fontWeight={400}
              height="32px"
              px="16px"
              _hover={{ bgColor: "#FFFFFF12" }}
              bgColor="#FFFFFF12"
              borderRadius="full"
            >
              Tracks
            </Button>
          </NextLink>
          <NextLink href="/search/artist">
            <Button
              fontSize="14px"
              fontWeight={400}
              px="16px"
              height="32px"
              _hover={{ bgColor: "#FFFFFF12" }}
              bgColor="#FFFFFF12"
              borderRadius="full"
            >
              Artists
            </Button>
          </NextLink>
          <NextLink href="/search/album">
            <Button
              fontSize="14px"
              fontWeight={400}
              height="32px"
              px="16px"
              _hover={{ bgColor: "#FFFFFF12" }}
              bgColor="#FFFFFF12"
              borderRadius="full"
            >
              Albums
            </Button>
          </NextLink>
        </Stack>
        {searchValue && tracks ? (
          <ResultsLayout />
        ) : (
          <Center pt="3rem">
            <Heading fontSize="28px">No searches yet...</Heading>
          </Center>
        )}
      </Stack>
    </Layout>
  );
}
