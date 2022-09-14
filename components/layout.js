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

export default function Layout({ children }) {
  return (
    <Stack spacing={0} color="white">
      <Grid
        templateAreas='"sidebar topbar" "sidebar main"'
        gridTemplateRows={"70px 1fr"}
        gridTemplateColumns={"240px 1fr"}
        minH="100vh"
      >
        <GridItem
          position="fixed"
          height="100%"
          width="240px"
          marginBottom="90px"
          bgColor="black"
          area={"sidebar"}
        >
          <Stack pl={6} pr={6} pt={6} spacing={4}>
            <Stack alignItems="center" spacing={3} direction="row">
              <Icon w={10} h={10} as={FaSpotify}></Icon>
              <Text fontWeight={600} fontSize="2xl">
                Spotify
              </Text>
            </Stack>

            <Stack py={4} spacing={4}>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
              >
                <Stack spacing={4} alignItems="center" direction="row">
                  <Icon as={AiFillHome} w={7} h={7} />
                  <Text fontWeight={500} fontSize="0.925rem">
                    Home
                  </Text>
                </Stack>
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
              >
                <Stack spacing={4} alignItems="center" direction="row">
                  <Icon w={7} h={7} as={FiSearch} />
                  <Text fontWeight={500} fontSize="0.925rem">
                    Search
                  </Text>
                </Stack>
              </Link>

              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
              >
                <Stack spacing={4} alignItems="center" direction="row">
                  <Icon w={7} h={7} as={BiLibrary} />
                  <Text fontWeight={500} fontSize="0.925rem">
                    Your library
                  </Text>
                </Stack>
              </Link>
            </Stack>

            <Stack spacing={3} alignItems="flex-start" justifyContent="center">
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
              >
                <Stack spacing={4} alignItems="center" direction="row">
                  <Center borderRadius="sm" bgColor="white" boxSize={7}>
                    <Icon as={RiAddFill} color="black" />
                  </Center>
                  <Text fontWeight={500} fontSize="0.925rem">
                    Create Playlist
                  </Text>
                </Stack>
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
              >
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
              overflow="auto"
              spacing={2}
              sx={{
                "::-webkit-scrollbar": {
                  width: 8,
                },
                "::-webkit-scrollbar-track": {
                  background: "#ffffff",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "#c24331",
                },
                "::-webkit-scrollbar-thumb:hover": {
                  background: "#002939",
                },
              }}
            >
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Chill vibes shop
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Coffee is good
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Nostalgia lane day
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Sera
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Lane boy
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Lane boy
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Dance music
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Lane boy
              </Link>
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Lane boy
              </Link>{" "}
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Lane boy
              </Link>{" "}
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                Lane boy
              </Link>{" "}
              <Link
                opacity={0.6}
                _hover={{ textDecoration: "none", opacity: 1 }}
                fontSize="16px"
              >
                new playlist
              </Link>{" "}
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

        <GridItem
          marginBottom="90px"
          py={4}
          bgColor="#121212"
          px={9}
          area={"main"}
        >
          {children}
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
          <Stack spacing="0.1rem">
            <Link fontSize="sm" fontWeight="600">
              I See Fire
            </Link>
            <Link fontSize="xs" fontWeight="400" color="whiteAlpha.600">
              Ed Sheeran
            </Link>
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
        <Stack flex={1}>
          <Stack alignSelf="center" spacing={1} direction="row">
            <IconButton
              _hover={{
                color: "hsla(0, 0%, 100%, 1)",
              }}
              variant="ghost"
              color="whiteAlpha.600"
              fontSize="22px"
              icon={<TiArrowShuffle />}
            ></IconButton>
            <Stack direction="row" spacing={3}>
              <IconButton
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                fontSize="25px"
                icon={<IoIosSkipBackward />}
              ></IconButton>
              <IconButton
                _hover={{
                  // fontSize: "42px",
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.800"
                fontSize="40px"
                icon={<BsFillPlayCircleFill />}
              ></IconButton>
              <IconButton
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
              _hover={{
                // fontSize: "42px",
                color: "hsla(0, 0%, 100%, 1)",
              }}
              variant="ghost"
              color="whiteAlpha.600"
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
            _hover={{
              color: "hsla(0, 0%, 100%, 1)",
            }}
            variant="ghost"
            color="whiteAlpha.600"
            fontSize="18px"
            icon={<TbMicrophone2 />}
          ></IconButton>
          <IconButton
            _hover={{
              color: "hsla(0, 0%, 100%, 1)",
            }}
            variant="ghost"
            color="whiteAlpha.600"
            fontSize="20px"
            icon={<VscListFlat />}
          ></IconButton>
          <IconButton
            _hover={{
              color: "hsla(0, 0%, 100%, 1)",
            }}
            variant="ghost"
            color="whiteAlpha.600"
            fontSize="25px"
            icon={<BsVolumeDownFill />}
          ></IconButton>
          <Progress w="20%" value={0} size="xs" colorScheme="pink" />

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
    </Stack>
  );
}
