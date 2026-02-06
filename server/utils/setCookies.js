import "dotenv/config";

export default function setCookies(res, token) {
  const isProduction = process.env.NODE_URL === "production";
  const sameSiteValue = isProduction ? "None" : "Lax";
  const cookiesOptions = {
    secure: isProduction,
    sameSite: sameSiteValue,
    httpOnly: true,
    path: "/",
  };
  if (
    res.cookie("token", token, {
      ...cookiesOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
  ) {
    return true;
  } else return null;
}
