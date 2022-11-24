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
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiCategory } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import shuffle from "lodash.shuffle";
import Layout from "../../components/layout";
import AlbumCard from "../../components/albumCard";
import NavButtons from "../../components/navButtons";
import {
  getSearchResults,
  getLikedAlbums,
  getRelatedArtists,
} from "../../lib/api";
import { colorPicker } from "../../lib/color";

export default function SearchPageByCategory() {
  // useEffect(() => {
  //   async function onSearch() {
  //     const searchResults = await getSearchResults("holiday");
  //     console.log("the search results", searchResults);
  //   }
  //   onSearch();
  // }, []);

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
        </Stack>

        <SimpleGrid columns={6} spacing={8}>
          {/* {recentAlbums.map((album) => {
                return ( */}
          <NextLink href="/">
            {/* key={artist.id} href={`/artist/${artist.id}`} */}
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
                  // src={artist?.images[0]?.url}
                  src="https://i.scdn.co/image/ab6761610000e5ebfb7a0fe5a0e33cf5325fcd91"
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
                    {/* {artist?.name} */}
                    Text
                  </Text>
                  <Text
                    textTransform="capitalize"
                    fontSize="sm"
                    fontWeight="400"
                    color="whiteAlpha.600"
                  >
                    {/* {artist?.genres[0]} */}
                    text
                  </Text>
                </Stack>
              </Stack>
            </Link>
          </NextLink>

          {/* );
          })} */}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}
