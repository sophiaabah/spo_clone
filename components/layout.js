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
import React, { useEffect, useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Sidebar from "../components/sidebar";
import Player from "../components/player";

export default function Layout({ children }) {
  return (
    <Stack spacing={0} color="white">
      <Grid
        templateAreas={`
          "sidebar main" 
          "sidebar main" 
        `}
        gridTemplateRows={"1fr 70px"}
        gridTemplateColumns={"240px 1fr"}
        height="100vh"
        position="relative"
      >
        {/* sidebar */}
        <GridItem
          height="100vh"
          overflow="none"
          py={6}
          bgColor="black"
          area={"sidebar"}
        >
          <Sidebar />
        </GridItem>

        {/* main */}
        <GridItem
          marginBottom="90px"
          height="90%"
          overflowY="auto"
          sx={{
            "::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: "gray",
            },
          }}
          py={6}
          px={9}
          area={"main"}
          position="relative"
          bgColor="#121212"
        >
          {/* floating topbar */}
          <Stack pb={5} spacing={3} direction="row">
            <IconButton
              borderRadius="full"
              bgColor="black"
              colorScheme="black"
              icon={<IoIosArrowBack />}
            ></IconButton>
            <IconButton
              bgColor="black"
              colorScheme="black"
              borderRadius="full"
              icon={<IoIosArrowForward />}
            ></IconButton>
          </Stack>

          {children}
        </GridItem>

        <Player />
      </Grid>
    </Stack>
  );
}
