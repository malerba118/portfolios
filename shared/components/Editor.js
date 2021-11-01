import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Flex,
  Center,
  Button,
  ButtonGroup,
  HStack,
  Text,
  Heading,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import Script from "next/script";
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
import { hasSubscription } from "shared/utils/data";
import VisibilityRefresh from "./VisibilityRefresh";
import EditorPreview from "./EditorPreview";

const Editor = observer(() => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const query = useQuery("portfolio", api.portfolio.get);
  const mutation = useMutation((data) => api.portfolio.updateDraft(data), {
    onError: (err) => {
      // alert("Error saving draft!");
      console.log(err?.message);
    },
  });

  const updatePortfolio = useMemo(() => {
    return debounce(mutation.mutate, 3000);
  }, [mutation.mutate]);

  // useEffect(() => {
  //   console.log(query.data);
  // }, [query.data]);

  const portfolio = useMemo(() => {
    if (query.data?.id) {
      return models.Portfolio.create(query.data);
    }
    return null;
  }, [query.data?.id]);

  useEffect(() => {
    return autorun(() => {
      if (portfolio?.draft) {
        updatePortfolio(portfolio.draft.toJSON());
      }
    });
  }, [portfolio]);

  if (!portfolio) {
    return null;
  }

  // if (hideEditor) {
  //   return (
  //     <Center flexDirection="column" h="100%" p={4}>
  //       <Heading size="xl" textAlign="center">
  //         Oops, Tiny Screen Alert!
  //       </Heading>
  //       <Text fontSize="md" textAlign="center">
  //         Unfortunately editing is not supported on mobile devices, please sign
  //         in on a browser to continue!
  //       </Text>
  //     </Center>
  //   );
  // }

  return (
    <Flex h="100%">
      <VisibilityRefresh idleThreshold={1000 * 60 * 10} />
      <Script src="/browser-image-compression.js" strategy="lazyOnload" />
      <Sidebar
        portfolio={portfolio}
        subdomain={query?.data?.subdomain}
        lastSaved={mutation?.data?.draftLastSaved}
      />
      {!isSmallScreen && (
        <EditorPreview
          flex={1}
          portfolio={portfolio}
          subdomain={query?.data?.subdomain}
        />
      )}
    </Flex>
  );
});

const WrappedEditor = (props) => {
  return <Editor {...props} />;
};

export default WrappedEditor;
