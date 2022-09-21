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
import { AiFillHome, AiOutlineFullscreen, AiFillHeart } from "react-icons/ai";
import { FiSearch, FiHeart } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { FaSpotify, FaHeart } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSkipBackward,
  IoIosSkipForward,
  IoIosShuffle,
} from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { BsFillPlayCircleFill, BsVolumeDownFill } from "react-icons/bs";
import { TiArrowShuffle } from "react-icons/ti";
import { TbMicrophone2, TbRepeat } from "react-icons/tb";
import { VscListFlat } from "react-icons/vsc";
import { RiAddFill } from "react-icons/ri";


export default function Layout({ children, playlists }) {
  return (
    <Stack spacing={0} color="white">
      <Grid
        templateAreas={`
          "sidebar main" 
          "sidebar main" 
        `}
        gridTemplateRows={"1fr 70px"}
        gridTemplateColumns={"240px 1fr"}
        height="100vh"
      >
        <GridItem
          height="100vh"
          overflow="none"
          py={6}
          bgColor="black"
          area={"sidebar"}
        >
          <Stack px={6} pb={8} alignItems="center" spacing={3} direction="row">
            <Icon w={10} h={10} as={FaSpotify}></Icon>
            <Text fontWeight={600} fontSize="2xl">
              Spotify
            </Text>
          </Stack>

          <Stack px={6} spacing={4}>
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
            pt={9}
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
                <Center borderRadius="sm" bgColor="purple" boxSize={7}>
                  <Icon as={FaHeart} color="white" />
                </Center>
                <Text fontWeight={500} fontSize="0.925rem">
                  Liked Songs
                </Text>
              </Stack>
            </Link>
            <Divider pt={2} h="0.3px" borderColor="whiteAlpha.400" />
          </Stack>

          <Stack
            px={6}
            sx={{
              "::-webkit-scrollbar": {
                width: "8px",
                backgroundColor: "gray",
              },
            }}
            pt={3}
            height="54vh"
            overflowY="auto"
            spacing={2}
          >
            {playlists.map((item, index) => {
              return (
            <Link
            key={index}
              opacity={0.6}
              _hover={{ textDecoration: "none", opacity: 1 }}
              fontSize="16px"
            >
              {item.name}
            </Link>
              );
            })}
          </Stack>
        </GridItem>

        <GridItem
          marginBottom="90px"
          height="90vh"
          overflowY="auto"
          sx={{
            "::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: "gray",
            },
          }}
          py={4}
          bgColor="#121212"
          px={9}
          area={"main"}
        >
          <Stack pb={5} spacing={3} direction="row">
            <IconButton
              borderRadius="full"
              bgColor="black"
              colorScheme="black"
              icon={<IoIosArrowBack />}
            ></IconButton>
            <IconButton
              bgColor="black"
              colorScheme="black"
              borderRadius="full"
              icon={<IoIosArrowForward />}
            ></IconButton>
          </Stack>
          {children}
        </GridItem>
      </Grid>

  
    </Stack>
  );
}
