import { createElement } from "react";
import { render } from "react-dom";
import RenderLines from "./RenderLines";
import RenderAddForm from "./RenderAddForm";

export default function config_init(cluster: string, table_id: string) {
  const table = (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Value</td>
          <td>action</td>
        </tr>
      </thead>
      {/* Rend les lignes du tableaux
       /config-elements/renderLines.tsx  */}
      <tbody>{RenderLines(cluster)}</tbody>

      {/* Rend le formulaire d'ajout */}
      <tfoot>{RenderAddForm(cluster)}</tfoot>
    </table>
  );

  render(table, document.getElementById(table_id));
}
