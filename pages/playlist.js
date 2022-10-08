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
import { getAlbumInfo } from "../lib/api";
import { timeToString, draw, getColors } from "../lib/helpers";

export default function App() {
  const [albumPage, setAlbumPage] = useState({});
  // const [bgColor, setBgColor] = useState("");

  const router = useRouter();
  const imgRef = useRef();
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

  // useEffect(() => {
  //   imgRef.current.onload = () => {
  //     console.log("my ref", imgRef.current);

  //     console.log(draw(imgRef.current));
  //     setBgColor(draw(imgRef.current));
  //   };
  // }, [albumPage]);

  return (
    <Layout>
      <Stack px={10} spacing={2}>
        {/* extract this as a header and control bar */}
        <Stack pb="24px" spacing={7} direction="row">
          <Image
            boxSize="232px"
            alt="Album cover"
            src="https://m.media-amazon.com/images/I/51C8wgVYuQL.jpg"
          ></Image>
          <Stack spacing={0} alignSelf="end">
            <Text
              pl="4px"
              fontSize="sm"
              fontWeight={650}
              textTransform="uppercase"
            >
              Playlist
            </Text>
            <Text
              lineHeight="none"
              letterSpacing="tight"
              fontSize="8xl"
              fontWeight={700}
            >
              Bad Blood
            </Text>
            <Stack
              pt={8}
              pl={1}
              spacing={1}
              alignItems="center"
              direction="row"
            >
              <Link px="2px" fontWeight={600}>
                obehi
              </Link>
              <chakra.div
                bgColor="white"
                borderRadius="full"
                width="4px"
                height="4px"
              ></chakra.div>
              <Text px="2px" fontSize="sm" fontWeight={500}>
                13 songs,
              </Text>
              <Text fontSize="sm" fontWeight={500} color="whiteAlpha.700">
                43 min 57 sec
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack py="24px" spacing={6} direction="row">
          <IconButton
            _hover={{
              // fontSize: "42px",
              color: "hsla(0, 0%, 100%, 1)",
            }}
            variant="ghost"
            color="whiteAlpha.800"
            fontSize="55px"
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

        <Grid
          templateColumns="2.5fr 1.5fr 1fr 1fr"
          templateRows="20px"
          // autoRows="56px"
          pb="8px"
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

        {/* Each track in the album is composed of these griditems */}
        <Grid
          alignItems="center"
          templateColumns="2.5fr 1.5fr 1fr 1fr"
          templateRows="54px" // do i need this property?
          autoRows="54px"
          gap={4}
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Stack pl={4} alignItems="center" spacing={4} direction="row">
              <Text>1</Text>
              <Image
                alt="track"
                src="https://m.media-amazon.com/images/I/51C8wgVYuQL.jpg"
                boxSize="40px"
              />
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="14px">
                  Bastille
                </Link>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem rowSpan={1}>
            <Text color="whiteAlpha.700" fontSize="14px">
              Bad Blood
            </Text>
          </GridItem>
          <GridItem rowSpan={1}>
            <Text color="whiteAlpha.700" fontSize="14px">
              May 20, 2021
            </Text>
          </GridItem>
          <GridItem justifySelf="center" rowSpan={1}>
            <Text color="whiteAlpha.700" fontSize="14px">
              2:33
            </Text>
          </GridItem>
        </Grid>

        {/* <Stack spacing={0}>
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

        <Stack spacing={0}>
          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
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
                3:34
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

          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={4} alignItems="center" direction="row">
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<FiHeart />}
              ></IconButton>
              <Text fontSize="sm" color="whiteAlpha.700">
                3:34
              </Text>
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<BsThreeDots />}
              ></IconButton>
            </Stack>
          </Stack>

          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={4} alignItems="center" direction="row">
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<FiHeart />}
              ></IconButton>
              <Text fontSize="sm" color="whiteAlpha.700">
                3:34
              </Text>
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<BsThreeDots />}
              ></IconButton>
            </Stack>
          </Stack>

          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={4} alignItems="center" direction="row">
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<FiHeart />}
              ></IconButton>
              <Text fontSize="sm" color="whiteAlpha.700">
                3:34
              </Text>
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<BsThreeDots />}
              ></IconButton>
            </Stack>
          </Stack>

          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={4} alignItems="center" direction="row">
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<FiHeart />}
              ></IconButton>
              <Text fontSize="sm" color="whiteAlpha.700">
                3:34
              </Text>
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<BsThreeDots />}
              ></IconButton>
            </Stack>
          </Stack>

          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={4} alignItems="center" direction="row">
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<FiHeart />}
              ></IconButton>
              <Text fontSize="sm" color="whiteAlpha.700">
                3:34
              </Text>
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<BsThreeDots />}
              ></IconButton>
            </Stack>
          </Stack>

          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={4} alignItems="center" direction="row">
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<FiHeart />}
              ></IconButton>
              <Text fontSize="sm" color="whiteAlpha.700">
                3:34
              </Text>
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<BsThreeDots />}
              ></IconButton>
            </Stack>
          </Stack>

          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={4} alignItems="center" direction="row">
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<FiHeart />}
              ></IconButton>
              <Text fontSize="sm" color="whiteAlpha.700">
                3:34
              </Text>
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<BsThreeDots />}
              ></IconButton>
            </Stack>
          </Stack>

          <Stack
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
              <Text>1</Text>
              <Stack spacing={0}>
                <Text>Pompeii</Text>
                <Link color="whiteAlpha.700" fontSize="sm">
                  Bastille
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={4} alignItems="center" direction="row">
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<FiHeart />}
              ></IconButton>
              <Text fontSize="sm" color="whiteAlpha.700">
                3:34
              </Text>
              <IconButton
                fontSize="18px"
                _hover={{
                  color: "hsla(0, 0%, 100%, 1)",
                }}
                variant="ghost"
                color="whiteAlpha.700"
                icon={<BsThreeDots />}
              ></IconButton>
            </Stack>
          </Stack>
        </Stack> */}
      </Stack>
    </Layout>
  );
}
