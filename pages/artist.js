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
import { useEffect, useState, useRef } from "react";
import Layout from "../components/layout";
import Heart from "../components/heart";
import ActionPanel from "../components/actionPanel";
import AlbumCard from "../components/albumCard";
import { getArtist, getArtistsAlbums, getArtistsTopTracks } from "../lib/api";
import { timeToString, draw, getColors } from "../lib/helpers";

export default function App() {
  const [artistInfo, setArtistInfo] = useState({});
  const [artistTracks, setArtistTracks] = useState({});
  const [artistAlbums, setArtistAlbums] = useState({});

  // const [bgColor, setBgColor] = useState("");
  // const imgRef = useRef();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function loadArtist(id) {
      console.log("id", id);
      const artistInfo = await getArtist(id);
      console.log("the artist", artistInfo);
      setArtistInfo({
        followers: artistInfo.followers.total,
        image: artistInfo.images[0].url,
        name: artistInfo.name,
      });
      const tracks = await getArtistsTopTracks(id);
      console.log("their top tracks", tracks);
      setArtistTracks(tracks.tracks.slice(0, 5));
      const albums = await getArtistsAlbums(id);
      console.log("their albums", albums);
      setArtistAlbums(albums.items.slice(0, 6));
    }
    loadArtist(id);
  }, []);

  return (
    <Layout>
      <Stack px={10} spacing={3}>
        <Stack pb="24px" spacing={7} direction="row">
          <Image
            boxSize="232px"
            borderRadius="full"
            alt="track cover"
            src={artistInfo?.image}
          />
          <Stack alignSelf="end" spacing={3} justify="end" px={3}>
            <Text fontSize="sm" fontWeight={650}>
              Verified Artist
            </Text>
            <Text
              lineHeight="none"
              letterSpacing="tight"
              fontSize="8xl"
              fontWeight={700}
            >
              {artistInfo?.name}
            </Text>
            <Text px="5px" pt="5px" fontSize="sm" fontWeight={500}>
              {artistInfo?.followers} monthly listeners
            </Text>
          </Stack>
        </Stack>
        <Stack>
          <ActionPanel />
          <Text py="5px" fontSize="22px" fontWeight={650}>
            Popular
          </Text>
          <Stack pt="8px" spacing={0}>
            {artistTracks?.map((track, index) => {
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
                  <Stack
                    pl={2}
                    flex={2}
                    alignItems="center"
                    spacing={4}
                    direction="row"
                  >
                    <Text>{index + 1}</Text>
                    <Image
                      boxSize="38px"
                      src={track.album.images[0].url}
                      alt="track cover"
                    ></Image>
                    <Text fontSize="16px" fontWeight={450}>
                      {track?.name}
                    </Text>
                  </Stack>
                  <Text flex={1} fontSize="sm" color="whiteAlpha.700">
                    112,999,000
                  </Text>
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
                      {timeToString(track.duration_ms)}
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
              );
            })}
          </Stack>
          <Stack
            pt="16px"
            align="baseline"
            direction="row"
            justify="space-between"
          >
            <Text fontSize="22px" fontWeight={650}>
              Discography
            </Text>
            <Text
              fontWeight={600}
              color="whiteAlpha.700"
              textTransform="uppercase"
              fontSize="14px"
            >
              See all
            </Text>
          </Stack>
          {/* <SimpleGrid columns={6} spacing={8}>
              {artistAlbums?.map((album, index) => {
                return (
                  <AlbumCard
                    key={index}
                    src={album?.images[0]?.url}
                    albumTitle={album?.name}
                    artist={album?.artists[0]?.name}
                  />
                );
              })}
            </SimpleGrid> */}
        </Stack>
      </Stack>
    </Layout>
  );
}
