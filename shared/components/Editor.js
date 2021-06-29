import React, { useEffect, useMemo, useState } from "react";
import { Flex, Center, Box, Button, useDisclosure } from "@chakra-ui/react";
import { useQuery, useMutation } from "react-query";
import debounce from "lodash/debounce";
import { useAuth } from "client/useAuth";
import { observer } from "mobx-react";
import Previewer from "./Previewer";
import DeviceSelector from "./DeviceSelector";
import PortfolioContentEditor from "./PortfolioContentEditor";
import ResizeDetector from "react-resize-detector";
import * as models from "shared/services/models";
import * as styles from "../utils/styles";
import * as api from "client/api";
import { autorun } from "mobx";
import PublishModal from "./PublishModal";
import Sidebar from "./Sidebar";

const deviceAspectRatios = {
  phone: 9 / 16,
  tablet: 3 / 4,
  desktop: 16 / 9,
};

const Editor = observer(() => {
  const user = useAuth();
  console.log(user);
  const query = useQuery("portfolio", api.portfolio.get);
  const mutation = useMutation((data) => api.portfolio.updateDraft(data));
  const [device, setDevice] = useState("desktop");
  const publishModal = useDisclosure();

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
          <DeviceSelector value={device} onChange={setDevice} />
          <Button
            onClick={publishModal.onOpen}
            colorScheme="purple"
            size="sm"
            pos="absolute"
            right={4}
          >
            Publish
          </Button>
        </Flex>
        <ResizeDetector handleWidth handleHeight>
          {({ width, height }) => {
            const ratio = deviceAspectRatios[device];
            const previewerSize = {};
            if (width / height > ratio) {
              previewerSize.height = height * 0.88;
              previewerSize.width = previewerSize.height * ratio;
            } else {
              previewerSize.width = width * 0.88;
              previewerSize.height = previewerSize.width / ratio;
            }
            return (
              <Flex flex={1} className="main-content" bg="gray.100">
                <Center w="100%">
                  {width && height && (
                    <Previewer {...previewerSize} portfolio={portfolio} />
                  )}
                </Center>
              </Flex>
            );
          }}
        </ResizeDetector>
      </Flex>
      <PublishModal
        isOpen={publishModal.isOpen}
        onClose={publishModal.onClose}
      />
    </Flex>
  );
});

export default Editor;
