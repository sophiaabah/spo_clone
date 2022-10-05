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
  Input,
  HStack,
  Button,
  Text,
  Stack,
  Heading,
  VStack,
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
  Divider,
  Icon,
  Progress,
} from "@chakra-ui/react";
import { FiSearch, FiHeart } from "react-icons/fi";
import {
  BsFillPlayCircleFill,
  BsVolumeDownFill,
  BsThreeDots,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Heart from "../components/heart";

export default function App() {
  return (
    <Layout>
      <Stack spacing={3}>
        <Stack spacing={7} direction="row">
          <Stack
            width="100%"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            height="300px"
            bgImage="https://i.scdn.co/image/ab6761610000e5ebfb7a0fe5a0e33cf5325fcd91"
            spacing={3}
            justify="end"
            py={6}
            px={9}
          >
            <Text fontSize="sm" fontWeight={650}>
              Verified Artist
            </Text>
            <Text
              lineHeight="none"
              letterSpacing="tight"
              fontSize="8xl"
              fontWeight={700}
            >
              Bad Blood
            </Text>
            <Text px="5px" pt="5px" fontSize="sm" fontWeight={500}>
              500,000 monthly listeners
            </Text>
          </Stack>
        </Stack>
        <Stack px={9}>
          <Stack py={6} spacing={6} direction="row">
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
          <Text py="5px" fontSize="xl" fontWeight={650}>
            Popular
          </Text>

          <Stack spacing={0}>
            <Stack
              borderRadius="md"
              p={2}
              // bgColor="hsla(0, 0%, 35%, .1)"
              _hover={{
                textDecoration: "none",
                bgColor: "hsla(0, 0%, 45%, .14)",
              }}
              width="100%"
              justify="space-between"
              alignItems="center"
              direction="row"
            >
              <Stack alignItems="center" spacing={4} direction="row">
                <Text>1</Text>
                <Image
                  boxSize="38px"
                  src="https://m.media-amazon.com/images/I/51C8wgVYuQL.jpg"
                  alt="track cover"
                ></Image>
                <Text fontSize="16px" fontWeight={450}>
                  Pompeii
                </Text>
              </Stack>
              <Stack spacing={4} alignItems="center" direction="row">
                <IconButton
                  fontSize="18px"
                  visibility="hidden"
                  _hover={{
                    color: "hsla(0, 0%, 100%, 1)",
                    visibility: "visible",
                  }}
                  variant="ghost"
                  color="whiteAlpha.700"
                  icon={<FiHeart />}
                ></IconButton>
                <Text fontSize="sm" color="whiteAlpha.700">
                  3:34
                </Text>
                <IconButton
                  fontSize="18px"
                  visibility="hidden"
                  _hover={{
                    color: "hsla(0, 0%, 100%, 1)",
                    visibility: "visible",
                  }}
                  variant="ghost"
                  color="whiteAlpha.700"
                  icon={<BsThreeDots />}
                ></IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
}
