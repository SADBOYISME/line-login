"use server";
import liff from "@line/liff";

const InitLiff = async () => {
  await liff.init({ liffId: process.env.LIFFID ?? "" });
  if (!liff.isLoggedIn()) {
    liff.login();
    return false;
  }
  const profile = await liff.getProfile();
  console.log("profile", profile);
  return profile;
};

export default InitLiff;
