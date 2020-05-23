import { useState, createElement } from "react";
import { $addConfig } from "./config-requests";

export default async function RenderAddForm(cluster: string) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function submitForm() {
    await $addConfig(cluster, name, value);
  }

  return (
    <form>
      <input onChange={handleNameChange} placeholder="name" type="text" />
      <input onChange={handleValueChange} placeholder="value" type="text" />
      <button onClick={submitForm}></button>
    </form>
  );
}
