import { useState, createElement } from "react";
import { $delConfig, $reOrderConfig, $getConfig } from "./config-requests";
import { line } from "./config-types";

/* Génére les lignes du tableau <tr>
   A partir de la data JSON  /admin/json/...

   Chaque ligne à deux actions possible.
   • Changer la position de la ligne -> (input number)
   • Supprimer la ligne -> button
    
   Chacune de ces actions refresh les donnée
*/
export default async function RenderLines(cluster: string) {
  const [lines, setLines] = useState(await $getConfig(cluster));

  // Gére l'input d'action
  // a chaque changement de valeur
  // (Monte ou dessend la ligne)
  async function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    line: line,
    lines: Array<line>
  ) {
    const position = parseInt(e.target.value, 10);
    const newPosition = getNewPosition(position, line.position, lines);
    setLines(await $reOrderConfig(line.id, newPosition));
  }

  // Gére le bouton d'action delete du tableau
  // a chaque clique.
  // (Supprime une ligne)
  async function handleButtonClick(line: line) {
    const isConfirm: boolean = confirm(`Delete ${line.name} (${line.value})`);
    if (isConfirm) {
      setLines(await $delConfig(line.id));
    }
  }

  return lines.map((line: line, index: number, lines: Array<line>) => (
    <tr>
      <td>{line.name}</td>
      <td>{line.value}</td>
      <td>
        <input
          title={line.position.toString()}
          className="position"
          name="position"
          type="number"
          onChange={(e) => handleInputChange(e, line, lines)}
          value={line.position}
        />
        <button onClick={() => handleButtonClick(line)}>Del</button>
      </td>
    </tr>
  ));
}

function getNewPosition(
  position: number,
  oldPosition: number,
  lines: Array<line>
): number {
  const offset = position - oldPosition;
  const tmpPosition = position - 2 * offset;
  return tmpPosition < 0
    ? lines.length
    : tmpPosition >= lines.length
    ? -1
    : tmpPosition;
}
