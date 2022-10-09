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
import { FiSearch, FiHeart, FiClock } from "react-icons/fi";
import {
  BsFillPlayCircleFill,
  BsVolumeDownFill,
  BsThreeDots,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Layout from "../components/layout";
import Heart from "../components/heart";
import ActionPanel from "../components/actionPanel";
import { getAlbumInfo, getPlaylistInfo } from "../lib/api";
import { timeToString, draw, getColors } from "../lib/helpers";

export default function App() {
  const [playlistPage, setPlaylistPage] = useState({});
  // const [bgColor, setBgColor] = useState("");

  const router = useRouter();
  const imgRef = useRef();
  const { id } = router.query;

  useEffect(() => {
    async function getPlaylist(id) {
      console.log("id", id);
      const playlist = await getPlaylistInfo(id);
      console.log("the playlist info", playlist);
      setPlaylistPage({
        description: playlist.description,
        followers: playlist.followers.total,
        image: playlist.images[0].url,
        name: playlist.name,
        owner: playlist.owner.display_name,
        tracks: playlist.tracks.items,
      });
    }

    getPlaylist(id);
  }, [router]);

  // useEffect(() => {
  //   imgRef.current.onload = () => {
  //     console.log("my ref", imgRef.current);

  //     console.log(draw(imgRef.current));
  //     setBgColor(draw(imgRef.current));
  //   };
  // }, [albumPage]);

  return (
    <Layout>
      <Stack px={10} spacing={0}>
        {/* extract this as a header and control bar */}
        <Stack pb="24px" spacing={7} direction="row">
          <Image
            boxSize="232px"
            alt="Album cover"
            src={playlistPage?.image}
          ></Image>
          <Stack spacing={1} alignSelf="end">
            <Text
              pl="4px"
              fontSize="sm"
              fontWeight={650}
              textTransform="uppercase"
            >
              Playlist
            </Text>
            <Text
              // minWidth="min-content"
              lineHeight="none"
              letterSpacing="tight"
              fontSize="92px"
              fontWeight={700}
            >
              {playlistPage?.name}
            </Text>
            <Text pt={6} pl={1} fontSize="15px" color="whiteAlpha.700">
              {playlistPage?.description}
            </Text>
            <Stack pl={1} spacing={1} alignItems="center" direction="row">
              <Link px="2px" fontWeight={600}>
                {playlistPage?.owner}
              </Link>
              <chakra.div
                bgColor="white"
                borderRadius="full"
                width="4px"
                height="4px"
              />
              {playlistPage?.followers ? (
                <>
                  <Text px="2px" fontSize="sm" fontWeight={500}>
                    {playlistPage?.followers} likes
                  </Text>
                  <chakra.div
                    bgColor="white"
                    borderRadius="full"
                    width="4px"
                    height="4px"
                  />
                </>
              ) : (
                <></>
              )}
              <Text px="2px" fontSize="sm" fontWeight={500}>
                {playlistPage?.tracks?.length} songs,
              </Text>
              <Text fontSize="sm" fontWeight={500} color="whiteAlpha.700">
                43 min 57 sec
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <ActionPanel />

        <Grid
          templateColumns="2.5fr 1.5fr 1fr 1fr"
          templateRows="20px"
          // autoRows="56px"
          pb="8px"
          pt="16px"
          gap={3}
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Stack pl={4} direction="row" spacing={4}>
              <Text
                textTransform="uppercase"
                fontSize="14px"
                fontWeight={400}
                color="whiteAlpha.600"
              >
                #
              </Text>
              <Text
                textTransform="uppercase"
                fontSize="13px"
                letterSpacing="wider"
                fontWeight={400}
                color="whiteAlpha.600"
              >
                Title
              </Text>
            </Stack>
          </GridItem>
          <GridItem rowSpan={1}>
            <Text
              textTransform="uppercase"
              fontSize="13px"
              letterSpacing="wider"
              fontWeight={400}
              color="whiteAlpha.600"
            >
              Album
            </Text>
          </GridItem>
          <GridItem rowSpan={1}>
            <Text
              textTransform="uppercase"
              fontSize="13px"
              letterSpacing="wider"
              fontWeight={400}
              color="whiteAlpha.600"
            >
              Date added
            </Text>
          </GridItem>
          <GridItem justifySelf="center" rowSpan={1}>
            <Icon color="whiteAlpha.600" as={FiClock} />
          </GridItem>
          <GridItem colSpan={4}>
            <Divider h="0.3px" borderColor="whiteAlpha.400" />
          </GridItem>
        </Grid>

        {playlistPage?.tracks?.map((track, index) => {
          return (
            <Grid
              key={index}
              borderRadius="md"
              py={1}
              // bgColor="hsla(0, 0%, 35%, .1)"
              _hover={{
                textDecoration: "none",
                bgColor: "hsla(0, 0%, 45%, .14)",
              }}
              // width="100%"
              // justify="space-between"
              // alignItems="center"
              // direction="row"
              alignItems="center"
              templateColumns="2.5fr 1.5fr 1fr 1fr"
              templateRows="54px" // do i need this property?
              autoRows="54px"
              gap={4}
            >
              <GridItem rowSpan={1} colSpan={1}>
                <Stack pl={4} alignItems="center" spacing={4} direction="row">
                  <Text>{index + 1}</Text>
                  <Image
                    alt="track"
                    src={track?.track?.album?.images[0]?.url}
                    boxSize="40px"
                  />
                  <Stack spacing={0}>
                    <Text>{track?.track?.name}</Text>
                    <Link color="whiteAlpha.700" fontSize="14px">
                      {track?.track?.artists[0].name}
                    </Link>
                  </Stack>
                </Stack>
              </GridItem>
              <GridItem rowSpan={1}>
                <Text color="whiteAlpha.700" fontSize="14px">
                  {track?.track?.album?.name}
                </Text>
              </GridItem>
              <GridItem rowSpan={1}>
                <Text color="whiteAlpha.700" fontSize="14px">
                  {track?.added_at?.slice(0, 10)}
                </Text>
              </GridItem>
              <GridItem justifySelf="center" rowSpan={1}>
                <Text color="whiteAlpha.700" fontSize="14px">
                  {timeToString(track?.track?.duration_ms)}
                </Text>
              </GridItem>
            </Grid>
          );
        })}
      </Stack>
    </Layout>
  );
}
