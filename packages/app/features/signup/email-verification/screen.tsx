/* this page is just one input for email verification */
import { useState } from "react";
import { Button, Input, YStack } from "@my/ui";
import { useAuth, useSignUp } from "app/utils/clerk";
import { useRouter } from "solito/router";
import { trpc } from "app/utils/trpc";

export function EmailVerificationScreen() {
  const { push } = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const createUserMutation = trpc.user.create.useMutation();

  const { signUp, setSession } = useSignUp();
  if (!signUp) return null;

  const handleEmailVerificationOnPress = async () => {
    /* verify the email */
    await signUp.attemptEmailAddressVerification({ code: verificationCode });

    if (signUp.status === "complete") {
      /* add user id and email into our database */
      createUserMutation.mutate({
        id: signUp.createdUserId!,
        email: signUp.emailAddress!,
      });
      push("/");
      const { createdSessionId } = signUp;
      if (createdSessionId) {
        await setSession(createdSessionId);
      }
    } else alert("Invalid verification code");
  };
  return (
    <YStack f={1} jc="center" ai="center" space>
      <Input
        placeholder="Verification code"
        onChangeText={(text) => {
          setVerificationCode(text);
        }}
      />

      {/* button for submitting */}
      <Button
        onPress={() => {
          handleEmailVerificationOnPress();
        }}
      >
        Submit
      </Button>
    </YStack>
  );
}
