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

export default function RecommendedList() {
  return (
    <Stack spacing={6}>
      <Stack alignItems="baseline" direction="row" justify="space-between">
        <Heading fontSize="xl">Jump back in</Heading>
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
        {/* {albums.map((item, index) => {
          return ( */}
        <Link
          // key={index}
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
              // src={item?.album.images[0].url}
              src=""
              alt="album cover"
            />
            <Stack
              minWidth="0px"
              overflow="hidden"
              spacing={1}
              alignSelf="start"
            >
              <Text
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                fontSize="md"
                fontWeight="600"
              >
                {/* {item?.album.name} */}
                text
              </Text>
              <Text fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                {/* {item?.album.artists[0]?.name} */}
                Text
              </Text>
            </Stack>
          </Stack>
        </Link>
        {/* );
        })} */}
      </SimpleGrid>
      <Heading pt={5} fontSize="xl">
        Recommended for you
      </Heading>
      <SimpleGrid columns={6} spacing={8}>
        {/* {relatedArtists.map((item, index) => {
          return ( */}
        <Link
          // key={index}
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
              boxSize="148px"
              borderRadius="md"
              // src={item?.images[0]?.url}
              src=""
              alt="album cover"
            />
            <Stack
              minWidth="0px"
              overflow="hidden"
              spacing={1}
              alignSelf="start"
            >
              <Text
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                fontSize="md"
                fontWeight="600"
              >
                {/* {item?.name} */}
                Text
              </Text>
              <Text
                textTransform="capitalize"
                fontSize="sm"
                fontWeight="400"
                color="whiteAlpha.600"
              >
                {/* {item?.genres[0]} */}
                text
              </Text>
            </Stack>
          </Stack>
        </Link>
        {/* );
        })} */}
      </SimpleGrid>
    </Stack>
  );
}
