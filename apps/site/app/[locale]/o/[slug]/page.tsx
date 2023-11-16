export default async function Page() {
  return (
    <>
      <div className="prose container">
        <h1>La page d'accueil apres connexion</h1>
        on reprend cette maquette
        https://www.figma.com/file/YzjYnNPrH6lv68HFSNHguj/BAKKAR---2023?type=design&node-id=535%3A2223&mode=dev
        <h2>objectifs</h2>
        <ul>
          <li>
            Séparer le layout de la page et la page elle meme dans leurs
            fichiers respectifs <code>layout.tsx</code> et <code>page.tsx</code>
          </li>
          <li>faire un proposition pour le responsive</li>
          <li>
            Insérer qq diagrammes à l&apos;aide de Recharts, dans des
            conmposants Shadcn
          </li>
        </ul>
        <h2>Notes</h2>
        <ul>
          <li>
            La page n&apos;a pas besoin de matcher parfaitement la maquette
          </li>
          <li>
            Pas besoin de fetcher quoi que ce soit à ce stade, ca arrive en un
            second temps. Objectif 1: pur UI
          </li>
        </ul>
        <h2>Reférences</h2>
        <ul>
          <li>
            tailwindUI (email:{" "}
            <code className="bg-green-200">alexandre.c@obole-digitale.fr</code>{" "}
            PWD:
            <code className="bg-green-200">UY3EH!7^VT%=Xsbi4(M$+b)PVF&c</code>)
          </li>
          <li>
            shadcn UI:
            https://github.com/shadcn-ui/ui/tree/main/apps/www/app/examples/dashboard
            et https://ui.shadcn.com
          </li>
          <li>nos projets</li>
        </ul>
      </div>
    </>
  );
}
