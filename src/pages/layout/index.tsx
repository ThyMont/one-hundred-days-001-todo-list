import { Box, Container, Flex, Icon, Text, Switch, Link, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from "react-icons/fa";
import { useColorMode } from "@/components/ui/color-mode";

interface LayoutProps {
  children: ReactNode;
}

type SwitchChange = { checked: boolean };

export function Layout({ children }: LayoutProps) {
  const { colorMode, setColorMode } = useColorMode();

  function handleDarkMode(e: SwitchChange) {
    setColorMode(e.checked ? "light" : "dark");
  }

  const isLight = colorMode === "light";

  return (
    <Box bg="bg" color="fg" minH="100vh" py="5" display="flex" flexDirection="column">
      <Container maxW="6xl" flex="1">
        <Flex direction="column" textAlign="center" gap="2">
          <Text fontSize="5xl">
            ToD
            <Icon fontSize="3xl" ml="1">
              <MdCheckCircleOutline />
            </Icon>
          </Text>

          <Text color="fg.muted">Stay organized and get things done</Text>

          <Flex justify="center" mt="2">
            <Switch.Root
              size="lg"
              colorPalette="brand"
              checked={isLight}
              onCheckedChange={handleDarkMode}
            >
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
                <Switch.Indicator fallback={<Icon as={FaMoon} color="fg.muted" />}>
                  <Icon as={FaSun} color="warning" />
                </Switch.Indicator>
              </Switch.Control>
            </Switch.Root>
          </Flex>
        </Flex>

        <Box
          bg="surface"
          shadow="md"
          borderRadius="sm"
          p="4"
          mt="6"
          borderWidth="1px"
          borderColor="border"
        >
          {children}
        </Box>
      </Container>

      {/* Footer */}
      <Box mt="8" py="4" borderTopWidth="1px" borderColor="border">
        <Container maxW="6xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap="2"
          >
            <Text fontSize="sm" color="fg.muted">
              © {new Date().getFullYear()} Thyago Monteiro — 100 Days of Code
            </Text>

            <Stack direction="row" gap="4">
              <Link
                href="https://github.com/ThyMont"
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                alignItems="center"
                gap="1"
                color="fg.muted"
                _hover={{ color: "fg" }}
              >
                <Icon as={FaGithub} />
                <Text fontSize="sm">GitHub</Text>
              </Link>

              <Link
                href="https://www.linkedin.com/in/thyagomonteiro/"
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                alignItems="center"
                gap="1"
                color="fg.muted"
                _hover={{ color: "fg" }}
              >
                <Icon as={FaLinkedin} />
                <Text fontSize="sm">LinkedIn</Text>
              </Link>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
