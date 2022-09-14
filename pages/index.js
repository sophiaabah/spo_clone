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
    <Stack spacing={12}>
      <Stack spacing={6}>
        <Heading fontSize="3xl">Good evening</Heading>
        <SimpleGrid columns={3} spacing={6}>
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
            <Stack spacing={0} alignItems="center" direction="row">
              <Image
                boxSize="85px"
                src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
                alt="album cover"
              ></Image>
              <Stack
                px={4}
                width="100%"
                alignItems="center"
                direction="row"
                justifyContent="space-between"
              >
                <Text fontSize="md" fontWeight="600">
                  Currents
                </Text>
                {/* <IconButton
                        variant="ghost"
                        colorScheme="grey"
                        fontSize="40px"
                        icon={<BsFillPlayCircleFill />}
                      ></IconButton> */}
              </Stack>
            </Stack>
          </Link>

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
            <Stack spacing={0} alignItems="center" direction="row">
              <Image
                boxSize="85px"
                src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
                alt="album cover"
              ></Image>
              <Stack
                px={4}
                width="100%"
                alignItems="center"
                direction="row"
                justifyContent="space-between"
              >
                <Text fontSize="md" fontWeight="600">
                  Currents
                </Text>
                {/* <IconButton
                        variant="ghost"
                        colorScheme="grey"
                        fontSize="40px"
                        icon={<BsFillPlayCircleFill />}
                      ></IconButton> */}
              </Stack>
            </Stack>
          </Link>

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
            <Stack spacing={0} alignItems="center" direction="row">
              <Image
                boxSize="85px"
                src="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png"
                alt="album cover"
              ></Image>
              <Stack
                px={4}
                width="100%"
                alignItems="center"
                direction="row"
                justifyContent="space-between"
              >
                <Text fontSize="md" fontWeight="600">
                  Currents
                </Text>
                {/* <IconButton
                        variant="ghost"
                        colorScheme="grey"
                        fontSize="40px"
                        icon={<BsFillPlayCircleFill />}
                      ></IconButton> */}
              </Stack>
            </Stack>
          </Link>
        </SimpleGrid>
      </Stack>

      <Stack spacing={6}>
        <Stack alignItems="baseline" direction="row" justify="space-between">
          <Heading fontSize="xl">Recently played</Heading>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
        </SimpleGrid>

        <SimpleGrid columns={6} spacing={8}>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
        </SimpleGrid>

        <SimpleGrid columns={6} spacing={8}>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
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
          </Link>
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
