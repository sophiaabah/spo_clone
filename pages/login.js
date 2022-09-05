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
  Icon,
  Progress,
} from "@chakra-ui/react";


export default function App () {
  return(
    <Stack>
          <Text>Sleep</Text>
                <Progress value={20} size="xs" colorScheme="pink" />
    </Stack>


  )
}