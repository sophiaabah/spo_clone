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
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaSpotify, FaHeart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";
import { getPlaylists } from "../lib/api";
import Heart from "./heart";

export default function Sidebar() {
  const [playlists, setPlaylists] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  function handleRouting(objectId) {
    console.log("object id", objectId);
    router.push({
      pathname: `/playlist`,
      query: { id: objectId },
    });
  }

  useEffect(() => {
    getPlaylists().then((data) => {
      setPlaylists(data);
    });
  }, []);

  return (
    <>
      <Stack px={6} pb={8} alignItems="center" spacing={3} direction="row">
        <Icon w={10} h={10} as={FaSpotify}></Icon>
        <Text fontWeight={600} fontSize="2xl">
          Spotify
        </Text>
      </Stack>

      <Stack px={6} pb={4} spacing={4}>
        <Link opacity={0.6} _hover={{ textDecoration: "none", opacity: 1 }}>
          <Stack spacing={4} alignItems="center" direction="row">
            <Icon as={AiFillHome} w={7} h={7} />
            <Text fontWeight={500} fontSize="0.925rem">
              Home
            </Text>
          </Stack>
        </Link>
        <Link opacity={0.6} _hover={{ textDecoration: "none", opacity: 1 }}>
          <Stack spacing={4} alignItems="center" direction="row">
            <Icon w={7} h={7} as={FiSearch} />
            <Text fontWeight={500} fontSize="0.925rem">
              Search
            </Text>
          </Stack>
        </Link>

        <Link opacity={0.6} _hover={{ textDecoration: "none", opacity: 1 }}>
          <Stack spacing={4} alignItems="center" direction="row">
            <Icon w={7} h={7} as={BiLibrary} />
            <Text fontWeight={500} fontSize="0.925rem">
              Your library
            </Text>
          </Stack>
        </Link>
      </Stack>

      <Stack
        px={6}
        pt={6}
        spacing={3}
        alignItems="flex-start"
        justifyContent="center"
      >
        <Link opacity={0.6} _hover={{ textDecoration: "none", opacity: 1 }}>
          <Stack spacing={4} alignItems="center" direction="row">
            <Center borderRadius="sm" bgColor="white" boxSize={7}>
              <Icon as={RiAddFill} color="black" />
            </Center>
            <Text fontWeight={500} fontSize="0.925rem">
              Create Playlist
            </Text>
          </Stack>
        </Link>
        <Link opacity={0.6} _hover={{ textDecoration: "none", opacity: 1 }}>
          <Stack spacing={4} alignItems="center" direction="row">
            {/* <Image src="" alt="favorite songs" boxSize="21px"></Image> */}
            <Heart borderRadius="sm" boxSize={7} />
            <Text fontWeight={500} fontSize="0.925rem">
              Liked Songs
            </Text>
          </Stack>
        </Link>
        <Divider pt={2} h="0.3px" borderColor="whiteAlpha.400" />
      </Stack>

      <Stack
        sx={{
          "::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "gray",
          },
        }}
        pl={6}
        py={3}
        height="54vh"
        overflowY="auto"
        spacing={2}
      >
        {playlists.map((playlist) => {
          return (
            <Link
              onClick={() => handleRouting(playlist.id)}
              key={playlist.id}
              opacity={0.6}
              _hover={{ textDecoration: "none", opacity: 1 }}
              fontSize="15px"
            >
              {playlist.name}
              {/* Text */}
            </Link>
          );
        })}
      </Stack>
    </>
  );
}
