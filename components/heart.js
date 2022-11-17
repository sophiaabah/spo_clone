import { FaHeart } from "react-icons/fa";
import { Center, Icon } from "@chakra-ui/react";

export default function Heart({ borderRadius, boxSize, fontSize }) {
  return (
    <Center borderRadius={borderRadius} bgColor="purple" boxSize={boxSize}>
      <Icon fontSize={fontSize} as={FaHeart} color="white" />
    </Center>
  );
}
