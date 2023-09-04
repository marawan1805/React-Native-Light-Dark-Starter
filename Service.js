import { API_URL } from "./Constant";
import { SERVER_API_URL } from "./Server_Url";

export const generateToken = async (orderId, amount) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    orderId: orderId,
    amt: amount,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(SERVER_API_URL, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result", result);
      return result?.body?.txnToken;
    })
    .catch((error) => console.log("error", error));
};
