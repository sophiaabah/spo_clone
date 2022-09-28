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
import RecommendedList from "../components/recommended";
import { getTopTracks, getRelatedArtists, getUsersAlbums } from "../lib/api";

export default function SongsFeed() {
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [usersAlbums, setUsersAlbums] = useState([]);

  useEffect(() => {
    getTopTracks().then((data) => {
      let likedArtistId = data[1].artists[0].id;
      setTopTracks(data.slice(0, 6)); // use sets to get unique songs
      console.log(likedArtistId);

      getRelatedArtists(likedArtistId).then((data) => {
        console.log("related artists", data);
        setRelatedArtists(data.artists.slice(0, 6));
      });
    });

    getUsersAlbums().then((data) => {
      console.log(data);
      setUsersAlbums(data.slice(0, 6));
    });
  }, []);

  return (
    <Stack spacing={12}>
      <Stack spacing={4}>
        <Heading pb={3} fontSize="3xl">
          Good evening
        </Heading>
        <SimpleGrid columns={3} rows={2} spacing={6}>
          {topTracks.map((track) => {
            return (
              <Link
                key={track.id}
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
                    src={track.album.images[0]?.url}
                    // src=""
                    alt={track.album.name}
                  ></Image>
                  <Stack
                    px={4}
                    width="100%"
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Text fontSize="md" fontWeight="600">
                      {track.album.name}
                      {/* Text */}
                    </Text>
                  </Stack>
                </Stack>
              </Link>
            );
          })}
        </SimpleGrid>
        <RecommendedList albums={usersAlbums} relatedArtists={relatedArtists} />
      </Stack>
    </Stack>
  );
}
