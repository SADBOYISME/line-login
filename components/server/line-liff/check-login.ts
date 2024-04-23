import liff from "@line/liff";

export default async function CheckLogin() {
  await liff.init({ liffId: process.env.LIFFID ?? "" });
  if (!liff.isLoggedIn()) {
    liff.login();
    return false;
  }

  const profile = await liff.getProfile();
  return profile;
}
