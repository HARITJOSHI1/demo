import React from "react";

const page = async () => {
  await new Promise((res) => setTimeout(() => res(1), 5000));

  return <div>test</div>;
};

export default page;
