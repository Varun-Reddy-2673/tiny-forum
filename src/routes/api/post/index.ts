import { redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import sql from "~/lib/db";
import { getSession } from "~/lib/session";

export async function GET() {
  /**
   * TODO(eshaan): also get the user's name in the posts
   * ```json
   * [{
   *    id: <<post_id>>,
   *    ...,
   *    user: {
   *      name: <<username>>
   *    }
   * }]
   * ```
   */
  const posts = await sql`select * from post`;
  return posts;
}

export async function POST(event: APIEvent) {
  const session = await getSession();
  const userId = session.data.id;
  const formdata = await event.request.formData();
  const title = formdata.get("title") as string;
  const content = formdata.get("content") as string;
  const tags = formdata.getAll("tags");
  console.log(tags);
  console.log(Object.fromEntries(formdata))

  return "Hello";

  const output = await sql`insert into post (user_id, title, content) VALUES (${userId}, ${title}, ${content}) RETURNING id`;
  
  return redirect(`/post/${output[0].id}`);
}
