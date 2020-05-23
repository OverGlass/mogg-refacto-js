import { line } from "./config-types";

async function $getConfig(cluster: string): Promise<line[]> {
  return tryCatch(async () => {
    const request = await fetch(`json/config.php?config=${cluster}`);
    return await request.json();
  });
}

async function $addConfig(
  cluster: string,
  name: string,
  value: string
): Promise<line[]> {
  return tryCatch(async () => {
    const request = await fetch(
      `json/add_config.php?config=${cluster}&name=${name}&value=${value}`
    );
    return await request.json();
  });
}

async function $delConfig(id: number): Promise<line[]> {
  return tryCatch(async () => {
    const request = await fetch(`json/del_config.php?id=${id}`);
    return await request.json();
  });
}

async function $reOrderConfig(
  id: number,
  newPosition: number
): Promise<line[]> {
  return tryCatch(async () => {
    const request = await fetch(
      `json/reorder_config.php?id=${id}&to=${newPosition}`
    );
    return await request.json();
  });
}

async function tryCatch(callback: Function) {
  try {
    return callback();
  } catch (e) {
    console.error(e);
  }
}

export { $getConfig, $delConfig, $reOrderConfig, $addConfig };
