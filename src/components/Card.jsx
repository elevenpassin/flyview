import {
  Box,
  Image,
  Badge,
  Link,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons';

function randomColorGenerator() {
  var characters = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var randomColorArray = [];
  for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomColorArray.push(characters[randomIndex]);
  }
  return `#${randomColorArray.join('')}`;
}

const markAsRead = async (id) => {
  const searchParams = new URLSearchParams();
  searchParams.append('archive', 1);
  const response = await fetch(
    `${process.env.REACT_APP_HOST}api/entries/${id}.json`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'PATCH',
      body: JSON.stringify({
        archive: '1'
      })
    }
  );
  const result = await response.json();
  console.log(result);
};

markAsRead('459')

function Card({ entry }) {
  let imagePreview = null;
  const previewExists = entry.preview_picture !== null;

  if (previewExists) {
    imagePreview = (
      <Image
        objectFit="cover"
        height="200px"
        width="100%"
        src={entry.preview_picture}
        alt={entry.title}
      />
    );
  } else {
    imagePreview = (
      <Box bg={`linear-gradient(to bottom left, ${randomColorGenerator()}, ${randomColorGenerator()})`} height="200px" width="100%"></Box>
    );
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexFlow: 'column',
      }}
    >
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Link href={entry.url}>
          {imagePreview}

          <Box p="3">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {entry.title}
            </Box>

            <Box>
              <Box as="span" color="gray.600" fontSize="sm">
                {entry.domain_name}
              </Box>
            </Box>
          </Box>
        </Link>
        <Box p="3" pt="0">
          <ButtonGroup size="md" isAttached variant="outline">
            <IconButton
              icon={<CheckIcon color="gray.300" />}
              onClick={() => markAsRead(entry.id)}
            />
            <IconButton icon={<StarIcon color="gray.300" />} />
            <IconButton icon={<DeleteIcon color="gray.300" />} />
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
