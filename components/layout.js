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
      >
        <GridItem
          height="100vh"
          overflow="none"
          py={6}
          bgColor="black"
          area={"sidebar"}
        >
          <Sidebar />
        </GridItem>

        <GridItem
          marginBottom="90px"
          height="90vh"
          overflowY="auto"
          sx={{
            "::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: "gray",
            },
          }}
          py={4}
          bgColor="#121212"
          px={9}
          area={"main"}
        >
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
      </Grid>
    </Stack>
  );
}
