import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function PATCH(event: APIEvent) {
  const { user_id } = event.params;
  // await sql`DELETE FROM tag WHERE id = ${tag_id}`;
  return redirect("/admin");
}
