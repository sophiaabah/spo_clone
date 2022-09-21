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
import { useRouter } from "next/router";
import password from "secure-random-password";
import PopupWindow, { toQuery } from "../lib/popup";



var spotifyOauth = {
  response_type: "code",
  client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  state: password.randomString({ length: 16 }),
  scope: "streaming \
          user-read-email \
          user-read-private",
};

export default function App() {
    const router = useRouter();
    async function onLogin() {
        const access_data = await spotifyLogin();
        console.log(access_data);
        localStorage.setItem("session_token", access_data.access_token);

        router.push({
          pathname: "/library",
          // query: { pid: linkInput, inputPlatform: platform },
        });
      }
    


    const spotifyLogin = async () => {
      try {
        const data = await PopupWindow.open(
          "spotify-oauth-auth",
          `https://accounts.spotify.com/authorize?${toQuery({
            client_id: spotifyOauth.client_id,
            response_type: "token",
            redirect_uri: spotifyOauth.redirect_uri,
            scope: spotifyOauth.scope,
          })}`,
          {
            height: 800,
            width: 600,
          }
        );
        console.log(data)
        return data;
      } catch (e) {
        console.error(e);
      }
    };

  return (
    <Center
      height="100vh"
      bgImage=" linear-gradient(1.35deg, rgba(0, 0, 0, 0.85) 10.36%, rgba(0, 0, 0, 0.7) 52.28%, rgba(0, 0, 0, 0.3) 95.58%), url('/images/bgImage.jpg')"
    >
      
      <Button
        borderRadius="full"
        px={8}
        py={7}
        fontWeight={700}
        lineHeight="1.25rem"
        fontSize="1rem"
        bgColor="#1ed760"
        color="black"
        textTransform="uppercase"
        onClick={onLogin}
        letterSpacing="1.5px"
      >
        Login to your Spotify
      </Button>
    </Center>
  );

}