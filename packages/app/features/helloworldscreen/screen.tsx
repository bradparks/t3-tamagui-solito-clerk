import { Paragraph, YStack } from "@my/ui";
import React from "react";

export function HelloWorldScreenScreen() {
  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">
      Hi there from this screen
      This is a test
      </Paragraph>
    </YStack>
  );
} 
