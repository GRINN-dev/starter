import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
import { serverSdk } from "@/lib/apollo-server-sdk";

const VerifyEmail = async ({
  params: { id, token },
}: {
  params: { id: string; token: string };
}) => {
  const { verifyEmail } = await (
    await serverSdk()
  ).VerifyEmail({
    token,
    id: id,
  });

  const { currentUser } = await serverSdk().SettingsEmails();

  if (verifyEmail?.success && currentUser?.isAdmin === true) {
    redirect("/admin", RedirectType.replace);
  }

  return (
    <div>
      <h1>Vérification de mail</h1>
      {verifyEmail?.success && (
        <div>
          <p>Email verifié</p>
          {currentUser?.isAdmin ? (
            <p>Vous allez être redirigé</p>
          ) : (
            <p>{"Vous pouvez retouner sur l'application et fermer cet page"}</p>
          )}
        </div>
      )}
      {verifyEmail && !verifyEmail?.success && <p>Email non validé</p>}
    </div>
  );
};
export default VerifyEmail;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
