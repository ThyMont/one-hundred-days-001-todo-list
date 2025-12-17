import { Box, Container, Flex, Icon, Text, Switch } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";
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
    <Box bg="bg" color="fg" minH="100vh" py="5">
      <Container maxW="6xl">
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
          shadow={"md"}
          borderRadius="sm"
          p="4"
          mt="6"
          borderWidth="1px"
          borderColor="border"
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
