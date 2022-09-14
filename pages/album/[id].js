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
import { AiFillHome, AiOutlineFullscreen, AiFillHeart } from "react-icons/ai";
import { FiSearch, FiHeart } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { FaSpotify, FaHeart } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSkipBackward,
  IoIosSkipForward,
  IoIosShuffle,
} from "react-icons/io";
import {
  BsFillPlayCircleFill,
  BsVolumeDownFill,
  BsThreeDots,
} from "react-icons/bs";
import { TiArrowShuffle } from "react-icons/ti";
import { TbMicrophone2, TbRepeat } from "react-icons/tb";
import { VscListFlat } from "react-icons/vsc";
import { RiAddFill } from "react-icons/ri";

export default function App() {
  return (
    <Stack spacing={3}>
      <Stack spacing={7} direction="row">
        <Image
          boxSize="232px"
          alt="Album cover"
          src="https://m.media-amazon.com/images/I/51C8wgVYuQL.jpg"
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
            Bad Blood
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
              Bastille
            </Link>
            <chakra.div
              bgColor="white"
              borderRadius="full"
              width="4px"
              height="4px"
            ></chakra.div>
            <Text px="2px" fontSize="sm" fontWeight={500}>
              2013
            </Text>
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
      <Stack py={6} spacing={6} direction="row">
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
      </Stack>
    </Stack>
  );
}
