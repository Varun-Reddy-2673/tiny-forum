import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";

export async function GET() {
  const posts = await sql`select * from post`;
  return posts;
}

export async function POST(event: APIEvent) {
  const userId = 1;
  const formdata = await event.request.formData();
  const title = formdata.get("title") as string;
  const content = formdata.get("content") as string;
  const output = await sql`insert into post (user_id, title, content) VALUES (${userId}, ${title}, ${content}) RETURNING id`;
  return redirect(`/post/${output[0].id}`);
}
