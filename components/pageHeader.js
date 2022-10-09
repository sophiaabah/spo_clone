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
  Tab,
} from "@chakra-ui/react";
import { FiSearch, FiHeart } from "react-icons/fi";
import {
  BsFillPlayCircleFill,
  BsVolumeDownFill,
  BsThreeDots,
} from "react-icons/bs";

export default function pageHeader({
  category,
  title,
  artist,
  creator,
  numberOfSongs,
  duration,
}) {
  return (
    <Stack pb="24px" spacing={7} direction="row">
      <Image
        boxSize="232px"
        alt="Album cover"
        src="https://m.media-amazon.com/images/I/51C8wgVYuQL.jpg"
      ></Image>
      <Stack spacing={0} alignSelf="end">
        <Text pl="4px" fontSize="sm" fontWeight={650} textTransform="uppercase">
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
        <Stack pt={8} pl={1} spacing={1} alignItems="center" direction="row">
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
  );
}
