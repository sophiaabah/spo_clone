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
import { useEffect, useState } from "react";
import { playNewContext, handlePlay } from "../lib/api";
import { usePlayer } from "../lib/hooks";
import { useRouter } from "next/router";

export default function ActionPanel({ uri }) {
  const [isContextAvailable, setContextAvailable] = useState(false);
  const [isPlaying, setPlaying] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setContextAvailable(false);
  }, [router]);

  async function handleContextPlay(uri) {
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
    <Stack py="32px" spacing={6} direction="row">
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
