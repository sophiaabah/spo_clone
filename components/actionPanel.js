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

export default function ActionPanel() {
  return (
    <Stack py="24px" spacing={6} direction="row">
      <IconButton
        _hover={{
          // fontSize: "42px",
          color: "hsla(0, 0%, 100%, 1)",
        }}
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
