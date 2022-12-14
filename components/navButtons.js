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
import React, { useEffect, useState, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import shuffle from "lodash.shuffle";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function NavButtons() {
  return (
    <Stack pt={4} spacing={3} direction="row">
      <IconButton
        borderRadius="full"
        bgColor="#00000070"
        boxSize="40px"
        _hover={{
          bgColor: "#00000070",
        }}
        _active={{ bgColor: "#00000070" }}
        onClick={() => window.history.back()}
        fontSize="20px"
        icon={<IoIosArrowBack />}
      ></IconButton>
      <IconButton
        fontSize="20px"
        bgColor="#00000070"
        _hover={{
          bgColor: "#00000070",
        }}
        _active={{ bgColor: "#00000070" }}
        onClick={() => window.history.forward()}
        borderRadius="full"
        icon={<IoIosArrowForward />}
      ></IconButton>
    </Stack>
  );
}
