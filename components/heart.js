import { FaHeart } from "react-icons/fa";
import { Center, Icon } from "@chakra-ui/react";

export default function Heart({ borderRadius, boxSize }) {
  return (
    <Center borderRadius={borderRadius} bgColor="purple" boxSize={boxSize}>
      <Icon as={FaHeart} color="white" />
    </Center>
  );
}
