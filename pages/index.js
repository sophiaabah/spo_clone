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

export default function App() {
  return (
    <Stack spacing={0} color="white">
      <Grid
        templateAreas='"sidebar topbar" "sidebar main"'
        gridTemplateRows={"70px 1fr"}
        gridTemplateColumns={"240px 1fr"}
        minH="100vh"
      >
        <GridItem bgColor="black" area={"sidebar"}>
          <Stack pl={6} pr={6} pt={6} spacing={8}>
            <Stack alignItems="center" spacing={3} direction="row">
              <Icon w={10} h={10} as={FaSpotify}></Icon>
              <Text fontWeight={600} fontSize="2xl">
                Spotify
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Link>
                <Stack spacing={4} alignItems="center" direction="row">
                  <Icon as={AiFillHome} w={7} h={7} color="white" />
                  <Text fontWeight={500} fontSize="md">
                    Home
                  </Text>
                </Stack>
              </Link>
              <Link>
                <Stack spacing={4} alignItems="center" direction="row">
                  <Icon w={7} h={7} as={FiSearch} color="whiteAlpha.600" />
                  <Text fontWeight={500} fontSize="md" color="whiteAlpha.600">
                    Search
                  </Text>
                </Stack>
              </Link>

              <Link>
                <Stack spacing={4} alignItems="center" direction="row">
                  <Icon w={7} h={7} as={BiLibrary} color="whiteAlpha.600" />
                  <Text fontWeight={500} fontSize="md" color="whiteAlpha.600">
                    Your library
                  </Text>
                </Stack>
              </Link>
            </Stack>

            <Stack spacing={3} alignItems="flex-start" justifyContent="center">
              <Link>
                <Stack spacing={4} alignItems="center" direction="row">
                  <Center
                    borderRadius="sm"
                    bgColor="whiteAlpha.800"
                    boxSize={7}
                  >
                    <Icon as={RiAddFill} color="black" />
                  </Center>
                  <Text fontWeight={500} fontSize="md" color="whiteAlpha.600">
                    Create Playlist
                  </Text>
                </Stack>
              </Link>
              <Link>
                <Stack spacing={4} alignItems="center" direction="row">
                  {/* <Image src="" alt="favorite songs" boxSize="21px"></Image> */}
                  <Center borderRadius="sm" bgColor="purple" boxSize={7}>
                    <Icon as={FaHeart} color="whiteAlpha.600" />
                  </Center>
                  <Text fontWeight={500} fontSize="md" color="whiteAlpha.600">
                    Liked Songs
                  </Text>
                </Stack>
              </Link>
              <Divider pt={2} h="0.3px" borderColor="whiteAlpha.400" />
            </Stack>
          </Stack>
        </GridItem>

        <GridItem py={4} bgColor="#121212" px={9} area={"topbar"}>
          <Stack spacing={3} direction="row">
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
        </GridItem>

        <GridItem py={4} bgColor="#121212" px={9} area={"main"}>
          <Stack spacing={12}>
            <Stack spacing={6}>
              <Heading fontSize="3xl">Good evening</Heading>
              <SimpleGrid columns={3} spacing={6}>
                <Stack
                  spacing={6}
                  alignItems="center"
                  bgColor="#181818"
                  borderRadius="lg"
                  direction="row"
                >
                  <Image
                    h="80px"
                    src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
                    alt="album cover"
                  ></Image>
                  <Text fontSize="md" fontWeight="600">
                    Currents
                  </Text>
                </Stack>
                <Stack
                  spacing={5}
                  alignItems="center"
                  bgColor="#181818"
                  borderRadius="lg"
                  direction="row"
                >
                  <Image
                    h="80px"
                    src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
                    alt="album cover"
                  ></Image>
                  <Text fontSize="md" fontWeight="600">
                    Currents
                  </Text>
                </Stack>
                <Stack
                  spacing={5}
                  alignItems="center"
                  bgColor="#181818"
                  borderRadius="lg"
                  direction="row"
                >
                  <Image
                    h="80px"
                    src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
                    alt="album cover"
                  ></Image>
                  <Text fontSize="md" fontWeight="600">
                    Currents
                  </Text>
                </Stack>
              </SimpleGrid>
            </Stack>

            <Stack spacing={6}>
              <Heading fontSize="xl">Recently played</Heading>

              <Stack
                p={4}
                pb={8}
                spacing={3}
                alignItems="center"
                width="12.25rem"
                bgColor="#181818"
                borderRadius="lg"
              >
                <Image
                  width="170px"
                  borderRadius="md"
                  src="https://e.snmc.io/i/600/w/e41c576ef01080b0ae24d1076bab9908/7006611/still-woozy-wolfcat-Cover-Art.jpg"
                  alt="album cover"
                />
                <Stack spacing={1} alignSelf="start">
                  <Text fontSize="md" fontWeight="600">
                    Window
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                    Still Woozy
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </GridItem>
      </Grid>

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
        <Stack flex={1} px={5} spacing={4} alignItems="center" direction="row">
          <Image
            width="55px"
            src="https://upload.wikimedia.org/wikipedia/en/a/ad/X_cover.png"
            alt="album cover"
          />
          <Stack spacing={0}>
            <Text fontSize="sm" fontWeight="600">
              I See Fire
            </Text>
            <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
              Ed Sheeran
            </Text>
          </Stack>
          <IconButton variant="ghost" icon={<FiHeart />}></IconButton>
        </Stack>
        <Stack flex={1}>
          <Stack alignSelf="center" spacing={1} direction="row">
            <IconButton
              variant="ghost"
              colorScheme="grey"
              fontSize="22px"
              icon={<TiArrowShuffle />}
            ></IconButton>
            <Stack direction="row" spacing={3}>
              <IconButton
                variant="ghost"
                colorScheme="grey"
                fontSize="25px"
                icon={<IoIosSkipBackward />}
              ></IconButton>
              <IconButton
                variant="ghost"
                colorScheme="grey"
                fontSize="40px"
                icon={<BsFillPlayCircleFill />}
              ></IconButton>
              <IconButton
                variant="ghost"
                colorScheme="grey"
                fontSize="25px"
                icon={<IoIosSkipForward />}
              ></IconButton>
            </Stack>
            <IconButton
              variant="ghost"
              colorScheme="grey"
              fontSize="20px"
              icon={<TbRepeat />}
            ></IconButton>
          </Stack>
          <Stack alignItems="center" direction="row">
            <Text fontSize="xs" fontWeight="400" color="whiteAlpha.600">
              0:00
            </Text>

            <Progress w="100%" value={0} size="xs" color="grey" />
            <Text fontSize="xs" fontWeight="400" color="whiteAlpha.600">
              2:56
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
          <IconButton
            variant="ghost"
            colorScheme="grey"
            fontSize="18px"
            icon={<TbMicrophone2 />}
          ></IconButton>
          <IconButton
            variant="ghost"
            colorScheme="grey"
            fontSize="20px"
            icon={<VscListFlat />}
          ></IconButton>
          <IconButton
            variant="ghost"
            colorScheme="grey"
            fontSize="25px"
            icon={<BsVolumeDownFill />}
          ></IconButton>
          <Progress w="20%" value={0} size="xs" colorScheme="pink" />

          <IconButton
            variant="ghost"
            colorScheme="grey"
            fontSize="20px"
            icon={<AiOutlineFullscreen />}
          ></IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
