import React, { useEffect, useMemo, useState, useRef } from "react";
import { Flex, Spinner, Center, useBreakpointValue } from "@chakra-ui/react";
import Script from "next/script";
import { useQuery, useMutation, focusManager } from "react-query";
import debounce from "lodash/debounce";
import { observer } from "mobx-react";
import * as models from "shared/services/models";
import * as styles from "../utils/styles";
import * as api from "client/api";
import { autorun } from "mobx";
import Sidebar from "./Sidebar";
// import VisibilityRefresh from "./VisibilityRefresh";
import EditorPreview from "./EditorPreview";

focusManager.setEventListener((handleFocus) => {
  // Listen to visibillitychange and focus
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("visibilitychange", handleFocus, false);
  }

  return () => {
    // Be sure to unsubscribe if a new handler is set
    window.removeEventListener("visibilitychange", handleFocus);
  };
});

const Editor = observer(({ onReady }) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const query = useQuery("portfolio", api.portfolio.get, {
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
  });
  const mutation = useMutation((data) => api.portfolio.updateDraft(data), {
    onError: (err) => {
      // alert("Error saving draft!");
      console.log(err?.message);
    },
  });

  const updatePortfolio = useMemo(() => {
    return debounce(mutation.mutate, 3000);
  }, [mutation.mutate]);

  const portfolio = useMemo(() => {
    if (query.dataUpdatedAt) {
      return models.Portfolio.create(query.data);
    }
    return null;
  }, [query.dataUpdatedAt]);

  useEffect(() => {
    return autorun(() => {
      if (portfolio?.draft) {
        updatePortfolio(portfolio.draft.toJSON());
      }
    });
  }, [portfolio]);

  useEffect(() => {
    if (portfolio) {
      onReady?.();
    }
  }, [portfolio]);

  if (!portfolio) {
    return null;
  }

  return (
    <Flex h="100%">
      {/* <VisibilityRefresh idleThreshold={1000 * 60 * 10} /> */}
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
