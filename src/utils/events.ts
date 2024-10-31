declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

type Payload = Record<string, number>;

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbwmaRDdSZMjNR3Cjw56j7fIdyJEPqLmlyNjxRr0-Xs9zgn5wjVPHDdTGKgmOjR95lPA/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({ date, ...payload, variant: "ghk_3579_5" }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};