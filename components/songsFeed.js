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
  propNames,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function SongsFeed(props) {
  return (
    <Stack spacing={12}>
      <Stack spacing={4}>
        <Heading pb={3} fontSize="3xl">
          Good evening
        </Heading>
        <SimpleGrid columns={3} rows={2} spacing={6}>
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
                // src={recentlyPlayedTracks[0]?.album.images[0]?.url}
                src=""
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
                  {/* {recentlyPlayedTracks[0]?.album.name} */}
                  Text
                </Text>
              </Stack>
            </Stack>
          </Link>
        </SimpleGrid>
        <>{props.next}</>
      </Stack>
    </Stack>
  );
}
