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
  LinkOverlay,
  LinkBox,
  Icon,
  propNames,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function AlbumCard({
  albumId,
  src,
  albumTitle,
  artist,
  artistId,
}) {
  return (
    <NextLink href={`/album/${albumId}`}>
      <LinkBox
        borderRadius="lg"
        overflow="hidden"
        height="100%"
        width="11.25rem"
        bgColor="hsla(0, 0%, 30%, .1)"
        _hover={{
          textDecoration: "none",
          bgColor: "hsla(0, 0%, 43%, .14)",
        }}
      >
        <Stack p={4} pb={8} spacing={3} alignItems="center">
          <Image
            width="170px"
            borderRadius="md"
            src={src || ""}
            // src=""
            alt="album cover"
          />
          <Stack
            minWidth="0px"
            maxW="95%"
            overflow="hidden"
            spacing={1}
            alignSelf="start"
          >
            <Text
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="md"
              fontWeight="600"
            >
              {albumTitle || ""}
            </Text>
            <NextLink href={`/artist/${artistId}`}>
              <Link fontSize="sm" fontWeight="400" color="whiteAlpha.600">
                {artist || ""}
              </Link>
            </NextLink>
          </Stack>
        </Stack>
      </LinkBox>
    </NextLink>
  );
}
