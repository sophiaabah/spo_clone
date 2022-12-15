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
          color: "#1ed760",
          bgColor: "transparent",
        }}
        onClick={() => handleContextPlay(uri)}
        variant="ghost"
        bgColor="transparent"
        _active={{ bgColor: "transparent" }}
        color="#1ed760"
        fontSize="55px"
        icon={<BsFillPlayCircleFill />}
      ></IconButton>
    </Stack>
  );
}
