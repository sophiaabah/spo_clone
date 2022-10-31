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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout";
import Heart from "../../components/heart";
import ActionPanel from "../../components/actionPanel";
import NavButtons from "../../components/navButtons";
import { getAlbumInfo } from "../../lib/api";
import { timeToString, draw, getColors } from "../../lib/helpers";
import { colorPicker } from "../../lib/color";

export default function AlbumPage() {
  const [albumPage, setAlbumPage] = useState({});
  const [bgColor, setBgColor] = useState("");

  const router = useRouter();
  const imgRef = useRef();
  const { albumId } = router.query;

  useEffect(() => {
    if (!albumId) return;
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
        uri: album.uri,
      });
    }
    loadAlbum(albumId);
  }, [albumId]);

  useEffect(() => {
    imgRef.current.onload = () => {
      console.log("my ref", imgRef.current);
      // console.log("gradient anchor", draw(imgRef.current));

      const dominantColor = colorPicker(imgRef.current);
      setBgColor(dominantColor);
      // console.log("here", dominantColor);
      // setBgColor(draw(imgRef.current));
    };
  }, [albumPage]);

  return (
    <Layout>
      <Stack spacing={0}>
        <Stack
          px={10}
          pb={6}
          background={`-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0.1,0.3,0.5,.65))), ${bgColor}`}
        >
          <NavButtons />
          <Stack pt={4} spacing={7} direction="row">
            <Image
              ref={imgRef}
              boxSize="232px"
              alt="Album cover"
              crossOrigin="Anonymous"
              src={albumPage?.image}
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
                {albumPage?.name}
              </Text>
              <Stack pt={8} spacing={1} alignItems="end" direction="row">
                <Image
                  borderRadius="full"
                  width="1.5rem"
                  height="1.5rem"
                  alt="Album cover"
                  src="https://i.scdn.co/image/ab6761610000e5ebfb7a0fe5a0e33cf5325fcd91"
                ></Image>
                <Stack spacing={1} alignItems="baseline" direction="row">
                  <Link px="2px" fontWeight={600}>
                    {albumPage?.artist}
                  </Link>
                  <chakra.div
                    alignSelf="center"
                    bgColor="white"
                    borderRadius="full"
                    width="4px"
                    height="4px"
                  />
                  <Text px="2px" fontSize="sm" fontWeight={500}>
                    {albumPage?.releaseDate?.slice(0, 4)}
                  </Text>
                  <chakra.div
                    alignSelf="center"
                    bgColor="white"
                    borderRadius="full"
                    width="4px"
                    height="4px"
                  />
                  <Stack direction="row" spacing="1px">
                    <Text px="2px" fontSize="sm" fontWeight={500}>
                      {albumPage?.items?.length}
                    </Text>
                    <Text px="2px" fontSize="sm" fontWeight={500}>
                      songs
                    </Text>
                  </Stack>

                  <Text fontSize="sm" fontWeight={500} color="whiteAlpha.700">
                    43 min 57 sec
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          px={8}
          background={`linear-gradient(180deg, ${bgColor}1A 0%, ${bgColor}00 22%)`}
        >
          <ActionPanel uri={albumPage.uri} />
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
            {albumPage?.items?.map((track, index) => {
              return (
                <Stack
                  key={track.id}
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
                  <Stack pl={2} alignItems="center" spacing={5} direction="row">
                    <Text>{index + 1}</Text>
                    <Stack spacing={0}>
                      <Text fontSize="15.5px" fontWeight={500}>
                        {track?.name}
                      </Text>
                      <Stack spacing="1px" direction="row">
                        <Link color="whiteAlpha.700" fontSize="sm">
                          {`${track?.artists[0]?.name}` || ""}
                        </Link>

                        {/* <Link color="whiteAlpha.700" fontSize="sm">
                        {`, ${track?.artists[1]?.name}` || ""}
                      </Link> */}
                      </Stack>
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
      </Stack>
    </Layout>
  );
}
