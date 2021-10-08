import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Flex,
  Center,
  Button,
  ButtonGroup,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "react-query";
import debounce from "lodash/debounce";
import { useAuth } from "client/useAuth";
import { observer } from "mobx-react";
import Previewer from "./Previewer";
import DeviceSelector from "./DeviceSelector";
import ResizeDetector from "react-resize-detector";
import * as models from "shared/services/models";
import * as styles from "../utils/styles";
import * as api from "client/api";
import { autorun } from "mobx";
import PublishModal from "./PublishModal";
import TemplateModal from "./TemplateModal";
import Sidebar from "./Sidebar";
import {
  MdFullscreen as FullscreenIcon,
  MdFullscreenExit as ExitFullscreenIcon,
  MdRefresh as RefreshIcon,
} from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import IconButton from "./IconButton";
import { useFullscreen } from "./Fullscreen";
import { useRouter } from "next/router";
import { getHostingUrl } from "shared/utils/url";

const deviceAspectRatios = {
  phone: 9 / 16,
  tablet: 3 / 4,
  desktop: 16 / 9,
};

const Editor = observer(() => {
  const user = useAuth();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const query = useQuery("portfolio", api.portfolio.get);
  const mutation = useMutation((data) => api.portfolio.updateDraft(data));
  const [device, setDevice] = useState("desktop");
  const publishModal = useDisclosure();
  const { fullscreen, setFullscreen } = useFullscreen();

  const updatePortfolio = useMemo(() => {
    return debounce(mutation.mutate, 3000);
  }, [mutation.mutate]);

  const portfolio = useMemo(() => {
    if (query.data?.id) {
      return models.Portfolio.create(query.data);
    }
    return null;
  }, [query.data?.id]);

  useEffect(() => {
    return autorun(() => {
      updatePortfolio(portfolio.draft.toJSON());
    });
  }, [portfolio]);

  if (!portfolio) {
    return null;
  }

  return (
    <Flex h="100%">
      <Sidebar portfolio={portfolio} />
      <Flex flex={1} className="main" flexDirection="column">
        <Flex
          className="main-header"
          h="56px"
          {...styles.borders({ bottom: true })}
          justifyContent="center"
          alignItems="center"
          pos="relative"
        >
          <ButtonGroup pos="absolute" left={4}>
            <IconButton
              tooltip={fullscreen ? "Collapse" : "Expand"}
              onClick={() => setFullscreen(!fullscreen)}
              size="sm"
              fontSize="xl"
              rounded="4px"
              icon={fullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            />
            {portfolio.subdomain && (
              <IconButton
                tooltip={"Go to published site"}
                onClick={() => {
                  window.open(
                    getHostingUrl({ subdomain: portfolio.subdomain }),
                    "_blank"
                  );
                }}
                size="sm"
                fontSize="lg"
                rounded="4px"
                pb="2px"
                pl="2px"
                icon={<RiExternalLinkLine />}
              />
            )}
            <IconButton
              tooltip={"Refresh"}
              onClick={() => setRefreshKey((p) => p + 1)}
              size="sm"
              fontSize="xl"
              rounded="4px"
              icon={<RefreshIcon />}
            />
          </ButtonGroup>
          <DeviceSelector value={device} onChange={setDevice} />
          <HStack pos="absolute" right={4}>
            {user && user.subscription?.status !== "active" && (
              <Button
                onClick={() => router.push("/pricing")}
                size="sm"
                colorScheme="secondary"
                variant="outline"
              >
                Upgrade
              </Button>
            )}
            <Button
              onClick={publishModal.onOpen}
              colorScheme="secondary"
              size="sm"
            >
              Publish
            </Button>
          </HStack>
        </Flex>
        <ResizeDetector handleWidth handleHeight>
          {({ width, height }) => {
            const ratio = deviceAspectRatios[device];
            const padding = fullscreen ? 12 : 24;
            const previewerSize = {};
            if (width / height > ratio) {
              previewerSize.height = height - 2 * padding;
              previewerSize.width = previewerSize.height * ratio;
            } else {
              previewerSize.width = width - 2 * padding;
              previewerSize.height = previewerSize.width / ratio;
            }
            return (
              <Flex flex={1} className="main-content" bg="gray.100">
                <Center w="100%">
                  {width && height && (
                    <Previewer
                      key={refreshKey}
                      {...previewerSize}
                      portfolio={portfolio}
                    />
                  )}
                </Center>
              </Flex>
            );
          }}
        </ResizeDetector>
      </Flex>
      <PublishModal
        key={String(publishModal.isOpen)}
        defaultValue={portfolio.subdomain}
        isOpen={publishModal.isOpen}
        onClose={publishModal.onClose}
      />
      <TemplateModal
        onContinue={(templateName) => {
          portfolio.draft.set({ template: templateName });
        }}
      />
    </Flex>
  );
});

export default Editor;
