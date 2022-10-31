type EmptyObjec = {
  [K in any]: any;
};

export const serverRequestSender = async (url: string, data?: EmptyObjec) => {
  if (!data) {
    const request = await fetch(`${url}`);
    return request;
  } else {
    const request = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  }
};
