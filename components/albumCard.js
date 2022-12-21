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
  LinkOverlay,
  LinkBox,
  Icon,
  propNames,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import NextLink from "next/link";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { handlePlay, playNewContext } from "../lib/api";

export default function AlbumCard({
  albumId,
  src,
  uri,
  albumTitle,
  artist,
  artistId,
}) {
  const [currentUri, setCurrentUri] = useState("");
  const [isPlaying, setPlaying] = useState(true);

  async function handleContextPlay(uri) {
    if (currentUri !== uri) {
      playNewContext(uri);
      setCurrentUri(uri);
    }
    if (currentUri === uri && isPlaying) {
      await handlePlay("pause");
      setPlaying(false);
    }
    if (!isPlaying) {
      await handlePlay("play");
      setPlaying(true);
    }
  }
  return (
    <NextLink href={`/album/${albumId}`}>
      <LinkBox
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
        <Stack
          position="relative"
          role="group"
          p={4}
          pb={8}
          spacing={3}
          alignItems="center"
        >
          <Image
            width="170px"
            borderRadius="md"
            src={src || ""}
            // src=""
            alt="album cover"
          />
          <IconButton
            position="absolute"
            top="105px"
            right="21px"
            _hover={{
              color: "#1ed760",
              display: "block",
              bgColor: "black",
            }}
            _groupHover={{ display: "block" }}
            onClick={(e) => {
              e.preventDefault();
              handleContextPlay(uri);
            }}
            variant="ghost"
            display="none"
            overflow="hidden"
            borderRadius="full"
            bgColor="black"
            _active={{ bgColor: "black" }}
            color="#1ed760"
            fontSize="40px"
            icon={<BsFillPlayCircleFill />}
          ></IconButton>
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
              {albumTitle || ""}
            </Text>
            <NextLink href={`/artist/${artistId}`}>
              <Link fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                {artist || ""}
              </Link>
            </NextLink>
          </Stack>
        </Stack>
      </LinkBox>
    </NextLink>
  );
}
