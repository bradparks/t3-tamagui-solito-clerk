import { Paragraph, YStack } from "@my/ui";
import React from "react";

export function HelloWorld() {
  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">
        HelloWorld
      </Paragraph>
    </YStack>
  );
} 