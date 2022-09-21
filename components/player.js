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

export default function Player({ player, current_track}) {
  return (
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
          src={current_track.album.images[0].url}
          alt="album cover"
        />
        <Stack spacing="0.1rem">
          <Link fontSize="sm" fontWeight="600">
            {current_track.name}
          </Link>
          <Link fontSize="xs" fontWeight="400" color="whiteAlpha.600">
            {current_track.artists[0].name}
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
              onClick={() => {
                player.previousTrack();
              }}
              _hover={{
                color: "hsla(0, 0%, 100%, 1)",
              }}
              variant="ghost"
              color="whiteAlpha.700"
              fontSize="25px"
              icon={<IoIosSkipBackward />}
            ></IconButton>
            <IconButton
              onClick={() => {
                player.togglePlay();
              }}
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
              onClick={() => {
                player.nextTrack();
              }}
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
  );
}
