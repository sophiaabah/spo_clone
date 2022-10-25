import {
  Box,
  Flex,
  Image,
  HStack,
  Button,
  Text,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { BsFillPlayCircleFill, BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { playNewContext, handlePlay } from "../lib/api";

export default function ActionPanel({ uri }) {
  const [isContextAvailable, setContextAvailable] = useState(false);
  const [isPlaying, setPlaying] = useState(true);

  async function handleContextPlay(uri) {
    const player = JSON.parse(sessionStorage.getItem("player"));

    if (player.length < 1) return; //spot for error handling
    console.log("player", player);
    if (!isContextAvailable) {
      playNewContext(uri);
      setContextAvailable(true);
    }
    if (isContextAvailable && isPlaying) {
      await handlePlay("pause");
      setPlaying(false);
    }
    if (!isPlaying) {
      await handlePlay("play");
      setPlaying(true);
    }
  }

  return (
    <Stack px={10} py="28px" spacing={6} direction="row">
      <IconButton
        _hover={{
          // fontSize: "42px",
          color: "hsla(0, 0%, 100%, 1)",
        }}
        onClick={() => handleContextPlay(uri)}
        variant="ghost"
        color="whiteAlpha.800"
        fontSize="55px"
        icon={<BsFillPlayCircleFill />}
      ></IconButton>
      <IconButton
        fontSize="35px"
        _hover={{
          color: "hsla(0, 0%, 100%, 1)",
        }}
        variant="ghost"
        color="whiteAlpha.700"
        icon={<FiHeart />}
      ></IconButton>
      <IconButton
        fontSize="25px"
        _hover={{
          color: "hsla(0, 0%, 100%, 1)",
        }}
        variant="ghost"
        color="whiteAlpha.700"
        icon={<BsThreeDots />}
      ></IconButton>
    </Stack>
  );
}
