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
import { getAlbumInfo } from "../lib/api";
import { timeToString } from "../lib/helpers";

export default function App() {
  const [albumPage, setAlbumPage] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function loadAlbum(id) {
      console.log("id", id);
      const album = await getAlbumInfo(id);
      console.log("fetched info", album);
      setAlbumPage({
        artist: album.artists[0].name,
        image: album.images[0].url,
        name: album.name,
        releaseDate: album.release_date,
        items: album.tracks.items,
      });
    }
    loadAlbum(id);
  }, []);

  return (
    <Layout>
      <Stack spacing={3}>
        <Stack pt={3} spacing={7} direction="row">
          <Image
            boxSize="232px"
            alt="Album cover"
            src={albumPage?.image || ""}
          ></Image>
          <Stack spacing={0} alignSelf="end">
            <Text fontSize="sm" fontWeight={650} textTransform="uppercase">
              Album
            </Text>
            <Text
              lineHeight="none"
              letterSpacing="tight"
              fontSize="8xl"
              fontWeight={700}
            >
              {albumPage?.name || ""}
            </Text>
            <Stack pt={8} spacing={1} alignItems="center" direction="row">
              <Image
                borderRadius="full"
                width="1.5rem"
                height="1.5rem"
                alt="Album cover"
                src="https://i.scdn.co/image/ab6761610000e5ebfb7a0fe5a0e33cf5325fcd91"
              ></Image>
              <Link px="2px" fontWeight={600}>
                {albumPage?.artist || ""}
              </Link>
              <chakra.div
                bgColor="white"
                borderRadius="full"
                width="4px"
                height="4px"
              ></chakra.div>
              <Text px="2px" fontSize="sm" fontWeight={500}>
                {albumPage?.releaseDate || ""}
              </Text>
              <chakra.div
                bgColor="white"
                borderRadius="full"
                width="4px"
                height="4px"
              ></chakra.div>
              <Text px="2px" fontSize="sm" fontWeight={500}>
                {`${albumPage?.items.length} songs` || ""}
              </Text>
              <Text fontSize="sm" fontWeight={500} color="whiteAlpha.700">
                43 min 57 sec
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack height="max-content" py={6} spacing={6} direction="row">
          <IconButton
            _hover={{
              fontSize: "53px",
              color: "hsla(0, 0%, 100%, 1)",
            }}
            variant="ghost"
            color="whiteAlpha.800"
            fontSize="49px"
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
        <Stack spacing={0}>
          <Stack pl={4} direction="row" spacing={4}>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              fontWeight={400}
              color="whiteAlpha.600"
            >
              #
            </Text>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wider"
              fontWeight={400}
              color="whiteAlpha.600"
            >
              Title
            </Text>
          </Stack>
          <Divider pt={2} h="0.3px" borderColor="whiteAlpha.400" />
        </Stack>

        {/* songs list in this stack */}
        <Stack spacing={0}>
          {albumPage?.items.map((track, index) => {
            return (
              <Stack
                key={index}
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
                <Stack alignItems="center" spacing={5} direction="row">
                  <Text>{index + 1}</Text>
                  <Stack spacing={0}>
                    <Text>{track?.name}</Text>
                    <Link color="whiteAlpha.700" fontSize="sm">
                      {`${track?.artists[0].name}, ${track?.artists[1].name}` ||
                        ""}
                    </Link>
                  </Stack>
                </Stack>
                <Stack spacing={4} alignItems="center" direction="row">
                  <IconButton
                    fontSize="18px"
                    // visibility="hidden"
                    _hover={{
                      color: "hsla(0, 0%, 100%, 1)",
                      visibility: "visible",
                    }}
                    variant="ghost"
                    color="whiteAlpha.700"
                    icon={<FiHeart />}
                  ></IconButton>
                  <Text fontSize="sm" color="whiteAlpha.700">
                    {timeToString(track.duration_ms)}
                  </Text>
                  <IconButton
                    fontSize="18px"
                    // visibility="hidden"
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
            );
          })}
          ;
        </Stack>
      </Stack>
    </Layout>
  );
}
